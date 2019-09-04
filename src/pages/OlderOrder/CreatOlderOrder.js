import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Cascader,
  message,
   AutoComplete,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import './style.less';


const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const {AUtoOption} = AutoComplete.Option;





@connect(({ Order,loading }) => ({
  Order,
  submitting: loading.effects['Order/setGetOlderServiceList'],
}))
@Form.create()
class BasicForms extends PureComponent {
 
  state ={
    StreetCode:[],
    dataSource: [],
    Admin_orderOlder_older_id:'',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'Order/setGetOlderServiceList',
    });
    
  }
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //console.log(values);
        var data = {
          ...values,
          Admin_orderOlder_older_id:this.state.Admin_orderOlder_older_id,
          Admin_orderOlder_service_time:values.Admin_orderOlder_service.format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(data)

        dispatch({
          type:"Order/setCreatOlderOrder",
          payload:data
        })
      }
    });
  };

  handleSearch = (value) => {
    const { Order } = this.props;
    const {dispatch} = this.props;
    const { OlderInfo } = Order
    

    dispatch({
      type:"Order/setGetOlderInfoByPhoneNum",
      payload:{
        PhoneNum:value
      }
    })
    console.log(OlderInfo);
    
    
  }


  
 
  onChange = (value, selectedOptions) => {
    //console.log(value, selectedOptions);
    if(value[2]){
      this.setState({
        StreetCode:value[2]
      },function(){
        this.stateFunction()
      })
    }
   
    //console.log(this.state.StreetCode)
  }
  stateFunction() {
    console.log('立即同步state', this.state.StreetCode)
 }
  render() {
    const { submitting,Order } = this.props;
    const { OlderServiceList,OlderInfo } = Order
    const { dataSource } = this.state;

   // console.log(OlderServiceList);

    //console.log(OlderInfo);
    var options = [];
    if(OlderInfo){
      for (let i = 0; i < OlderInfo.length; i++) {

        options.push(<Option 
          key={OlderInfo[i]['Admin_older_id']}>
          {OlderInfo[i]['Admin_older_name']}
          </Option>);
   
  }
      
    }else{
      options=dataSource
    }
    const children = [];
    if(OlderServiceList){
        for (let i = 0; i < OlderServiceList.length; i++) {

            children.push(<Option key={OlderServiceList[i]['Admin_service_id']}>{OlderServiceList[i]['Admin_service_name']}</Option>);
        }
    }
  //  console.log(children)
    const {
    
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    


   const onSelect = (value)=> {
     
      // const arr = Object.keys(dataSource).map(key=> dataSource[key]);
      
      // const text = arr[0].id;
      // console.log(text);
      this.setState({
        Admin_orderOlder_older_id:value
      })
      console.log(this.state.Admin_orderOlder_older_id)
    }
    
    
    return (
      <PageHeaderWrapper
        title="创建养老订单"
        content="用于创建养老订单。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="订单服务类型">
            {getFieldDecorator('Admin_orderOlder_service_id', {
              rules: [{ required: true, message: '请选择服务类型' }],
            })(
              <Select placeholder='请选择订单服务类型'>
                {children}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="其他系统订单号">
            {getFieldDecorator('Admin_order_num', {
              rules: [{ required: true, message: '请输入其他系统订单号' }],
            })(
              <Input placeholder="请输入其他系统订单号" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="是否外派">
            {getFieldDecorator('Admin_order_isAllot', {
              rules: [{ required: true, message: '请选择是否外派' }],
            })(
              <Select placeholder="请选择是否外派">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="养老家庭关联">
          {getFieldDecorator('Admin_orderOlder_older', {
                rules: [
                  {
                    required: true,
                    message: '请选择养老家庭',
                  },
                ],
              })(
                <div className="global-search-wrapper">
                <AutoComplete
                  className="global-search"
                  
                  style={{ width: '100%' }}
                  dataSource={options}
                  onSelect={onSelect.bind(this)}
                  onSearch={this.handleSearch}
                  placeholder="请在此搜索养老家庭联系方式"
                  optionLabelProp="children"
                >
                  <Input
                    suffix={(
                        <Icon type="search" />
                      
                    )}
                  />
                </AutoComplete>
              </div>
              )}
        
          </FormItem>
          
            <FormItem {...formItemLayout} label="订单名">
              {getFieldDecorator('Admin_orderOlder_orderName', {
                rules: [
                  {
                    required: true,
                    message: '请输入订单名',
                  },
                ],
              })(<Input placeholder="请输入订单名" />)}
            </FormItem>
           
            <FormItem {...formItemLayout} label="订单预计服务时间">
              {getFieldDecorator('Admin_orderOlder_service', {
                rules: [
                  {
                    required: true,
                    message: '请选择订单预计服务时间',
                  },
                ],
              })(<DatePicker style={{ width: '100%' }} showTime
              format="YYYY-MM-DD HH:mm:ss"  placeholder="请选择订单预计服务时间"/>)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
