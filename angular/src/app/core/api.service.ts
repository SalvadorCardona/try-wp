import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BaseApiWp} from '@app/core/base-api-wp';
import {environment} from '@env/environment';
import {Menu, MenuFactory} from '@app/shared/models/menu.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {createPost, Post} from '@app/shared/models/post.model';
import {createRouting, Routing} from "@app/shared/models/routing.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public wpApi: BaseApiWp;

  constructor(private httpClient: HttpClient) {
    this.wpApi = new BaseApiWp();
  }

  url(url: string, params: object = null): string {
    if (params) {
      Object.keys(params).map(key => url = url.replace(`{${key}}`, params[key]));
    }
    return url;
  }

  getMenu(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(this.url(environment.apiEndpoints.menu))
      .pipe(map(response => {
        return MenuFactory(
          Object.keys(response).map(keys => response[keys])
        );
      }));
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.url(environment.apiEndpoints.post, {id}))
      .pipe(map(createPost));
  }

  getRouting(route: string): Observable<Routing> {
    route = route === '' ? 'home' : route;

    return this.httpClient.get<Routing>(this.url(environment.apiEndpoints.routing, {route}))
      .pipe(map(createRouting));
  }
}
