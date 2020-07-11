import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IPost } from "@app/types/post.type";

export interface PostState extends EntityState<IPost> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'post' })
export class PostStore extends EntityStore<PostState> {

  constructor() {
    super();
  }

}
