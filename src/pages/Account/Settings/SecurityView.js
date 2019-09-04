import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { List,Modal,Input,Form,Button,Icon } from 'antd';
import { connect } from 'dva';
// import { getTimeDistance } from '@/utils/utils';
const FormItem = Form.Item;

const passwordStrength = {
  strong: (
    <font className="strong">
      <FormattedMessage id="app.settings.security.strong" defaultMessage="Strong" />
    </font>
  ),
  medium: (
    <font className="medium">
      <FormattedMessage id="app.settings.security.medium" defaultMessage="Medium" />
    </font>
  ),
  weak: (
    <font className="weak">
      <FormattedMessage id="app.settings.security.weak" defaultMessage="Weak" />
      Weak
    </font>
  ),
};
@connect(({ user }) => ({
  AnQuan: user.AnQuan,
}))
@Form.create()
class SecurityView extends Component {
  state = { visible: false }

  showUpdatePsw = ()=>{
    this.setState({
      visible: true,
    });
  }
handleOk = (e) => {
    //console.log(e);
    e.preventDefault();
    const {dispatch} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type:'user/setUpdateAdminUserPsw',
          payload:values
        })
      }
    });
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  
  getData = (data,email) => [
    {
      title: formatMessage({ id: 'app.settings.security.password' }, {}),
      description: (
        <Fragment>
          {formatMessage({ id: 'app.settings.security.password-description' })}：
          {passwordStrength.strong}
        </Fragment>
      ),
      actions: [
        <a onClick={this.showUpdatePsw}>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    
  
    {
      title: formatMessage({ id: 'app.settings.security.email' }, {}),
      description: `${formatMessage(
        { id: 'app.settings.security.email-description' },
        {}
      )}：`+email,
      actions: [
        <a>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    }
   
  ];
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type:"user/setGetAdminUserPrInfo"
    })
    
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {

    const {AnQuan} = this.props;
    const { getFieldDecorator } = this.props.form;
    //console.log(AnQuan.email)
    

    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData(AnQuan.pswStrength,AnQuan.email)}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
        <Modal
          title="更改密码"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <Form>
        <FormItem
        >
          {getFieldDecorator('NowPsw', {
            rules: [{ required: true, message: '请输入当前密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="旧密码" />
          )}
        </FormItem>
        <FormItem
        >
          {getFieldDecorator('NewPsw', {
            rules: [{ required: true, message: '请输入新密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
          )}
        </FormItem>
      </Form>
        </Modal>
      </Fragment>
      
    );
  }
}

export default SecurityView;
