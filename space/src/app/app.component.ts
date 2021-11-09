import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { EquipmentService } from "./services/equipment.service";
import { GameService } from "./services/game.service";
import { LogService } from "./services/log.service";
import { StorageService } from "./services/storage.service";
import { finalize, first, map } from "rxjs/operators";
import { KeyValue } from "@angular/common";
import { ModuleService } from "./services/module.service";
import { WeaponService } from "./services/weapon.service";
import { AsteroidService } from "./services/asteroid.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ClearSavedDataDialogComponent } from "./dialogs/clear-saved-data-dialog/clear-saved-data-dialog.component";
import { SaveStateService } from "./services/save-state.service";
import { TravelService } from "./services/travel.service";

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
    private moduleService: ModuleService,
    private weaponService: WeaponService,
    private asteroidService: AsteroidService,
    private travelService: TravelService,
    private saveStateService: SaveStateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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

  get modules() {
    return this.moduleService.modules;
  }

  get asteroidHitChance(){
    return this.weaponService.asteroidHitChance;
  }

  get asteroidSpawnChance() {
    return this.asteroidService.asteroidSpawnChance;
  }

  get asteroidMaterialYield() {
    return this.asteroidService.asteroidMaterialYield;
  }

  get travelSpeed() {
    return this.travelService.calculateTravelDistance();
  }

  getCosts(type: "MODULE" | "EQUIPMENT", id: string): Map<Material, number> {
    if (type === "MODULE") {
      return this.moduleService.getModuleCosts(id);
    } else if (type === "EQUIPMENT") {
      return this.equipmentService.getEquipmentCosts(id);
    } else {
      throw "Unexpected type: " + type;
    }
  }

  buy(type: "MODULE" | "EQUIPMENT", id: string) {
    if (!this._isBuying) {
      this._isBuying = true;
      this.canBuy$(type, id)
        .pipe(
          first(),
          finalize(() => (this._isBuying = false))
        )
        .subscribe((canBuy) => {
          if (canBuy) {
            this.storageService.remove(this.getCosts(type, id));
            if (type === "MODULE") {
              this.moduleService.add(id, 1);
            } else if (type === "EQUIPMENT") {
              this.equipmentService.add(id, 1);
            } else {
              throw "Unexpected type: " + type;
            }
          }
        });
    }
  }

  canBuy$(type: "MODULE" | "EQUIPMENT", id: string) {
    const costs = this.getCosts(type, id);
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

  keyAscOrder = (
    a: KeyValue<Material, number>,
    b: KeyValue<Material, number>
  ): number => {
    return a.key.type.localeCompare(b.key.type);
  };

  save() {
    this.gameService.save();
    this.snackBar.open('Game saved successfully', "Close", {
      duration: 3000
    });
  }

  openClearSavedDataDialog(){
    const dialogRef = this.dialog.open(ClearSavedDataDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveStateService.clear();
        location.reload();
      }
    });
  }

  ngOnInit() {
    this.gameService.start();
  }

  ngOnDestroy() {
    this.gameService.destroy();
  }
}
