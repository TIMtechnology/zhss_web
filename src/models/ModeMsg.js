import { GetModeMsgInfoList, SendModeMsgByAdminUser } from '../services/api';
import { checkupmsg } from '../services/user';
import Search from 'antd/lib/input/Search';


export default {
  namespace: 'ModeMsg',

  state: {
    MsgInfo: [],
    MsgList: [],
  },

  effects: {
    *setGetModeMsgInfoList({ payload }, { call, put }) {
      const rep = yield call(GetModeMsgInfoList, payload);
      console.log(rep);
      yield put({
        type: 'saveMsgList',
        payload: rep,
      });
    },
    *setGetModeMsgInfoList2({ payload }, { call, put }) {
      const rep = yield call(GetModeMsgInfoList, payload);
      console.log(rep);
      yield put({
        type: 'saveMsgList2',
        payload: rep,
      });
    },
    *setSendModeMsgByAdminUser({ payload }, { call, put }) {
      const rep = yield call(SendModeMsgByAdminUser, payload);
      console.log(rep);
    },
    *setcheckupmsg({payload},{call,put}){
      const rep = yield call(checkupmsg,payload);
      console.log(rep);
    }
  },

  reducers: {
    saveMsgList(state, { payload }) {
      return {
        ...state,
        MsgList: payload,
      };
    },
    saveMsgList2(state, { payload }) {
      return {
        ...state,
        MsgInfo: payload,
      };
    },
  },
};
