/* tslint:disable */
/* eslint-disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {keysToCamel} from "@app/shared/helpers/helper";

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string | number, any>;

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

const enum BodyType {
  Json,
  FormData,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = "http://localhost:8000/wp-json";
  private securityData: SecurityDataType = null as any;
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any;

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor({ baseUrl, baseApiParams, securityWorker }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.baseApiParams = baseApiParams || this.baseApiParams;
    this.securityWorker = securityWorker || this.securityWorker;
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) + "=" + encodeURIComponent(Array.isArray(query[key]) ? query[key].join(",") : query[key])
    );
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === "object" && !Array.isArray(query[key])
              ? this.addQueryParams(query[key] as object).substring(1)
              : this.addQueryParam(query, key),
          )
          .join("&")}`
      : "";
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
    [BodyType.FormData]: (input: any) =>
      Object.keys(input).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
  };

  private mergeRequestOptions(params: RequestParams, securityParams?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {}),
      },
    };
  }

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<T> =>
    response
      .json()
      .then((data) => data)
      .catch((e) => response.text);

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean,
  ): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, (secureByDefault || secure) && this.securityWorker(this.securityData)),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    }).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return keysToCamel(data);
    });
}

/**
 * @title Bedrock API
 * @version 5.4.1
 * @baseUrl http://localhost:8000/wp-json
 * Un site utilisant WordPress
 */
export class BaseApiWp<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  wp = {
    /**
     * @tags endpoint
     * @name v2PostsList
     * @request GET:/wp/v2/posts
     * @secure
     */
    v2PostsList: (
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        after?: string;
        author?: string;
        author_exclude?: string;
        before?: string;
        exclude?: string;
        include?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: (
          | "author"
          | "date"
          | "id"
          | "include"
          | "modified"
          | "parent"
          | "relevance"
          | "slug"
          | "include_slugs"
          | "title"
        )[];
        slug?: string;
        status?: string;
        tax_relation?: ("AND" | "OR")[];
        categories?: string;
        categories_exclude?: string;
        tags?: string;
        tags_exclude?: string;
        sticky?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/posts${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2PostsCreate
     * @request POST:/wp/v2/posts
     * @secure
     */
    v2PostsCreate: (
      data: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        format?: (
          | "standard"
          | "aside"
          | "chat"
          | "gallery"
          | "link"
          | "image"
          | "quote"
          | "status"
          | "video"
          | "audio"
        )[];
        meta?: string;
        sticky?: string;
        template?: string;
        categories?: string;
        tags?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/posts`, "POST", params, data, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2PostsDetail
     * @request GET:/wp/v2/posts/{id}
     * @secure
     */
    v2PostsDetail: (
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[]; password?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/posts/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PostsCreate
     * @request POST:/wp/v2/posts/{id}
     * @secure
     * @originalName v2PostsCreate
     * @duplicate
     */
    v2PostsCreate2: (
      id: string,
      data: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        format?: (
          | "standard"
          | "aside"
          | "chat"
          | "gallery"
          | "link"
          | "image"
          | "quote"
          | "status"
          | "video"
          | "audio"
        )[];
        meta?: string;
        sticky?: string;
        template?: string;
        categories?: string;
        tags?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/posts/${id}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2PostsUpdate
     * @request PUT:/wp/v2/posts/{id}
     * @secure
     */
    v2PostsUpdate: (
      id: string,
      query?: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        format?: (
          | "standard"
          | "aside"
          | "chat"
          | "gallery"
          | "link"
          | "image"
          | "quote"
          | "status"
          | "video"
          | "audio"
        )[];
        meta?: string;
        sticky?: string;
        template?: string;
        categories?: string;
        tags?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/posts/${id}${this.addQueryParams(query)}`,
        "PUT",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PostsPartialUpdate
     * @request PATCH:/wp/v2/posts/{id}
     * @secure
     */
    v2PostsPartialUpdate: (
      id: string,
      query?: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        format?: (
          | "standard"
          | "aside"
          | "chat"
          | "gallery"
          | "link"
          | "image"
          | "quote"
          | "status"
          | "video"
          | "audio"
        )[];
        meta?: string;
        sticky?: string;
        template?: string;
        categories?: string;
        tags?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/posts/${id}${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),


    /**
     * @tags endpoint
     * @name v2Menu
     * @request GET:/wp/v2/post/{name}/slug
     * @secure
     * @originalName v2Menu
     * @duplicate
     */
    v2PostByName: (name: string) => this.request<any, any>('/wp/v2/post/' + name + '/slug', "GET"),

    /**
     * @tags endpoint
     * @name v2Menu
     * @request GET:/wp/v2/post/{id}/all
     * @secure
     * @originalName v2Menu
     * @duplicate
     */
    v2PostAllById: (id: number) => this.request<any, any>('/wp/v2/post/' + id + '/all', "GET"),
    /**
     * @tags endpoint
     * @name v2PostsDelete
     * @request DELETE:/wp/v2/posts/{id}
     * @secure
     */
    v2PostsDelete: (id: string, query?: { force?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/posts/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PostsRevisionsDetail
     * @request GET:/wp/v2/posts/{parent}/revisions
     * @secure
     */
    v2PostsRevisionsDetail: (
      parent: string,
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        exclude?: string;
        include?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: ("date" | "id" | "include" | "relevance" | "slug" | "include_slugs" | "title")[];
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/posts/${parent}/revisions${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PostsRevisionsDetail
     * @request GET:/wp/v2/posts/{parent}/revisions/{id}
     * @secure
     * @originalName v2PostsRevisionsDetail
     * @duplicate
     */
    v2PostsRevisionsDetail2: (
      parent: string,
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/posts/${parent}/revisions/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PostsRevisionsDelete
     * @request DELETE:/wp/v2/posts/{parent}/revisions/{id}
     * @secure
     */
    v2PostsRevisionsDelete: (parent: string, id: string, query?: { force?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/posts/${parent}/revisions/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PostsAutosavesDetail
     * @request GET:/wp/v2/posts/{id}/autosaves
     * @secure
     */
    v2PostsAutosavesDetail: (
      id: number,
      query?: { parent?: string; context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/posts/${id}/autosaves${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PostsAutosavesCreate
     * @request POST:/wp/v2/posts/{id}/autosaves
     * @secure
     */
    v2PostsAutosavesCreate: (
      id: number,
      data: {
        parent?: string;
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        format?: (
          | "standard"
          | "aside"
          | "chat"
          | "gallery"
          | "link"
          | "image"
          | "quote"
          | "status"
          | "video"
          | "audio"
        )[];
        meta?: string;
        sticky?: string;
        template?: string;
        categories?: string;
        tags?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/posts/${id}/autosaves`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2PostsAutosavesDetail
     * @request GET:/wp/v2/posts/{parent}/autosaves/{id}
     * @secure
     * @originalName v2PostsAutosavesDetail
     * @duplicate
     */
    v2PostsAutosavesDetail2: (
      parent: string,
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/posts/${parent}/autosaves/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesList
     * @request GET:/wp/v2/pages
     * @secure
     */
    v2PagesList: (
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        after?: string;
        author?: string;
        author_exclude?: string;
        before?: string;
        exclude?: string;
        include?: string;
        menu_order?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: (
          | "author"
          | "date"
          | "id"
          | "include"
          | "modified"
          | "parent"
          | "relevance"
          | "slug"
          | "include_slugs"
          | "title"
          | "menu_order"
        )[];
        parent?: string;
        parent_exclude?: string;
        slug?: string;
        status?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/pages${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2PagesCreate
     * @request POST:/wp/v2/pages
     * @secure
     */
    v2PagesCreate: (
      data: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        parent?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        menu_order?: string;
        meta?: string;
        template?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/pages`, "POST", params, data, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2PagesDetail
     * @request GET:/wp/v2/pages/{id}
     * @secure
     */
    v2PagesDetail: (
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[]; password?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/pages/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesCreate
     * @request POST:/wp/v2/pages/{id}
     * @secure
     * @originalName v2PagesCreate
     * @duplicate
     */
    v2PagesCreate2: (
      id: string,
      data: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        parent?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        menu_order?: string;
        meta?: string;
        template?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/pages/${id}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2PagesUpdate
     * @request PUT:/wp/v2/pages/{id}
     * @secure
     */
    v2PagesUpdate: (
      id: string,
      query?: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        parent?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        menu_order?: string;
        meta?: string;
        template?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/pages/${id}${this.addQueryParams(query)}`,
        "PUT",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesPartialUpdate
     * @request PATCH:/wp/v2/pages/{id}
     * @secure
     */
    v2PagesPartialUpdate: (
      id: string,
      query?: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        parent?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        menu_order?: string;
        meta?: string;
        template?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/pages/${id}${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesDelete
     * @request DELETE:/wp/v2/pages/{id}
     * @secure
     */
    v2PagesDelete: (id: string, query?: { force?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/pages/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesRevisionsDetail
     * @request GET:/wp/v2/pages/{parent}/revisions
     * @secure
     */
    v2PagesRevisionsDetail: (
      parent: string,
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        exclude?: string;
        include?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: ("date" | "id" | "include" | "relevance" | "slug" | "include_slugs" | "title")[];
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/pages/${parent}/revisions${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesRevisionsDetail
     * @request GET:/wp/v2/pages/{parent}/revisions/{id}
     * @secure
     * @originalName v2PagesRevisionsDetail
     * @duplicate
     */
    v2PagesRevisionsDetail2: (
      parent: string,
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/pages/${parent}/revisions/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesRevisionsDelete
     * @request DELETE:/wp/v2/pages/{parent}/revisions/{id}
     * @secure
     */
    v2PagesRevisionsDelete: (parent: string, id: string, query?: { force?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/pages/${parent}/revisions/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesAutosavesDetail
     * @request GET:/wp/v2/pages/{id}/autosaves
     * @secure
     */
    v2PagesAutosavesDetail: (
      id: number,
      query?: { parent?: string; context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/pages/${id}/autosaves${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2PagesAutosavesCreate
     * @request POST:/wp/v2/pages/{id}/autosaves
     * @secure
     */
    v2PagesAutosavesCreate: (
      id: number,
      data: {
        parent?: string;
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        author?: string;
        excerpt?: string;
        featured_media?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        menu_order?: string;
        meta?: string;
        template?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/pages/${id}/autosaves`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2PagesAutosavesDetail
     * @request GET:/wp/v2/pages/{parent}/autosaves/{id}
     * @secure
     * @originalName v2PagesAutosavesDetail
     * @duplicate
     */
    v2PagesAutosavesDetail2: (
      parent: string,
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/pages/${parent}/autosaves/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2MediaList
     * @request GET:/wp/v2/media
     * @secure
     */
    v2MediaList: (
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        after?: string;
        author?: string;
        author_exclude?: string;
        before?: string;
        exclude?: string;
        include?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: (
          | "author"
          | "date"
          | "id"
          | "include"
          | "modified"
          | "parent"
          | "relevance"
          | "slug"
          | "include_slugs"
          | "title"
        )[];
        parent?: string;
        parent_exclude?: string;
        slug?: string;
        status?: string;
        media_type?: ("image" | "video" | "text" | "application" | "audio")[];
        mime_type?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/media${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2MediaCreate
     * @request POST:/wp/v2/media
     * @secure
     */
    v2MediaCreate: (
      data: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        title?: string;
        author?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        meta?: string;
        template?: string;
        alt_text?: string;
        caption?: string;
        description?: string;
        post?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/media`, "POST", params, data, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2MediaDetail
     * @request GET:/wp/v2/media/{id}
     * @secure
     */
    v2MediaDetail: (id: string, query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/media/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2MediaCreate
     * @request POST:/wp/v2/media/{id}
     * @secure
     * @originalName v2MediaCreate
     * @duplicate
     */
    v2MediaCreate2: (
      id: string,
      data: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        title?: string;
        author?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        meta?: string;
        template?: string;
        alt_text?: string;
        caption?: string;
        description?: string;
        post?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/media/${id}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2MediaUpdate
     * @request PUT:/wp/v2/media/{id}
     * @secure
     */
    v2MediaUpdate: (
      id: string,
      query?: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        title?: string;
        author?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        meta?: string;
        template?: string;
        alt_text?: string;
        caption?: string;
        description?: string;
        post?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/media/${id}${this.addQueryParams(query)}`,
        "PUT",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2MediaPartialUpdate
     * @request PATCH:/wp/v2/media/{id}
     * @secure
     */
    v2MediaPartialUpdate: (
      id: string,
      query?: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        title?: string;
        author?: string;
        comment_status?: ("open" | "closed")[];
        ping_status?: ("open" | "closed")[];
        meta?: string;
        template?: string;
        alt_text?: string;
        caption?: string;
        description?: string;
        post?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/media/${id}${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2MediaDelete
     * @request DELETE:/wp/v2/media/{id}
     * @secure
     */
    v2MediaDelete: (id: string, query?: { force?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/media/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2MediaPostProcessCreate
     * @request POST:/wp/v2/media/{id}/post-process
     * @secure
     */
    v2MediaPostProcessCreate: (id: string, data: { action: "create-image-subsizes"[] }, params?: RequestParams) =>
      this.request<any, any>(`/wp/v2/media/${id}/post-process`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2BlocksList
     * @request GET:/wp/v2/blocks
     * @secure
     */
    v2BlocksList: (
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        after?: string;
        before?: string;
        exclude?: string;
        include?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: (
          | "author"
          | "date"
          | "id"
          | "include"
          | "modified"
          | "parent"
          | "relevance"
          | "slug"
          | "include_slugs"
          | "title"
        )[];
        slug?: string;
        status?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/blocks${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2BlocksCreate
     * @request POST:/wp/v2/blocks
     * @secure
     */
    v2BlocksCreate: (
      data: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        template?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/blocks`, "POST", params, data, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2BlocksDetail
     * @request GET:/wp/v2/blocks/{id}
     * @secure
     */
    v2BlocksDetail: (
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[]; password?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/blocks/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2BlocksCreate
     * @request POST:/wp/v2/blocks/{id}
     * @secure
     * @originalName v2BlocksCreate
     * @duplicate
     */
    v2BlocksCreate2: (
      id: string,
      data: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        template?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/blocks/${id}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2BlocksUpdate
     * @request PUT:/wp/v2/blocks/{id}
     * @secure
     */
    v2BlocksUpdate: (
      id: string,
      query?: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        template?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/blocks/${id}${this.addQueryParams(query)}`,
        "PUT",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2BlocksPartialUpdate
     * @request PATCH:/wp/v2/blocks/{id}
     * @secure
     */
    v2BlocksPartialUpdate: (
      id: string,
      query?: {
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        template?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/blocks/${id}${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2BlocksDelete
     * @request DELETE:/wp/v2/blocks/{id}
     * @secure
     */
    v2BlocksDelete: (id: string, query?: { force?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/blocks/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2BlocksAutosavesDetail
     * @request GET:/wp/v2/blocks/{id}/autosaves
     * @secure
     */
    v2BlocksAutosavesDetail: (
      id: number,
      query?: { parent?: string; context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/blocks/${id}/autosaves${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2BlocksAutosavesCreate
     * @request POST:/wp/v2/blocks/{id}/autosaves
     * @secure
     */
    v2BlocksAutosavesCreate: (
      id: number,
      data: {
        parent?: string;
        date?: string;
        date_gmt?: string;
        slug?: string;
        status?: ("publish" | "future" | "draft" | "pending" | "private")[];
        password?: string;
        title?: string;
        content?: string;
        template?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/blocks/${id}/autosaves`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2BlocksAutosavesDetail
     * @request GET:/wp/v2/blocks/{parent}/autosaves/{id}
     * @secure
     * @originalName v2BlocksAutosavesDetail
     * @duplicate
     */
    v2BlocksAutosavesDetail2: (
      parent: string,
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/blocks/${parent}/autosaves/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2TypesList
     * @request GET:/wp/v2/types
     * @secure
     */
    v2TypesList: (query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(`/wp/v2/types${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2TypesDetail
     * @request GET:/wp/v2/types/{type}
     * @secure
     */
    v2TypesDetail: (type: string, query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/types/${type}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2StatusesList
     * @request GET:/wp/v2/statuses
     * @secure
     */
    v2StatusesList: (query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(`/wp/v2/statuses${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2StatusesDetail
     * @request GET:/wp/v2/statuses/{status}
     * @secure
     */
    v2StatusesDetail: (status: string, query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/statuses/${status}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2TaxonomiesList
     * @request GET:/wp/v2/taxonomies
     * @secure
     */
    v2TaxonomiesList: (query?: { context?: ("view" | "embed" | "edit")[]; type?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/taxonomies${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2TaxonomiesDetail
     * @request GET:/wp/v2/taxonomies/{taxonomy}
     * @secure
     */
    v2TaxonomiesDetail: (
      taxonomy: string,
      query?: { context?: ("view" | "embed" | "edit")[] },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/taxonomies/${taxonomy}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CategoriesList
     * @request GET:/wp/v2/categories
     * @secure
     */
    v2CategoriesList: (
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        exclude?: string;
        include?: string;
        order?: ("asc" | "desc")[];
        orderby?: ("id" | "include" | "name" | "slug" | "include_slugs" | "term_group" | "description" | "count")[];
        hide_empty?: string;
        parent?: string;
        post?: string;
        slug?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/categories${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CategoriesCreate
     * @request POST:/wp/v2/categories
     * @secure
     */
    v2CategoriesCreate: (
      data: { description?: string; name: string; slug?: string; parent?: string; meta?: string },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/categories`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2CategoriesDetail
     * @request GET:/wp/v2/categories/{id}
     * @secure
     */
    v2CategoriesDetail: (id: string, query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/categories/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CategoriesCreate
     * @request POST:/wp/v2/categories/{id}
     * @secure
     * @originalName v2CategoriesCreate
     * @duplicate
     */
    v2CategoriesCreate2: (
      id: string,
      data: { description?: string; name?: string; slug?: string; parent?: string; meta?: string },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/categories/${id}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2CategoriesUpdate
     * @request PUT:/wp/v2/categories/{id}
     * @secure
     */
    v2CategoriesUpdate: (
      id: string,
      query?: { description?: string; name?: string; slug?: string; parent?: string; meta?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/categories/${id}${this.addQueryParams(query)}`,
        "PUT",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CategoriesPartialUpdate
     * @request PATCH:/wp/v2/categories/{id}
     * @secure
     */
    v2CategoriesPartialUpdate: (
      id: string,
      query?: { description?: string; name?: string; slug?: string; parent?: string; meta?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/categories/${id}${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CategoriesDelete
     * @request DELETE:/wp/v2/categories/{id}
     * @secure
     */
    v2CategoriesDelete: (id: string, query?: { force?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/categories/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2TagsList
     * @request GET:/wp/v2/tags
     * @secure
     */
    v2TagsList: (
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        exclude?: string;
        include?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: ("id" | "include" | "name" | "slug" | "include_slugs" | "term_group" | "description" | "count")[];
        hide_empty?: string;
        post?: string;
        slug?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/tags${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2TagsCreate
     * @request POST:/wp/v2/tags
     * @secure
     */
    v2TagsCreate: (
      data: { description?: string; name: string; slug?: string; meta?: string },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/tags`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2TagsDetail
     * @request GET:/wp/v2/tags/{id}
     * @secure
     */
    v2TagsDetail: (id: string, query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/tags/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2TagsCreate
     * @request POST:/wp/v2/tags/{id}
     * @secure
     * @originalName v2TagsCreate
     * @duplicate
     */
    v2TagsCreate2: (
      id: string,
      data: { description?: string; name?: string; slug?: string; meta?: string },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/tags/${id}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2TagsUpdate
     * @request PUT:/wp/v2/tags/{id}
     * @secure
     */
    v2TagsUpdate: (
      id: string,
      query?: { description?: string; name?: string; slug?: string; meta?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/tags/${id}${this.addQueryParams(query)}`,
        "PUT",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2TagsPartialUpdate
     * @request PATCH:/wp/v2/tags/{id}
     * @secure
     */
    v2TagsPartialUpdate: (
      id: string,
      query?: { description?: string; name?: string; slug?: string; meta?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/tags/${id}${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2TagsDelete
     * @request DELETE:/wp/v2/tags/{id}
     * @secure
     */
    v2TagsDelete: (id: string, query?: { force?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/tags/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2UsersList
     * @request GET:/wp/v2/users
     * @secure
     */
    v2UsersList: (
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        exclude?: string;
        include?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: ("id" | "include" | "name" | "registered_date" | "slug" | "include_slugs" | "email" | "url")[];
        slug?: string;
        roles?: string;
        who?: "authors"[];
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/users${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2UsersCreate
     * @request POST:/wp/v2/users
     * @secure
     */
    v2UsersCreate: (
      data: {
        username: string;
        name?: string;
        first_name?: string;
        last_name?: string;
        email: string;
        url?: string;
        description?: string;
        locale?: ("" | "en_US" | "fr_FR")[];
        nickname?: string;
        slug?: string;
        roles?: string;
        password: string;
        meta?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/users`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2UsersDetail
     * @request GET:/wp/v2/users/{id}
     * @secure
     */
    v2UsersDetail: (id: string, query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/users/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2UsersCreate
     * @request POST:/wp/v2/users/{id}
     * @secure
     * @originalName v2UsersCreate
     * @duplicate
     */
    v2UsersCreate2: (
      id: string,
      data: {
        username?: string;
        name?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        url?: string;
        description?: string;
        locale?: ("" | "en_US" | "fr_FR")[];
        nickname?: string;
        slug?: string;
        roles?: string;
        password?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/users/${id}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2UsersUpdate
     * @request PUT:/wp/v2/users/{id}
     * @secure
     */
    v2UsersUpdate: (
      id: string,
      query?: {
        username?: string;
        name?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        url?: string;
        description?: string;
        locale?: ("" | "en_US" | "fr_FR")[];
        nickname?: string;
        slug?: string;
        roles?: string;
        password?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/users/${id}${this.addQueryParams(query)}`,
        "PUT",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2UsersPartialUpdate
     * @request PATCH:/wp/v2/users/{id}
     * @secure
     */
    v2UsersPartialUpdate: (
      id: string,
      query?: {
        username?: string;
        name?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        url?: string;
        description?: string;
        locale?: ("" | "en_US" | "fr_FR")[];
        nickname?: string;
        slug?: string;
        roles?: string;
        password?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/users/${id}${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2UsersDelete
     * @request DELETE:/wp/v2/users/{id}
     * @secure
     */
    v2UsersDelete: (id: string, query: { force?: string; reassign: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/users/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2UsersMeList
     * @request GET:/wp/v2/users/me
     * @secure
     */
    v2UsersMeList: (query?: { context?: ("view" | "embed" | "edit")[] }, params?: RequestParams) =>
      this.request<any, any>(`/wp/v2/users/me${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2UsersMeCreate
     * @request POST:/wp/v2/users/me
     * @secure
     */
    v2UsersMeCreate: (
      data: {
        username?: string;
        name?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        url?: string;
        description?: string;
        locale?: ("" | "en_US" | "fr_FR")[];
        nickname?: string;
        slug?: string;
        roles?: string;
        password?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/users/me`, "POST", params, data, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2UsersMeUpdate
     * @request PUT:/wp/v2/users/me
     * @secure
     */
    v2UsersMeUpdate: (
      query?: {
        username?: string;
        name?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        url?: string;
        description?: string;
        locale?: ("" | "en_US" | "fr_FR")[];
        nickname?: string;
        slug?: string;
        roles?: string;
        password?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(`/wp/v2/users/me${this.addQueryParams(query)}`, "PUT", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2UsersMePartialUpdate
     * @request PATCH:/wp/v2/users/me
     * @secure
     */
    v2UsersMePartialUpdate: (
      query?: {
        username?: string;
        name?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        url?: string;
        description?: string;
        locale?: ("" | "en_US" | "fr_FR")[];
        nickname?: string;
        slug?: string;
        roles?: string;
        password?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/users/me${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2UsersMeDelete
     * @request DELETE:/wp/v2/users/me
     * @secure
     */
    v2UsersMeDelete: (query: { force?: string; reassign: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/users/me${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CommentsList
     * @request GET:/wp/v2/comments
     * @secure
     */
    v2CommentsList: (
      query?: {
        context?: ("view" | "embed" | "edit")[];
        page?: string;
        per_page?: string;
        search?: string;
        after?: string;
        author?: string;
        author_exclude?: string;
        author_email?: string;
        before?: string;
        exclude?: string;
        include?: string;
        offset?: string;
        order?: ("asc" | "desc")[];
        orderby?: ("date" | "date_gmt" | "id" | "include" | "post" | "parent" | "type")[];
        parent?: string;
        parent_exclude?: string;
        post?: string;
        status?: string;
        type?: string;
        password?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(`/wp/v2/comments${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2CommentsCreate
     * @request POST:/wp/v2/comments
     * @secure
     */
    v2CommentsCreate: (
      data: {
        author?: string;
        author_email?: string;
        author_ip?: string;
        author_name?: string;
        author_url?: string;
        author_user_agent?: string;
        content?: string;
        date?: string;
        date_gmt?: string;
        parent?: string;
        post?: string;
        status?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/comments`, "POST", params, data, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2CommentsDetail
     * @request GET:/wp/v2/comments/{id}
     * @secure
     */
    v2CommentsDetail: (
      id: string,
      query?: { context?: ("view" | "embed" | "edit")[]; password?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/comments/${id}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CommentsCreate
     * @request POST:/wp/v2/comments/{id}
     * @secure
     * @originalName v2CommentsCreate
     * @duplicate
     */
    v2CommentsCreate2: (
      id: string,
      data: {
        author?: string;
        author_email?: string;
        author_ip?: string;
        author_name?: string;
        author_url?: string;
        author_user_agent?: string;
        content?: string;
        date?: string;
        date_gmt?: string;
        parent?: string;
        post?: string;
        status?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/comments/${id}`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2Menu
     * @request GET:/wp/v2/menu
     * @secure
     * @originalName v2Menu
     * @duplicate
     */
    v2Menu: () => this.request<any, any>('/wp/v2/menu', "GET"),
    /**
     * @tags endpoint
     * @name v2CommentsUpdate
     * @request PUT:/wp/v2/comments/{id}
     * @secure
     */
    v2CommentsUpdate: (
      id: string,
      query?: {
        author?: string;
        author_email?: string;
        author_ip?: string;
        author_name?: string;
        author_url?: string;
        author_user_agent?: string;
        content?: string;
        date?: string;
        date_gmt?: string;
        parent?: string;
        post?: string;
        status?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/comments/${id}${this.addQueryParams(query)}`,
        "PUT",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CommentsPartialUpdate
     * @request PATCH:/wp/v2/comments/{id}
     * @secure
     */
    v2CommentsPartialUpdate: (
      id: string,
      query?: {
        author?: string;
        author_email?: string;
        author_ip?: string;
        author_name?: string;
        author_url?: string;
        author_user_agent?: string;
        content?: string;
        date?: string;
        date_gmt?: string;
        parent?: string;
        post?: string;
        status?: string;
        meta?: string;
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/comments/${id}${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2CommentsDelete
     * @request DELETE:/wp/v2/comments/{id}
     * @secure
     */
    v2CommentsDelete: (id: string, query?: { force?: string; password?: string }, params?: RequestParams) =>
      this.request<any, any>(
        `/wp/v2/comments/${id}${this.addQueryParams(query)}`,
        "DELETE",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2SearchList
     * @request GET:/wp/v2/search
     * @secure
     */
    v2SearchList: (
      query?: {
        context?: ("view" | "embed")[];
        page?: string;
        per_page?: string;
        search?: string;
        type?: "post"[];
        subtype?: string;
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/search${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2BlockRendererDetail
     * @request GET:/wp/v2/block-renderer/{name}
     * @secure
     */
    v2BlockRendererDetail: (
      name: string,
      query?: { context?: "edit"[]; attributes?: string; post_id?: string },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/block-renderer/${name}${this.addQueryParams(query)}`,
        "GET",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2SettingsList
     * @request GET:/wp/v2/settings
     * @secure
     */
    v2SettingsList: (params?: RequestParams) =>
      this.request<any, any>(`/wp/v2/settings`, "GET", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2SettingsCreate
     * @request POST:/wp/v2/settings
     * @secure
     */
    v2SettingsCreate: (
      data: {
        title?: string;
        description?: string;
        url?: string;
        email?: string;
        timezone?: string;
        date_format?: string;
        time_format?: string;
        start_of_week?: string;
        language?: string;
        use_smilies?: string;
        default_category?: string;
        default_post_format?: string;
        posts_per_page?: string;
        default_ping_status?: ("open" | "closed")[];
        default_comment_status?: ("open" | "closed")[];
      },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/settings`, "POST", params, data, BodyType.FormData, true),

    /**
     * @tags endpoint
     * @name v2SettingsUpdate
     * @request PUT:/wp/v2/settings
     * @secure
     */
    v2SettingsUpdate: (
      query?: {
        title?: string;
        description?: string;
        url?: string;
        email?: string;
        timezone?: string;
        date_format?: string;
        time_format?: string;
        start_of_week?: string;
        language?: string;
        use_smilies?: string;
        default_category?: string;
        default_post_format?: string;
        posts_per_page?: string;
        default_ping_status?: ("open" | "closed")[];
        default_comment_status?: ("open" | "closed")[];
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(`/wp/v2/settings${this.addQueryParams(query)}`, "PUT", params, null, BodyType.Json, true),

    /**
     * @tags endpoint
     * @name v2SettingsPartialUpdate
     * @request PATCH:/wp/v2/settings
     * @secure
     */
    v2SettingsPartialUpdate: (
      query?: {
        title?: string;
        description?: string;
        url?: string;
        email?: string;
        timezone?: string;
        date_format?: string;
        time_format?: string;
        start_of_week?: string;
        language?: string;
        use_smilies?: string;
        default_category?: string;
        default_post_format?: string;
        posts_per_page?: string;
        default_ping_status?: ("open" | "closed")[];
        default_comment_status?: ("open" | "closed")[];
      },
      params?: RequestParams,
    ) =>
      this.request<any, any>(
        `/wp/v2/settings${this.addQueryParams(query)}`,
        "PATCH",
        params,
        null,
        BodyType.Json,
        true,
      ),

    /**
     * @tags endpoint
     * @name v2ThemesList
     * @request GET:/wp/v2/themes
     * @secure
     */
    v2ThemesList: (
      query: { context?: string; page?: string; per_page?: string; search?: string; status: string },
      params?: RequestParams,
    ) => this.request<any, any>(`/wp/v2/themes${this.addQueryParams(query)}`, "GET", params, null, BodyType.Json, true),
  };
}
