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
import { toUnicode } from 'punycode';
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['未关注', '已关注'];
const sexindex = ['保密', '男', '女'];

const UpdateUserBMFrom = Form.create()(props => {
  console.log(props);
  const {
    form,
    handleWeNumUserGroupList,
    handleUpdateWeNumUserGroupVisible,
    WeNumUserGroupList,
    modalVisible,
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleWeNumUserGroupList(fieldsValue);
    });
  };

  console.log(WeNumUserGroupList);
  const children = [];
  if (WeNumUserGroupList) {
    for (let i = 0; i < WeNumUserGroupList.length; i++) {
      children.push(
        <Option key={WeNumUserGroupList[i]['WeNum_Group_id']}>
          {WeNumUserGroupList[i]['WeNum_Group_name']}
        </Option>
      );
    }
  }

  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }
  return (
    <Modal
      title="管理部门"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateWeNumUserGroupVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属部门">
        {form.getFieldDecorator('GroupId', {
          rules: [{ required: true, message: '请选择账户所属部门' }],
        })(
          <Select onChange={handleChange} style={{ width: 200 }}>
            {children}
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ wenumlist, loading }) => ({
  wenumlist,
  loading: loading.models.wenumlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    showWeNumUserGroupBind: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    console.log('调用');
    const params = {
      currentPage: 1,
      pageSize: 10,
      userName: localStorage.getItem('user_name'),
    };
    dispatch({
      type: 'wenumlist/SelectByUserInfo',
      payload: params,
    });
    dispatch({
      type: 'wenumlist/resetGetWeNumUserGroupList',
      payload: params,
    });
    // dispatch({
    //   type: 'wenumlist/setGetWeappUserGroupList',
    // });
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
      userName: localStorage.getItem('user_name'),
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'wenumlist/SelectByUserInfo',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'wenumlist/SelectByUserInfo',
      payload: {
        userName: localStorage.getItem('user_name'),
      },
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'wenumlist/remove',
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
    //console.log(e);
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        userName: localStorage.getItem('user_name'),
      };
      console.log(values);
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'wenumlist/SelectByUserInfo',
        payload: values,
      });
    });
  };

  handleUpdateWeNumUserGroupVisible = flag => {
    var that = this;
    console.log(flag);
    that.setState({
      showWeNumUserGroupBind: !!flag,
    });
  };

  handleWeNumUserGroupList = fileds => {
    const { dispatch } = this.props;
    console.log(this.state.selectedRows);
    var count = this.state.selectedRows.length;
    var arr = [];
    for (var i = 0; i < count; i++) {
      arr.push(this.state.selectedRows[i]['key']);
    }
    console.log(JSON.stringify(arr));
    dispatch({
      type: 'wenumlist/setWeNumUserGroupListBind',
      payload: {
        ...fileds,
        Userid: arr,
      },
    });

    this.setState({
      showWeNumUserGroupBind: false,
    });
  };
  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户昵称">
              {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="性别">
              {getFieldDecorator('xingbie')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">保密</Option>
                  <Option value="1">男</Option>
                  <Option value="2">女</Option>
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
              {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phonenum')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="新老用户">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">新用户</Option>
                  <Option value="1">老用户</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderSimpleForm() : this.renderSimpleForm();
  }

  render() {
    const {
      wenumlist: { data },
      wenumlist: { WeNumUserGroupList },
      loading,
    } = this.props;
    console.log(data);
    //console.log(data.pagination);
    const { selectedRows, modalVisible, showWeNumUserGroupBind } = this.state;

    const columns = [
      {
        title: '用户昵称',
        dataIndex: 'WeNum_nickname',
        sorter: true,
        render: val => <span>{decodeURI(val)}</span>,
      },
      {
        title: '性别',
        dataIndex: 'WeNum_sex',
        filters: [
          {
            text: sexindex[0],
            value: 0,
          },
          {
            text: sexindex[1],
            value: 1,
          },
          {
            text: sexindex[2],
            value: 2,
          },
        ],
        onFilter: (value, record) => record.sexindex.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={sexindex[val]} />;
        },
      },
      {
        title: '城市',
        dataIndex: 'WeNum_city',
      },
      {
        title: '省份',
        dataIndex: 'WeNum_province',
      },
      {
        title: '国家',
        dataIndex: 'WeNum_country',
      },
      {
        title: '用户分组id',
        dataIndex: 'WeNum_groupid',
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
        title: '是否关注',
        dataIndex: 'WeNum_isguanzhu',
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
      {
        title: '关注时间',
        dataIndex: 'WeNum_subscribe_time',
        //sorter: true,
        render: val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        dataIndex: 'key',
        fixed: 'right',
        width: 120,
        render: val => (
          <Fragment>
            <a href={`#/WeNum/lists/UserList/UserInfo?UserId=${val}`}>详细</a>
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

    const WeNumUserGroupListMethods = {
      handleWeNumUserGroupList: this.handleWeNumUserGroupList,
      handleUpdateWeNumUserGroupVisible: this.handleUpdateWeNumUserGroupVisible,
      WeNumUserGroupList: WeNumUserGroupList,
    };

    return (
      <PageHeaderWrapper title="用户列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button onClick={() => this.handleUpdateWeNumUserGroupVisible(true)}>
                    分配分组
                  </Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
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

        <UpdateUserBMFrom {...WeNumUserGroupListMethods} modalVisible={showWeNumUserGroupBind} />
      </PageHeaderWrapper>
    );
  }
}
