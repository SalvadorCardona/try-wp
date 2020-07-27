import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '@env/environment';

@Pipe({
  name: 'asset'
})
export class AssetPipe implements PipeTransform {

  transform(value: string): string {
    return 'http://' + environment.host + '/assets/' + value;
  }

}
