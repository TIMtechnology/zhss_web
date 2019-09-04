import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
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
  Upload,
  Alert,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './APF.less';

import { decode } from 'querystring';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
const statusMap = ['default', 'processing', 'success', 'error', 'processing'];
const status = ['创建', '待审批', '通过', '未通过', '待上级审批'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const { getFieldDecorator, validateFields } = form;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建通用审批"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="流程选择">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Select style={{ width: '100%' }} placeholder="活动审批流程">
            <Option value="1">活动审批流程</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="审批内容">
        {form.getFieldDecorator('APFcontent', {
          rules: [{ required: true, message: '请简述审批内容' }],
        })(<Input placeholder="简述审批内容" />)}
      </FormItem>
      <Form.Item {...formItemLayout} label="图片上传">
        {getFieldDecorator('FlowImg', {
          rules: [{ required: false, message: '图片上传' }],
        })(
          <Upload
            {...{
              action: '/base/UploadImg',
              listType: 'picture',
              name: 'img',
              data: { userName: localStorage.getItem('user_name') },
              onChange: info => {
                let fileList = info.fileList;
                console.log(fileList);
                fileList = fileList.map(file => {
                  if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url;
                  }
                  return file;
                });
                console.log(fileList);
              },
            }}
          >
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="附件上传">
        {getFieldDecorator('FlowZip', {
          rules: [{ required: false, message: '附件上传' }],
        })(
          <Upload
            {...{
              action: '/base/UploadZip',
              listType: 'zip',
              name: 'zip',
              data: { userName: localStorage.getItem('user_name') },
              onChange: info => {
                let fileList = info.fileList;
                fileList = fileList.map(file => {
                  if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url;
                  }
                  return file;
                });
              },
            }}
          >
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
        )}
      </Form.Item>
    </Modal>
  );
});
@connect(({ APF, loading }) => ({
  APF,
  loading: loading.models.APF,
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
    };
    dispatch({
      type: 'APF/setGetDwAPFList',
      payload: params,
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
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'APF/setGetDwAPFList',
      payload: params,
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

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'APF/setCreatAPF',
      payload: {
        ...fields,
      },
    });

    console.log(fields);
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const {
      APF: { data },
      loading,
    } = this.props;
    console.log(data);
    //console.log(data.pagination);
    const { selectedRows, modalVisible } = this.state;
    const convertUnicode = input =>
      input.replace(/\\u(\w\w\w\w)/g, (a, b) => String.fromCharCode(parseInt(b, 16)));

    const columns = [
      {
        title: '流转id',
        dataIndex: 'ApprovalFlow_log_id',
      },
      {
        title: '审批内容',
        dataIndex: 'ApprovalFlow_log_content',
        render(val) {
          if (val) {
            return convertUnicode(`${val}`);
          }
        },
      },
      {
        title: '审核状态',
        dataIndex: 'ApprovalFlow_log_status',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '创建人',
        dataIndex: 'APF_CT_NAME',
      },

      {
        title: '审批时间',
        dataIndex: 'ApprovalFlow_log_APFtime',
      },
      {
        title: '操作',
        dataIndex: 'key',
        fixed: 'right',
        render: val => (
          <Fragment>
            <a href={`/#/APF/APFInfo?id=${val}`}>详细</a>
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
    };

    return (
      <PageHeaderWrapper title="我发起的审批">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <Alert
              message="活动申请注意事项"
              description="
               1.活动由各级单位发起创建，各单位需准备包含活动内容的Word文档一份，活动轮播图至少一份，活动申请表按照流程填写完整。
               2.通过本页面的新建审批，活动轮播图、Word文档与申请表打包为ZIP格式压缩文件选择附件上传。活动轮播图若仅为一份可以选择图片上传。
               3.活动申请表下载地址：https://dl.hbygxh.org/活动申请表.xlsx
               "
              type="warning"
            />
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
