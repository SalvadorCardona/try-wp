import { Injectable } from '@angular/core';
import {BaseApiWp} from "@app/core/base-api-wp";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  _api: BaseApiWp;
  constructor() {
    this._api = new BaseApiWp();
  }

  get api(): BaseApiWp {
    return this._api;
  }
}
