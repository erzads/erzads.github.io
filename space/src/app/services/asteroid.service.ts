import { Injectable } from "@angular/core";
import { MaterialService } from "./material.service";
import { ModifierService } from "./modifier.service";

@Injectable({
  providedIn: "root",
})
export class AsteroidService {
  private BASE_CHANCE = 0.15;
  private BASE_ASTEROID_QUANTITY = 1;
  private BASE_MATERIAL_YIELD = 0.5;

  constructor(
    private modifierService: ModifierService,
    private materialService: MaterialService
  ) {}

  get asteroidSpawnChance() {
    return Math.min(1, this.modifierService.getAsteroidChanceModifier(this.BASE_CHANCE));
  }

  get asteroidMaterialYield() {
    return this.BASE_MATERIAL_YIELD * this.modifierService.generateMaterialYield();
  }

  generateAsteroids(): Asteroid[] {
    const asteroids: Asteroid[] = [];
    const asteroidQuantity =
      this.BASE_ASTEROID_QUANTITY +
      this.modifierService.getAsteroidQuantityModifier();
    for (let i = 0; i < asteroidQuantity; i++) {
      if (Math.random() <= this.asteroidSpawnChance) {
        asteroids.push({});
      }
    }
    return asteroids;
  }

  generateMaterialsYield(asteroids: Asteroid[]): Map<Material, number> {
    const materialsYield = new Map<Material, number>();
    asteroids.forEach((asteroid) => {
      const material = this.materialService.materials.get(
        this.modifierService.getRandomMaterialType()
      );
      if (material) {
        const materialYield = this.asteroidMaterialYield;
        if (materialsYield.has(material)) {
          materialsYield.set(
            material,
            (materialsYield.get(material) || 0) + materialYield
          );
        } else {
          materialsYield.set(material, materialYield);
        }
      }
    });
    return materialsYield;
  }
}
