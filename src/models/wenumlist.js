import {
  GetWeNumUserList,
  GetWeNumUserListByInfo,
  GetUserInfoByUserId,
  GetWeNumUserGroupList,
  CreatWeNumUserGroup,
  WeNumUserGroupBind,
  GetWeNumUserGroupInfo,
  GetWeappUserGroupList,
  WeappUserGroupBind,
  CreatWeappUserGroup,
  GetWeappUserGroupInfo

} from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'wenumlist',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    admin_sys: {},
    userinfo: [],

    UserGroupList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(GetWeNumUserList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *setGetWeappUserGroupList(_, { put, call }) {
      const response = yield call(GetWeappUserGroupList);
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *setWeappUserGroupBind({ payload }, { call, put }) {
      const response = yield call(WeappUserGroupBind, payload);
      console.log(response);
    },
    *SelectByUserInfo({ payload }, { call, put }) {
      const response = yield call(GetWeNumUserListByInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *GetUserInfoByUserId({ payload }, { call, put }) {
      const response = yield call(GetUserInfoByUserId, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *setGetWeNumUserGroupList(_, { call, put }) {
      const response = yield call(GetWeNumUserGroupList);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *setCreatWeNumUserGroup({ payload }, { call, put }) {
      const response = yield call(CreatWeNumUserGroup, payload);
      //需要添加回传判断
      if (response.status == 'ok') {
        const response = yield call(GetWeNumUserGroupList);
        yield put({
          type: 'save',
          payload: response,
        });
      } else {
        message.error('错误');
      }
    },
    *setCreatWeappUserGroup({ payload }, { call, put }) {
      const response = yield call(CreatWeappUserGroup, payload);
      //需要添加回传判断
      if (response.status == 'ok') {
        const response = yield call(GetWeappUserGroupList);
        yield put({
          type: 'save',
          payload: response,
        });
       
      } else {
        message.error('错误');
      }
    },
    *setGetWeappUserGroupList2(_, { put, call }) {
      const response = yield call(GetWeappUserGroupList);
      console.log(response);
      yield put({
        type: 'saveUserGroup',
        payload: response,
      });
    },
    *setWeNumUserGroupListBind({ payload }, { call, put }) {
      //
      const response = yield call(WeNumUserGroupBind, payload);
      message.success('分组成功');
    },
    *resetGetWeNumUserGroupList(_, { call, put }) {
      const response = yield call(GetWeNumUserGroupList);
      yield put({
        type: 'setWeNumGroup',
        payload: response,
      });
    },
    
    *setGetWeNumUserGroupInfo({ payload }, { call, put }) {
      const response = yield call(GetWeNumUserGroupInfo, payload);
      yield put({
        type: 'setWeNumGroupUserList',
        payload: response,
      });
    },
    *setGetWeappUserGroupInfo({ payload }, { call, put }) {
      const response = yield call(GetWeappUserGroupInfo, payload);
      yield put({
        type: 'setWeNumGroupUserList',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, action) {
      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
        //pagination:action.pagination,
      };
    },
    show(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        userinfo: payload,
      };
    },
    saveUserGroup(state, { payload }) {
      return {
        ...state,
        UserGroupList: payload,
      };
    },
    setWeNumGroup(state, { payload }) {
      //console.log(payload);
      return {
        ...state,
        WeNumUserGroupList: payload.list,
      };
    },
    setWeNumGroupUserList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
