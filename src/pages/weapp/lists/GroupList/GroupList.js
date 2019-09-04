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
import styles from './GroupList.less';
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

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建小程序用户分组"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="新建分组">
        {form.getFieldDecorator('WeNumUserGroupName', {
          rules: [{ required: true, message: '请输入分组名称' }],
        })(<Input placeholder="请输入分组名称" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ wenumlist,Menu, loading }) => ({
  wenumlist,
  Menu,
  loading: loading.models.wenumlist,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;

    console.log('调用');
    const params = {
      currentPage: 1,
      pageSize: 10,
      userName:localStorage.getItem('user_name'),
    };
    dispatch({
      type: 'wenumlist/setGetWeappUserGroupList',
      payload: params,
    });
    dispatch({
      type:'Menu/setCheckBTNAuth',
      payload:{
        BTNname:'BTN-WeNumGroup'
      }
    })
  }

  

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };


  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => { //添加分组
    const { dispatch } = this.props;
    dispatch({
      type: 'wenumlist/setCreatWeappUserGroup',
      payload: fields
    });

    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {
      wenumlist: { data },
      loading,
      Menu:{BTNAuth}
    } = this.props;
    console.log(BTNAuth);
   
    
    const { selectedRows, modalVisible } = this.state;

    const columns = [
      {
        title: '分组ID',
        dataIndex: 'WeApp_group_id',
       
       
      },
      {
        title: '分组名称',
        dataIndex: 'WeApp_group_name',
     
      },
      {
        title: '人组人数',
        dataIndex: 'WeNum_Group_Num',
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
        dataIndex: 'WeApp_group_id',
        fixed: 'right',
        width:120,
        render: val => (
          <Fragment>
            <a href={`#/weapp/lists/GroupInfo?GroupId=${val}`}>人员列表</a>
           
          </Fragment>
        ),
      },
    ];



    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderWrapper title="小程序分组列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)} {...BTNAuth} >
                新建
              </Button>
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
      </PageHeaderWrapper>
    );
  }
}
