import { Injectable } from '@angular/core';
import {ApiWp} from "@app/core/api-wp";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  _api: ApiWp;
  constructor() {
    this._api = new ApiWp();
  }

  get api(): ApiWp {
    return this._api;
  }
}
