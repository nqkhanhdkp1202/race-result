import axiosClient from "./axiosClient";

interface RaceAPI {
  getRaceList: (year: number, category: string, params?: any) => Promise<any>;
  getFilterList: (params?: any) => Promise<any>;
}

export const raceAPI: RaceAPI = {
  getRaceList: (year, category, params) => {
    const url = `/api/${year}/${category}`;
    return axiosClient.get(url, { params });
  },

  getFilterList: (params) => {
    const url = `/api/filter`;
    return axiosClient.get(url, { params });
  },
};
 