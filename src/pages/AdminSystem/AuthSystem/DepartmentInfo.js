import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { List, Card, Divider, Button, Modal, TreeSelect, Form, message, Table } from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const confirm = Modal.confirm;
@connect(({ AuthSystem, loading }) => ({
  AuthSystem,
  loading: loading.effects['AuthSystem/setGetBMUserList'],
}))
export default class BasicProfile extends Component {
  state = {
    visible: false,
    value: ['JCGN'],
    infolist: {},
  };

  constructor(props) {
    super(props);
  
    this.setState({
      url: props.location.query,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'AuthSystem/setGetBMUserList',
      payload: this.props.location.query,
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showDeleteConfirm = e => {
    
    var that = this;
  
    confirm({
      title: '确定删除该权限吗？',
      content: '临时删除将会在系统缓存近30天，如果未进行恢复，将永久删除',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const { dispatch } = that.props;
      
       
        //点击删除 对当前权限进行删除
        dispatch({
          type: 'AuthSystem/DelRoleAuth',
          payload: {
            AuthId: e,
            ...that.props.location.query,
          }
        })
      },
      onCancel() {
        
      },
    });
  }
 
  handleOk = e => {
   
    this.setState({
      visible: false,
    });
    //开始检测 value 中 是否包含可用数据

    
    if (this.state.value.length == 0) {
      message.error('您未进行选择权限');
    } else {
      //开始进行数据封装
      const { dispatch } = this.props;
      dispatch({
        type: 'AuthSystem/RoleAuthUpdate',
        payload: {
          data: this.state.value,
          ...this.props.location.query,
        },
      });
    }
  };
  onChange = value => {
   
    this.setState({ value });
  };
  handleCancel = e => {
   
    this.setState({
      visible: false,
    });
  };
  render() {
    const { AuthSystem, loading } = this.props;
    const { BMUserList } = AuthSystem;
    // let goodsData = [];
  
  console.log(BMUserList);
    //var name = info[0]['Admin_JS_name'];

    const columns = [{
        title: '部门名称',
        dataIndex: 'Admin_BM_name',
        key: 'BMname',
      }, {
        title: '用户姓名',
        dataIndex: 'Admin_userinfo_name',
        key: 'UserName',
      }, {
        title: '用户账户',
        dataIndex: 'Admin_user_num',
        key: 'UserNum',
      }];
    //onClick={() => this.handleModalVisible(true)}
    
    return (
      <PageHeaderWrapper title="部门用户列表" >
        <Card bordered>
         <Table dataSource={BMUserList} columns={columns} >

         </Table>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
