import AxiosInstance from "./api";

export const ListService = {

  getType: async (type: string) => {
    return await AxiosInstance.get(`/danh-sach/${type}`);
  },

  getCategories: async () => {
    return await AxiosInstance.get("/the-loai");
  },

}