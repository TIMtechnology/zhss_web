//import { query as queryUsers, queryCurrent } from '@/services/user';
import {
  actInfo,
  queryNotices,
  addactAreatb,
  CheckActUserIsTrained,
  GetAdminDWJSList,
  getlunbolist,
  GetActUserListByActId,
  getactallinfo,
  GetDWList,
  GetBMListByDwId,
  GetBMServiceByBMid,
} from '@/services/api';
import { getRegion } from '@/services/user';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
export default {
  namespace: 'weappact',

  state: {
    step: [],
    data: [],
    city: [],
    notice: [],
    list: [],
    DWList: [],
    BMList: [],
    ServiceList: [],
    ActUserList: [],
    AdminDWJSList: [],
  },

  effects: {
    *submitRegularForm({ payload }, { call, put }) {
      yield call(addactAreatb, payload);
      message.success('提交成功');
      yield put(routerRedux.push('/weapp/activity/act-admin/result'));
    },
    *setGetDWList({ payload }, { call, put }) {
      const res = yield call(GetDWList);
      console.log(res);
      yield put({
        type: 'saveDWList',
        payload: res,
      });
    },
    *setCheckActUserIsTrained({ payload }, { call, put }) {
      const res = yield call(CheckActUserIsTrained, payload);
      console.log(res);
    },
    *setGetBMListByDwId({ payload }, { call, put }) {
      const res = yield call(GetBMListByDwId, payload);
      console.log(res);
      yield put({
        type: 'saveBMList',
        payload: res,
      });
    },
    *setGetBMServiceByBMid({ payload }, { call, put }) {
      const res = yield call(GetBMServiceByBMid, payload);
      console.log(res);
      yield put({
        type: 'saveServiceList',
        payload: res,
      });
    },
    *setGetAdminDWJSList({ payload }, { call, put }) {
      const res = yield call(GetAdminDWJSList, payload);
      console.log(res);
      yield put({
        type: 'saveGetAdminDWJSList',
        payload: res,
      });
    },
    // /GetActUserListByActId
    *setGetActUserListByActId({ payload }, { call, put }) {
      const res = yield call(GetActUserListByActId, payload);
      console.log(res);
      yield put({
        type: 'saveActUserList',
        payload: res,
      });
    },
    *submitStepForm({ payload }, { call, put }) {
      const res = yield call(actInfo, payload);
      console.log(res);
      yield put({
        type: 'saveStepFormData',
        payload: res,
      });
      yield put(routerRedux.push('/weapp/activity/act-admin/confirm'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(actInfo, payload);
      message.success('提交成功');
    },
    *getRegion({ payload }, { call, put }) {
      console.log('到达后台');
      const res = yield call(getRegion, payload);

      yield put({
        type: 'save',
        payload: res,
      });
    },
    *getNotice(_, { call, put }) {
      const res = yield call(queryNotices);
      yield put({
        type: 'updateNotice',
        payload: res,
      });
    },
    *fetch(_, { call, put }) {
      console.log('1');
      const response = yield call(getlunbolist);
      console.log(response);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *GetActInfo({ payload }, { call, put }) {
      const response = yield call(getactallinfo, payload);
      console.log(response);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          id: payload,
        },
        loading: false,
      };
    },
    saveGetAdminDWJSList(state, { payload }) {
      return {
        ...state,
        AdminDWJSList: payload,
      };
    },

    save(state, { payload }) {
      // console.log(payload)
      return {
        ...state,
        data: {
          ...payload,
        },
      };
    },
    saveDWList(state, { payload }) {
      // console.log(payload)
      return {
        ...state,
        DWList: payload,
      };
    },
    saveBMList(state, { payload }) {
      // console.log(payload)
      return {
        ...state,
        BMList: payload,
      };
    },
    saveServiceList(state, { payload }) {
      // console.log(payload)
      return {
        ...state,
        ServiceList: payload,
      };
    },
    saveActUserList(state, { payload }) {
      // console.log(payload)
      return {
        ...state,
        ActUserList: payload,
      };
    },
    setcity(state, { payload }) {
      return {
        ...state,
        city: {
          ...payload,
        },
      };
    },
    updateNotice(state, { payload }) {
      return {
        ...state,
        nocice: {
          ...payload,
        },
      };
    },
    queryList(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        list: {
          payload,
        },
      };
    },
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
