import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private _materials: Map<string, Material> = new Map<string, Material>();

  constructor() {
    this._materials.set("A", {name: "Alurium", description: "Common metal alloy", type: "A"});
    this._materials.set("B", {name: "Belidium", description: "Highly malleable metal alloy", type: "B"});
    this._materials.set("C", {name: "Corilium", description: "Very hard and tough crystal.", type: "C"});
   }

   get materials() {
     return this._materials;
   }
}
