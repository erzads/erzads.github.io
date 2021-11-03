import { Injectable } from "@angular/core";
import { MaterialService } from "./material.service";

@Injectable({
  providedIn: "root",
})
export class EquipmentService {
  private _equipments: Map<string, Equipment> = new Map<string, Equipment>();

  constructor(private materialService: MaterialService) {
    const materialA = materialService.materials.get("A");
    const materialB = materialService.materials.get("B");
    const materialC = materialService.materials.get("C");

    const equipABaseCost = new Map<Material, number>();
    equipABaseCost.set(materialA!, 100);

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
        "Laser firing cannons. Increases the amount of material extracted from asteroids by 5%.",
      quantity: 0,
      baseCost: equipABaseCost,
    });

    this._equipments.set("B", {
      id: "B",
      name: "Thrusters",
      description: "Rocket thrusters. Increases travel speed.",
      quantity: 0,
      baseCost: equipBBaseCost,
    });

    this._equipments.set("C", {
      id: "C",
      name: "Storage",
      description: "Increases material storage capacity.",
      quantity: 0,
      baseCost: equipCBaseCost,
    });
  }

  getEquipmentCosts(id: string): Map<Material, number> {
    const equipment = this._equipments.get(id);
    const baseCost = equipment!.baseCost;
    const quantity = equipment!.quantity;
    const cost = new Map<Material, number>(baseCost);
    if (quantity > 0) {
      baseCost.forEach((v, k) => {
        cost.set(k, v * (1.15 ** quantity));
      });
    }
    return cost;
  }

  get equipments() {
    return this._equipments;
  }

  getAsteroidQuantityModifier(): number {
    return 0;
  }

  getRandomMaterialType() {
    return "A";
  }

  generateMaterialYield(): number {
    return 1;
  }

  getTravelDistanceModifier(): number {
    const thrusters = this._equipments.get("C");
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
