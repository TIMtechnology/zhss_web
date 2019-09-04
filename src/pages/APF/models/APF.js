
import { CreatAPF, GetDwAPFList,GetAPFInfo,GetWeatringForMeAPF,RunAPF,CuiYiXia,SetAPFUser } from '@/services/apf'
import { notification } from 'antd';
import Search from 'antd/lib/input/Search';


export default {
    namespace: 'APF',

    state: {
        data:[],
        info:[],
        advancedOperation1:[],
        advancedOperation2:[],
        advancedOperation3:[],
        dataWM:[],
    },

    effects: {
        *setCreatAPF({ payload }, { call, put }) {
            //修改payload内容
            //检测payload中 图片以及压缩文件 删除file

            if (payload.FlowImg != undefined) {
                payload.FlowImg.file = null;
                payload.FlowImg.fileList.forEach(e => {
                    e.thumbUrl = null;
                });
            }


            const res = yield call(CreatAPF, payload)
            console.log(res)
        },
        *setGetDwAPFList({ payload }, { call, put }) {
            const res = yield call(GetDwAPFList, payload)
            console.log(res)
            yield put({
                type: 'saveAPFList',
                payload: res,
            });
        },
        *setGetAPFInfo({payload},{call,put}){
            const rest = yield call(GetAPFInfo,payload);
            console.log(rest);
            yield put({
                type: 'saveAPFInfo',
                payload: rest,
            });
        }
        ,
        *setGetWeatringForMeAPF({payload},{call,put}){
                const res = yield call(GetWeatringForMeAPF,payload);
                console.log(res);
                yield put({
                    type: 'saveAPFListWM',
                    payload: res,
                });
        },
        *setRunAPF({payload},{call,put}){
            const res = yield call(RunAPF,payload);
            console.log(res);
            console.log('payload:'+payload)
    },
        *setCuiYiXia({payload},{call}){
            const res = yield call(CuiYiXia,payload);
            console.log(res);
        },
       
    },


    reducers: {
        saveAPFList(state, { payload }) {
            return {
                ...state,
                data:payload.data
            }
        },
        saveAPFInfo(state, {payload} ) {
            return {
                ...state,
                info:payload.data
            }
        },
        saveAPFListWM(state, { payload }) {
            return {
                ...state,
                dataWM:payload.data
            }
        },

    },
};
