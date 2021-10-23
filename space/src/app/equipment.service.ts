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
    const equipABaseCost = new Map<Material, number>();
    equipABaseCost.set(materialA!, 100);

    const equipBBaseCost = new Map<Material, number>();
    equipBBaseCost.set(materialA!, 1200);
    equipBBaseCost.set(materialB!, 500);

    this._equipments.set("A", {
      id: "A",
      name: "Equip A",
      description: "desc A",
      quantity: 0,
      baseCost: equipABaseCost,
    });

    this._equipments.set("B", {
      id: "B",
      name: "Equip B",
      description: "desc B",
      quantity: 0,
      baseCost: equipBBaseCost,
    });
  }

  getEquipmentCosts(id: string): Map<Material, number> {
    const equipment = this._equipments.get(id);
    return equipment!.baseCost; // TODO calculate with modifiers
  }

  get equipments() {
    return this._equipments;
  }
}
