import { Injectable } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { AsteroidService } from "./asteroid.service";
import { LogService } from "./log.service";
import { SaveStateService } from "./save-state.service";
import { StorageService } from "./storage.service";
import { TravelService } from "./travel.service";
import { WeaponService } from "./weapon.service";

@Injectable({
  providedIn: "root",
})
export class GameService {
  subscription: Subscription = new Subscription();

  private _shouldSave = false;

  private _distance = 0;

  private MAX_OFFLINE_TIME_PRODUCTION = 12 * 60 * 60 * 1000; // 12 hours

  constructor(
    private storageService: StorageService,
    private asteroidService: AsteroidService,
    private weaponService: WeaponService,
    private travelService: TravelService,
    private saveStateService: SaveStateService,
    private logService: LogService
  ) {}

  start() {
    const savedGameState = this.saveStateService.loadGameState();
    this._distance = savedGameState?.distance || this._distance;

    let lastLoopTime = new Date().getTime();
    if (savedGameState?.lastLoopTime) {
      const elapsedTime = lastLoopTime - savedGameState.lastLoopTime;
      if (elapsedTime > this.MAX_OFFLINE_TIME_PRODUCTION) {
        lastLoopTime = lastLoopTime - this.MAX_OFFLINE_TIME_PRODUCTION;
      } else {
        lastLoopTime = savedGameState.lastLoopTime;
      }
    }
    this.subscription.add(interval(1000).subscribe(() => {
      let now = new Date().getTime();
      this.loop(now - lastLoopTime);
      lastLoopTime = now;
    }));

    this.subscription.add(interval(5000).subscribe(() => {
      this._shouldSave = true;
    }));
  }

  loop(elapsedTime: number) {
    while (elapsedTime > 999) {
      elapsedTime -= 1000; // one game loop every second

      if (this._shouldSave) {
        this._shouldSave =  false;
        this.saveStateService.saveGameState(this._distance);
      }

      this._distance += this.travelService.calculateTravelDistance();
      const asteroids = this.asteroidService.generateAsteroids();
      if (asteroids?.length > 0) {
        this.logService.logInfo(
          "ASTEROID",
          "Incoming asteroids (" + asteroids?.length + ")"
        );
        const hitAsteroids = this.weaponService.shoot(asteroids);
        if (hitAsteroids) {
          const materialsYield =
            this.asteroidService.generateMaterialsYield(hitAsteroids);
          if (materialsYield) {
            this.storageService.add(materialsYield);
          }
        }
      }
      this.storageService.cap();
    }
  }

  get distance() {
    return this._distance;
  }

  save() {
    this._shouldSave = true;
  }

  destroy() {
    this.subscription?.unsubscribe();
  }
}
