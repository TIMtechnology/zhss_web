import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider, Select,Card, Icon,Checkbox } from 'antd';
import router from 'umi/router';
import styles from './style.less';
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const plainOptions = [
  '石家庄市',
  '唐山市',
  '秦皇岛市',
  '邯郸市',
  '邢台市',
  '保定市',
  '张家口市',
  '承德市',
  '沧州市',
  '廊坊市',
  '衡水市',
];

const vkind = [
  "扶危济困",
"敬老助残",
"社区服务",
"秩序维护",
"文体服务",
"环境保护",
"治安防范",
"医疗救治",
"法律援助",
"大型活动",
"心理疏导",
"精神抚慰",
"支教支医",
"科学普及",
"应急救援",
"便民服务",
"民事调解",
"文明引导",
"安全生产"

];
const defaultCheckedList = ['石家庄市'];

//根据data中的内容 判断是否进行某些功能的配置 是否展示某些功能的配置input
@connect(({ act, loading }) => ({
  submitting: loading.effects['act/submitStepForm'],
  act
}))
@Form.create()
class Step2 extends React.PureComponent {
  constructor() {
    super();
  }
  state={
    base:{},
    payMent:{},
    indeterminate: true,
    checkAll: false,
    checkedList: defaultCheckedList,
    checkedList_vkid:[]
  }
  componentDidMount() {
    const { dispatch } = this.props;
  //检测各参数是否存在 如果存在 重置参数state
  //根据state是否存在 或未空 判断是否展示 列表 等
  //
  //稍微低一些的做法 可以只判断提交了哪些参数 不展示详情 
  //展示base内容 即可
  var basedata = JSON.parse(localStorage.getItem('base'));
  if (basedata) {
    this.setState({
      ...basedata
    })
  }
 
  


  }
  submitPubact=()=>{
    const {dispatch} = this.props;
    //尝试获取所有的缓存数组内容
    //分不同数组进行解析数据 编排数据 根据接口请求发送
    //获取base 
    var base = JSON.parse(localStorage.getItem('base'));
    var payMent = JSON.parse(localStorage.getItem('payMent')); //支付模块 完整
    var signinMent = JSON.parse(localStorage.getItem('signinMent')); //签到模块 
    var signoffMent = JSON.parse(localStorage.getItem('signoffMent'));//签退模块
    var signinOrderMent_signup = JSON.parse(localStorage.getItem('signinOrderMent_signup')); //报名签到次序
    var signoffOrderMent_signup = JSON.parse(localStorage.getItem('signoffOrderMent_signup')); //报名签退次序
    var signinOrderMent_cy = JSON.parse(localStorage.getItem('signinOrderMent_cy')); //参与签到次序
    var signoffOrderMent_cy = JSON.parse(localStorage.getItem('signoffOrderMent_cy')); //参与签退次序
    var verifiMent = JSON.parse(localStorage.getItem('verifiMent')); //核销模块
    var rewardMent = JSON.parse(localStorage.getItem('rewardMent')); //奖励模块

    

    //定义用于post的data
    var data = {};
    //将base 压入数组
    data.base = {...base}
    //如果存在支付模块 拆解出两个条件下参数
    if(payMent){ 
      var payMent_signup  = payMent.payMent.payMent_signup;
      var payMent_cy = payMent.payMent.payMent_cy;
      data.payMent_cy = {...payMent_cy}
      data.payMent_signup = {...payMent_signup}
      
    }
    if(signinMent){
      var signinMent_signup  = signinMent.signinMent.signinMent_signup;
      var signinMent_cy = signinMent.signinMent.signinMent_cy;
      data.signinMent_signup = {...signinMent_signup}
      data.signinMent_cy = {...signinMent_cy}
    }
    if(signoffMent){
      var signoffMent_signup  = signoffMent.signoffMent.signoffMent_signup;
      var signoffMent_cy = signoffMent.signoffMent.signoffMent_cy;
      data.signoffMent_signup = {...signoffMent_signup}
      data.signoffMent_cy = {...signoffMent_cy}
    }
    if(signinOrderMent_signup){
      var signinOrderMent_signup  =  JSON.stringify(signinOrderMent_signup);
      
      data.signinOrderMent_signup = signinOrderMent_signup
      
    }
    if(signoffOrderMent_signup){
      var signoffOrderMent_signup  =  JSON.stringify(signoffOrderMent_signup);
      
      data.signoffOrderMent_signup = signoffOrderMent_signup
      
    }
    if(signinOrderMent_cy){
      var signinOrderMent_cy  = JSON.stringify(signinOrderMent_cy);
      
      data.signinOrderMent_cy = signinOrderMent_cy
      
    }
    if(signoffOrderMent_cy){
      var signoffOrderMent_cy  = JSON.stringify(signoffOrderMent_cy);
      
      data.signoffOrderMent_cy = signoffOrderMent_cy
      
    }
    if(verifiMent){ 
      var verifiMent_signup  = verifiMent.verifiMent.verifiMent_signup;
      var verifiMent_cy = verifiMent.verifiMent.verifiMent_cy;
      data.verifiMent_signup = {...verifiMent_signup}
      data.verifiMent_cy = {...verifiMent_cy}
      
    }
    if(rewardMent){ 
      var rewardMent_signup  = rewardMent.rewardMent.rewardMent_signup;
      var rewardMent_cy = rewardMent.rewardMent.rewardMent_cy;
      data.rewardMent_cy = {...rewardMent_cy}
      data.rewardMent_signup = {...rewardMent_signup}
      
    }
    data.cityList = this.state.checkedList;
    data.vkindList = this.state.checkedList_vkid;
    console.log(data)
    dispatch({
        type:"act/setCreartPubact",
        payload:data
    })
    
  }

  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const {indeterminate,checkAll,checkedList,checkedList_vkid } = this.state;
    const onPrev = () => {
      history.back()
    };
    const onChangecity = checkedList => {
      // 无错误.
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
        checkAll: checkedList.length === plainOptions.length,
      });
    };

    const onChangevkid = checkedList =>{
      this.setState({
        checkedList_vkid:checkedList
      })
    }
    const onCheckAllChange = e => {
      this.setState({
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    };

    //根据data判断参与方式 以及 报名方式 修改展示部分
    //报名条件（0->无条件；1->需通过培训；2->支付；3->扫码核销；4->签到；5->签退 6->奖励；）
    
    

    return (
      <Card title="信息确认"> 

        <ul>活动名称:{this.state.pubact_name}{(this.state.pubact_name)?<Icon type="check"></Icon>:<Icon type="warning"></Icon>}</ul>
        <ul>活动报名开始时间:{this.state.pubact_signupStartTime}{(this.state.pubact_signupStartTime)?<Icon type="check"></Icon>:<Icon type="warning"></Icon>}</ul>
        <ul>活动报名截止时间:{this.state.pubact_signupStopTime}{(this.state.pubact_signupStopTime)?<Icon type="check"></Icon>:<Icon type="warning"></Icon>}</ul>
        <ul>活动开启日期:{this.state.pubact_startDate}{(this.state.pubact_startDate)?<Icon type="check"></Icon>:<Icon type="warning"></Icon>}</ul>
        <ul>活动关闭日期:{this.state.pubact_stopDate}{(this.state.pubact_stopDate)?<Icon type="check"></Icon>:<Icon type="warning"></Icon>}</ul>
        <ul>活动开启时间:{this.state.pubact_startTime}{(this.state.pubact_startTime)?<Icon type="check"></Icon>:<Icon type="warning"></Icon>}</ul>
        <ul>活动关闭时间:{this.state.pubact_stopTime}{(this.state.pubact_stopTime)?<Icon type="check"></Icon>:<Icon type="warning"></Icon>}</ul>
        <div>
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                全选
              </Checkbox>
            </div>

            <br />
            <Divider>开放城市</Divider>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChangecity} />
            <Divider>活动标签</Divider>
            <CheckboxGroup options={vkind} value={checkedList_vkid} onChange={onChangevkid} />
          </div>
       

        <Button onClick={this.submitPubact}>提交创建</Button>  
      </Card>
      

    );
  }
}

export default Step2;