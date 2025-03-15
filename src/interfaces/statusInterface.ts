interface IResponseDataStatus {
  status: string;
  message: string;
  data: Data;
}

interface Data {
  seoOnPage: SeoOnPage;
  breadCrumb: BreadCrumb[];
  titlePage: string;
  items: Item[];
  params: Params;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
}

interface SeoOnPage {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
}

interface BreadCrumb {
  name: string;
  slug?: string;
  isCurrent: boolean;
  position: number;
}

interface Item {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  status: string;
  thumb_url: string;
  sub_docquyen: boolean;
  category: Category[];
  updatedAt: string;
  chaptersLatest: Chapter[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Chapter {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
}

interface Params {
  type_slug: string;
  filterCategory: string[];
  sortField: string;
  sortType: string;
  pagination: Pagination;
}

interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}
