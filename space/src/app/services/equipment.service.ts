import { Injectable } from "@angular/core";
import { BuyableService } from "./buyable.service";
import { FormulaService } from "./formula.service";
import { MaterialService } from "./material.service";

@Injectable({
  providedIn: "root",
})
export class EquipmentService {
  private _equipments: Map<string, Buyable> = new Map<string, Buyable>();

  constructor(
    materialService: MaterialService,
    private buyableService: BuyableService,
    private formulaService: FormulaService
  ) {
    const materialA = materialService.materials.get("A");
    const materialB = materialService.materials.get("B");
    const materialC = materialService.materials.get("C");

    const equipABaseCost = new Map<Material, number>();
    equipABaseCost.set(materialA!, 50);

    const equipBBaseCost = new Map<Material, number>();
    equipBBaseCost.set(materialA!, 1200);
    equipBBaseCost.set(materialB!, 500);

    const equipCBaseCost = new Map<Material, number>();
    equipCBaseCost.set(materialA!, 100000);
    equipCBaseCost.set(materialB!, 25000);
    equipCBaseCost.set(materialC!, 500);

    this._equipments.set("A", {
      id: "A",
      name: "Weaponry",
      description:
        "Laser firing cannons. Used to destroy and extract material from asteroids.",
      effects: ["Asteroid material yield: +5%", "+ Weapon hit chance"],
      quantity: 0,
      baseCost: equipABaseCost,
    });

    this._equipments.set("B", {
      id: "B",
      name: "Thrusters",
      description:
        "Rocket thrusters. Travel faster. More distant galaxies have more asteroids with more materials on them.",
      effects: [
        "Travel speed: +10%",
        "(x10000 Traveled distance) Asteroid material yield: +5%",
        "(x10000 Traveled distance) Asteroid spawn chance: +5%",
      ],
      quantity: 0,
      baseCost: equipBBaseCost,
    });

    this._equipments.set("C", {
      id: "C",
      name: "Storage",
      description: "Increases material storage capacity.",
      effects: ["ble"],
      quantity: 0,
      baseCost: equipCBaseCost,
    });
  }

  get equipments() {
    return this._equipments;
  }

  getEquipmentCosts(id: string): Map<Material, number> {
    return this.buyableService.getCosts(id, this._equipments);
  }

  getAsteroidQuantityModifier(): number {
    return 0;
  }


  getAsteroidHitModifier(): number {
    const weaponry = this._equipments.get("A");
    const quantity = weaponry!.quantity;
    return this.formulaService.calculateDiminishedReturn(
      0,
      0.01,
      0.25,
      quantity
    );
  }

  generateMaterialYield(): number {
    const weapons = this._equipments.get("A");
    const quantity = weapons!.quantity;
    if (quantity > 0) {
      return 1 + quantity * 0.05;
    } else {
      return 1;
    }
  }

  getTravelDistanceModifier(): number {
    const thrusters = this._equipments.get("B");
    const quantity = thrusters!.quantity;
    if (quantity > 0) {
      return 1 + quantity * 0.1;
    } else {
      return 1;
    }
  }

  add(id: string, quantity: number) {
    const equipment = this._equipments.get(id);
    if (equipment) {
      if (equipment.quantity == null) {
        equipment.quantity = quantity;
      } else {
        equipment.quantity += quantity;
      }
    }
  }
}
