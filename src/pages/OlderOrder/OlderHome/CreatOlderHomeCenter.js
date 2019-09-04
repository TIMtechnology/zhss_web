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
  AutoComplete,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ Order,loading,weappact }) => ({
  Order,
  data2: weappact.data,
  submitting: loading.effects['Order/setGetCityList'],
}))
@Form.create()
class BasicForms extends PureComponent {
 
  state ={
    StreetCode:[],
    dataSource: [],
    xy: [],
  }
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'Order/setGetCityList',
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
          Admin_older_street_code:this.state.StreetCode,
          lat:this.state.lat,
          lng:this.state.lng
        }
        console.log(data)
        dispatch({
          type:"Order/setCreatOlderJiaTing",
          payload:data
        })
      }
    });
  };




  

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
    const { submitting,Order,data2,dispatch } = this.props;

    const { options } = Order;
    const { dataSource, xy } = this.state;
    
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
    const onSelect = value => {
      
      var value = value.split(",");
      console.log(value)
      var lat = value[0];
      var lng = value[1];
      this.setState({
        lat:lat,
        lng:lng
      })
    };
    
    const handleSearch = value => {
      if (value == null || value == undefined) {
        return false;
      }
      dispatch({
        type: 'weappact/getRegion',
        payload: {
          keyword: value,
          key: 'LEGBZ-PXBCU-JX2V2-2VSUF-I4JV6-2BFS5',
          region: '河北省',
        },
      });
      
     
    };
    console.log(data2);
    // console.log(form.data);
    var op = [];
    if (data2.data !== undefined) {
      // console.log(data2.data);

      // const counts = data2.count
      // console.log(counts);
      const arr = Object.keys(data2.data).map(key => data2.data[key]);
      console.log(arr);

      op = arr.map(opt => (
        <Option key={opt.title} title={opt.title} value={opt.location.lat+","+opt.location.lng} pa={opt.location}>
          {opt.title}
          <span className={styles.certainsearchitemcount}>
            {opt.city}
            {opt.district}
          </span>
        </Option>
      ));
      
    }

    return (
      <PageHeaderWrapper
        title="创建养老家庭"
        content="用于创建养老家庭。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="街道编码">
              {getFieldDecorator('streetCode', {
                rules: [
                  {
                    required: true,
                    message: '请选择市区街道',
                  },
                ],
              })(<Cascader 
                options={options}
                // loadData={this.loadData}
                onChange={this.onChange} 
                changeOnSelect
                placeholder="请选择市区街道"
                />)}
            </FormItem>
            <FormItem {...formItemLayout} label="养老家庭名称">
              {getFieldDecorator('Admin_older_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              })(<Input placeholder="请输入养老家庭名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="老人性别">
            {getFieldDecorator('Admin_older_sex', {
              rules: [{ required: true, message: '请选择性别' }],
            })(
              <Select placeholder="男">
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="养老家庭联系方式">
              {getFieldDecorator('Admin_older_phoneNum', {
                rules: [
                  {
                    required: true,
                    message: '请输入养老家庭联系方式',
                  },
                ],
              })(<Input placeholder="请输入养老家庭联系方式" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="养老家庭联系地址">
              {getFieldDecorator('Admin_older_placeInfor', {
                rules: [
                  {
                    required: true,
                    message: '请输入养老家庭联系地址',
                  },
                ],
              })(<Input placeholder="请输入养老家庭联系地址" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="养老家庭签到地点">
            <AutoComplete
              dataSource={op}
              onSelect={onSelect.bind(this)}
              optionLabelProp="title"
              onBlur={handleSearch}
              placeholder="请选择养老家庭签到地点"
            />
          </FormItem>
            <FormItem {...formItemLayout} label="是否残疾">
            {getFieldDecorator('Admin_older_isDisability', {
              rules: [{ required: true, message: '请选择是否残疾' }],
            })(
              <Select placeholder="否">
                <Option value="0">否</Option>
                <Option value="1">是</Option>
                
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="是否可自理">
            {getFieldDecorator('Admin_older_isSelfCare', {
              rules: [{ required: true, message: '请选择是否可自理' }],
            })(
              <Select placeholder="是">
                
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
            )}
          </FormItem>
            <FormItem {...formItemLayout} label="详细描述">
              {getFieldDecorator('Admin_older_description', {
                rules: [
                  {
                    required: true,
                    message: '请输入养老家庭的详细描述或备注',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入养老家庭的详细描述或备注"
                  rows={5}
                />
              )}
            </FormItem>
            
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
