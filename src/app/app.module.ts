import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KalahaComponent } from "./kalaha/kalaha.component";
import {FormsModule } from "@angular/forms";
import {HeaderComponent} from "./header/header.component";
import { HttpClientModule } from "@angular/common/http";
import {GamesApiService} from "./games-api.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    KalahaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [GamesApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
