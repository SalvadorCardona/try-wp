import { Component, OnInit } from '@angular/core';
import {IPost} from "@app/shared/models/post.type";
import {PostService} from "@app/shared/stores/state/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {ApiService} from "@app/core/api.service";

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  post: IPost|null = null;
  postId: number|null;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    let request;

    let slug = this.route.snapshot.paramMap.get('slug') || this.router.url.substring(1, this.router.url.length);

    if (this.router.url === '/') {
       request = this.apiService.api.wp.v2PostAllById(environment.idHomePage);
    } else {
        request = this.apiService.api.wp.v2PostByName(slug);
    }

    request.then(response => {
      this.post = response
    });
  }

}
