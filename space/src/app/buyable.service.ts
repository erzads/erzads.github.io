import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BuyableService {
  constructor() {}

  getCosts(id: string, buyables: Map<string, Buyable>): Map<Material, number> {
    const buyable = buyables.get(id);
    const baseCost = buyable!.baseCost;
    const quantity = buyable!.quantity;
    const cost = new Map<Material, number>(baseCost);
    if (quantity > 0) {
      baseCost.forEach((v, k) => {
        cost.set(k, v * 1.15 ** quantity);
      });
    }
    return cost;
  }
}
