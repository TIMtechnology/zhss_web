import React, { Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  DatePicker,
  TimePicker,
  AutoComplete,
  Alert, Modal,
  Upload,
  Icon,
  message,
  Card,
  Row,
  Col
} from 'antd';
import router from 'umi/router';
import styles from './style.less';
import { bind } from 'lodash-decorators/utils';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const confirm = Modal.confirm;
const format = 'HH:mm';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ act, weappact }) => ({
  data: act.step,
  data2: weappact.data,
}))

class Step7 extends React.PureComponent {
  state = {
    rewardMent: {


      rewardMent_signup: {

      },
      rewardMent_cy: {

      }

    }
  };
  constructor() {
    super();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    localStorage.setItem('havesignup', 0)
    localStorage.setItem('havecy', 0)
    localStorage.setItem('intime', null)

    //先检测base中 报名条件 以及参与条件中是否有支付部分

    var base = JSON.parse(localStorage.getItem('base'));
    //console.log(base);
    if (base.pubact_signupFactor_save) {
      base.pubact_signupFactor_save.forEach(ele => {
        //判断 ele是否等于 2
        //如果等于 则在缓存中查找是否包含 rewardMent_signup 如果不包含 则开始此流程

        if (ele == 6) {
          // this.setState({
          //   havesignup : 1
          // })
          localStorage.setItem('havesignup', 1)
        }
      });
    }
    if (base.pubact_joinFactor_save) {
      base.pubact_joinFactor_save.forEach(ele => {
        //判断 ele是否等于 2
        //如果等于 则在缓存中查找是否包含 rewardMent_signup 如果不包含 则开始此流程

        if (ele == 6) {
          localStorage.setItem('havecy', 1)
        }
      });
    }



    if (localStorage.getItem('havesignup') == 0 && localStorage.getItem('havecy') == 0) {
      console.log('没有奖励模块');
      router.push('/weapp/activity/act-admin/confirm');
    }




    var key = 'rewardMent'
    var rewardMentData = JSON.parse(localStorage.getItem(key));
    if (rewardMentData) {
      this.setState({
        ...rewardMentData
      })
    }



  }

  GetInputValue = (type, event) => {
    //开始更新state中的base数据
    switch (type) {
      case 1://报名流程的
        console.log('type:1' + "event:" + event.target.value)
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_signup = {};
        rewardMent_signup[event.target.id] = event.target.value;

        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
          ...rewardMent_signup
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
        }
        this.setState({
          rewardMent
        })
        break;
      case 2://参与流程的
        console.log('type:2' + "event:" + event.target.value)
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_cy = {};
        rewardMent_cy[event.target.id] = event.target.value;
        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
          ...rewardMent_cy
        }
        this.setState({
          rewardMent
        })
        break;
    }
    

  }

  GetRangeValue = (type, event) => {
    console.log("type" + type);
    console.log(event);

    switch (type) {
      case 1://开启时间
        if (typeof event !== 'string') {
          event = event.toString();
        }
        var eventarr = event.split(',');



        var PAV_setOpenTime = moment(eventarr[0]).format('YYYY-MM-DD HH:mm:ss')
        var PAV_setCloseTime = moment(eventarr[1]).format('YYYY-MM-DD HH:mm:ss')




        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_signup = {};
        rewardMent_signup['PAV_setOpenTime'] = PAV_setOpenTime;
        rewardMent_signup['PAV_setCloseTime'] = PAV_setCloseTime;
        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
          ...rewardMent_signup
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
        }

        this.setState({
          rewardMent
        })



        break;
      case 2://开启时间 参与流程
        if (typeof event !== 'string') {
          event = event.toString();
        }
        var eventarr = event.split(',');


        var PAV_setOpenTime = moment(eventarr[0]).format('YYYY-MM-DD HH:mm:ss')
        var PAV_setCloseTime = moment(eventarr[1]).format('YYYY-MM-DD HH:mm:ss')




        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_cy = {};
        rewardMent_cy['PAV_setOpenTime'] = PAV_setOpenTime;
        rewardMent_cy['PAV_setCloseTime'] = PAV_setCloseTime;
        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,

        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
          ...rewardMent_cy
        }

        this.setState({
          rewardMent
        })



        break;

    }



  }
  GetSelectValue = (type, event) => {
    console.log(event)
    console.log(type)
    // //
    switch (type) {
      case 1://条件类型 报名条件


        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_signup = {};
        rewardMent_signup['PAR_exeType'] = event;

        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
          ...rewardMent_signup
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
        }
        console.log(rewardMent)
        this.setState({
          rewardMent
        })
        break;
      case 2://条件类型
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_cy = {};
        rewardMent_cy['PAR_exeType'] = event;

        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
          ...rewardMent_cy
        }
        console.log(rewardMent)
        this.setState({
          rewardMent
        })
        break;

      case 3://支付方式
        // var e = {};

        // e['PAPay_payWay'] = event;
        // this.setState(e);
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_signup = {};
        rewardMent_signup['PAR_rewType'] = event;

        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
          ...rewardMent_signup
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
        }
        this.setState({
          rewardMent
        })
        break;




      case 4://支付方式 参与流程
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_cy = {};
        rewardMent_cy['PAR_rewType'] = event;
        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
          ...rewardMent_cy
        }
        this.setState({
          rewardMent
        })
        break;

        case 5://奖励条件
        // var e = {};

        // e['PAPay_payWay'] = event;
        // this.setState(e);
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_signup = {};
        rewardMent_signup['PAR_rewCondition'] = event;

        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
          ...rewardMent_signup
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
        }
        this.setState({
          rewardMent
        })
        break;




      case 6://奖励条件
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_cy = {};
        rewardMent_cy['PAR_rewCondition'] = event;
        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
          ...rewardMent_cy
        }
        this.setState({
          rewardMent
        })
        break;

        case 7://奖励或惩罚 报名
        // var e = {};

        // e['PAPay_payWay'] = event;
        // this.setState(e);
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_signup = {};
        rewardMent_signup['PAR_rewOrPun'] = event;

        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
          ...rewardMent_signup
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
        }
        this.setState({
          rewardMent
        })
        break;




      case 8://奖励或惩罚 参与
        var rewardMent = { ...this.state.rewardMent };
        var rewardMent_cy = {};
        rewardMent_cy['PAR_rewOrPun'] = event;
        rewardMent['rewardMent_signup'] = {
          ...this.state.rewardMent.rewardMent_signup,
        }
        rewardMent['rewardMent_cy'] = {
          ...this.state.rewardMent.rewardMent_cy,
          ...rewardMent_cy
        }
        this.setState({
          rewardMent
        })
        break;


    }
  }


  setLocalstorge = (e) => {

    // var intime =  localStorage.getItem('intime');
    // if (intime == 0) {
    //   var key = 'rewardMent_signup'
    // } else {
    //   var key = 'rewardMent_cy'
    // }
    var rewardMentData = this.state;
    localStorage.setItem('rewardMent', JSON.stringify(rewardMentData))

    //检测当前存在几个支付参数
    //如果多个 怎么区分参数名
  }

  showXiaYiBuConfirm = (e) => {
    confirm({
      title: '确定进行下一步配置吗？',
      content: '请注意，如果本页参数未定义完整，可能会导致奖励数据错误',
      onOk() {
        router.push('/weapp/activity/act-admin/confirm');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { dispatch, data2 } = this.props;
    const { base } = this.state;


    var havecyhidden = 1;
    var havesignuphidden = 1;
    if (localStorage.getItem('havecy') == 1) {
      havecyhidden = 0;//显示
    }
    if (localStorage.getItem('havesignup') == 1) {
      havesignuphidden = 0;//显示
    }




    return (
      <Fragment>
        <Card title={"报名流程奖励参数配置"} className={styles.card} bordered={false} hidden={havesignuphidden}>
          <Form layout="vertical" hideRequiredMark>


            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="条件类型"
                >
                  <Select id="PAR_exeType" value={this.state.rewardMent.rewardMent_signup.PAR_exeType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 1)} placeholder="条件类型">
                    <Option value="0">报名条件</Option>

                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励或惩罚"
                >
                  <Select id="PAR_rewOrPun" value={this.state.rewardMent.rewardMent_signup.PAR_rewOrPun} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 7)} placeholder="奖励或惩罚">
                    <Option value="0">奖励</Option>
                    <Option value="1">惩罚</Option>
                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励类型"
                >
                  <Select id="PAR_rewType" value={this.state.rewardMent.rewardMent_signup.PAR_rewType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 3)} placeholder="流程选择">
                    <Option value="1">积分加工时</Option>
                    <Option value="2">勋章</Option>
                    <Option value="3">优惠券</Option>

                  </Select>

                </Form.Item>
              </Col>
             

                <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励数量"
                >
                  <Input id="PAR_rewNum" value={this.state.rewardMent.rewardMent_signup.PAR_rewNum} onChange={this.GetInputValue.bind(this, 1)} placeholder = "奖励数量"  />

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励数量(工时)"
                >
                  <Input id="PAR_rewNumSec" value={this.state.rewardMent.rewardMent_signup.PAR_rewNumSec} onChange={this.GetInputValue.bind(this, 1)} placeholder = "奖励备用数量 放工时"  />

                </Form.Item>
              </Col>
              
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励内容"
                >
                  <Input id="PAR_rewCont" value={this.state.rewardMent.rewardMent_signup.PAR_rewCont}  onChange={this.GetInputValue.bind(this, 1)}  placeholder = "奖励内容"  />

                </Form.Item>
              </Col>

            
             
            </Row>

          </Form>
        </Card>

          <Card title={"参与流程奖励参数配置"} className={styles.card} bordered={false} hidden={havecyhidden}>
            <Form layout="vertical" hideRequiredMark>


              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item
                    label="条件类型"
                  >
                    <Select id="PAR_exeType" value={this.state.rewardMent.rewardMent_cy.PAR_exeType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 2)} placeholder="条件类型">
                      <Option value="1">参与条件</Option>
                    </Select>

                  </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励或惩罚"
                >
                  <Select id="PAR_rewOrPun" value={this.state.rewardMent.rewardMent_cy.PAR_rewOrPun} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 8)} placeholder="奖励或惩罚">
                    <Option value="0">奖励</Option>
                    <Option value="1">惩罚</Option>
                  </Select>

                </Form.Item>
              </Col>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item
                    label="奖励类型"
                  >
                    <Select id="PAR_rewType" value={this.state.rewardMent.rewardMent_cy.PAR_rewType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 4)} placeholder="流程选择">
                    <Option value="1">积分加工时</Option>
                    <Option value="2">勋章</Option>
                    <Option value="3">优惠券</Option>
                    </Select>

                  </Form.Item>
                </Col>
             
                <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励数量"
                >
                  <Input id="PAR_rewNum" value={this.state.rewardMent.rewardMent_cy.PAR_rewNum} onChange={this.GetInputValue.bind(this, 2)} placeholder = "奖励数量"  />

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励数量(工时)"
                >
                  <Input id="PAR_rewNumSec" value={this.state.rewardMent.rewardMent_cy.PAR_rewNumSec} onChange={this.GetInputValue.bind(this, 2)} placeholder = "奖励备用数量 放工时"  />

                </Form.Item>
              </Col>
              
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="奖励内容"
                >
                  <Input id="PAR_rewCont" value={this.state.rewardMent.rewardMent_cy.PAR_rewCont} onChange={this.GetInputValue.bind(this, 2)} placeholder = "奖励内容"  />

                </Form.Item>
              </Col>



              </Row>

            </Form>
          </Card>;
        <div style={{ float: "right" }}>
            <Button type='dashed' icon='tool' onClick={this.setLocalstorge}>保存此步骤</Button>
            <Divider type="vertical" />
            <Button type='primary' onClick={this.showXiaYiBuConfirm}>下一步</Button>
          </div>

      </Fragment>
        );
      }
    }
    
    export default Step7;
