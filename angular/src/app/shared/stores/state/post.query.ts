import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PostStore, PostState } from './post.store';

@Injectable({ providedIn: 'root' })
export class PostQuery extends QueryEntity<PostState> {

  constructor(protected store: PostStore) {
    super(store);
  }

}
