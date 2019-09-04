import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { List, Card, Divider, Button, Modal, TreeSelect, Form, message, Table } from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const confirm = Modal.confirm;
@connect(({ wenumlist, loading }) => ({
    wenumlist,
  loading: loading.effects['wenumlist/setGetWeNumUserGroupInfo'],
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
      type: 'wenumlist/setGetWeNumUserGroupInfo',
      payload: this.props.location.query,
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
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
    const { wenumlist, loading } = this.props;
    const { WeNumUserGroupList } = wenumlist;
    // let goodsData = [];
  
  console.log(WeNumUserGroupList);
    //var name = info[0]['Admin_JS_name'];

    const columns = [

        {
            title: '平台用户ID',
            dataIndex: 'WeNum_user_id',
        },
        {
        title: '微信昵称',
        dataIndex: 'WeNum_nickname',
        sorter: true,
        render: val => <span>{decodeURI(val)}</span>,
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
    
    
    ];
    //onClick={() => this.handleModalVisible(true)}
    
    return (
      <PageHeaderWrapper title="分组用户列表" >
        <Card bordered>
         <Table dataSource={WeNumUserGroupList} columns={columns} >

         </Table>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
