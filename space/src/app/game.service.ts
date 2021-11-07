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
  subscription: Subscription | null = null;

  private _loopCountBeforeSave = 0;

  private _distance = 0;

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

    const source = interval(1000);
    let lastLoopTime = savedGameState?.lastLoopTime || new Date().getTime();
    this.subscription = source.subscribe((val) => {
      let now = new Date().getTime();
      this.loop(now - lastLoopTime);
      lastLoopTime = now;
    });
  }

  loop(elapsedTime: number) {
    while (elapsedTime > 999) {
      elapsedTime -= 1000; // one game loop every second

      if (elapsedTime < 2000) {
        this._loopCountBeforeSave++;
      }
      if (this._loopCountBeforeSave >= 30) {
        this._loopCountBeforeSave = 0;
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

  destroy() {
    this.subscription?.unsubscribe();
  }
}
