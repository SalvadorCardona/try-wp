import {OnInit, Component, Input, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {IPost} from "@app/types/post.type";
import {keysToCamel} from "@app/shared/helpers/helper";
import {PostService} from "@app/shared/stores/state/post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'front';
  post: IPost|null = null;
  isHome: boolean = false;
  public constructor(
    private router: Router,
    private eltRef: ElementRef,
    private postService: PostService
  ) {
    let post = eltRef.nativeElement.getAttribute('post');
    let isHome = eltRef.nativeElement.getAttribute('isHome');

    if (post) {
      this.post = keysToCamel(JSON.parse(post)) as IPost;
    }
    if (isHome) {
      this.isHome = (isHome == 'true');
    }
  }
  ngOnInit(): void {
    if (this.post) {
      this.postService.setPost(this.post);
      if (this.isHome) {
        this.router.navigate(['']);
      } else {
        this.router.navigate([this.post.postType]);
      }
    }
  }
}
