import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { DistanceService } from "./distance.service";
import { EquipmentService } from "./equipment.service";
import { LogService } from "./log.service";
import { MaterialService } from "./material.service";
import { ModuleService } from "./module.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class SaveStateService {
  constructor(
    private storageService: StorageService,
    private equipmentService: EquipmentService,
    private moduleService: ModuleService,
    private materialService: MaterialService,
    private distanceService: DistanceService,
    private logService: LogService
  ) {}

  public loadGameState(): GameState | null {
    const item = localStorage.getItem("space-incremental");
    if (item) {
      const gameState: GameState = JSON.parse(atob(item));
      this.distanceService.distance = gameState.distance;
      this._loadStorageMaterials(gameState);
      this._loadEquipments(gameState);
      this._loadModules(gameState);
      this.logService.logInfo("SYSTEM", "Game loaded successfully");
      return gameState;
    } else {
      return null;
    }
  }

  public clear() {
    localStorage.removeItem("space-incremental");
  }

  private _loadStorageMaterials(gameState: GameState) {
    if (gameState.storageMaterials && gameState.storageMaterials.length > 0) {
      const storageMaterials = gameState.storageMaterials
        .map(storageMaterial => ({
          key: this.materialService.materials.get(storageMaterial.key),
          value: storageMaterial.value,
        }))
        .reduce(
          (map, obj) => map.set(obj.key as Material, obj.value),
          new Map<Material, number>()
        );
      this.storageService.add(storageMaterials);
    }
  }

  private _loadEquipments(gameState: GameState) {
    if (gameState.equipments && gameState.equipments.length > 0) {
      gameState.equipments.forEach((equipment) => {
        this.equipmentService.add(equipment.key, equipment.value);
      });
    }
  }

  private _loadModules(gameState: GameState) {
    if (gameState.modules && gameState.modules.length > 0) {
      gameState.modules.forEach((module) => {
        this.moduleService.add(module.key, module.value);
      });
    }
  }

  public saveGameState() {
    const gameState: GameState = {
      distance: this.distanceService.distance,
      lastLoopTime: new Date().getTime(),
      storageMaterials: Array.from(this.storageService.materials.value).map(
        ([key, value]) => ({ key: key.type, value: value })
      ),
      equipments: this._mapBuyableToQuantities(
        this.equipmentService.equipments
      ),
      modules: this._mapBuyableToQuantities(this.moduleService.modules),
    };
    localStorage.setItem("space-incremental", btoa(JSON.stringify(gameState)));
  }

  private _mapBuyableToQuantities(
    buyables: Map<string, Buyable>
  ): { key: string; value: number }[] {
    return Array.from(buyables).map(([key, value]) => ({
      key,
      value: value.quantity,
    }));
  }
}
