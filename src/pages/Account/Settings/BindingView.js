import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Icon, List,Modal } from 'antd';
import { connect } from 'dva';
const confirm = Modal.confirm;

@connect(({ user }) => ({
  AnQuan: user.AnQuan,
}))
class BindingView extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
   // console.log(e);
    this.setState({
      visible: false,
    });
  }
  getData = () => [
    {
      title: formatMessage({ id: 'app.settings.binding.wechat' }, {}),
      description: formatMessage({ id: 'app.settings.binding.wechat-description-not' }, {}),
      actions: [
        <a onClick={this.showModal}>
          <FormattedMessage id="app.settings.binding.bind" defaultMessage="Bind" />
        </a>,
      ],
      avatar: <Icon type="wechat" className="taobao" />,
    }
 
   
  ];
  getbindData = () => [
    {
      title: formatMessage({ id: 'app.settings.binding.wechat' }, {}),
      description: formatMessage({ id: 'app.settings.binding.wechat-description' }, {}),
      actions: [
        <a onClick={this.qxbind}>
          <FormattedMessage id="app.settings.binding.QXbind" defaultMessage="QXBind" />
        </a>,
      ],
      avatar: <Icon type="wechat" className="taobao" />,
    }
 
   
  ];
  qxbind = ()=>{
    const {dispatch} = this.props;
    confirm({
      title: '您确定取消绑定该微信账号吗？',
      content: '未来将提供该微信头像内容等。',
      onOk() {
        dispatch({
          type:'user/setUpdateAdminUserWxbind'
        })
      },
      onCancel() {
       // console.log('Cancel');
      },
    });
  }
//   wxbind = ()=>{
   
//     var redirect_uri =  encodeURIComponent('https://app.hbygxh.org/#/user/login') ; 
// <Fragment><iframe width={300} height={400} scrolling ={'no'} frameBorder='0' allowTransparency='true'  src={'https://open.weixin.qq.com/connect/qrconnect?appid=wx8c6acaaefbbeffb0&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_login&state=1#wechat_redirect'}>

//             </iframe></Fragment>
    
       
//   }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type:"user/setGetAdminUserPrInfo"
    })
   
  }


  render() {
    const {AnQuan} = this.props;
    //console.log(AnQuan);
    var isbind = 0;
    if(AnQuan.wxbind !=false){
      isbind  =1;
    }else{
      isbind = 0;
    }
    var redirect_uri =  encodeURIComponent('http://dl.hbygxh.org/#/user/login') ;
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={(isbind == 1)?this.getbindData():this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta
                avatar={item.avatar}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
         <Modal
          title="微信扫码登陆"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <div>
        <iframe width={450} height={400} scrolling ={'no'} frameBorder='0'   src={'https://open.weixin.qq.com/connect/qrconnect?appid=wx8c6acaaefbbeffb0&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_login&state=1#wechat_redirect'}>
             </iframe>
        </div>
          
        </Modal>
      </Fragment>
    );
  }
}

export default BindingView;
