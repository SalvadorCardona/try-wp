import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { PostStore, PostState } from './post.store';
import {IPost} from "@app/types/post.type";

@Injectable({ providedIn: 'root' })
export class PostService extends NgEntityService<PostState> {

  constructor(protected store: PostStore) {
    super(store);
  }

  setPost(post: IPost): void {
    this.store.set([post]);
  }

}
