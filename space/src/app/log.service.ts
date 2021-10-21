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
    this._logs.value.push({
      source: source,
      message: message,
      type: "SUCCESS",
    });
    this._logs.next(this._cap(this._logs.value));
  }

  logInfo(source: string, message: string) {
    this._logs.value.push({ source: source, message: message, type: "INFO" });
    this._logs.next(this._cap(this._logs.value));
  }

  logFailure(source: string, message: string) {
    this._logs.value.push({
      source: source,
      message: message,
      type: "FAILURE",
    });
    this._logs.next(this._cap(this._logs.value));
  }

  _cap(logs:Log[]){
    if (logs.length > this.MAX_LOGS) {
      return logs.slice(logs.length - this.MAX_LOGS, logs.length);
    }
    return logs;
  }

  get logs() {
    return this._logs;
  }
}
