import { Injectable } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { AsteroidService } from "./asteroid.service";
import { LogService } from "./log.service";
import { ModuleService } from "./module.service";
import { StorageService } from "./storage.service";
import { WeaponService } from "./weapon.service";

@Injectable({
  providedIn: "root",
})
export class GameService {
  subscription: Subscription | null = null;

  constructor(
    private storageService: StorageService,
    private moduleService: ModuleService,
    private asteroidService: AsteroidService,
    private weaponService: WeaponService,
    private logService: LogService
  ) {}

  start() {
    const source = interval(1000);
    var lastLoopTime = new Date().getTime();
    this.subscription = source.subscribe((val) => {
      var now = new Date().getTime();
      this.loop(now - lastLoopTime);
      lastLoopTime = now;
    });
  }

  loop(elapsedTime: number) {
    const asteroids = this.asteroidService.generateAsteroids();
    if (asteroids) {
      this.logService.logInfo("ASTEROID", "Incoming asteroids...");
      const hitAsteroids = this.weaponService.shoot(asteroids);
      if (hitAsteroids) {
        const materials = this.asteroidService.generateMaterials(hitAsteroids);
      }
    }
    this.storageService.cap();
  }

  destroy() {
    this.subscription?.unsubscribe();
  }
}
