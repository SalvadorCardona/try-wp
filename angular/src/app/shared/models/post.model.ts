export class Post {
  attrTitle: string;
  classes: string;
  commentCount: string;
  commentStatus: string;
  dbId: number;
  description: string;
  filter: string;
  guid: string;
  id: number;
  menuItemParent: string;
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

  public constructor(data) {
    Object.assign(this, data);
  }

  hasChildren() {
    return this.menuItemParent != '0';
  }
}
