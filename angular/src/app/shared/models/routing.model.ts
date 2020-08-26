import {createPost} from "@app/shared/models/post.model";

enum RoutingType {
  POST = 'post'
}

export class Routing {
  content: any;
  type: RoutingType;
}

export function createRouting(params: Partial<Routing>) {
  if (params.type === RoutingType.POST) {
      params.content = createPost(params.content);
  }

  return Object.assign(new Routing(), params);
}
