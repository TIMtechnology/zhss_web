import {
  CreatPubAct,
  UpdateActInfoFirst,
  ChengeActSign,
  GetDWJSByActID,
  UpdateUserForDW,
  GetActArea,
  CurltoPHP,
} from '@/services/api';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { notification } from 'antd';
export default {
  namespace: 'act',

  state: {
    step: {},
  },

  effects: {
    *fetch(_, { call, put }) {},
    *setCreartPubact({ payload }, { call, put }) {
      const rest = yield call(CreatPubAct, payload);
      console.log(rest);
      if (rest.error != 0) {
        notification.error({
          message: '错误提醒',
          description: rest.msg,
        });
      } else {
        notification.success({
          message: '成功提醒',
          description: rest.msg,
        });
      }
    },
    *setUpdateActInfoFirst({ payload }, { call, put }) {
      const rest = yield call(UpdateActInfoFirst, payload);
      console.log(rest);
      if (rest.error != 0) {
        notification.error({
          message: '错误提醒',
          description: rest.msg,
        });
      } else {
        notification.success({
          message: '成功提醒',
          description: rest.msg,
        });
      }
    },
    *setChengeActSign({ payload }, { call, put }) {
      const ret = yield call(ChengeActSign, payload);
      console.log(ret);
    },
    *setGetDWJSByActID({ payload }, { call, put }) {
      const ret = yield call(GetDWJSByActID, payload);
      console.log(ret);
      yield put({
        type: 'saveDWJS',
        payload: ret,
      });
    },
    *setUpdateUserForDW({ payload }, { call, put }) {
      const ret = yield call(UpdateUserForDW, payload);
      console.log(ret);
    },
    *setGetActArea({ payload }, { call, put }) {
      const ret = yield call(GetActArea, payload);
      if (ret.error != 1) {
        yield put({
          type: 'saveActArea',
          payload: ret.list,
        });
      }
    },
    *setCurltoPHP({ payload }, { call, put }) {
      const ret = yield call(CurltoPHP, payload);
      console.log(ret);
    },
  },

  reducers: {
    // 缓存分步数据
    saveStepData(state, { payload }) {
      // console.log(payload)
      localStorage.setItem('base', JSON.stringify(payload));

      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    saveDWJS(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveActArea(state, { payload }) {
      return {
        ...state,
        ActArea: payload,
      };
    },
  },
};
