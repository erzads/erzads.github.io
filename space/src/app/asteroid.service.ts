import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AsteroidService {
  private BASE_CHANCE = 0.5;

  constructor() {}

  generateAsteroids(): Asteroid[] {
    if (Math.random() > this.BASE_CHANCE) {
      return [{}];
    } else {
      return [];
    }
  }

  generateMaterials(asteroids:  Asteroid[]) : Map<Material, number>{
    return new Map<Material, number>();
  }
}
