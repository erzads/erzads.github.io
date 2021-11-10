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
    moduleBBaseCost.set(materialA!, 500);

    const moduleCBaseCost = new Map<Material, number>();
    moduleCBaseCost.set(materialA!, 1200);
    moduleCBaseCost.set(materialB!, 500);
    moduleCBaseCost.set(materialC!, 100);

    this._modules.set("A", {
      id: "A",
      name: "Targeting",
      description: "Improves the targeting system.",
      effects: ["+ Weapon hit chance"],
      quantity: 0,
      baseCost: moduleABaseCost,
    });

    this._modules.set("B", {
      id: "B",
      name: "Extraction",
      description: "Improves the material extraction system.",
      effects: [
        "Asteroid material yield: +5%",
        "(10) Unlocks Belidium",
        "(20) Unlocks Corilium",
      ],
      quantity: 0,
      baseCost: moduleBBaseCost,
    });

    this._modules.set("C", {
      id: "C",
      name: "Navigation",
      description:
        "Improves the navigation system. Calculates the travel path with more asteroids to shoot.",
      effects: ["+ Asteroid spawn chance", "(x10) Asteroid quantity: +1"],
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
    const navSys = this._modules.get("C");
    const quantity = navSys!.quantity;
    return this.formulaService.calculateDiminishedReturn(
      baseChance,
      baseChance + 0.03,
      0.5,
      quantity
    );
  }

  getAsteroidQuantityModifier(): number {
    const navSys = this._modules.get("C");
    return navSys!.quantity % 10;
  }

  getAsteroidHitModifier(): number {
    const targetingSys = this._modules.get("A");
    const quantity = targetingSys!.quantity;
    return this.formulaService.calculateDiminishedReturn(
      0,
      0.01,
      0.25,
      quantity
    );
  }

  getRandomMaterialType() {
    const extractionSys = this._modules.get("B");
    const quantity = extractionSys!.quantity;

    const materialTypeWeightedList = [];
    for (let i = 0; i < 5; i++) {
      materialTypeWeightedList.push("A");
    }
    if (quantity >= 10) {
      for (let i = 0; i < 3; i++) {
        materialTypeWeightedList.push("B");
      }
      if (quantity >= 20) {
        for (let i = 0; i < 2; i++) {
          materialTypeWeightedList.push("C");
        }
      }
    }
    return materialTypeWeightedList[
      Math.floor(Math.random() * materialTypeWeightedList.length)
    ];
  }

  generateMaterialYield(): number {
    const extractionSys = this._modules.get("B");
    const quantity = extractionSys!.quantity;
    if (quantity > 0) {
      return 1 + quantity * 0.05;
    } else {
      return 1;
    }
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
