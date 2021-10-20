import { Injectable } from "@angular/core";
import { LogService } from "./log.service";

@Injectable({
  providedIn: "root",
})
export class WeaponService {
  private BASE_CHANCE = 0.5;

  constructor(private logService: LogService) {}

  shoot(asteroids: Asteroid[]): Asteroid[] {
    const hitAsteroids: Asteroid[] = [];
    asteroids.forEach((asteroid) => {
      if (Math.random() > this.BASE_CHANCE) {
        hitAsteroids.push(asteroid);
        this.logService.logSuccess("WEAPON", "Asteroid shot!");
      } else {
        this.logService.logFailure("WEAPON", "Asteroid shot missed!");
      }
    });
    return hitAsteroids;
  }
}
