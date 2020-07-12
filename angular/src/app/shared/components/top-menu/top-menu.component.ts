import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "@app/core/api-service.service";
import {IPost} from "@app/types/post.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  menu: IPost[];
  constructor(private apiServiceService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiServiceService.api.wp.v2Menu()
      .then((response: Object) => {
        console.log(response)
        this.menu =  Object.keys(response).map(keys => response[keys]);
      })
      .catch(e => console.log(e));
  }

  sanitizeUrl(url: string): string
  {
    return url.replace(environment.api + '/', '');
  }
}
