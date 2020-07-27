import {Component, Input, OnInit} from '@angular/core';
import {environment} from '@env/environment';
import {Menu} from '@app/shared/models/menu.model';

@Component({
  selector: 'app-menu-list',
  template: `
    <ul class="d-flex align-items-center">
      <li *ngFor="let menuItem of menu">
        <a [routerLink]="sanitizeUrl(menuItem.url)">
          {{menuItem.title}}
        </a>
        <div class="children" *ngIf="menuItem.children">
          <app-menu-list [menu]="menuItem.children"></app-menu-list>
        </div>
      </li>
    </ul>
  `,
})
export class MenuListComponent implements OnInit {
  @Input() menu: Menu[];
  constructor() { }

  ngOnInit(): void {
  }

  sanitizeUrl(url: string): string
  {
    return url.replace(environment.api + '/', '');
  }
}
