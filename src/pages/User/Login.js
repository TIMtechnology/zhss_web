import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';


const { Tab, UserName, Password, Submit } = Login;



@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))

class LoginPage extends Component {

  constructor(props) {
    super(props);

    var code = this.props.location.query.code;

    var state = this.props.location.query.state;
    this.setState({
      state: state,
      code: code
    })
    if (!code || !state) {

    } else {
      localStorage.setItem('use_wechat', 1);
      const { dispatch } = this.props;
      dispatch({
        type: 'login/wxlogin',
        payload: {
          code: code,
          state: state
        }
      })
    }
  }

  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });


  };




  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
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
    const { type, autoLogin } = this.state;
    var redirect_uri = encodeURIComponent('http://dl.hbygxh.org/#/user/login');


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
          <Tab key="account" tab="账户密码登录">
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
            <Submit loading={submitting}>登录</Submit>
            <div>
              <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                自动登录
            </Checkbox>

              <a style={{ float: 'right' }} href="">
                忘记密码
            </a>
            </div>

            {/* <div className={styles.other}>
              其他登录方式
            <Icon type="wechat" className={styles.icon} theme="outlined" onClick={this.onclick_wechat} />

            </div> */}
          </Tab>
          <Tab key="wx" tab="微信扫码登陆">
            <iframe width={400} height={400} scrolling={'no'} frameBorder='0' src={'https://open.weixin.qq.com/connect/qrconnect?appid=wx8c6acaaefbbeffb0&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login&login_type=jssdk&state=1#wechat_redirect'}>

            </iframe>
          </Tab>




        </Login>
      </div>

    );
  }
}

export default LoginPage;
