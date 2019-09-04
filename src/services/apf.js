import { stringify } from 'qs';
import request from '../utils/request';


export async function CreatAPF(params) {
    return request('/APF/CreatAPF', {
      method: 'POST',
      body: {
        ...params,
        userName: localStorage.getItem('user_name'),
        dqdw: localStorage.getItem('dqdw'),
    },
    });
  }
  export async function GetDwAPFList(params) {
    return request('/APF/GetDwAPFList', {
      method: 'POST',
      body: {
        ...params,
        userName: localStorage.getItem('user_name'),
        dqdw: localStorage.getItem('dqdw'),
    },
    });
  }
  export async function GetAPFInfo(params) {
    return request('/APF/GetAPFInfo', {
      method: 'POST',
      body: {
        ...params,
        userName: localStorage.getItem('user_name'),
        dqdw: localStorage.getItem('dqdw'),
    },
    });
  }
  export async function GetWeatringForMeAPF(params) {
    return request('/APF/GetWeatringForMeAPF', {
      method: 'POST',
      body: {
        ...params,
        userName: localStorage.getItem('user_name'),
        dqdw: localStorage.getItem('dqdw'),
    },
    });
  }
  export async function RunAPF(params) {
    return request('/APF/RunAPF', {
      method: 'POST',
      body: {
        ...params,
        userName: localStorage.getItem('user_name'),
        dqdw: localStorage.getItem('dqdw'),
    },
    });
  }
  export async function CuiYiXia(params) {
    return request('/APF/CuiYiXia', {
      method: 'POST',
      body: {
        ...params,
        userName: localStorage.getItem('user_name'),
        dqdw: localStorage.getItem('dqdw'),
      },
    });
  }
  export async function SetAPFUser(params){
    return request('/APF/SetAPFUser', {
      method: 'POST',
      body: {
        ...params,
        userName: localStorage.getItem('user_name'),
        dqdw: localStorage.getItem('dqdw'),
      },
    });
  }
  
  
