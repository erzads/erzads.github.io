import { Component, OnDestroy, OnInit } from "@angular/core";
import { GameService } from "./game.service";
import { LogService } from "./log.service";
import { StorageService } from "./storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private gameService: GameService,
    private storageService: StorageService,
    private logService: LogService
  ) {}

  get materials$() {
    return this.storageService.materials;
  }

  get logs$() {
    return this.logService.logs;
  }

  ngOnInit() {
    this.gameService.start();
  }

  ngOnDestroy() {
    this.gameService.destroy();
  }
}
