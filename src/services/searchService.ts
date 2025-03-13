
// import { IFilter } from "@/types/filter";
import AxiosInstance from "./api";

export const SearchService = {

  listSearch: async (value: string) => {
    return await AxiosInstance.get(`/tim-kiem?keyword=${value}`);
  },
}