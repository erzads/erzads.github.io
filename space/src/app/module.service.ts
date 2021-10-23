import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor() { }

  getAsteroidQuantityModifier() {
    return 0;
  }

  getRandomMaterialType() {
    return "A";
  }

  generateMaterialYield() {
    return 1;
  }

  getTravelDistanceModifier() {
    return 1;
  }
}
