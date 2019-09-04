import {
  getMenu,
  CheckBTNAuth,
  GetAllMenuTreeNode,
  SuperAdminCreatMenu,
  SuperAdmindelMenu,
  GetRecoveryMenuList,
  SuperAdminRecMenu,
} from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'Menu',

  state: {
    MenuData: [],
    BTMAuth: [],
    MenuTreeNode: [],
  },

  effects: {
    *setgetMenu({ payload }, { call, put }) {
      const data = yield call(getMenu, payload);
      console.log(data);
      yield put({
        type: 'setMenu',
        payload: data,
      });
    },
    *setCheckBTNAuth({ payload }, { call, put }) {
      const data = yield call(CheckBTNAuth, payload);
      console.log(data);
      var a = { disabled: true };
      if (data.msg === 'true') {
        //拥有权限
        a = { disabled: false };
      }
      yield put({
        type: 'setBTNAuth',
        payload: a,
      });
      //  console.log(a);
    },
    *setGetAllMenuTreeNode(_, { call, put }) {
      const data = yield call(GetAllMenuTreeNode);
      // console.log(data);

      yield put({
        type: 'setAllMenuTreeNode',
        payload: data,
      });
    },
    *setSuperAdminCreatMenu({ payload }, { call, put }) {
      const req = yield call(SuperAdminCreatMenu, payload);
      console.log(req);
      if (req.error == 0) {
        message.success('创建成功');
        const data = yield call(GetAllMenuTreeNode);
        yield put({
          type: 'setAllMenuTreeNode',
          payload: data,
        });
      } else {
        message.error('创建失败，请刷新尝试');
      }
    },
    *setSuperAdmindelMenu({ payload }, { call, put }) {
      const req = yield call(SuperAdmindelMenu, payload);
      console.log(req);
      if (req.error == 0) {
        message.success('删除成功');
        const data = yield call(GetAllMenuTreeNode);
        yield put({
          type: 'setAllMenuTreeNode',
          payload: data,
        });
      } else {
        message.error('删除失败，注意：有子菜单的菜单不可删除');
      }
    },
    *setGetRecoveryMenuList(_, { call, put }) {
      const req = yield call(GetRecoveryMenuList);
      console.log(req);
      yield put({
        type: 'setaGetRecoveryMenuList',
        payload: req.data,
      });
    },
    *setSuperAdminRecMenu({ payload }, { call, put }) {
      const req = yield call(SuperAdminRecMenu, payload);
      console.log(req);
      if (req.error == 0) {
        message.success('恢复成功');
        const data = yield call(GetAllMenuTreeNode);
        yield put({
          type: 'setAllMenuTreeNode',
          payload: data,
        });
      } else {
        message.error('恢复失败');
      }
    },
  },

  reducers: {
    setMenu(state, { payload }) {
      return {
        ...state,
        MenuData: payload,
      };
    },
    setBTNAuth(state, { payload }) {
      return {
        ...state,
        BTNAuth: payload,
      };
    },
    setAllMenuTreeNode(state, { payload }) {
      return {
        ...state,
        MenuTreeNode: payload,
      };
    },
    setaGetRecoveryMenuList(state, { payload }) {
      return {
        ...state,
        RecoveryMenuList: payload,
      };
    },
  },
};
