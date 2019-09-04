import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { List, Card, Divider, Button, Modal, TreeSelect, Form, message, Table,Input, Select } from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const {Option} = Select;


const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible,JSlist } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  var children = [];
  if (JSlist) {
      for (let i = 0; i < JSlist.length; i++) {

          children.push(<Option value={JSlist[i]['Admin_JS_id']} key={JSlist[i]['Admin_JS_id']}>{JSlist[i]['Admin_JS_name']}</Option>);
      }
  }

  return (
    <Modal
      title="通过职能培训"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="赋予角色">
        {form.getFieldDecorator('RoleId', {
          rules: [{ required: true, message: '请选择赋予用户的角色' }],
        })(<Select style={{width:'100%'}}>
            {children}
        </Select>)}
      </FormItem>
    </Modal>
  );
});

@connect(({ weappact, act,loading }) => ({
  ActUserList: weappact.ActUserList,
  act,
  loading: loading.effects['AuthSystem/setGetBMUserList'],
}))

@Form.create()
export default class BasicProfile extends Component {
  state = {
    visible: false,
    selectedRowKeys: [],
    modalVisible: false,
  };

  constructor(props) {
    super(props);

    console.log(props.location.query);
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      ActId:this.props.location.query
    })
    dispatch({
      type: 'weappact/setGetActUserListByActId',
      payload: this.props.location.query,
    });
    dispatch({
      type:'act/setGetDWJSByActID',
      payload:this.props.location.query
    })
  }

  onstart = () => {
    const { dispatch } = this.props;
    var query = this.props.location.query;
    var select = this.state.selectedRowKeys;
    console.log(query, select);
    dispatch({
      type: 'weappact/setCheckActUserIsTrained',
      payload: {
        ...query,
        UserId: select,
      },
    });
  };
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    console.log(fields)
    var select = this.state.selectedRowKeys;
    var query = this.props.location.query;
    dispatch({
      type:"act/setUpdateUserForDW",
      payload:{
        ...fields,
        ...query,
        UserId:select
      }
    })

  };
  
  render() {
    const { loading, ActUserList,act } = this.props;
    const { list } = act;
    // let goodsData = [];

    console.log(list)
    console.log(ActUserList);
    //var name = info[0]['Admin_JS_name'];

    const columns = [
      {
        title: '用户姓名',
        dataIndex: 'user_name',
        key: 'UserName',
      },
      {
        title: '用户状态',
        dataIndex: 'PAStep_userMode',
        key: 'PAStep_userMode',
      },
      {
        title:'已通过培训',
        dataIndex:'user_isTrain',
        key:'user_isTrain'
      }
    ];
    //onClick={() => this.handleModalVisible(true)}
    const { selectedRowKeys,modalVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      JSlist:list,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: '全选',
          onSelect: () => {
            this.setState({
              selectedRowKeys: [],
            });
            this.setState({
              selectedRowKeys: [
                ...ActUserList.map(function(item) {
                  return item.key;
                }),
              ], // 0...45
            });
            console.log(this.state.selectedRowKeys);
          },
        },
        {
          key: 'finsh',
          text: '已完成',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = [
              ...ActUserList.map(function(item) {
                if (item.userAct_mode == 7) {
                  return item.key;
                }
              }),
            ];

            console.log(newSelectedRowKeys);
            console.log(newSelectedRowKeys.length);
            for (let index = newSelectedRowKeys.length - 1; index >= 0; index--) {
              const element = newSelectedRowKeys[index];
              console.log(index, element);
              if (element == undefined || element == 'undefined') {
                newSelectedRowKeys.splice(index, 1);
              }
            }

            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
      onSelection: this.onSelection,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <PageHeaderWrapper title="报名人员列表">
        <Card bordered>
          <Button type="primary" onClick={() => this.handleModalVisible(true)} disabled={!hasSelected} loading={loading}>
            通过职能培训
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `已选择 ${selectedRowKeys.length} 条记录` : ''}
          </span>
          <Table dataSource={ActUserList} columns={columns} rowSelection={rowSelection} />
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}
