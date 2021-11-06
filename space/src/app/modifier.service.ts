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

  getAsteroidChanceModifier(): number {
    return this.moduleService.getAsteroidChanceModifier();
  }

  getAsteroidQuantityModifier(): number {
    return (
      this.equipmentService.getAsteroidQuantityModifier() +
      this.moduleService.getAsteroidQuantityModifier()
    );
  }

  getAsteroidHitModifier(): number {
    return this.moduleService.getAsteroidHitModifier();
  }

  getRandomMaterialType() {
    return this.moduleService.getRandomMaterialType();
  }

  generateMaterialYield(): number {
    return (
      this.equipmentService.generateMaterialYield() *
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
