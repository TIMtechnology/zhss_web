import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Form, Select, Input, Button,message } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import AvatarList from '@/components/AvatarList';

const { Description } = DescriptionList;
const {Option} = Select;
const FormItem = Form.Item;
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
var mmdata = [];
@connect(({ ModeMsg, wenumlist, loading }) => ({
  ModeMsg,
  wenumlist,
  loading: loading.effects['weapplist/fetchuserinfo'],
}))
@Form.create()
export default class BasicProfile extends Component {
  state = {
    msglist: [],
    ChangeCheckFenZu:'',
    fenzulist:[],
  };
  constructor(props) {
    super(props);
    console.log(this.props.location.search);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ModeMsg/setGetModeMsgInfoList',
    });
    dispatch({
      type: 'wenumlist/setGetWeappUserGroupList',
    });
    dispatch({
      type: 'wenumlist/resetGetWeNumUserGroupList'
    })
  }
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);

        dispatch({
          type: 'ModeMsg/setSendModeMsgByAdminUser',
          payload: values,
        });
      }
    });
  };

  render() {
    const { ModeMsg, loading, wenumlist } = this.props;
    const { MsgList } = ModeMsg;
    const { MsgInfo } = ModeMsg;
    const { data, WeNumUserGroupList } = wenumlist;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const {ChangeCheckFenZu,fenzulist} = this.state;

    console.log(data);
    console.log(WeNumUserGroupList);
    const children = [];
    if (MsgList) {
      for (let i = 0; i < MsgList.length; i++) {
        children.push(
          <Option key={MsgList[i]['WeNum_push_id']}>{MsgList[i]['WeNum_push_name']}</Option>
        );
      }
    }
    var Groupchildren = [];
    if (data) {
      console.log(data.list.length)
      for (let i = 0; i < data.list.length; i++) {
        Groupchildren.push(
          <Option key={data.list[i]['WeApp_group_id']}>
            {data.list[i]['WeApp_group_name']}
          </Option>
        );
      }
    }
    var Groupchildren2 = [];
    if (WeNumUserGroupList) {
      
      for (let i = 0; i < WeNumUserGroupList.length; i++) {
        Groupchildren2.push(
          <Option key={WeNumUserGroupList[i]['WeNum_Group_id']}>
            {WeNumUserGroupList[i]['WeNum_Group_name']}
          </Option>
        );
      }
    }
    console.log(Groupchildren)

    const onModeMsgSelect = val => {
      const { dispatch } = this.props;
      dispatch({
        type: 'ModeMsg/setGetModeMsgInfoList2',
        payload: { id: val },
      });
    };

    const onChange = (val) => {
      console.log(val);
      
      switch(val){
            case '0'://小程序分组
            console.log('进入小程序分组')
            this.setState({
              ChangeCheckFenZu:0,
              fenzulist:Groupchildren
            })
            console.log(this.state);
            break;
            case "1"://公众号分组
            this.setState({
              ChangeCheckFenZu:1,
              fenzulist:Groupchildren2
            })



      }
    }

    return (
      <PageHeaderWrapper title="固定参数模板消息发送">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="模板选择">
              {getFieldDecorator('push_id', {
                rules: [{ required: true, message: '请选择推送模板' }],
              })(
                <Select placeholder="请选择推送模板" onSelect={onModeMsgSelect}>
                  {children}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="发送选项">
              {getFieldDecorator('group_type', {
                rules: [{ required: true, message: '请选择发送选项' }],
              })(<Select onChange={onChange}>
                <Option value="0">
                  小程序
                </Option>
                <Option value="1">
                  公众号
                </Option>
                <Option value="2">
                  个人
                </Option>
              </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="分组选择">
              {getFieldDecorator('group_id', {
              })(<Select placeholder="若为个人推送，则不选" onSelect={(val)=>{
                console.log(val);
                //根据上面的数据 查找当前分组将发送的人数

                var check = this.state.ChangeCheckFenZu;
                switch(check){
                  default://
                    message.info("未找到相应分组信息");
                    case 0://
                    for (let i = 0; i < data.list.length; i++) {
                      if(data.list[i]['WeApp_group_id']==val){
                        message.warning('使用本分组系统将尝试发送'+data.list[i]['num']+'条模板消息');
                      }
                    }
                    break;
                    case 1://
                    console.log(WeNumUserGroupList.length)
                    for (let i = 0; i < WeNumUserGroupList.length; i++) {
                      if(WeNumUserGroupList[i]['WeNum_Group_id']==val){
                        message.warning('使用本分组系统将尝试发送'+WeNumUserGroupList[i]['num']+'条模板消息');
                      }
                    }
                    break;
                }
                
              }}>{this.state.fenzulist}</Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="小程序访问路径">
              {getFieldDecorator('path', {
                rules: [{ required: true, message: '请填写小程序访问路径' }],
              })(<Input placeholder="小程序访问路径" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="个人openid">
              {getFieldDecorator('openid', {
              })(<Input placeholder="若为个人请填写openid" />)}
            </FormItem>
            {MsgInfo.map((item, index) => {
              return (
                <FormItem {...formItemLayout} label={item.text}>
                  {getFieldDecorator(item.field, {
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              );
            })}
            <Button type="primary" htmlType="submit" >
              提交
            </Button>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
