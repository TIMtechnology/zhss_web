import {
    GetCityList,
    GetCountyList,
    CreatOlderJiaTing,
    GetOlderJiaTingList,
    GetOlderServiceList,
    GetOlderInfoByPhoneNum,
    CreatOlderOrder,
    GetOlderOrderListbyGLDW,
    GetOlderOrderListbyXJDW,
    XJDWJD,
    GetOlderOrderListbyBDW,
    BDWUserJD,
    GetUserWXbindByDWid,
    GetOlderOrderListbyFWRY,
    BDWAdminFP,
    GetOlderHomeOrderListByOlderId,
    GetAdminUserOrderList,
    GetOrderInfoByOrderId,

} from '@/services/api';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

const that = this;
export default {
    namespace: 'Order',

    state: {
        data: [],
        list: [],
        OlderOrderList: [],
        AdminUserOrderList:[]
        
    },



    effects: {

        *setGetCityList(_, { call, put }) {
            const response = yield call(GetCityList);
            console.log(response)
            yield put({
                type: "saveOptions",
                payload: {
                    options: response
                }
            })
        },
        *setGetCountyList({ payload }, { call, put }) {
            const response = yield call(GetCountyList, payload);
            console.log(response)
            yield put({
                type: "saveNewlist",
                payload: {
                    Newlist: response
                }
            })
        },
        *setCreatOlderJiaTing({ payload }, { call, put }) {
            const response = yield call(CreatOlderJiaTing, payload);
            console.log(response)
            // 未进行结果判断 需要添加部分代码
            if (response.status == 'ok') {
                message.success('添加成功,正在跳转')
                yield put(routerRedux.push('/Order/OlderHome/List'));
            } else {
                message.error('添加失败、原因需通过数据库错误日志查看。')
            }
        },
        *setGetOlderJiaTingList({ payload }, { call, put }) {
            const response = yield call(GetOlderJiaTingList, payload);
            console.log(response);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *setGetOlderServiceList(_, { call, put }) {
            const response = yield call(GetOlderServiceList);
            console.log(response);
            yield put({
                type: 'saveOlderServiceList',
                payload: response,
            });

        },
        *setGetOlderInfoByPhoneNum({ payload }, { call, put }) {

            const response = yield call(GetOlderInfoByPhoneNum, payload);
            console.log(response);

            yield put({
                type: 'saveOlderInfo',
                payload: response,
            });
        },
        *setCreatOlderOrder({ payload }, { call, put }) {

            const response = yield call(CreatOlderOrder, payload);
            console.log(response);
            //如果成功 进入订单详情页面
            if (response.status == 'ok') {
                message.success('添加成功,未添加自动返回，请手动返回或刷新')
            } else {
                message.error('添加失败、原因需通过数据库错误日志查看。')
            }

        },
        *setGetOlderOrderListbyGLDW({ payload }, { call, put }) {
            const response = yield call(GetOlderOrderListbyGLDW, payload);
            console.log(response);
            yield put({
                type: 'saveOlderOrderList',
                payload: response,
            });

        },
        *setGetOlderOrderListbyXJDW({ payload }, { call, put }) {
            const response = yield call(GetOlderOrderListbyXJDW, payload);
            console.log(response);
            yield put({
                type: 'saveOlderOrderList',
                payload: response,
            });

        },
        *setGetOlderOrderListbyBDW({ payload }, { call, put }) {
            const response = yield call(GetOlderOrderListbyBDW, payload);
            console.log(response);
            yield put({
                type: 'saveOlderOrderList',
                payload: response,
            });

        },
        *setGetOlderOrderListbyFWRY({ payload }, { call, put }) {
            const response = yield call(GetOlderOrderListbyFWRY, payload);
            console.log(response);
            yield put({
                type: 'saveOlderOrderList',
                payload: response,
            });

        },
        *setXJDWJD({ payload }, { call, put }) {
            const response = yield call(XJDWJD, payload);
            console.log(response);
            if (response.status == 'ok') {
                message.success('接单成功，请到本单位订单中心查看并分配给服务人员。');
                const response = yield call(GetOlderOrderListbyXJDW);
                console.log(response);
                yield put({
                    type: 'saveOlderOrderList',
                    payload: response,
                });
            } else {
                message.error('失败，订单可能已被接单或缓存数据已过期，请刷新数据。')
            }
        },
        *setBDWUserJD({ payload }, { call, put }) {
            const response = yield call(BDWUserJD, payload);
            console.log(response);
            if (response.status == 'ok') {
                message.success('接单成功，请到微信小程序中查看订单。');
                const response = yield call(GetOlderOrderListbyFWRY, payload);
                console.log(response);
                yield put({
                    type: 'saveOlderOrderList',
                    payload: response,
                });
            } else {
                message.error(response.msg)
            }
        },
        *setBDWAdminFP({ payload }, { call, put }) {
            const response = yield call(BDWAdminFP, payload);
            console.log(response);
            if (response.status == 'ok') {
                message.success('分配成功。');
                const response = yield call(GetOlderOrderListbyBDW, payload);
                console.log(response);
                yield put({
                    type: 'saveOlderOrderList',
                    payload: response,
                });
            } else {
                message.error(response.msg)
            }
        },
        //GetUserWXbindByDWid
        *setGetUserWXbindByDWid(_, { call, put }) {
            const response = yield call(GetUserWXbindByDWid);
            //console.log(response);
            yield put({
                type: 'savewxbindUserlist',
                payload: response,
            });
        },
        *setGetOlderHomeOrderListByOlderId({payload},{call,put}){
            const response = yield call(GetOlderHomeOrderListByOlderId,payload);
            console.log(response)
            yield put({
                type: 'saveOlderOrderList',
                payload: response,
            });
        },
        *setGetAdminUserOrderList(_,{call,put}){
            const response = yield call(GetAdminUserOrderList);
            console.log(response)
            yield put({
                type: 'saveAdminUserOrderList',
                payload: response,
            });
        },
        *setGetOrderInfoByOrderId({payload},{call,put}){
            const response = yield call(GetOrderInfoByOrderId,payload);
            console.log(response)
            yield put({
                type: 'saveAdminUserOrderInfo',
                payload: response,
            });
        }

    },

    reducers: {
        saveOptions(state, { payload }) { //更新城市列表
            return {
                ...state,
                ...payload
            };
        },
        saveNewlist(state, { payload }) {  //更新区域列表
            return {
                ...state,
                ...payload
            }
        },
        save(state, { payload }) {  //更新养老家庭列表
            console.log(payload);
            return {
                ...state,
                data: payload,
                //pagination:action.pagination,
            };
        },
        saveOlderServiceList(state, { payload }) { //养老服务类型列表
            return {
                ...state,
                ...payload
            }
        },
        saveOlderInfo(state, { payload }) { //养老家庭信息

            return {
                ...state,
                ...payload
            }
        },
        saveOlderOrderList(state, { payload }) { //更新养老订单列表
            console.log(payload)
            return {
                ...state,
                OlderOrderList: payload
            }
        },
        savewxbindUserlist(state, { payload }) {
            return {
                ...state,
                wxbindUserlist: payload
            }
        },
        saveAdminUserOrderList(state, { payload }) {
            return {
                ...state,
                AdminUserOrderList: payload
            }
        },
        saveAdminUserOrderInfo(state, { payload }) {
            return {
                ...state,
                AdminUserOrderInfo: payload
            }
        }
    }
};
