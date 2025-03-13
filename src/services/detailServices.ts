
import AxiosInstance from "./api";

export const DetailServices = {
  getDetail: async (id: string) => {
    return await AxiosInstance.get(`/truyen-tranh/${id}`);
  }
}