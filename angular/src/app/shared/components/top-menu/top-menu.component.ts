import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "@app/core/api-service.service";
import {IPost} from "@app/types/post.type";
import {keysToCamel} from "@app/shared/helpers/helper";

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
        this.menu =  Object.keys(response).map(keys => response[keys]);
      })
      .catch(e => console.log(e));
  }
}
