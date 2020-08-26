export interface IPost {
  menuItemParent: null|number;
  id: number;
}

export class Post implements IPost {
  attrTitle: string;
  classes: string;
  commentCount: string;
  commentStatus: string;
  dbId: number;
  description: string;
  filter: string;
  guid: string;
  id: number;
  menuItemParent: null|number;
  menuOrder: number;
  object: string;
  objectId: string;
  pingStatus: string;
  pinged: string;
  postAuthor: string;
  postContent: string;
  postContentFiltered: string;
  postDate: Date;
  postDateGmt: Date;
  postExcerpt: string;
  postMimeType: string;
  postModified: string;
  postModifiedGmt: string;
  postName: string;
  postParent: number;
  postPassword: string;
  postStatus: string;
  postTitle: string;
  postType: string;
  target: string;
  title: string;
  toPing: string;
  type: string;
  typeLabel: string;
  url: string;
  xfn: string;

  public constructor() {
  }
}

export function createPost(params: Partial<Post>): Post {
  if (params.menuItemParent) {
    // @ts-ignore
    // tslint:disable-next-line:radix
    params.menuItemParent = parseInt(params.menuItemParent);
  }

  return Object.assign(new Post(), params);
}
