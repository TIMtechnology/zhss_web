import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import {message} from 'antd';
import cookie from 'react-cookies';

const { Tab, UserName, Password, Submit } = Login;



@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/wxbind'],
}))

class LoginPage extends Component {

  
  state = {
    type: 'account',
  };

  onTabChange = type => {
    this.setState({ type });
  };




  handleSubmit = (err, values) => {
    const { type } = this.state;
    console.log(location.query)
    var unionid = cookie.load('l');
    var openid = cookie.load('i');
    

    if(openid && unionid ){
        if (!err) {
            const { dispatch } = this.props;
            dispatch({
              type: 'login/wxbind',
              payload: {
                ...values,
                type,
                i:openid,
                l:unionid,
              },
            });
          }
    }else{
        message.error('未检测到相关信息 无法进行绑定。请重新进行微信授权。')
    }
    
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;


    return (
      <div className={styles.main}>

        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="微信账号绑定验证">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误')}
            <UserName name="userName" placeholder="请输入账号" />
            <Password
              name="password"
              placeholder="请输入密码"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </Tab>
          <Submit loading={submitting}>绑定</Submit>
        </Login>
      </div>

    );
  }
}

export default LoginPage;
