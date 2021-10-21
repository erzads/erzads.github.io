import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MaterialService } from "./material.service";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  
  private _materials: BehaviorSubject<Map<Material, number>> =
    new BehaviorSubject<Map<Material, number>>(new Map<Material, number>());

  constructor(private materialService: MaterialService) {
    //teste
    const materialA = this.materialService.materials.get("A");
    const materialB = this.materialService.materials.get("B");
    if (materialA) {
      this._materials.value.set(materialA, 123);
    }
    if (materialB) {
      this._materials.value.set(materialB, 456);
    }
    //teste fim
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
