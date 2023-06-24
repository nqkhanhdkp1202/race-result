import axiosClient from "./axiosClient";

interface RaceAPI {
  getRaceList: ( params?: any) => Promise<any>;
  getDriverList: (params?: any) => Promise<any>;
  getTeamList:(params?: any) => Promise<any>;
  getYearsList:(params?: any) => Promise<any>;
}

export const raceAPI: RaceAPI = {
  getRaceList: ( params) => {
    const url = `/races`;
    return axiosClient.get(url, { params });
  },

  getDriverList(params) {
    const url = `/drivers`;
    return axiosClient.get(url, { params });
  },

  getTeamList( params){
    const url = `/teams`;
    return axiosClient.get(url, { params });
  },

  getYearsList( params){
    const url = `/years/`;
    return axiosClient.get(url, { params });
  },

};
 