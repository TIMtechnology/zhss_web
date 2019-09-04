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
  Radio
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './OlderCenter.less';
import { toUnicode } from 'punycode';
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
    const statusMap = ['default','default','default','processing','error','processing','success','success','default','default'];
    const status = ['未关注', '已关注'];
    const sexindex = ['未知','已创建','已派单','已接单','已拒绝','服务中','已完成','已评价','未完成','已取消'];
    const confirm = Modal.confirm;
    const sass = ['否','是'];

@connect(({ Order, loading }) => ({
  Order,
  loading: loading.models.Order,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    showWeNumUserGroupBind: false,
    visible: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    console.log('调用');
    const params = {
      currentPage: 1,
      pageSize: 10,

    };
    dispatch({
      type: 'Order/setGetOlderOrderListbyBDW',
      payload: params,
    });
    dispatch({
      type: 'Order/setGetUserWXbindByDWid',
     
    });
  }

  showModal = (val) => {
    console.log(val);
    val = val.split(",");
    this.setState({
      visible: true,
      dingdanid:val[0]
    });
  }

  handleOk = (e) => {
    const {dispatch} = this.props;
    dispatch({
      type:"Order/setBDWAdminFP",
      payload:{
        usernum:this.state.usernum,
        Admin_user_DW_id:this.state.dwid,
        Admin_orderOlder_order_id:this.state.dingdanid
      }
    })
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
      type: 'Order/setGetOlderOrderListbyBDW',
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
      type: 'Order/setGetOlderOrderListbyBDW',
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
        type: 'Order/setGetOlderOrderListbyBDW',
        payload: values,
      });
    });
  };
  handleselectOnChange = val => {
    val = val.split(",");
    this.setState({
      usernum: val[0],
      dwid : val[1]
    })
  };
  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleUpdateWeNumUserGroupVisible = flag => {
    var that = this;
    console.log(flag)
    that.setState({
      showWeNumUserGroupBind: !!flag
    })
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userlist/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
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
            <FormItem label="人员姓名">
              {getFieldDecorator('Admin_older_name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="联系电话">
              {getFieldDecorator('Admin_older_phoneNum')(<Input placeholder="请输入" />)}
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



  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderSimpleForm() : this.renderSimpleForm();
  }

  render() {
    const {
      Order: { OlderOrderList },
      Order:{wxbindUserlist},
      loading,
    } = this.props;
    //console.log(wxbindUserlist.list);
    //console.log(data.pagination);
    const children = [];
    if(wxbindUserlist){
        for (let i = 0; i < wxbindUserlist.list.length; i++) {

            children.push(<Option key={wxbindUserlist.list[i]['Admin_user_num']+","+wxbindUserlist.list[i]['Admin_user_DW_id']}>{"账号:"+wxbindUserlist.list[i]['Admin_user_num']+"| 姓名："+wxbindUserlist.list[i]['Admin_userinfo_name']}</Option>);
        }
    }
   // console.log(children)
    const { selectedRows } = this.state;

    const columns = [
      {
        title: '关联订单ID',
        dataIndex: 'Admin_order_selfNum',
      },
      {
        title: '订单名称',
        dataIndex: 'Admin_orderOlder_orderName',
      },
      {
        title: '养老人员姓名',
        dataIndex: 'Admin_older_name',
      },
      {
        title: '订单状态',
        dataIndex: 'Admin_orderOlder_mode',
        filters: [
          {
            text: sexindex[0],
            value: 0,
          },
          {
            text: sexindex[1],
            value: 1,
          },
        ],
        onFilter: (value, record) => record.sexindex.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={sexindex[val]} />;
        },
      },
      {
        title: '联系方式',
        dataIndex: 'Admin_older_phoneNum',
      },
      {
        title: '城市街道',
        dataIndex: 'streetNameList',
      },
      {
        title: '地址详细',
        dataIndex: 'Admin_older_placeInfor',
        sorter: true,
      },
      {
        title: '是否残疾',
        dataIndex: 'Admin_older_isDisability',
        render: val => (

          <Fragment>
            {sass[val]}
          </Fragment>
        ),
      },
      {
        title: '是否可自理',
        dataIndex: 'Admin_older_isSelfCare',
        render: val => (

          <Fragment>
            {sass[val]}
          </Fragment>
        ),
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
        title: '操作',
        dataIndex: 'KeyValue',
        fixed: 'right',
        width: 120,
        render: val => (
          <Fragment>
            <Button onClick={this.showModal.bind(this,val)}>
              用户分配
        </Button>

          </Fragment>
        ),
      },
    ];


    return (
      <PageHeaderWrapper title="养老订单列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={OlderOrderList}
              //paginationProps={data.pagination}

              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
            <Modal
              title="已绑定微信用户选择"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
             <Select
                    style={{ width: 400 }}
                    onChange={this.handleselectOnChange}
                >
                    {children}
                </Select>
            </Modal>
          </div>

        </Card>

      </PageHeaderWrapper>
    );
  }
}
