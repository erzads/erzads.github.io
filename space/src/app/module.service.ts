import { Injectable } from "@angular/core";
import { BuyableService } from "./buyable.service";
import { FormulaService } from "./formula.service";
import { MaterialService } from "./material.service";

@Injectable({
  providedIn: "root",
})
export class ModuleService {
  private _modules: Map<string, Buyable> = new Map<string, Buyable>();

  constructor(
    materialService: MaterialService,
    private buyableService: BuyableService,
    private formulaService: FormulaService
  ) {
    const materialA = materialService.materials.get("A");
    const materialB = materialService.materials.get("B");
    const materialC = materialService.materials.get("C");

    const moduleABaseCost = new Map<Material, number>();
    moduleABaseCost.set(materialA!, 100);

    const moduleBBaseCost = new Map<Material, number>();
    moduleBBaseCost.set(materialA!, 1200);
    moduleBBaseCost.set(materialB!, 500);

    const moduleCBaseCost = new Map<Material, number>();
    moduleCBaseCost.set(materialA!, 100000);
    moduleCBaseCost.set(materialB!, 25000);
    moduleCBaseCost.set(materialC!, 500);

    this._modules.set("A", {
      id: "A",
      name: "Targeting system",
      description: "Improves the ship's targeting system.",
      effects: ["+ Asteroid hit chance"],
      quantity: 0,
      baseCost: moduleABaseCost,
    });

    this._modules.set("B", {
      id: "B",
      name: "Navigation AI",
      description:
        "Improves the AI responsible for routing the travel path with more asteroids to shoot.",
      effects: ["+ Asteroid spawn chance", "Asteroid quantity: +1"],
      quantity: 0,
      baseCost: moduleBBaseCost,
    });

    this._modules.set("C", {
      id: "C",
      name: "Storage",
      description: "Increases material storage capacity.",
      effects: ["Bla"],
      quantity: 0,
      baseCost: moduleCBaseCost,
    });
  }

  get modules() {
    return this._modules;
  }

  getModuleCosts(id: string): Map<Material, number> {
    return this.buyableService.getCosts(id, this._modules);
  }

  getAsteroidChanceModifier(baseChance: number): number {
    const navAi = this._modules.get("B");
    const quantity = navAi!.quantity;
    return this.formulaService.calculateDiminishedReturn(baseChance, baseChance + 0.05, 0.5, quantity);
  }

  getAsteroidQuantityModifier(): number {
    const navAi = this._modules.get("B");
    return navAi!.quantity;
  }

  getAsteroidHitModifier(baseChance: number): number {
    const targetingSys = this._modules.get("A");
    const quantity = targetingSys!.quantity;
    return this.formulaService.calculateDiminishedReturn(baseChance, baseChance + 0.05, 1, quantity);
  }

  getRandomMaterialType() {
    const materialTypeWeightedList = [];
    for (let i = 0; i < 5; i++) {
      materialTypeWeightedList.push("A");
    }
    for (let i = 0; i < 3; i++) {
      materialTypeWeightedList.push("B");
    }
    for (let i = 0; i < 2; i++) {
      materialTypeWeightedList.push("C");
    }
    return materialTypeWeightedList[
      Math.floor(Math.random() * materialTypeWeightedList.length)
    ];
  }

  generateMaterialYield(): number {
    return 1;
  }

  getTravelDistanceModifier(): number {
    return 1;
  }

  add(id: string, quantity: number) {
    const module = this._modules.get(id);
    if (module) {
      if (module.quantity == null) {
        module.quantity = quantity;
      } else {
        module.quantity += quantity;
      }
    }
  }
}
