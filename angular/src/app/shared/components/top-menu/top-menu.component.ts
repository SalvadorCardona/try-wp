import {Component, OnInit} from '@angular/core';
import {ApiService} from '@app/core/api.service';
import {Menu, MenuFactory} from '@app/shared/models/menu.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  menu: Menu[];
  constructor(private apiServiceService: ApiService) { }

  ngOnInit(): void {
    this.apiServiceService
      .getMenu()
      .subscribe(menu => this.menu = menu);
  }
}
