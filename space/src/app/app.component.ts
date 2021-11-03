import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { EquipmentService } from "./equipment.service";
import { GameService } from "./game.service";
import { LogService } from "./log.service";
import { StorageService } from "./storage.service";
import { finalize, first, map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  private _isBuying = false;

  constructor(
    private gameService: GameService,
    private storageService: StorageService,
    private equipmentService: EquipmentService,
    private logService: LogService
  ) {}

  get materials$(): BehaviorSubject<Map<Material, number>> {
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

  getEquipmentCosts(id: string): Map<Material, number> {
    return this.equipmentService.getEquipmentCosts(id);
  }

  ngOnInit() {
    this.gameService.start();
  }

  ngOnDestroy() {
    this.gameService.destroy();
  }

  buyEquipment(id: string) {
    if (!this._isBuying) {
      this._isBuying = true;
      this.canBuyEquipment$(id)
        .pipe(first(), finalize(() => (this._isBuying = false)))
        .subscribe(canBuy => {
          if (canBuy) {
            this.storageService.remove(this.getEquipmentCosts(id));
            this.equipmentService.add(id, 1)
          }
        });
    }
  }

  canBuyEquipment$(id: string) {
    const costs = this.getEquipmentCosts(id);
    return this.materials$.pipe(
      map((materialStorage: Map<Material, number>) => {
        for (let material of costs.keys()) {
          const storedQuantity = materialStorage.get(material);
          if (storedQuantity == null || storedQuantity < costs.get(material)!) {
            return false;
          }
        }
        return true;
      })
    );
  }
}
