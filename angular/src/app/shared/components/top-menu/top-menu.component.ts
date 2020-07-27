import {Component, OnInit} from '@angular/core';
import {ApiService} from '@app/core/api.service';
import {Menu, MenuFactory} from '@app/shared/models/menu.model';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  menu: Menu[];
  constructor(private apiServiceService: ApiService) { }

  ngOnInit(): void {
    this.apiServiceService.api.wp.v2Menu()
      // tslint:disable-next-line:ban-types
      .then((response: Object) => {
        this.menu = MenuFactory(
          Object.keys(response).map(keys => response[keys])
        );
      })
      .catch(e => console.log(e));
  }
}
