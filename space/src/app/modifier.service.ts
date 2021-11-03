import { Injectable } from "@angular/core";
import { EquipmentService } from "./equipment.service";
import { ModuleService } from "./module.service";

@Injectable({
  providedIn: "root",
})
export class ModifierService {
  constructor(
    private moduleService: ModuleService,
    private equipmentService: EquipmentService
  ) {}

  getAsteroidQuantityModifier(): number {
    return (
      this.equipmentService.getAsteroidQuantityModifier() +
      this.moduleService.getAsteroidQuantityModifier()
    );
  }

  getRandomMaterialType() {
    return "A";
  }

  generateMaterialYield(): number {
    return (
      this.equipmentService.generateMaterialYield() +
      this.moduleService.generateMaterialYield()
    );
  }

  getTravelDistanceModifier(): number {
    return (
      this.equipmentService.getTravelDistanceModifier() *
      this.moduleService.getTravelDistanceModifier()
    );
  }
}
