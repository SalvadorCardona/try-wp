import { Component, OnInit } from '@angular/core';
import {Post} from '@app/shared/models/post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@env/environment';
import {ApiService} from '@app/core/api.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  post: Post|null = null;
  postId: number|null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    let request;
    this.spinner.show();
    const slug = this.route.snapshot.paramMap.get('slug') || this.router.url.substring(1, this.router.url.length);

    if (this.router.url === '/') {
       request = this.apiService.api.wp.v2PostAllById(environment.idHomePage);
    } else {
        request = this.apiService.api.wp.v2PostByName(slug);
    }

    request.then(response => {
      this.post = response;
      this.spinner.hide();
    });
  }

}
