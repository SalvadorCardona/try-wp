import {Component, Input, OnInit} from '@angular/core';
import {Post} from "@app/shared/models/post.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-menu-list',
  template: `
    <ul class="d-flex align-items-center">
      <li *ngFor="let menuItem of menu">
        <a [routerLink]="sanitizeUrl(menuItem.url)">
          {{menuItem.title}}
        </a>
      </li>
    </ul>
  `,
})
export class MenuListComponent implements OnInit {
  @Input() menu: Post[];

  constructor() { }

  ngOnInit(): void {
  }

  getChildren(childrenId: string): Array<Post> {
    return this.menu.filter(itemMenu => itemMenu.menuItemParent === childrenId);
  }

  sanitizeUrl(url: string): string
  {
    return url.replace(environment.api + '/', '');
  }
}
