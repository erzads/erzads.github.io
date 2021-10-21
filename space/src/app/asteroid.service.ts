import { Injectable } from "@angular/core";
import { MaterialService } from "./material.service";
import { ModuleService } from "./module.service";

@Injectable({
  providedIn: "root",
})
export class AsteroidService {
  private BASE_CHANCE = 0.1;
  private BASE_QUANTITY = 0.1;

  constructor(
    private moduleService: ModuleService,
    private materialService: MaterialService
  ) {}

  generateAsteroids(): Asteroid[] {
    const asteroids: Asteroid[] = [];
    if (Math.random() <= this.BASE_CHANCE) {
      const asteroidQuantity =
        this.BASE_QUANTITY + this.moduleService.getAsteroidQuantityModifier();
      for (let i = 0; i < asteroidQuantity; i++) {
        asteroids.push({});
      }
    }
    return asteroids;
  }

  generateMaterialsYield(asteroids: Asteroid[]): Map<Material, number> {
    const materialsYield = new Map<Material, number>();
    asteroids.forEach(asteroid => {
      const material = this.materialService.materials.get(this.moduleService.getRandomMaterialType());
      if (material) {
        const materialYield = this.moduleService.generateMaterialYield();
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
