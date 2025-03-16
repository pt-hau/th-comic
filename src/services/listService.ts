import AxiosInstance from "./api";

export const ListService = {

  getType: async (type: string) => {
    return await AxiosInstance.get(`/danh-sach/${type}`);
  },

  getTypePage: async (type: string, page: number) => {
    return await AxiosInstance.get(`/danh-sach/${type}?page=${page}`);
  },

  getCategoryPage: async (category: string, page: number) => {
    return await AxiosInstance.get(`/the-loai/${category}?page=${page}`);
  },
  
  getCategories: async () => {
    return await AxiosInstance.get("/the-loai");
  },

  getSearch: async (keyword: string) => {
    return await AxiosInstance.get(`/tim-kiem?keyword=${keyword}`);
  },
}