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

  getAsteroidChanceModifier(baseChance: number): number {
    return this.moduleService.getAsteroidChanceModifier(baseChance);
  }

  getAsteroidQuantityModifier(): number {
    return (
      this.equipmentService.getAsteroidQuantityModifier() +
      this.moduleService.getAsteroidQuantityModifier()
    );
  }

  getAsteroidHitModifier(baseChance: number): number {
    return this.moduleService.getAsteroidHitModifier(baseChance);
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
