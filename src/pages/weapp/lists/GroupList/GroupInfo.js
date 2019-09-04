import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { List, Card, Divider, Button, Modal, TreeSelect, Form, message, Table } from 'antd';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const confirm = Modal.confirm;
@connect(({ wenumlist, loading }) => ({
    wenumlist,
  loading: loading.effects['wenumlist/setGetWeappUserGroupInfo'],
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
      type: 'wenumlist/setGetWeappUserGroupInfo',
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
            dataIndex: 'user_id',
        },
        {
        title: '用户姓名',
        dataIndex: 'user_name',
        
      },
      {
        title: '城市',
        dataIndex: 'city_cityName',
        
      },
      {
        title: '地区',
        dataIndex: 'county_countyName',
        
      }
      
    
    
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
