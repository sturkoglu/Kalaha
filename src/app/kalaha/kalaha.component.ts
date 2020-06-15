import {Component, OnInit} from '@angular/core';
import { GamesApiService } from '../games-api.service';
import {Tile} from "../shared/tile";
import {Board} from "../shared/board";
import {Player} from "../shared/player";

@Component({
  selector: 'app-kalaha',
  templateUrl: './kalaha.component.html',
  styleUrls: ['./kalaha.component.css']
})

export class KalahaComponent implements OnInit  {

  board: Board = new Board();

  constructor(private kalahaApi:GamesApiService) {
  }
  ngOnInit() {
    this.onStartGame();
  }

  onStartGame() {
    let postJson = {
      player1: {
        name: 'John'
      },
      player2: {
        name: 'Wick'
      },
    };

    this.kalahaApi.start(JSON.stringify(postJson))
      .subscribe((response : Board) =>{

        this.board.id = response.id;

        this.board.players = [];

        for(let i: number = 0; i < response.players.length; i++) {
          this.board.players[i] = new Player(response.players[i].name, response.players[i].stack, response.players[i].playerTurn);
        }

        this.board.tiles = [];
        for(let r: number = 0; r < 2; r++) {
          this.board.tiles[r] = [];
          for(let c: number = 0; c< 6; c++) {
              this.board.tiles[r][c] = new Tile(response.tiles[r][c].playerName, response.tiles[r][c].pieceCount, r, c);
          }
        }
      })
  }

  onTileClicked(tile: Tile) {
    let putJson = {
      id: this.board.id,
      playerName: tile.playerName,
      rowPosition: tile.row,
      colPosition: tile.col
    };

    this.kalahaApi.move(JSON.stringify(putJson))
      .subscribe((response : Board) =>{
      this.board.id = response.id;

      this.board.players = [];

      for(let i: number = 0; i < response.players.length; i++) {
        this.board.players[i] = new Player(response.players[i].name, response.players[i].stack, response.players[i].playerTurn);
      }

      this.board.tiles = [];
      for(let r: number = 0; r < 2; r++) {
        this.board.tiles[r] = [];
        for(let c: number = 0; c< 6; c++) {
          this.board.tiles[r][c] = new Tile(response.tiles[r][c].playerName, response.tiles[r][c].pieceCount, r, c);
        }
      }
    })
  }

  onFetchPosts() {
    // Send Http request
  }
}
