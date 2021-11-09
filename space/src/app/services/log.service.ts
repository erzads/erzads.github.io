import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LogService {
  private MAX_LOGS = 25;
  private _logs: BehaviorSubject<Log[]> = new BehaviorSubject<Log[]>([]);

  constructor() {}

  logSuccess(source: string, message: string) {
    this.addLog({
      source: source,
      message: message,
      type: "SUCCESS",
    });
  }

  logInfo(source: string, message: string) {
    this.addLog({
      source: source,
      message: message,
      type: "INFO",
    });
  }

  logFailure(source: string, message: string) {
    this.addLog({
      source: source,
      message: message,
      type: "FAILURE",
    });
  }

  private addLog(log: Log) {
    this._logs.value.unshift(log);
    this._logs.next(this.cap(this._logs.value));
  }

  private cap(logs: Log[]) {
    if (logs.length > this.MAX_LOGS) {
      return logs.slice(0, this.MAX_LOGS);
    }
    return logs;
  }

  get logs() {
    return this._logs;
  }
}
