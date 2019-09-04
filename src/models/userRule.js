import { queryRule, removeRule, addRule,selectbyinfo } from '@/services/api';
import {get_num} from '@/services/user';

export default {
  namespace: 'userRule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    admin_sys:{},
  },

  effects: {
    *selectbyinfo({ payload }, { call, put }) {
      const response = yield call(selectbyinfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getsysinfo({ payload }, { call, put }) {
      const response = yield call(get_num, payload);
      yield put({
        type: 'savesysinfo',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    // *addadminuser({payload},{call,put}){
    //   const response = yield call(this.addadminuser,payload)
    //   yield puy({
    //     type:'save',
    //     payload:response,
    //   })
    // }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    savesysinfo(state, action) {
      return {
        ...state,
        admin_sys: action.payload,
      };
    },
  },
};
