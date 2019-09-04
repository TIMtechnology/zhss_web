import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request('/admin/get_admin_info', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function get_num() {
  return request('/base/GetNum');
}

export async function getRegion(params) {
  // console.log(params);  // /service/regionlist.php
  return request('/base/GetRegion', {
    method: 'POST',
    body: params,
  });
}

export async function get_all_admin_list() {
  return request('/apis/get_all_admin_list.php');
}
export async function getactlist() {
  return request('/apis/act_list.php');
}
export async function addadminuser(params) {
  return request('/apis/add_admin_user.php', { method: 'POST', body: params });
}

export async function wxlogin(params) {
  return request('/wxlogin.php', { method: 'POST', body: params });
}
export async function WXLOGIN_A(params) {
  return request('/base/WxLogin', { method: 'POST', body: params });
}
export async function getAdminuserBMList(params) {
  return request('/apis/getAdminuserBMList.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//UpdateUserPublicInfo
export async function UpdateUserPublicInfo(params) {
  return request('/base/UpdateUserPublicInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//GetAdminUserPrInfo
export async function GetAdminUserPrInfo(params) {
  return request('/base/GetAdminUserPrinfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//UpdateAdminUserPsw
export async function UpdateAdminUserPsw(params) {
  return request('/base/UpdateUserPsw', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//UpdateAdminUserWxbind
export async function UpdateAdminUserWxbind(params) {
  return request('/base/UpdateUserWxBind', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function checkupmsg(params) {
  return request('/base/CheckUpMsg', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
