import {Component, OnInit} from '@angular/core';
import {ApiService} from "@app/core/api.service";
import {IPost} from "@app/shared/models/post.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  menu: IPost[];
  constructor(private apiServiceService: ApiService) { }

  ngOnInit(): void {
    this.apiServiceService.api.wp.v2Menu()
      .then((response: Object) => {
        this.menu =  Object.keys(response).map(keys => response[keys]);
      })
      .catch(e => console.log(e));
  }

  sanitizeUrl(url: string): string
  {
    return url.replace(environment.api + '/', '');
  }
}
