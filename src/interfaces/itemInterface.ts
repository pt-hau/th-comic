interface IDataItem {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  status: string;
  thumb_url: string;
  sub_docquyen: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  updatedAt: string;
  chaptersLatest: any;
}