import { GetDWInfo,UpdateDWInfo } from '@/services/api';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { notification } from 'antd';
export default {
  namespace: 'Unit',

  state: {
    step: {},
    
  },

  effects: {
    *fetch(_, { call, put }) {

    },
   *setGetDWInfo({payload},{call,put}){
      const y =  yield call(GetDWInfo,payload);
      
      yield put({
        type:"saveDWInfo",
        payload:y
      })
       
      yield put({
        type:"saveDWInfo",
        payload:y
      })
   },
   *setUpdateDWInfo({payload},{call,put}){
    const y = yield call(UpdateDWInfo,payload);
    console.log(y);
   }

  },

  reducers: {

    
    saveDWInfo(state,{payload}){
      
      return {
        ...state,
        info:payload
      }
    }


  },
};
