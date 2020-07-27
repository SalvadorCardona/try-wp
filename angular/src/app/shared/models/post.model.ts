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
  menuItemParent: number|null;
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
    if (data.menuItemParent) {
      // tslint:disable-next-line:radix
      data.menuItemParent = data.menuItemParent === '0' ? null  : parseInt(String(data.menuItemParent));
    }

    Object.assign(this, data);

  }
}
