import {
  queryRule,
  removeRule,
  addRule,
  getUserList,
  getActList,
  selectbyinfo,
  getuserallinfo,
  GetZhiWuList,
  SetWeAppUserZhiWu,

} from '../services/api';
import { get_num } from '../services/user';
import { message } from 'antd';

export default {
  namespace: 'weapplist',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    admin_sys: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getUserList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchActList({ payload }, { call, put }) {
      const response = yield call(getActList, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
    },
    *fetchuserinfo({ payload }, { call, put }) {
      //已被使用
      console.log(payload);
      const response = yield call(getuserallinfo, payload);
      console.log(response);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *setGetZhiWuList({payload},{call,put}){
      const response = yield call(GetZhiWuList);
      yield put({
        type:'saveZhiWuList',
        payload:response
      })
    },
    *setSetWeAppUserZhiWu({payload},{call,put}){
      const response =  yield call(SetWeAppUserZhiWu,payload);
      if(response.status == 'ok'){
        message.success("执行成功,请刷新数据缓存查看");
      }else{
        message.warn('执行未成功');
      }
    }
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
    saveZhiWuList(state, action) {
      return {
        ...state,
        ZhiWuList: action.payload,
        //pagination:action.pagination,
      };
    },
    save2(state, action) {
      console.log(action.payload);
      return {
        ...state,
        data: action.payload,
        //pagination:action.pagination,
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
