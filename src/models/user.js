import { query as queryUsers, queryCurrent,get_num,getAdminuserBMList,
  UpdateUserPublicInfo,GetAdminUserPrInfo,UpdateAdminUserPsw,UpdateAdminUserWxbind } from '@/services/user';
import { routerRedux } from 'dva/router';
import {message} from 'antd';
export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    Num:[],
    UBMList:[],
    AnQuan:[],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      let user_name = localStorage.getItem('user_name');
      const response = yield call(queryCurrent, { userName: user_name });
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *setGetNum(_,{call,put}){
      const response = yield call(get_num);
    //  console.log(response);
      yield put({
        type: 'saveNum',
        payload: response,
      });
    },
    *setgetAdminuserBMList(_,{call,put}){
      const response = yield call(getAdminuserBMList);
      console.log(response);
      yield put({
        type: 'saveUBMList',
        payload: response,
      });
    },
    *setGetAdminUserPrInfo(_,{call,put}){
      const response = yield call(GetAdminUserPrInfo);
      //console.log(response);
      yield put({
        type: 'saveAnQuan',
        payload: response,
      });
    },
    *setUpdateUserPublicInfo({payload},{call,put}){
      yield call(UpdateUserPublicInfo,payload);
     
      //刷新
      yield put(routerRedux.push('/account/settings/base'));
    }
    ,
    *setUpdateAdminUserPsw({payload},{call,put}){
      const response = yield call(UpdateAdminUserPsw,payload);
      console.log(response);
      if(response.status == 'ok'){
        message.success("修改成功")
      }else{
        message.error("修改失败")
      }
    },
    *setUpdateAdminUserWxbind(_,{call,put}){
      const response = yield call(UpdateAdminUserWxbind);
      if(response.status == 'ok'){
        message.error("修改成功，请刷新当前页面")
      }else{
        message.error("修改失败")
      }
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveNum(state,{payload}){
      return{
        ...state,
        Num:payload
      }
    },
    saveAnQuan(state,{payload}){
      return{
        ...state,
        AnQuan:payload
      }
    },
    
    saveUBMList(state,{payload}){
      return{
        ...state,
        UBMList:payload
      }
    }
    ,
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
