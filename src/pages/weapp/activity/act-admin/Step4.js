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

class Step4 extends React.PureComponent {
  state = {
    verifiMent: {


      verifiMent_signup: {

      },
      verifiMent_cy: {

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
        //如果等于 则在缓存中查找是否包含 verifiMent_signup 如果不包含 则开始此流程

        if (ele == 3) {
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
        //如果等于 则在缓存中查找是否包含 verifiMent_signup 如果不包含 则开始此流程

        if (ele == 3) {
          localStorage.setItem('havecy', 1)
        }
      });
    }



    if (localStorage.getItem('havesignup') == 0 && localStorage.getItem('havecy') == 0) {
      console.log('没有核销模块');
      router.push('/weapp/activity/act-admin/signin');
    }




    var key = 'verifiMent'
    var verifiMentData = JSON.parse(localStorage.getItem(key));
    if (verifiMentData) {
      this.setState({
        ...verifiMentData
      })
    }



  }

  GetInputValue = (type, event) => {
    //开始更新state中的base数据
    switch (type) {
      case 1://报名流程的
        console.log('type:1' + "event:" + event.target.value)
        var verifiMent = { ...this.state.verifiMent };
        var verifiMent_signup = {};
        verifiMent_signup[event.target.id] = event.target.value;

        verifiMent['verifiMent_signup'] = {
          ...this.state.verifiMent.verifiMent_signup,
          ...verifiMent_signup
        }
        verifiMent['verifiMent_cy'] = {
          ...this.state.verifiMent.verifiMent_cy,
        }
        this.setState({
          verifiMent
        })
        break;
      case 2://参与流程的
        console.log('type:2' + "event:" + event.target.value)
        var verifiMent = { ...this.state.verifiMent };
        var verifiMent_cy = {};
        verifiMent_cy[event.target.id] = event.target.value;
        verifiMent['verifiMent_signup'] = {
          ...this.state.verifiMent.verifiMent_signup,
        }
        verifiMent['verifiMent_cy'] = {
          ...this.state.verifiMent.verifiMent_cy,
          ...verifiMent_cy
        }
        this.setState({
          verifiMent
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




        var verifiMent = { ...this.state.verifiMent };
        var verifiMent_signup = {};
        verifiMent_signup['PAV_setOpenTime'] = PAV_setOpenTime;
        verifiMent_signup['PAV_setCloseTime'] = PAV_setCloseTime;
        verifiMent['verifiMent_signup'] = {
          ...this.state.verifiMent.verifiMent_signup,
          ...verifiMent_signup
        }
        verifiMent['verifiMent_cy'] = {
          ...this.state.verifiMent.verifiMent_cy,
        }

        this.setState({
          verifiMent
        })



        break;
      case 2://开启时间 参与流程
        if (typeof event !== 'string') {
          event = event.toString();
        }
        var eventarr = event.split(',');


        var PAV_setOpenTime = moment(eventarr[0]).format('YYYY-MM-DD HH:mm:ss')
        var PAV_setCloseTime = moment(eventarr[1]).format('YYYY-MM-DD HH:mm:ss')




        var verifiMent = { ...this.state.verifiMent };
        var verifiMent_cy = {};
        verifiMent_cy['PAV_setOpenTime'] = PAV_setOpenTime;
        verifiMent_cy['PAV_setCloseTime'] = PAV_setCloseTime;
        verifiMent['verifiMent_signup'] = {
          ...this.state.verifiMent.verifiMent_signup,

        }
        verifiMent['verifiMent_cy'] = {
          ...this.state.verifiMent.verifiMent_cy,
          ...verifiMent_cy
        }

        this.setState({
          verifiMent
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


        var verifiMent = { ...this.state.verifiMent };
        var verifiMent_signup = {};
        verifiMent_signup['PAV_exeType'] = event;

        verifiMent['verifiMent_signup'] = {
          ...this.state.verifiMent.verifiMent_signup,
          ...verifiMent_signup
        }
        verifiMent['verifiMent_cy'] = {
          ...this.state.verifiMent.verifiMent_cy,
        }
        console.log(verifiMent)
        this.setState({
          verifiMent
        })
        break;
      case 2://条件类型
        var verifiMent = { ...this.state.verifiMent };
        var verifiMent_cy = {};
        verifiMent_cy['PAV_exeType'] = event;

        verifiMent['verifiMent_signup'] = {
          ...this.state.verifiMent.verifiMent_signup,
        }
        verifiMent['verifiMent_cy'] = {
          ...this.state.verifiMent.verifiMent_cy,
          ...verifiMent_cy
        }
        console.log(verifiMent)
        this.setState({
          verifiMent
        })
        break;

      case 3://支付方式
        // var e = {};

        // e['PAPay_payWay'] = event;
        // this.setState(e);
        var verifiMent = { ...this.state.verifiMent };
        var verifiMent_signup = {};
        verifiMent_signup['PAV_funType'] = event;

        verifiMent['verifiMent_signup'] = {
          ...this.state.verifiMent.verifiMent_signup,
          ...verifiMent_signup
        }
        verifiMent['verifiMent_cy'] = {
          ...this.state.verifiMent.verifiMent_cy,
        }
        this.setState({
          verifiMent
        })
        break;




      case 4://支付方式 参与流程
        var verifiMent = { ...this.state.verifiMent };
        var verifiMent_cy = {};
        verifiMent_cy['PAV_funType'] = event;
        verifiMent['verifiMent_signup'] = {
          ...this.state.verifiMent.verifiMent_signup,
        }
        verifiMent['verifiMent_cy'] = {
          ...this.state.verifiMent.verifiMent_cy,
          ...verifiMent_cy
        }
        this.setState({
          verifiMent
        })
        break;


    }
  }


  setLocalstorge = (e) => {

    // var intime =  localStorage.getItem('intime');
    // if (intime == 0) {
    //   var key = 'verifiMent_signup'
    // } else {
    //   var key = 'verifiMent_cy'
    // }
    var verifiMentData = this.state;
    localStorage.setItem('verifiMent', JSON.stringify(verifiMentData))

    //检测当前存在几个支付参数
    //如果多个 怎么区分参数名
  }

  showXiaYiBuConfirm = (e) => {
    confirm({
      title: '确定进行下一步配置吗？',
      content: '请注意，如果本页参数未定义完整，可能会导致核销数据错误',
      onOk() {
        router.push('/weapp/activity/act-admin/signin');
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
        <Card title={"报名流程核销参数配置"} className={styles.card} bordered={false} hidden={havesignuphidden}>
          <Form layout="vertical" hideRequiredMark>


            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="条件类型"
                >
                  <Select id="PAV_exeType" value={this.state.verifiMent.verifiMent_signup.PAV_exeType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 1)} placeholder="条件类型">
                    <Option value="0">报名条件</Option>

                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="流程选择"
                >
                  <Select id="PAV_funType" value={this.state.verifiMent.verifiMent_signup.PAV_funType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 3)} placeholder="流程选择">
                    <Option value="3">核销流程</Option>
                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="开启关闭时间"
                >
                  <RangePicker
                    style={{ width: '100%' }}
                    showTime={{ format: 'HH:mm' }}
                    placeholder={['开启时间', '关闭时间']}
                    format="YYYY-MM-DD HH:mm:ss"
                    value={[moment((this.state.verifiMent.verifiMent_signup.PAV_setOpenTime) ? this.state.verifiMent.verifiMent_signup.PAV_setOpenTime : moment('00:00:00', 'HH:mm:ss')), moment((this.state.verifiMent.verifiMent_signup.PAV_setCloseTime) ? this.state.verifiMent.verifiMent_signup.PAV_setCloseTime : moment('23:59:59', 'HH:mm:ss'))]}
                    onChange={this.GetRangeValue.bind(this, 1)}
                  />

                </Form.Item>
                </Col>
            

            
             
            </Row>

          </Form>
        </Card>

          <Card title={"参与流程支付参数配置"} className={styles.card} bordered={false} hidden={havecyhidden}>
            <Form layout="vertical" hideRequiredMark>


              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item
                    label="条件类型"
                  >
                    <Select id="PAV_exeType" value={this.state.verifiMent.verifiMent_cy.PAV_exeType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 2)} placeholder="条件类型">
                      <Option value="1">参与条件</Option>
                    </Select>

                  </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Form.Item
                    label="流程选择"
                  >
                    <Select id="PAV_funType" value={this.state.verifiMent.verifiMent_cy.PAV_funType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 4)} placeholder="流程选择">
                      <Option value="3">核销流程</Option>
                    </Select>

                  </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="开启关闭时间"
                >
                  <RangePicker
                    style={{ width: '100%' }}
                    showTime={{ format: 'HH:mm' }}
                    placeholder={['开启时间', '关闭时间']}
                    format="YYYY-MM-DD HH:mm:ss"
                    value={[moment((this.state.verifiMent.verifiMent_cy.PAV_setOpenTime) ? this.state.verifiMent.verifiMent_cy.PAV_setOpenTime : moment('00:00:00', 'HH:mm:ss')), moment((this.state.verifiMent.verifiMent_cy.PAV_setCloseTime) ? this.state.verifiMent.verifiMent_cy.PAV_setCloseTime : moment('23:59:59', 'HH:mm:ss'))]}
                    onChange={this.GetRangeValue.bind(this, 2)}
                  />

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
    
    export default Step4;
