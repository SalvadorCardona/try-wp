import { Component, OnInit } from '@angular/core';
import {IPost} from "@app/types/post.type";
import {PostService} from "@app/shared/stores/state/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  post: IPost|null = null;
  postId: number|null;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.postId = environment.idHomePage;
    } else {
      let slug = this.router.url.substring(1, this.router.url.length)
    }
    this.route.params.subscribe(params => {

    });
    console.log(this.router)
    console.log(this.route)
    this.postService.get()
      .pipe()
      .subscribe(e=> console.log(e));
  }

}
