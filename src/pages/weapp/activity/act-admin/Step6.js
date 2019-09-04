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
import TableForm from './TableForm';
import TableForm2 from './TableForm2';
import styless from './styles.less';
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
@Form.create()
class Step6 extends React.PureComponent {
  state = {
    signoffMent: {


      signoffMent_signup: {

      },
      signoffMent_cy: {

      }

    },
    tableData111:[],
    tableData222:[],
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
        //如果等于 则在缓存中查找是否包含 signoffMent_signup 如果不包含 则开始此流程

        if (ele == 5) {
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
        //如果等于 则在缓存中查找是否包含 signoffMent_signup 如果不包含 则开始此流程

        if (ele == 5) {
          localStorage.setItem('havecy', 1)
        }
      });
    }



    if (localStorage.getItem('havesignup') == 0 && localStorage.getItem('havecy') == 0) {
      console.log('没有签退模块');
      router.push('/weapp/activity/act-admin/reward');
    }




    var key = 'signoffMent'
    var signoffMentData = JSON.parse(localStorage.getItem(key));
    if (signoffMentData) {
      this.setState({
        ...signoffMentData
      })
    }
    
    const tableData111  = JSON.parse(localStorage.getItem('signoffOrderMent_signup'));
    if (tableData111) {
      this.setState({
         tableData111
      })
    }
    const tableData222  = JSON.parse(localStorage.getItem('signoffOrderMent_cy'));
    if (tableData222) {
      this.setState({
        tableData222
      })
    }

  



  }

  GetInputValue = (type, event) => {
    //开始更新state中的base数据
    switch (type) {
      case 1://报名流程的
        console.log('type:1' + "event:" + event.target.value)
        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_signup = {};
        signoffMent_signup[event.target.id] = event.target.value;

        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
          ...signoffMent_signup
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
        }
        this.setState({
          signoffMent
        })
        break;
      case 2://参与流程的
        console.log('type:2' + "event:" + event.target.value)
        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_cy = {};
        signoffMent_cy[event.target.id] = event.target.value;
        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
          ...signoffMent_cy
        }
        this.setState({
          signoffMent
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




        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_signup = {};
        signoffMent_signup['PAV_setOpenTime'] = PAV_setOpenTime;
        signoffMent_signup['PAV_setCloseTime'] = PAV_setCloseTime;
        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
          ...signoffMent_signup
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
        }

        this.setState({
          signoffMent
        })



        break;
      case 2://开启时间 参与流程
        if (typeof event !== 'string') {
          event = event.toString();
        }
        var eventarr = event.split(',');


        var PAV_setOpenTime = moment(eventarr[0]).format('YYYY-MM-DD HH:mm:ss')
        var PAV_setCloseTime = moment(eventarr[1]).format('YYYY-MM-DD HH:mm:ss')




        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_cy = {};
        signoffMent_cy['PAV_setOpenTime'] = PAV_setOpenTime;
        signoffMent_cy['PAV_setCloseTime'] = PAV_setCloseTime;
        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,

        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
          ...signoffMent_cy
        }

        this.setState({
          signoffMent
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


        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_signup = {};
        signoffMent_signup['PASign_exeType'] = event;

        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
          ...signoffMent_signup
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
        }
        console.log(signoffMent)
        this.setState({
          signoffMent
        })
        break;


      case 3://签到流程
        // var e = {};

        // e['PAPay_payWay'] = event;
        // this.setState(e);
        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_signup = {};
        signoffMent_signup['PASign_signType'] = event;

        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
          ...signoffMent_signup
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
        }
        this.setState({
          signoffMent
        })
        break;
      case 5://签到限制类型 报名条件
        // var e = {};

        // e['PAPay_payWay'] = event;
        // this.setState(e);
        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_signup = {};
        signoffMent_signup['PASign_signLimitType'] = event;

        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
          ...signoffMent_signup
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
        }
        this.setState({
          signoffMent
        })
        break;

      case 2://条件类型
        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_cy = {};
        signoffMent_cy['PASign_exeType'] = event;

        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
          ...signoffMent_cy
        }
        console.log(signoffMent)
        this.setState({
          signoffMent
        })
        break;


      case 4://支付方式 参与流程
        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_cy = {};
        signoffMent_cy['PASign_signType'] = event;
        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
          ...signoffMent_cy
        }
        this.setState({
          signoffMent
        })
        break;
      case 6://签到限制方式 参与模式
        var signoffMent = { ...this.state.signoffMent };
        var signoffMent_cy = {};
        signoffMent_cy['PASign_signLimitType'] = event;
        signoffMent['signoffMent_signup'] = {
          ...this.state.signoffMent.signoffMent_signup,
        }
        signoffMent['signoffMent_cy'] = {
          ...this.state.signoffMent.signoffMent_cy,
          ...signoffMent_cy
        }
        this.setState({
          signoffMent
        })
        break;


    }
  }


  setLocalstorge = (e) => {

    // var intime =  localStorage.getItem('intime');
    // if (intime == 0) {
    //   var key = 'signoffMent_signup'
    // } else {
    //   var key = 'signoffMent_cy'
    // }
    var signoffMentData = this.state;
    localStorage.setItem('signoffMent', JSON.stringify(signoffMentData))

    //检测当前存在几个支付参数
    //如果多个 怎么区分参数名
  }

  onChange111 = (e) => {
    localStorage.setItem('signoffOrderMent_signup',JSON.stringify(e))
  }
  onChange222 = (e) => {
    localStorage.setItem('signoffOrderMent_cy',JSON.stringify(e))
  }

  showXiaYiBuConfirm = (e) => {
    confirm({
      title: '确定进行下一步配置吗？',
      content: '请注意，如果本页参数未定义完整，可能会导致签退数据错误',
      onOk() {
        router.push('/weapp/activity/act-admin/reward');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { dispatch, data2, form: { getFieldDecorator } } = this.props;

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
        <Card title={"报名流程签退参数配置"} className={styles.card} bordered={false} hidden={havesignuphidden}>
          <Form layout="vertical" hideRequiredMark>


            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="条件类型"
                >
                  <Select id="PASign_exeType" value={this.state.signoffMent.signoffMent_signup.PASign_exeType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 1)} placeholder="条件类型">
                    <Option value="0">报名条件</Option>

                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="流程选择"
                >
                  <Select id="PASign_signType" value={this.state.signoffMent.signoffMent_signup.PASign_signType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 3)} placeholder="流程选择">
                    <Option value="5">签退流程</Option>
                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="当前所处次序"
                >
                  <Input id="PASign_curSignNum" value={this.state.signoffMent.signoffMent_signup.PASign_curSignNum} style={{ width: '100%' }} onChange={this.GetInputValue.bind(this, 1)} placeholder="当前所处签到次序" />

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="限制签到类型"
                >
                  <Select id="PASign_signLimitType" value={this.state.signoffMent.signoffMent_signup.PASign_signLimitType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 5)} placeholder="限制签到类型">
                    <Option value="0">不限</Option>
                    <Option value="1">GPS签到</Option>
                    <Option value="2">二维码签到</Option>
                    <Option value="3">GPS+二维码签到</Option>
                    <Option value="4">扫码核销签到</Option>
                    <Option value="3">GPS+扫码核销签到</Option>
                  </Select>

                </Form.Item>
              </Col>





            </Row>
            <Card title="签到次序" bordered={false}>
              {getFieldDecorator('members', {
                initialValue: this.state.tableData111,
              })(<TableForm onChange={this.onChange111} />)}
            </Card>

          </Form>
        </Card>

        <Card title={"参与流程签退参数配置"} className={styles.card} bordered={false} hidden={havecyhidden}>
          <Form layout="vertical" hideRequiredMark>


            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="条件类型"
                >
                  <Select id="PASign_exeType" value={this.state.signoffMent.signoffMent_cy.PASign_exeType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 2)} placeholder="条件类型">
                    <Option value="1">参与条件</Option>
                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="流程选择"
                >
                  <Select id="PASign_signType" value={this.state.signoffMent.signoffMent_cy.PASign_signType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 4)} placeholder="流程选择">
                    <Option value="5">签退流程</Option>
                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="当前所处次序"
                >
                  <Input id="PASign_curSignNum" value={this.state.signoffMent.signoffMent_cy.PASign_curSignNum} style={{ width: '100%' }} onChange={this.GetInputValue.bind(this, 2)} placeholder="当前所处签到次序" />

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="限制签到类型"
                >
                  <Select id="PASign_signLimitType" value={this.state.signoffMent.signoffMent_cy.PASign_signLimitType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 6)} placeholder="限制签到类型">
                    <Option value="0">不限</Option>
                    <Option value="1">GPS签到</Option>
                    <Option value="2">二维码签到</Option>
                    <Option value="3">GPS+二维码签到</Option>
                    <Option value="4">扫码核销签到</Option>
                    <Option value="3">GPS+扫码核销签到</Option>
                  </Select>

                </Form.Item>
              </Col>
             




            </Row>
            <Card title="签到次序" bordered={false}>
              {getFieldDecorator('members2', {
                initialValue: this.state.tableData222,
              })(<TableForm onChange={this.onChange222} />)}
            </Card>

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

export default Step6;
