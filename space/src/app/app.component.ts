import { Component, OnDestroy, OnInit } from "@angular/core";
import { EquipmentService } from "./equipment.service";
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
    private equipmentService: EquipmentService,
    private logService: LogService
  ) {}

  get materials$() {
    return this.storageService.materials;
  }

  get logs$() {
    return this.logService.logs;
  }

  get distance() {
    return this.gameService.distance;
  }

  get equipments() {
    return this.equipmentService.equipments;
  }

  getEquipmentCosts(id: string) {
    return this.equipmentService.getEquipmentCosts(id);
  }

  ngOnInit() {
    this.gameService.start();
  }

  ngOnDestroy() {
    this.gameService.destroy();
  }
}
