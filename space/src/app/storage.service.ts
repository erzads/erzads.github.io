import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private _materials: BehaviorSubject<Map<Material, number>> =
    new BehaviorSubject<Map<Material, number>>(new Map<Material, number>());

  constructor() {
    this._materials.next(this._materials.value);
  }

  add(materialsYield: Map<Material, number>) {
    materialsYield.forEach((materialYield, material) => {
      if (this._materials.value.has(material)) {
        this._materials.value.set(
          material,
          (this._materials.value.get(material) || 0) + materialYield
        );
      } else {
        this._materials.value.set(material, materialYield);
      }
    });
    this._materials.next(this._materials.value);
  }

  remove(materials: Map<Material, number>) {
    materials.forEach((value, key) => {
      const materialsMap = this._materials.getValue();
      let materialQuantity = materialsMap.get(key);
      if (materialQuantity == null) {
        materialQuantity = value;
      }
      materialsMap.set(key, materialQuantity - value);
    });
  }

  get materials(): BehaviorSubject<Map<Material, number>> {
    return this._materials;
  }

  cap() {}
}
