import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { AccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { wxlogin, query,WXLOGIN_A } from '../services/user';
import { wxbind } from '../services/api';
import { message } from 'antd';
import cookie from 'react-cookies';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // Login successfuly
      //{"status":"ok","type":"account","user_name":"admin","currentAuthority":"admin","time":"1536602929","token":"8a7fd2fe2d65080353d9c57c3701caae"}
      if (response.status === 'ok') {
        localStorage.setItem('user_name', response.user_name);
        localStorage.setItem('Authority', '"' + response.currentAuthority + '"');
        localStorage.setItem('DWList', JSON.stringify(response.data));

        //设置默认单位为第一个单位
        localStorage.setItem('dqdw', response.data[0]['Admin_DW_id']);
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      } else {
        if (response.msg) {
          message.error(response.msg);
        }
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *wxlogin({ payload }, { call, put }) {
      const response = yield call(wxlogin, payload);
      // console.log(response);
      if (response.openid && response.unionid) {
        //console.log('获取openid unionid 成功'+response.openid+response.unionid);
        cookie.save('l', response.unionid);
        cookie.save('i', response.openid);

        message.success('扫码成功，正在请求系统信息。');
        // 开始尝试根据openid / unionid 获取用户名 如果没有 跳转到绑定页面
        var value = {
          type: 'wechat',
          i: response.openid,
          l: response.unionid,
        };
        const rst = yield call(WXLOGIN_A, value);
        // console.log(rst)
        yield put({
          type: 'changeLoginStatus',
          payload: rst,
        });

        // Login successfuly
        //{"status":"ok","type":"account","user_name":"admin","currentAuthority":"admin","time":"1536602929","token":"8a7fd2fe2d65080353d9c57c3701caae"}
        if (rst.status === 'ok') {
          
          localStorage.setItem('user_name', rst.user_name);
          localStorage.setItem('Authority', '"' + rst.currentAuthority + '"');
          localStorage.setItem('DWList', JSON.stringify(rst.data));
  
          //设置默认单位为第一个单位
          localStorage.setItem('dqdw', rst.data[0]['Admin_DW_id']);
          reloadAuthorized();
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
              if (redirect.startsWith('/#')) {
                redirect = redirect.substr(2);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }
          yield put(routerRedux.replace(redirect || '/'));

        } else if (rst.status === 'error') {
          cookie.save('i', rst.openid);
          message.error('未检测到已绑定账户，请先完成账户绑定。');
          yield put(
            routerRedux.push({
              pathname: '/user/wxbind',
            })
          );
        }
      } else {
        message.error('未能成功扫码登陆');
      }
    },
    //微信绑定
    *wxbind({ payload }, { call, put }) {
      var response = yield call(wxbind, payload);
      //console.log(response);
      if (response.status === 'ok') {
        message.success(response.msg);
        yield put(
          routerRedux.push({
            pathname: '/user/login',
          })
        );
      } else {
        message.error(response.msg);
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      localStorage.clear();
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
