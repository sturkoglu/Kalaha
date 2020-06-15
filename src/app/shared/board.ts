import { Tile } from './tile';
import { Player } from './player';

export class Board {
    id: number;
    tiles: Tile[][];
    players: Player[];
}
