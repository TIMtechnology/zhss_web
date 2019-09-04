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

class Step3 extends React.PureComponent {
  state = {
    payMent:{
      
       
            payMent_signup:{
              
            },
            payMent_cy:{

            }
      
    }
  };
  constructor(){
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
        //如果等于 则在缓存中查找是否包含 payMent_signup 如果不包含 则开始此流程

        if (ele == 2) {
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
        //如果等于 则在缓存中查找是否包含 payMent_signup 如果不包含 则开始此流程

        if (ele == 2) {
          localStorage.setItem('havecy', 1)
        }
      });
    }



    if(localStorage.getItem('havesignup') == 0 &&localStorage.getItem('havecy')==0){
      console.log('没有支付模块');
      router.push('/weapp/activity/act-admin/verifi');
    }



    
      var key = 'payMent'
      var paymentData = JSON.parse(localStorage.getItem(key));
      if (paymentData) {
        this.setState({
          ...paymentData
        })
      }
   


  }

  GetInputValue = (type,event) => {
    //开始更新state中的base数据
    switch(type){
      case 1://报名流程的
      console.log('type:1'+"event:"+event.target.value)
      var payMent = {...this.state.payMent};
      var payMent_signup = {};
      payMent_signup[event.target.id] = event.target.value;

      payMent['payMent_signup'] = {
        ...this.state.payMent.payMent_signup,
        ...payMent_signup
      }
      payMent['payMent_cy'] = {
        ...this.state.payMent.payMent_cy,
      }
      this.setState({
       payMent
      })
      break;
      case 2://参与流程的
      console.log('type:2'+"event:"+event.target.value)
      var payMent = {...this.state.payMent};
      var payMent_cy = {};
      payMent_cy[event.target.id] = event.target.value;
      payMent['payMent_signup'] = {
        ...this.state.payMent.payMent_signup,
      }
      payMent['payMent_cy'] = {
        ...this.state.payMent.payMent_cy,
        ...payMent_cy
      }
      this.setState({
       payMent
      })
      break;
    }
      //写入payMent state中

    // }
    // {
    //   payMent:{
    //     payMent_signup:{
    //       event.target.id=event.target.value
    //     }
    //   }
    // }
    // var payMent = {};
    // var payMent_signup = {};
    // payMent_signup[event.target.id] = event.target.value;
    // payMent = {payMent_signup}
    // this.setState({
    //  payMent
    // })
   
  }

  GetSelectValue = (type, event) => {
    console.log(event)
    console.log(type)
    // //
    switch (type) {
      case 1://流程编码

        // var e = {};
        // e['PAPay_funType'] = event;
        // this.setState(e);
        // //console.log(e);

        var payMent = {...this.state.payMent};
        var payMent_signup = {};
        payMent_signup['PAPay_funType'] = event;
  
        payMent['payMent_signup'] = {
          ...this.state.payMent.payMent_signup,
          ...payMent_signup
        }
        payMent['payMent_cy'] = {
          ...this.state.payMent.payMent_cy,
        }
        this.setState({
         payMent
        })
        break;

      case 2://支付方式
        // var e = {};

        // e['PAPay_payWay'] = event;
        // this.setState(e);
        var payMent = {...this.state.payMent};
        var payMent_signup = {};
        payMent_signup['PAPay_payWay'] = event;
  
        payMent['payMent_signup'] = {
          ...this.state.payMent.payMent_signup,
          ...payMent_signup
        }
        payMent['payMent_cy'] = {
          ...this.state.payMent.payMent_cy,
        }
        this.setState({
         payMent
        })
        break;
        case 3://是否固定数额
        // var e = {};

        // e['PAPay_isFixedNum'] = event;
        // this.setState(e);
        var payMent = {...this.state.payMent};
        var payMent_signup = {};
        payMent_signup['PAPay_isFixedNum'] = event;
  
        payMent['payMent_signup'] = {
          ...this.state.payMent.payMent_signup,
          ...payMent_signup
        }
        payMent['payMent_cy'] = {
          ...this.state.payMent.payMent_cy,
        }
        this.setState({
         payMent
        })
        break;
        case 4://流程编码 参与流程
        var payMent = {...this.state.payMent};
        var payMent_cy = {};
        payMent_cy['PAPay_funType'] = event;
        payMent['payMent_signup'] = {
          ...this.state.payMent.payMent_signup,
        }
        payMent['payMent_cy'] = {
          ...this.state.payMent.payMent_cy,
          ...payMent_cy
        }
        this.setState({
         payMent
        })
        break;
        case 5://支付方式 参与流程
        var payMent = {...this.state.payMent};
        var payMent_cy = {};
        payMent_cy['PAPay_payWay'] = event;
        payMent['payMent_signup'] = {
          ...this.state.payMent.payMent_signup,
        }
        payMent['payMent_cy'] = {
          ...this.state.payMent.payMent_cy,
          ...payMent_cy
        }
        this.setState({
         payMent
        })
        break;
        case 6://是否固定数额 参与流程
        var payMent = {...this.state.payMent};
        var payMent_cy = {};
        payMent_cy['PAPay_isFixedNum'] = event;
        payMent['payMent_signup'] = {
          ...this.state.payMent.payMent_signup,
        }
        payMent['payMent_cy'] = {
          ...this.state.payMent.payMent_cy,
          ...payMent_cy
        }
        this.setState({
         payMent
        })
        break;
        case 7://条件类型
        // var e = {};

        // e['PAPay_isFixedNum'] = event;
        // this.setState(e);
        var payMent = {...this.state.payMent};
        var payMent_signup = {};
        payMent_signup['PAPay_exeType'] = event;
  
        payMent['payMent_signup'] = {
          ...this.state.payMent.payMent_signup,
          ...payMent_signup
        }
        payMent['payMent_cy'] = {
          ...this.state.payMent.payMent_cy,
        }
        this.setState({
         payMent
        })
        break;
        case 8://条件类型
        // var e = {};

        // e['PAPay_isFixedNum'] = event;
        // this.setState(e);
        var payMent = {...this.state.payMent};
        var payMent_cy = {};
        payMent_cy['PAPay_exeType'] = event;
        payMent['payMent_signup'] = {
          ...this.state.payMent.payMent_signup,
        }
        payMent['payMent_cy'] = {
          ...this.state.payMent.payMent_cy,
          ...payMent_cy
        }
        this.setState({
         payMent
        })
        break;
   
    }
  }


  setLocalstorge = (e) => {

    // var intime =  localStorage.getItem('intime');
    // if (intime == 0) {
    //   var key = 'payMent_signup'
    // } else {
    //   var key = 'payMent_cy'
    // }
    var paymentData = this.state;
    localStorage.setItem('payMent', JSON.stringify(paymentData))

    //检测当前存在几个支付参数
    //如果多个 怎么区分参数名
  }

  showXiaYiBuConfirm =(e)=> {
    confirm({
      title: '确定进行下一步配置吗？',
      content: '请注意，如果本页参数未定义完整，可能会导致支付数据错误',
      onOk() {
      
        
        router.push('/weapp/activity/act-admin/verifi');
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
    var havesignuphidden =1 ;
    if(localStorage.getItem('havecy')==1){
         havecyhidden = 0 ;//显示
    }
    if(localStorage.getItem('havesignup')==1){
      havesignuphidden = 0 ;//显示
 }

    const onSelect = value => { //获取经纬度
      var value = value.split(",");
      console.log(value)
      var lat = value[0];
      var lng = value[1];
      this.setState({
        lat: lat,
        lng: lng,
        pubact_coordinate: lat + ',' + lng
      })
    };

    const handleSearch = value => {  //用于请求地区
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
    var options = [];
    if (data2.data !== undefined) {

      const arr = Object.keys(data2.data).map(key => data2.data[key]);
      console.log(arr);

      options = arr.map(opt => (
        <Option key={opt.title} title={opt.title} value={opt.location.lat + "," + opt.location.lng} pa={opt.location}>
          {opt.title}
          <span className={styles.certainsearchitemcount}>
            {opt.city}
            {opt.district}
          </span>
        </Option>
      ));

    }


    return (
      <Fragment>
        <Card title={"报名流程支付参数配置"}className={styles.card} bordered={false} hidden={havesignuphidden}>
          <Form layout="vertical" hideRequiredMark>


            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="条件类型"
                >
                  <Select id="PAPay_exeType" value={this.state.payMent.payMent_signup.PAPay_exeType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 7)} placeholder="条件类型">
                    <Option value="0">报名条件</Option>
                    <Option value="1">参与条件</Option>
                  </Select>

                </Form.Item>
              </Col>
            <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="流程选择"
                >
                  <Select id="PAPay_funType" value={this.state.payMent.payMent_signup.PAPay_funType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 1)} placeholder="流程选择">
                    <Option value="2">支付流程</Option>
                  </Select>

                </Form.Item>
              </Col>
            

            
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="支付方式"
                >
                <Select id="PAPay_payWay" value={this.state.payMent.payMent_signup.PAPay_payWay} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 2)} placeholder="支付方式">
                    <Option value="0">积分</Option>
                    <Option value="1">金钱</Option>
                    <Option value="2">积分加金钱</Option>
                  </Select>
               </Form.Item>
              </Col>

              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="是否固定数额"
                >
                <Select id="PAPay_isFixedNum" value={this.state.payMent.payMent_signup.PAPay_isFixedNum} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 3)} placeholder="是否固定金额">
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                </Select>

               </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
              <Form.Item
                  label="积分数量"
                >
                  <Input id="PAPay_itgNum" value={this.state.payMent.payMent_signup.PAPay_itgNum}
                    onChange={this.GetInputValue.bind(this,1)} placeholder="积分数量" />
                </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
              <Form.Item
                  label="金钱数量"
                >
                  <Input id="PAPay_moneyNum"  value={this.state.payMent.payMent_signup.PAPay_moneyNum}
                    onChange={this.GetInputValue.bind(this,1)} placeholder="金钱数量" />
                </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
              <Form.Item
                  label="目标积分数量"
                >
                  <Input id="PAPay_allItgNum" value={this.state.payMent.payMent_signup.PAPay_allItgNum}
                    onChange={this.GetInputValue.bind(this,1)} placeholder="目标积分数量" />
                </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
              <Form.Item
                  label="目标金钱数量"
                >
                  <Input id="PAPay_allMoneyNum" value={this.state.payMent.payMent_signup.PAPay_allMoneyNum}
                    onChange={this.GetInputValue.bind(this,1)} placeholder="目标金钱数量" />
                </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
              <Form.Item
                  label="总可购买数量"
                >
                  <Input id="PAPay_limitBuyNum" value={this.state.payMent.payMent_signup.PAPay_limitBuyNum}
                    onChange={this.GetInputValue.bind(this,1)} placeholder="总计可购买数量" />
                </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
              <Form.Item
                  label="参考积分数组"
                >
                  <Input id="PAPay_referItgNumArr" value={this.state.payMent.payMent_signup.PAPay_referItgNumArr}
                    onChange={this.GetInputValue.bind(this,1)} placeholder="参考积分数组" />
                </Form.Item>
                </Col>
                <Col lg={8} md={12} sm={24}>
              <Form.Item
                  label="参考金钱数组"
                >
                  <Input id="PAPay_referMonNumArr" value={this.state.payMent.payMent_signup.PAPay_referMonNumArr}
                    onChange={this.GetInputValue.bind(this,1)} placeholder="参考金钱数组" />
                </Form.Item>
                </Col>
            </Row>

          </Form>
        </Card>

         <Card title={"参与流程支付参数配置"}className={styles.card} bordered={false} hidden={havecyhidden}>
        <Form layout="vertical" hideRequiredMark>


          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
          <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="条件类型"
                >
                  <Select id="PAPay_exeType" value={this.state.payMent.payMent_cy.PAPay_exeType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 8)} placeholder="条件类型">
                    <Option value="0">报名条件</Option>
                    <Option value="1">参与条件</Option>
                  </Select>

                </Form.Item>
              </Col>
          <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="流程选择"
              >
                <Select id="PAPay_funType" value={this.state.payMent.payMent_cy.PAPay_funType} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 4)} placeholder="流程选择">
                  <Option value="2">支付流程</Option>
                </Select>

              </Form.Item>
            </Col>
          

          
            <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="支付方式"
              >
              <Select id="PAPay_payWay" value={this.state.payMent.payMent_cy.PAPay_payWay} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 5)} placeholder="支付方式">
                  <Option value="0">积分</Option>
                  <Option value="1">金钱</Option>
                  <Option value="2">积分加金钱</Option>
                </Select>
             </Form.Item>
            </Col>

            <Col lg={8} md={12} sm={24}>
              <Form.Item
                label="是否固定数额"
              >
              <Select id="PAPay_isFixedNum" value={this.state.payMent.payMent_cy.PAPay_isFixedNum} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 6)} placeholder="是否固定金额">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
              </Select>

             </Form.Item>
            </Col>
            <Col lg={8} md={12} sm={24}>
            <Form.Item
                label="积分数量"
              >
                <Input id="PAPay_itgNum" value ={this.state.payMent.payMent_cy.PAPay_itgNum}
                  onChange={this.GetInputValue.bind(this,2)} placeholder="积分数量" />
              </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
            <Form.Item
                label="金钱数量"
              >
                <Input id="PAPay_moneyNum" value ={this.state.payMent.payMent_cy.PAPay_moneyNum}
                  onChange={this.GetInputValue.bind(this,2)} placeholder="金钱数量" />
              </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
            <Form.Item
                label="目标积分数量"
              >
                <Input id="PAPay_allItgNum" value ={this.state.payMent.payMent_cy.PAPay_allItgNum}
                  onChange={this.GetInputValue.bind(this,2)} placeholder="目标积分数量" />
              </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
            <Form.Item
                label="目标金钱数量"
              >
                <Input id="PAPay_allMoneyNum" value={this.state.payMent.payMent_cy.PAPay_allMoneyNum}
                  onChange={this.GetInputValue.bind(this,2)} placeholder="目标金钱数量" />
              </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
            <Form.Item
                label="总可购买数量"
              >
                <Input id="PAPay_limitBuyNum" value={this.state.payMent.payMent_cy.PAPay_limitBuyNum}
                  onChange={this.GetInputValue.bind(this,2)} placeholder="总计可购买数量" />
              </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
            <Form.Item
                label="参考积分数组"
              >
                <Input id="PAPay_referItgNumArr" value={this.state.payMent.payMent_cy.PAPay_referItgNumArr}
                  onChange={this.GetInputValue.bind(this,2)} placeholder="参考积分数组" />
              </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
            <Form.Item
                label="参考金钱数组"
              >
                <Input id="PAPay_referMonNumArr" value={this.state.payMent.payMent_cy.PAPay_referMonNumArr}
                  onChange={this.GetInputValue.bind(this,2)} placeholder="参考金钱数组" />
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

export default Step3;
