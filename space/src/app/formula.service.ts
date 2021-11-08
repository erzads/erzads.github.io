import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormulaService {
  //https://www.reddit.com/r/askmath/comments/qosn7b/comment/hjp98bk/?utm_source=share&utm_medium=web2x&context=3
  //https://www.desmos.com/calculator/9twmbwuxgo
  public calculateDiminishedReturn(
    startingValue: number,
    secondValue: number,
    maximumValue: number,
    position: number
  ): number {
    return (maximumValue - (maximumValue - startingValue) * ((maximumValue - startingValue) / (maximumValue - secondValue)) ** -position);
  }
}
