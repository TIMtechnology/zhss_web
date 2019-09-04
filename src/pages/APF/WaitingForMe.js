import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Badge,
  Table

} from 'antd';
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
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['待审批', '未通过','已通过'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


@connect(({ APF, loading }) => ({
    APF,
  loading: loading.models.APF,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;

    console.log('调用');
    const params = {
      currentPage: 1,
      pageSize: 10,
    };
    dispatch({
      type: 'APF/setGetWeatringForMeAPF',
    });
  }

 

 

  

 
  

 

  render() {
    const {
      APF: { dataWM },
      loading,
     
    } = this.props;
    
    var data = dataWM.list;
    
    const convertUnicode = input =>
    input.replace(/\\u(\w\w\w\w)/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
 

    const columns = [
      {
        title: '审批流ID',
        dataIndex: 'ApprovalFlow_log_id',
      },
      {
        title: '审批内容',
        dataIndex: 'ApprovalFlow_log_content',
        render(val) {
          if(val){
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
        title: '创建时间',
        dataIndex: 'ApprovalFlow_log_Creattime',
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

    return (
      <PageHeaderWrapper title="待我审批">
        <Card bordered={false}>
          <div className={styles.tableList}>
            
            <Table
              loading={loading}
              dataSource={data}
              columns={columns}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
