import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModuleService {
  constructor() {}

  getAsteroidQuantityModifier(): number {
    return 0;
  }

  getRandomMaterialType() {
    return "A";
  }

  generateMaterialYield(): number {
    return 99;
  }

  getTravelDistanceModifier(): number {
    return 1;
  }
}
