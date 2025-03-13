export interface IResponseDataDetail {
  status: string;
  message: string;
  data: IData;
}

export interface IData {
  seoOnPage: ISeoOnPage;
  breadCrumb: IBreadcrumb[];
  params: IParams;
  item: IItem;
  APP_DOMAIN_CDN_IMAGE: string;
}

export interface ISeoOnPage {
  og_type: string;
  titleHead: string;
  seoSchema: ISeoSchema;
  descriptionHead: string;
  og_image: string[];
  updated_time: number;
  og_url: string;
}

export interface ISeoSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  image: string;
  director: string;
}

export interface IBreadcrumb {
  name: string;
  slug?: string;
  position: number;
  isCurrent?: boolean;
}

export interface IParams {
  slug: string;
  crawl_check_url: string;
}

export interface IItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  content: string;
  status: string;
  thumb_url: string;
  sub_docquyen: boolean;
  author: string[];
  category: ICategory[];
  chapters: IChapter[];
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
}

export interface IChapter {
  server_name: string;
  server_data: IServerData[];
}

export interface IServerData {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
}
