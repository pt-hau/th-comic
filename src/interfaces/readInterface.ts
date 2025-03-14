export interface IImage {
  image_page: number;
  image_file: string;
}

export interface IItem {
  _id: string;
  comic_name: string;
  chapter_name: string;
  chapter_title: string;
  chapter_path: string;
  chapter_image: IImage[];
}

export interface IData {
  domain_cdn: string;
  item: IItem;
}

export interface IResponseDataRead {
  status: string;
  message: string;
  data: IData;
}
