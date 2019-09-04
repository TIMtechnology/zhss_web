import { message } from 'antd';
import {
  queryFakeList,
  removeFakeList,
  addFakeList,
  updateFakeList,
  getlunbolist,
  saveLunbolist,
  delLunbolist,
} from '@/services/api';

export default {
  namespace: 'list',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      console.log('1');
      const response = yield call(getlunbolist);

      console.log(response);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *add(_, { call, put }) {
      const response = yield call(getlunbolist);
      response.push({
        lb_id: '',
        lb_img_url: 'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
        lb_type: 'huodong',
        lb_content: '',
        lb_tittle: '',
        lb_link: '',
      });
      yield put({
        type: 'queryList',
        payload: response,
      });
    },

    *save({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(saveLunbolist, payload);
      console.log(response);
      if (response == 1) {
        message.success('提交成功,刷新页面');
        const response = yield call(getlunbolist);
        yield put({
          type: 'queryList',
          payload: response,
        });
      } else {
        message.success('处理失败,刷新页面');
        const response = yield call(getlunbolist);
        yield put({
          type: 'queryList',
          payload: response,
        });
      }
    },

    *del({ payload }, { call, put }) {
      // console.log(payload);
      // console.log(payload.lb_id);
      if (payload.lb_id == '') {
        const response = yield call(getlunbolist);
        yield put({
          type: 'queryList',
          payload: response,
        });
      } else {
        const response = yield call(delLunbolist, payload);
        console.log(response);
        if (response == 1) {
          message.success('提交成功,刷新页面');
          const response = yield call(getlunbolist);
          yield put({
            type: 'queryList',
            payload: response,
          });
        } else {
          message.success('处理失败,刷新页面');
          const response = yield call(getlunbolist);
          yield put({
            type: 'queryList',
            payload: response,
          });
        }
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
