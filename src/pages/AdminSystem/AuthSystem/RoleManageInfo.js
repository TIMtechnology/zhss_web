import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { List, Card, Divider, Button, Modal, TreeSelect, Form, message } from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const confirm = Modal.confirm;
@connect(({ AuthSystem, loading }) => ({
  AuthSystem,
  loading: loading.effects['AuthSystem/GetRoleManageInfo'],
}))
export default class BasicProfile extends Component {
  state = {
    visible: false,
    value: ['QXMV_1'],
    infolist: [],
  };

  constructor(props) {
    super(props);
    console.log(props.location.query);
    this.setState({
      url: props.location.query,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'AuthSystem/GetRoleManageInfo',
      payload: this.props.location.query,
    });
    dispatch({
      type: 'AuthSystem/GetUnitAuthListByUnitId',
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
          },
        });
      },
      onCancel() {},
    });
  };

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
      console.log(this.state.value);
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
    const { info, list } = AuthSystem;
    // let goodsData = [];

    //var name = info[0]['Admin_JS_name'];
    if (AuthSystem.info != null && AuthSystem.info != '') {
      var name = '角色权限清单:' + info[0]['Admin_JS_name'];
      this.state.infolist = AuthSystem.info;
    } else {
      var name = '角色权限清单';
    }

    //onClick={() => this.handleModalVisible(true)}
    const tProps = {
      treeData: list,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择要添加的权限',
      style: {
        width: 300,
      },
    };
    return (
      <PageHeaderWrapper title={name}>
        <Card bordered>
          <div>
            <Button icon="plus" type="primary" onClick={this.showModal}>
              添加权限
            </Button>
          </div>
          <Divider />
          <Modal
            title="添加角色权限"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <TreeSelect {...tProps} />
          </Modal>
          <List
            grid={{ gutter: 8, column: 3 }}
            dataSource={this.state.infolist}
            renderItem={item => (
              <List.Item>
                <Card
                  title={item.Admin_QX_URL}
                  extra={<a onClick={this.showDeleteConfirm.bind(this, item.Admin_QX_id)}>删除</a>}
                >
                  <p>
                    权限ID:
                    {item.Admin_QX_id}
                  </p>
                  <p>
                    权限名称:
                    {item.Admin_QX_name}
                  </p>
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
