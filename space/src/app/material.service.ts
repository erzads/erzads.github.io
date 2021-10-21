import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private _materials: Map<string, Material> = new Map<string, Material>();

  constructor() {
    this._materials.set("A", {name: "Material A", description: "desc A", type: "A"});
    this._materials.set("B", {name: "Material B", description: "desc B", type: "B"});
   }

   get materials() {
     return this._materials;
   }
}
