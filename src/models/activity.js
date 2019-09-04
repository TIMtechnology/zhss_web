import { opensignin,closesignin,Secondsignup } from '../services/api';
import { getactlist } from '../services/user';
import { notification } from 'antd';
import Search from 'antd/lib/input/Search';

export default {
    namespace: 'activity',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(getactlist);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *opensignin({payload},{call,put}){
            const response = yield call(opensignin,payload);
           //console.log(response.error);
           //message.success(response);
           if(response.error!=0){
              
               notification.error({
                   message:'错误提醒',
                   description:response.msg
               })
           }else{
            notification.success({
                message:'成功提醒',
                description:response.msg
            })
           }
        },
        *closesignin({payload},{call,put}){
            const response = yield call(closesignin,payload);
          // console.log(response.error);
           //message.success(response);
           if(response.error!=0){
            notification.error({
                message:'错误提醒',
                description:response.msg
            })
           }else{
            notification.success({
                message:'成功提醒',
                description:response.msg
            })
           }
        },
        *Secondsignup({payload},{call,put}){
            const response =  yield call(Secondsignup,payload);
            console.log(response)
            if(response.error!=0){
                notification.error({
                    message:'错误提醒',
                    description:response.msg
                })
               }else{
                notification.success({
                    message:'成功提醒',
                    description:response.msg
                })
               }
        },
        *searchByInfor({payload},{call,put}){
            const response = yield call(searchByInfor,payload);
            console.log(response);
            yield put({
                type: 'save',
                payload: response,
            });
        }
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
        
    },
};
