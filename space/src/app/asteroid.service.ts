import { Injectable } from "@angular/core";
import { MaterialService } from "./material.service";
import { ModifierService } from "./modifier.service";

@Injectable({
  providedIn: "root",
})
export class AsteroidService {
  private BASE_CHANCE = 0.1;
  private BASE_QUANTITY = 0.1;
  private BASE_MATERIAL_YIELD = 1;

  constructor(
    private modifierService: ModifierService,
    private materialService: MaterialService
  ) {}

  generateAsteroids(): Asteroid[] {
    const asteroids: Asteroid[] = [];
    if (Math.random() <= this.BASE_CHANCE * this.modifierService.getAsteroidChanceModifier()) {
      const asteroidQuantity =
        this.BASE_QUANTITY + this.modifierService.getAsteroidQuantityModifier();
      for (let i = 0; i < asteroidQuantity; i++) {
        asteroids.push({});
      }
    }
    return asteroids;
  }

  generateMaterialsYield(asteroids: Asteroid[]): Map<Material, number> {
    const materialsYield = new Map<Material, number>();
    asteroids.forEach(asteroid => {
      const material = this.materialService.materials.get(this.modifierService.getRandomMaterialType());
      if (material) {
        const materialYield = this.BASE_MATERIAL_YIELD * this.modifierService.generateMaterialYield();
        if (materialsYield.has(material)){
          materialsYield.set(material, (materialsYield.get(material) || 0) + materialYield);
        } else {
          materialsYield.set(material, materialYield);
        }
      }
    });
    return materialsYield;
  }
}
