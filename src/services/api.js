import { stringify } from 'qs';
import request from '../utils/request';

export async function getMenu(params) {
  return request('/api/v1/GetMenuData', {
    method: 'POST',
    body: {
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
      ...params,
    },
  });
}
export async function queryProjectNotice() {
  return request('/base/GetXMMsg');
}
//检测按钮是否可以点击
export async function CheckBTNAuth(params) {
  return request('base/CheckBTNAuth', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function queryActivities() {
  return request('/base/GetModeAct');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//获取城市列表
export async function GetCityList() {
  return request('/service/CreatCityCountyStreetJson.php', {
    method: 'GET',
  });
}
export async function GetDWList() {
  return request('/apis/GetDWList.php', {
    method: 'GET',
  });
}
//GetBMListByDwId
export async function GetBMListByDwId(params) {
  return request('/apis/GetBMListByDwId.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetBMServiceByBMid(params) {
  return request('/apis/GetBMServiceByBMid.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function GetActUserListByActId(params) {
  return request('/Act/GetPubActUserList', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetCountyList(params) {
  return request('/apis/GetCountyList.php', {
    method: 'POST',
    body: params,
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      dqdw: localStorage.getItem('dqdw'),
      ...params,
    },
  });
}

export async function actInfo(params) {
  // 提交 活动基础资料 已更改
  return request('/service/AddActInfo.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function addactAreatb(params) {
  // 提交原文链接 以及 创建对照表记录
  // add_act_area_tb.php
  return request('/service/add_act_area_tb.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetWeNumUserList(params) {
  // 保存轮播
  return request('/apis/GetWeNumUserList.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function saveLunbolist(params) {
  // 保存轮播
  return request('/base/AddOrUpdateLunbo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function delLunbolist(params) {
  // is del 删除轮播
  return request('/base/DelLunbo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function getUserList(params) {
  // 获取用户列表
  return request('/WeApp/GetWeAppAllUserList', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function getActList(params) {
  // 获取活动列表
  return request('/Act/GetActListBydqdw', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function fakeChartData() {
  return request('/base/facklist');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function getlunbolist(params) {
  return request(`/base/GetLunbo?${stringify(params)}`);
}

export async function AccountLogin(params) {
  return request('/admin/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/base/Msg', {
    method: 'POST',
    body: {
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function getcity() {
  return request('/city.php');
}
export async function getactallinfo(params) {
  console.log(params);
  return request(`/Act/GetActInfo`, {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function opensignin(params) {
  return request('/apis/open_sign_in.php', {
    method: 'POST',
    body: params,
  });
}
export async function closesignin(params) {
  return request('/apis/close_sign_in.php', {
    method: 'POST',
    body: params,
  });
}
export async function selectbyinfo(params) {
  return request('/apis/select_user_by_info.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}
// 缺少接口文档
export async function searchByInfor(params) {
  return request('apis/', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function getuserallinfo(params) {
  return request('/WeApp/GetWeAppUserAllInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetZhiWuList() {
  return request('/base/GetZhiWuList');
}
export async function SetWeAppUserZhiWu(params) {
  return request('/WeApp/SetWeAppUserZhiWu', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function Secondsignup(params) {
  return request('/apis/Secondsignup.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetWeNumUserListByInfo(params) {
  // 根据用户信息搜索用户列表
  return request('/WeNum/UserListByInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetUserInfoByUserId(params) {
  return request('/WeNum/GetUserInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function wxbind(params) {
  return request('/base/WxBind', {
    method: 'POST',
    body: {
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
      ...params,
    },
  });
}
export async function UnitManageList(params) {
  return request('/Unit/UnitManageList', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function RoleManageList(params) {
  return request('/Unit/RoleManageList', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function UnitManageAdd(params) {
  return request('/Unit/UnitManageAdd', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetRoleManageInfo(params) {
  return request('/Unit/RoleManageInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetUnitAuthListByUnitId(params) {
  //获取单位权限列表
  return request('/Unit/GetUnitAuthListByUnitId', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function RoleManageAdd(params) {
  //角色增加
  return request('/Unit/RoleManageAdd', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
// /RoleAuthUpdate

export async function RoleAuthUpdate(params) {
  //权限更新
  return request('/Unit/RoleAuthUpdate', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
// 根据角色id 权限id 删除假删 对应的对照表
export async function DelRoleAuthByAuthIdAndRoleId(params) {
  return request('/Unit/DelRoleAuth', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//获取用户单位 的用户列表
export async function UnitUserList(params) {
  return request('/Unit/UserManageList', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function UserRoleBind(params) {
  return request('/User/UserRoleBind', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function UnitBMList(params) {
  return request('/Unit/GetUnitBMList', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetAdminDWJSList(params) {
  return request('/apis/GetAdminDWJSList.php', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
//CheckActUserIsTrained
export async function CheckActUserIsTrained(params) {
  return request('/apis/CheckActUserIsTrained.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function GetWeappUserGroupList(params) {
  return request('/WeApp/UserGroupList', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//SendModeMsgByAdminUser

export async function SendModeMsgByAdminUser(params) {
  return request('/ModeMsg/SaveModeMsg', {
    method: 'POST',
    body: {
      dqdw: localStorage.getItem('dqdw'),
      userName: localStorage.getItem('user_name'),
      ...params,
    },
  });
}
export async function UserBMBind(params) {
  return request('/apis/UserBMBind.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//WeappUserGroupBind
export async function WeappUserGroupBind(params) {
  return request('/WeApp/WeappUserGroupBind', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//GetModeMsgInfoList
export async function GetModeMsgInfoList(params) {
  return request('/WeNum/GetModeMsgInfoList', {
    method: 'POST',
    body: params,
  });
}

export async function GetBMUserList(params) {
  //获取部门用户列表
  return request('/apis/GetBMUserList.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function CreatNewBM(params) {
  //新增部门
  return request('/apis/CreatNewBM.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function GetWeNumUserGroupList(params) {
  //获取分组列表
  return request('/WeNum/UserGroupList', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function CreatWeNumUserGroup(params) {
  //新增分组
  return request('/WeNum/CreatWeNumUserGroup', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function CreatWeappUserGroup(params) {
  //新增分组
  return request('/WeApp/CreatappUserGroup', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function WeNumUserGroupBind(params) {
  //用户分组绑定
  return request('/WeNum/UserGroupBind', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetWeNumUserGroupInfo(params) {
  //分组详情
  return request('/WeNum/GetWeNumUserGroupInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetWeappUserGroupInfo(params) {
  //分组详情
  return request('/WeApp/GetWeappUserGroupInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function CreatOlderJiaTing(params) {
  //创建养老家庭

  return request('/apis/CreatOlderJiaTing.php', {
    method: 'POST',

    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function CreatOlderOrder(params) {
  //创建养老订单

  return request('/apis/CreatOlderOrder.php', {
    method: 'POST',

    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetOlderJiaTingList(params) {
  //获取养老家庭列表
  return request('/apis/GetOlderJiaTingList.php', {
    method: 'POST',

    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
// /GetOlderOrderListbyXJDW
export async function GetOlderOrderListbyGLDW(params) {
  //获取养老订单列表 （管理单位）
  return request('/apis/GetOlderOrderListbyGLDW.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
// /GetOlderOrderListbyXJDW
export async function GetOlderOrderListbyXJDW(params) {
  //获取养老订单列表 （管理单位）
  return request('/apis/GetOlderOrderListbyXJDW.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetOlderOrderListbyBDW(params) {
  //获取养老订单列表 本单位
  return request('/apis/GetOlderOrderListbyBDW.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetOlderOrderListbyFWRY(params) {
  //获取养老订单列表 服务人员
  return request('/apis/GetOlderOrderListbyFWRY.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetOlderServiceList() {
  return request('/apis/GetOlderServiceList.php', {
    method: 'GET',
  });
}
export async function GetOlderInfoByPhoneNum(params) {
  return request('/apis/GetOlderInfoByPhoneNum.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetUnitMenuTypeList(params) {
  return request('/apis/GetUnitMenuTypeList.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function XJDWJD(params) {
  return request('/apis/XJDWJD.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function BDWUserJD(params) {
  return request('/apis/BDWUserJD.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function BDWAdminFP(params) {
  return request('/apis/BDWAdminFP.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function GetUserWXbindByDWid(params) {
  return request('/apis/GetUserWXbindByDWid.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function GetOlderHomeOrderListByOlderId(params) {
  return request('/apis/GetOlderHomeOrderListByOlderId.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetAdminUserOrderList(params) {
  return request('/apis/GetAdminUserOrderList.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function GetOrderInfoByOrderId(params) {
  return request('/apis/GetOrderInfoByOrderId.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
//getAdminSystemBMtype 获取系统创建部门类型

export async function getAdminSystemBMtype(params) {
  return request('/apis/getAdminSystemBMtype.php', {
    method: 'GET',
  });
}

export async function GetAllMenuTreeNode() {
  return request('/base/GetAllMenuTreeNode');
}
export async function SuperAdminCreatMenu(params) {
  return request('/SA/CreatMenu', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}
export async function SuperAdmindelMenu(params) {
  return request('/SA/DelMenu', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}
export async function GetRecoveryMenuList() {
  return request('/base/GetRecoveryMenuList');
}
export async function SuperAdminRecMenu(params) {
  return request('/SA/RecMenu', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}

export async function SuperAdminGetAllAuth(params) {
  return request('/SA/GetAllAuth', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}
export async function GetAllQXModule() {
  return request('/base/GetAllQXModule');
}
export async function SuperAdminCreatQX(params) {
  return request('/SA/CreatQX', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}
export async function SuperAdminGetAuthClass(params) {
  return request('/SA/GetAuthClass', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}

export async function SuperAdminSetAuthClass(params) {
  return request('/SA/SetAuthClass', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}
export async function TestAes(params) {
  return request('/apis/test.php', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
    },
  });
}

export async function CreatPubAct(params) {
  return request('/Act/CreatPubAct', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function UpdateActInfoFirst(params) {
  return request('/Act/UpdateActInfoFirst', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function ChengeActSign(params) {
  return request('/Act/ChengeActSign', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function GetDWJSByActID(params) {
  return request('/Act/GetDWJSByActID', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function UpdateUserForDW(params) {
  return request('/Act/UpdateUserForDW', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}

export async function GetDWInfo(params) {
  return request('/Unit/GetDWInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function UpdateDWInfo(params) {
  return request('/Unit/UpdateDWInfo', {
    method: 'POST',
    body: {
      ...params,
      userName: localStorage.getItem('user_name'),
      dqdw: localStorage.getItem('dqdw'),
    },
  });
}
export async function GetActArea(params) {
  return request('/Act/GetActArea', {
    method: 'POST',
    body: params,
  });
}
export async function CurltoPHP(params) {
  return request('/base/CurltoPHP', {
    method: 'POST',
    body: params,
  });
}
