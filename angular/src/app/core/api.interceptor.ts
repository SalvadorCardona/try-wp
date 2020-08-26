import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {map} from 'rxjs/operators';
import {keysToCamel} from '@app/shared/helpers/helper';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({url: environment.apiEndpoint + '/' + request.url})
    ).pipe(map(httpResponse => {
      if (!(httpResponse instanceof HttpResponse)) {
        return;
      }
      return httpResponse.clone({body: keysToCamel(httpResponse.body)});
    }));
  }
}
