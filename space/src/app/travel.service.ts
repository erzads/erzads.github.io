import { Injectable } from "@angular/core";
import { ModifierService } from "./modifier.service";

@Injectable({
  providedIn: "root",
})
export class TravelService {
  private BASE_DISTANCE = 1;

  constructor(private modifierService: ModifierService) {}

  public calculateTravelDistance(): number {
    return this.BASE_DISTANCE * this.modifierService.getTravelDistanceModifier();
  }
}
