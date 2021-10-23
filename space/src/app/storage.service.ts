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

  get materials() {
    return this._materials;
  }

  cap() {}
}
