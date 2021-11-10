import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DistanceService {
  private _distance = 0;

  constructor() {}

  get distance() {
    return this._distance;
  }

  set distance(distance: number) {
    this._distance = distance;
  }

  add(distance: number) {
    this._distance += distance;
  }
}
