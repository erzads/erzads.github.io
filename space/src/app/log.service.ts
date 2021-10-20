import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LogService {
  private logs: Log[] = [];

  constructor() {}

  logSuccess(source: string, message: string) {
    this.logs.push({ source: source, message: message, type: "SUCCESS" });
  }

  logInfo(source: string, message: string) {
    this.logs.push({ source: source, message: message, type: "INFO" });
  }

  logFailure(source: string, message: string) {
    this.logs.push({ source: source, message: message, type: "FAILURE" });
  }
}
