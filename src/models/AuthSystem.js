import {
  UnitManageList,
  UnitManageAdd,
  RoleManageList,
  GetRoleManageInfo,
  GetUnitAuthListByUnitId,
  RoleManageAdd,
  RoleAuthUpdate,
  DelRoleAuthByAuthIdAndRoleId,
  UnitUserList,
  UserRoleBind,
  UnitBMList,
  UserBMBind,
  GetBMUserList,
  CreatNewBM,
  GetUnitMenuTypeList,
  getAdminSystemBMtype,
  SuperAdminGetAllAuth,
  GetAllQXModule,
  SuperAdminCreatQX,
  SuperAdminGetAuthClass,
  SuperAdminSetAuthClass,
} from '@/services/api';
import {SetAPFUser} from '@/services/apf'
import { message } from 'antd';

export default {
  namespace: 'AuthSystem',

  state: {
    notice: [],
    data: {
      list: [],
      pagination: {},
    },
    list: [],
    info: null,
    BMtype: [],
    AllAuthList: [],
    QXModule: [],
    AuthClass: [],
  },

  effects: {
    *GetUnitManageList(_, { call, put }) {
      //获取单位列表
      const response = yield call(UnitManageList);
      //console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *setgetAdminSystemBMtype(_, { call, put }) {
      const response = yield call(getAdminSystemBMtype);
      //console.log(response);
      yield put({
        type: 'savebmtype',
        payload: response,
      });
    },
    *RoleManageAdd({ payload }, { call, put }) {
      //角色管理 添加
      const response = yield call(RoleManageAdd, payload);
      console.log(response);
      if (response.status == 'ok') {
        message.success('添加成功');
        const response = yield call(RoleManageList, payload);
        console.log(response);
        yield put({
          type: 'save',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },
    *GetUnitAuthListByUnitId(_, { call, put }) {
      // 获取单位权限列表
      const response = yield call(GetUnitAuthListByUnitId);
      console.log(response);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *GetRoleManageList({ payload }, { call, put }) {
      //获取角色列表
      const response = yield call(RoleManageList, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *UnitManageAdd({ payload }, { call, put }) {
      const response = yield call(UnitManageAdd, payload);
      console.log(response);
      if (response.status == 'ok') {
        message.success('添加成功');
        const response = yield call(UnitManageList);
        console.log(response);
        yield put({
          type: 'save',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },
    *GetRoleManageInfo({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(GetRoleManageInfo, payload);
      console.log(response.info);
      yield put({
        type: 'RoleManageInfo',
        payload: response,
      });
    },
    *RoleAuthUpdate({ payload }, { call, put }) {
      const response = yield call(RoleAuthUpdate, payload);
      console.log(response);
      if (response.status == 'ok') {
        message.success('修改成功');
        const response = yield call(GetRoleManageInfo, payload);
        console.log(response);
        yield put({
          type: 'RoleManageInfo',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },
    *DelRoleAuth({ payload }, { call, put }) {
      const response = yield call(DelRoleAuthByAuthIdAndRoleId, payload);
      console.log(response);
      if (response.status == 'ok') {
        message.success('删除成功');
        const response = yield call(GetRoleManageInfo, payload);
        console.log(response);
        yield put({
          type: 'RoleManageInfo',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },
    *GetUnitUserList({ payload }, { call, put }) {
      const response = yield call(UnitUserList, payload);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *GetRoleManageListForUserManage({ payload }, { call, put }) {
      const response = yield call(RoleManageList, payload);
      console.log(response);
      yield put({
        type: 'savelist',
        payload: response,
      });
    },
    *UserRoleBindToDB({ payload }, { call, put }) {
      const response = yield call(UserRoleBind, payload);
      console.log(response);
      message.success(response.msg);
      if (response.status == 'ok') {
        const response = yield call(UnitUserList, payload);
        console.log(response);
        yield put({
          type: 'save',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },
    *GetUnitBMList(_, { call, put }) {
      const response = yield call(UnitBMList);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'resetUnitBMList',
        payload: response.list,
      });
    },
    *reGetUnitBMList(_, { call, put }) {
      //用于用户列表中 修改用户所在部门
      const response = yield call(UnitBMList);
      console.log(response);

      yield put({
        type: 'resetUnitBMList',
        payload: response.list,
      });
    },
    *setUserBMBind({ payload }, { call, put }) {
      //用户部门绑定
      const response = yield call(UserBMBind, payload);
      console.log(response);
      message.success(response.msg);
    },
    *setGetBMUserList({ payload }, { call, put }) {
      //获取部门用户列表
      const response = yield call(GetBMUserList, payload);
      console.log(response);
      yield put({
        type: 'setBMUserList',
        payload: response,
      });
    },
    *setCreatNewBM({ payload }, { call, put }) {
      //新增部门
      const response = yield call(CreatNewBM, payload);
      if (response.status == 'ok') {
        message.success('创建成功');
        const response = yield call(UnitBMList);
        console.log(response);
        yield put({
          type: 'save',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },
    *setGetUnitMenuTypeList({ payload }, { call, put }) {
      //获取菜单类型
      const response = yield call(GetUnitMenuTypeList);
      console.log(response);
      yield put({
        type: 'saveMenuList',
        payload: response,
      });
    },
    *setSuperAdminGetAllAuth(_, { call, put }) {
      const req = yield call(SuperAdminGetAllAuth);
      console.log(req);
      yield put({
        type: 'setaSuperAdminGetAllAuth',
        payload: req.data,
      });
    },
    *setGetAllQXModule(_, { call, put }) {
      const req = yield call(GetAllQXModule);
      console.log(req);
      yield put({
        type: 'setaGetAllQXModule',
        payload: req.data,
      });
    },
    *setSuperAdminCreatQX({ payload }, { call, put }) {
      const req = yield call(SuperAdminCreatQX, payload);
      console.log(req);
      if (req.error == 0) {
        message.success('添加成功');
        const req = yield call(SuperAdminGetAllAuth);
        console.log(req);
        yield put({
          type: 'setaSuperAdminGetAllAuth',
          payload: req.data,
        });
      } else {
        message.error('添加失败');
      }
    },
    *setSuperAdminGetAuthClass({ payload }, { call, put }) {
      const req = yield call(SuperAdminGetAuthClass, payload);
      console.log(req);
      yield put({
        type: 'setaSuperAdminGetAuthClass',
        payload: req.data,
      });
    },
    *setSuperAdminSetAuthClass({ payload }, { call, put }) {
      const req = yield call(SuperAdminSetAuthClass, payload);
      console.log(req);
      if (req.error == 0) {
        message.success('修改成功');
        const req = yield call(SuperAdminGetAuthClass, payload);
        console.log(req);
        yield put({
          type: 'setaSuperAdminGetAuthClass',
          payload: req.data,
        });
      } else {
        message.error('添加失败');
      }
    },
    *setSetAPFUser({payload},{call}){
      const res = yield call(SetAPFUser,payload);
      console.log(res)
  }
  },

  reducers: {
    setBMUserList(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        ...payload,
      };
    },
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
    savebmtype(state, action) {
      return {
        ...state,
        BMtype: action.payload,
      };
    },
    save(state, action) {
      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
        //pagination:action.pagination,
      };
    },
    savelist(state, { payload }) {
      console.log(payload.list);
      return {
        ...state,
        RoleList: payload.list,
      };
    },
    saveMenuList(state, { payload }) {
      console.log(payload.menulist);
      return {
        ...state,
        MenuList: payload.menulist,
      };
    },
    saveUnitBMList(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        data: payload.UnitBMList,
      };
    },
    resetUnitBMList(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        UnitBMList: payload,
      };
    },
    RoleManageInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    show(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    setaSuperAdminGetAllAuth(state, payload) {
      return {
        ...state,
        AllAuthList: payload,
      };
    },
    setaGetAllQXModule(state, payload) {
      return {
        ...state,
        QXModule: payload,
      };
    },
    setaSuperAdminGetAuthClass(state, payload) {
      return {
        ...state,
        AuthClass: payload,
      };
    },
  },
};
