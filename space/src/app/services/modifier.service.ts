import { Injectable } from "@angular/core";
import { DistanceService } from "./distance.service";
import { EquipmentService } from "./equipment.service";
import { ModuleService } from "./module.service";

@Injectable({
  providedIn: "root",
})
export class ModifierService {
  constructor(
    private moduleService: ModuleService,
    private equipmentService: EquipmentService,
    private distanceService: DistanceService
  ) {}

  getAsteroidChanceModifier(baseChance: number): number {
    return (
      this.moduleService.getAsteroidChanceModifier(baseChance) * 1 +
      Math.floor(this.distanceService.distance / 10000) * 0.05
    ); // every 10000 distance = 5%;
  }

  getAsteroidQuantityModifier(): number {
    return (
      this.equipmentService.getAsteroidQuantityModifier() +
      this.moduleService.getAsteroidQuantityModifier()
    );
  }

  getAsteroidHitModifier(): number {
    return this.equipmentService.getAsteroidHitModifier() + this.moduleService.getAsteroidHitModifier();
  }

  getRandomMaterialType() {
    return this.moduleService.getRandomMaterialType();
  }

  generateMaterialYield(): number {
    return (
      this.equipmentService.generateMaterialYield() *
        this.moduleService.generateMaterialYield() *
        1 +
      Math.floor(this.distanceService.distance / 10000) * 0.05 // every 10000 distance = 5%
    );
  }

  getTravelDistanceModifier(): number {
    return (
      this.equipmentService.getTravelDistanceModifier() *
      this.moduleService.getTravelDistanceModifier()
    );
  }
}
