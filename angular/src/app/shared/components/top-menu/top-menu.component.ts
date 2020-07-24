import {Component, OnInit} from '@angular/core';
import {ApiService} from "@app/core/api.service";
import {Post} from "@app/shared/models/post.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  menu: Post[];
  constructor(private apiServiceService: ApiService) { }

  ngOnInit(): void {
    this.apiServiceService.api.wp.v2Menu()
      .then((response: Object) => {
        this.menu =  Object.keys(response).map(keys => new Post(response[keys]));
      })
      .catch(e => console.log(e));
  }
}
