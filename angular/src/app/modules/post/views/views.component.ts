import { Component, OnInit } from '@angular/core';
import {IPost} from "@app/types/post.type";
import {PostService} from "@app/shared/stores/state/post.service";

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  post: IPost|null = null;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.get()
      .pipe()
      .subscribe(e=> console.log(e));
  }

}
