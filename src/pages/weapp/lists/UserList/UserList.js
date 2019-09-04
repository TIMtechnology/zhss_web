import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserList.less';
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['新用户', '老用户'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible ,ZhiWuList} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  console.log(ZhiWuList);
  const children = [];
  if (ZhiWuList) {
    for (let i = 0; i < ZhiWuList.length; i++) {
      children.push(
        <Option key={ZhiWuList[i]['identity_id']}>
          {ZhiWuList[i]['identity_name']}
        </Option>
      );
    }
  }
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  return (
    <Modal
      title="分配职务"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="职务">
        {form.getFieldDecorator('Identity_id', {
          rules: [{ required: true, message: '请选择分配的职务' }],
        })(
          <Select onChange={handleChange} style={{ width: 200 }}>
            {children}
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});
const BindWeappUserGroup = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleweappUserGroupList,
    handleUpdateweappUserGroupVisible,
    WeappUserGroupList,
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleweappUserGroupList(fieldsValue);
    });
  };
  console.log(WeappUserGroupList)
  const children = [];
  if (WeappUserGroupList) {
    for (let i = 0; i < WeappUserGroupList.length; i++) {
      children.push(
        <Option key={WeappUserGroupList[i]['WeApp_group_id']}>
          {WeappUserGroupList[i]['WeApp_group_name']}
        </Option>
      );
    }
  }

  return (
    <Modal
      title="分配分组"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateweappUserGroupVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择分组">
        {form.getFieldDecorator('GroupId', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Select style={{ width: 200 }}>{children}</Select>)}
      </FormItem>
    </Modal>
  );
});

@connect(({ weapplist, wenumlist, loading }) => ({
  weapplist,
  wenumlist,
  loading: loading.models.weapplist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    showweappUserGroupBind: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    
    const params = {
      currentPage: 1,
      pageSize: 10,
    };
    dispatch({
      type: 'weapplist/fetch',
      payload: params,
    });
    dispatch({
      type: 'wenumlist/setGetWeappUserGroupList2',
    });
    dispatch({
      type:'weapplist/setGetZhiWuList'
    })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'weapplist/fetch',
      payload: params,
    });
  };

  handleweappUserGroupList = fileds => {
    const { dispatch } = this.props;
    console.log(this.state.selectedRows);
    var count = this.state.selectedRows.length;
    var arr = [];
    for (var i = 0; i < count; i++) {
      arr.push(this.state.selectedRows[i]['key']);
    }
    console.log(JSON.stringify(arr));
    dispatch({
      type: 'wenumlist/setWeappUserGroupBind',
      payload: {
        ...fileds,
        Userid: arr,
      },
    });

    this.setState({
      showweappUserGroupBind: false,
    });
  };
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'weapplist/fetch',
      payload: {},
    });
  };


  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'userlist/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      console.log(values);
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'weapplist/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleUpdateweappUserGroupVisible = flag=>{
    this.setState({
      showweappUserGroupBind: !!flag,
    })
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    console.log(fields);
    console.log(this.state.selectedRows);
    var count = this.state.selectedRows.length;
    var arr = [];
    for (var i = 0; i < count; i++) {
      arr.push(this.state.selectedRows[i]['key']);
    }
    console.log(JSON.stringify(arr));
    dispatch({
      type:'weapplist/setSetWeAppUserZhiWu',
      payload:{
        ...fields,
        UserId:arr
      }
    })
    
    this.setState({
      modalVisible: false,
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户姓名">
              {getFieldDecorator('nickname')(<Input placeholder="请输入用户姓名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所在城市">
              {getFieldDecorator('city_cityName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="石家庄市">石家庄市</Option>
                  <Option value="沧州市">沧州市</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  
  handleUpdateshowweappUserGroupVisible = flag => {
    var that = this;
    console.log(flag);
    that.setState({
      showweappUserGroupBind: !!flag,
    });
  };
  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderSimpleForm() : this.renderSimpleForm();
  }

  render() {
    const {
      weapplist: { data,ZhiWuList },
      wenumlist: { UserGroupList },
    
      loading,
    } = this.props;
    
    
    //console.log(data.pagination);
    const { selectedRows, modalVisible, showweappUserGroupBind } = this.state;

    const columns = [
      {
        title:'账号职务',
        dataIndex:'identity_name'
      },
      {
        title: '手机号',
        dataIndex: 'user_phoneNum',
      },
      {
        title: '用户姓名',
        dataIndex: 'user_name',
      },
      {
        title: '时长',
        dataIndex: 'user_HourNum',
      },
      {
        title: '积分',
        dataIndex: 'user_ItgNum',
      },
      {
        title: '城市',
        dataIndex: 'city_cityName',
      },
      {
        title: '地区',
        dataIndex: 'county_countyName',
      },
      
      // ,
      // {
      //   title: '服务调用次数',
      //   dataIndex: 'callNo',
      //   sorter: true,
      //   align: 'right',
      //   render: val => `${val} 万`,
      //   // mark to display a total number
      //   needTotal: true,
      // }
      {
        title: '用户类型',
        dataIndex: 'user_isOldUser',
        filters: [
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[0],
            value: 0,
          },
        ],
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      // {
      //   title: '更新时间',
      //   dataIndex: 'updatedAt',
      //   sorter: true,
      //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      // },
      {
        title: '操作',
        dataIndex: 'key',
        fixed: 'right',
        width: 120,
        render: val => (
          <Fragment>
            <a href={`/#/weapp/lists/UserList/userinfo?UserId=${val}`}>详细</a>
            <Divider type="vertical" />
            <a href="">其他</a>
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      ZhiWuList:ZhiWuList
    };
    const weappUserGroupListMethods = {
      handleweappUserGroupList: this.handleweappUserGroupList,
      handleUpdateweappUserGroupVisible: this.handleUpdateweappUserGroupVisible,
      WeappUserGroupList: UserGroupList.list,
    };
    return (
      <PageHeaderWrapper title="用户列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {/* <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button> */}
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={() => this.handleUpdateshowweappUserGroupVisible(true)}>
                    分配分组
                  </Button>
                  <Button type="primary" onClick={() => this.handleModalVisible(true) }>
                    分配职务
                  </Button>
                  {/* <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown> */}
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              //paginationProps={data.pagination}

              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <BindWeappUserGroup {...weappUserGroupListMethods} modalVisible={showweappUserGroupBind} />
      </PageHeaderWrapper>
    );
  }
}
