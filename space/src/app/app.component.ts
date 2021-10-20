import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService} from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
  constructor(private gameService:GameService){

  }

  ngOnInit(){
    this.gameService.start();
  }

  ngOnDestroy(){
    this.gameService.destroy();
  }
}
