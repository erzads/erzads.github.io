import { Injectable } from "@angular/core";
import { ModuleService } from "./module.service";

@Injectable({
  providedIn: "root",
})
export class TravelService {
  private BASE_DISTANCE = 1;

  constructor(private moduleService: ModuleService) {}

  public calculateTravelDistance(): number {
    return this.BASE_DISTANCE * this.moduleService.getTravelDistanceModifier();
  }
}
