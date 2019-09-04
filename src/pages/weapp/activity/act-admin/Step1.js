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
  Alert,Modal,
  Upload,
  Icon,
  message,
  Card,
  Row,
  Col
} from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { ImageUtils } from 'braft-finder'

import reqwest from 'reqwest';
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

class Step1 extends React.PureComponent {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;

    var basedata = JSON.parse(localStorage.getItem('base'));
    if (basedata) {
      this.setState({
        ...basedata,
        editorState:BraftEditor.createEditorState(basedata.pubact_content)
      })
    }


  }

  GetInputValue = (event) => {
    //开始更新state中的base数据

    let e = {};
    e[event.target.id] = event.target.value;

    this.setState(e);

  }
  GetSelectValue = (type, event) => {
    console.log(event)
    console.log(type)
    // //
    switch (type) {
      case 1://活动报名条件部分

        var e = {};
        e['pubact_signupFactor_save'] = event;
        //按照event 生成 
        var pubact_signupFactor = '';
        event.forEach(ele => {
          pubact_signupFactor += ele + ','
        });
        pubact_signupFactor = pubact_signupFactor.substring(0, pubact_signupFactor.length - 1);

        //console.log(pubact_signupFactor);
        e['pubact_signupFactor'] = pubact_signupFactor

        this.setState(e);
        //console.log(e);
        break;

      case 2://是否需要培训
        var e = {};

        e['pubact_isNeedTrain'] = event;
        this.setState(e);
        break;
      case 3://参与条件

        var e = {};
        e['pubact_joinFactor_save'] = event;
        //按照event 生成 
        var pubact_joinFactor = '';
        event.forEach(ele => {
          pubact_joinFactor += ele + ','
        });
        pubact_joinFactor = pubact_joinFactor.substring(0, pubact_joinFactor.length - 1);

        //console.log(pubact_signupFactor);
        e['pubact_joinFactor'] = pubact_joinFactor

        this.setState(e);
        //console.log(e);
        break;
      case 4://活动类型
        var e = {};

        e['pubact_type'] = event;
        this.setState(e);
        break;
      case 9://附加功能
        console.log('进入附加功能')
        var e = {};
        e['pubact_attachFun_save'] = event;
        var pubact_attachFun = '';
        event.forEach(ele => {
          pubact_attachFun += ele + ','
        });
        pubact_attachFun = pubact_attachFun.substring(0, pubact_attachFun.length - 1);

        //console.log(pubact_signupFactor);
        e['pubact_attachFun'] = pubact_attachFun

        this.setState(e);
        break;
    }
  }

  GetRangeValue = (type, event) => {
    console.log("type" + type);
    console.log(event);

    switch (type) {
      case 1://报名起止时间
        if (typeof event !== 'string') {
          event = event.toString();
        }
        var eventarr = event.split(',');



        var pubact_signupStartTime = moment(eventarr[0]).format('YYYY-MM-DD HH:mm:ss')
        var pubact_signupStopTime = moment(eventarr[1]).format('YYYY-MM-DD HH:mm:ss')
        var e = {};

        e['pubact_signupStartTime'] = pubact_signupStartTime;
        e['pubact_signupStopTime'] = pubact_signupStopTime;
        this.setState(e);
        break;
      case 2://活动开始日期
        if (typeof event !== 'string') {
          event = event.toString();
        }
        var eventarr = event.split(',');

        var pubact_startDate = moment(eventarr[0]).format('YYYY-MM-DD')
        var pubact_stopDate = moment(eventarr[1]).format('YYYY-MM-DD')
        var e = {};

        e['pubact_startDate'] = pubact_startDate;
        e['pubact_stopDate'] = pubact_stopDate;
        this.setState(e);
        break;

    }



  }

  uploadHandler = (param) => {
    
    const formData = new FormData();
   formData.append('img',param.file)
   formData.append('userName',localStorage.getItem('user_name'))
    console.log(param)
    if (!param.file) {
      return false
    }
    reqwest({
      url: param.action,
      method: 'post',
      processData: false,
      data: formData,
      success: (a) => {
        console.log(a);
        if(a.error==0){
          //上传成功 
          this.setState({
            editorState: ContentUtils.insertMedias(this.state.editorState, [{
              type: 'IMAGE',
              url: 'https://dl.hbygxh.org/uploads/'+a.url
            }])
          })
        }else{
          message.error(a);
        }
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });

    

  }
  handleChange = (editorState) => {
    this.setState({ editorState })
  }

  setLocalstorge = (e) => {


    var basedata = this.state;
    var a= this.state.editorState;
     basedata.pubact_content=a.toHTML();
     basedata.editorState = [];
    localStorage.setItem('base', JSON.stringify(basedata))
  }

   showXiaYiBuConfirm() {
    confirm({
      title: '确定进行下一步配置吗？',
      content: '请注意，如果本页参数未定义完整，活动执行期间可能会出现问题,也可能创建失败',
      onOk() {
        router.push('/weapp/activity/act-admin/payment');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { dispatch, data2 } = this.props;
    const { base } = this.state;



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

    // //  <TextArea rows={5} id="pubact_content" value={this.state.pubact_content}
             // onChange={this.GetInputValue} placeholder="可以直接输入也可以采用富文本" />
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

    const controls =[
      'undo', 'redo', 'separator',
      'font-size', 'line-height', 'letter-spacing', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'hr', 'separator',
       'separator',
      'clear'
  ]
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept= "image/*"
            showUploadList={ false}
            customRequest={ this.uploadHandler }
            action='/base/UploadImg'
        >
        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */ }
        < button type="button"  className="control-item button upload-button" data- title="插入图片" >
      <Icon type="picture" theme = "filled" />
      </button>
      < /Upload>
        )
  }
    ]


    return (
      <Fragment>
        <Card title="基本信息录入" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>

            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动名称"
                >
                  <Input id="pubact_name" value={this.state.pubact_name} onChange={this.GetInputValue} placeholder="活动名称" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动归属单位"
                >
                  <Input id="pubact_DWId" value={this.state.pubact_DWId} onChange={this.GetInputValue} placeholder="活动所属单位ID" />
                </Form.Item>
              </Col>

              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动类型"
                >
                  <Select id="pubact_type" value={this.state.pubact_type} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 4)} placeholder="活动类型">
                    <Option value="0">线下活动</Option>
                    <Option value="1">普通培训</Option>
                    <Option value="2">线上公益</Option>
                    <Option value="3">公益众筹</Option>
                    <Option value="4">福利活动</Option>
                  </Select>

                </Form.Item>
              </Col>

              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="是否需要培训"
                >
                  <Select id="pubact_isNeedTrain" value={this.state.pubact_isNeedTrain} style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 2)} placeholder="是否需要培训">
                    <Option value="0">不需要</Option>
                    <Option value="1">需要</Option>

                  </Select>

                </Form.Item>
              </Col>

              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="报名条件"
                >
                  <Select id="pubact_signupFactor" value={this.state.pubact_signupFactor_save} mode='multiple' style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 1)} placeholder="活动报名条件">
                    <Option value="0">无条件</Option>
                    <Option value="1">需通过培训</Option>
                    <Option value="2">支付</Option>
                    <Option value="3">扫码核销</Option>
                    <Option value="4">签到</Option>
                    <Option value="5">签退</Option>
                    <Option value="6">奖励</Option>
                  </Select>

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="个人允许报名次数"
                >
                  <Input id="pubact_allowSignupNum" value={this.state.pubact_allowSignupNum} onChange={this.GetInputValue} placeholder="个人允许报名次数" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="总允许报名人数"
                >
                  <Input id="pubact_allowSignupPerNum" value={this.state.pubact_allowSignupPerNum} onChange={this.GetInputValue} placeholder="总允许报名人数" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="参与条件"
                >
                  <Select id="pubact_joinFactor" value={this.state.pubact_joinFactor_save} mode='multiple' style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 3)} placeholder="参与条件">
                    <Option value="0">无条件</Option>
                    <Option value="1">需通过培训</Option>
                    <Option value="2">支付</Option>
                    <Option value="3">扫码核销</Option>
                    <Option value="4">签到</Option>
                    <Option value="5">签退</Option>
                    <Option value="6">奖励</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="报名起止时间"
                >
                  <RangePicker
                    style={{ width: '100%' }}
                    showTime={{ format: 'HH:mm' }}
                    placeholder={['开始报名时间', '结束报名时间']}
                    format="YYYY-MM-DD HH:mm:ss"
                    value={[moment((this.state.pubact_signupStartTime)), moment((this.state.pubact_signupStopTime))]}

                    onChange={this.GetRangeValue.bind(this, 1)}
                  />

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动开始日期"
                >
                  <RangePicker
                    style={{ width: '100%' }}

                    placeholder={['开始日期', '结束日期']}
                    format="YYYY-MM-DD"
                    value={[moment((this.state.pubact_startDate) ? this.state.pubact_startDate : moment(moment(), 'YYYY-MM-DD')), moment((this.state.pubact_stopDate) ? this.state.pubact_stopDate : moment(moment(), 'YYYY-MM-DD'))]}

                    onChange={this.GetRangeValue.bind(this, 2)}
                  />

                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动开始时间"
                >
                  <Input id="pubact_startTime" value={this.state.pubact_startTime}
                    onChange={this.GetInputValue} placeholder="示例 08:00" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动结束时间"
                >
                  <Input id="pubact_stopTime" value={this.state.pubact_stopTime}
                    onChange={this.GetInputValue} placeholder="示例 10:00" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动签到地点"
                >
                  <AutoComplete
                    dataSource={options}
                    onSelect={onSelect.bind(this)}
                    optionLabelProp="title"
                    onBlur={handleSearch}
                    placeholder="输入活动地址后选择"
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动展示地点"
                >
                  <Input id="pubact_place" value={this.state.pubact_place}
                    onChange={this.GetInputValue} placeholder="活动展示地点" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动tips"
                >
                  <Input id="pubact_tips" value={this.state.pubact_tips}
                    onChange={this.GetInputValue} placeholder="活动小字提示" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动备注"
                >
                  <Input id="pubact_remark" value={this.state.pubact_remark}
                    onChange={this.GetInputValue} placeholder="活动备注" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="活动联系人"
                >
                  <Input id="pubact_phoneNum" value={this.state.pubact_phoneNum}
                    onChange={this.GetInputValue} placeholder="请输入活动联系人及电话" />
                </Form.Item>
              </Col>
              <Col lg={8} md={12} sm={24}>
                <Form.Item
                  label="附加功能"
                >
                  <Select id="pubact_attachFun" value={this.state.pubact_attachFun_save} mode='multiple' style={{ width: '100%' }} onChange={this.GetSelectValue.bind(this, 9)} placeholder="附加功能">
                    <Option value="1">留言功能</Option>
                    <Option value="2">进展快讯展示功能</Option>

                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item
                  label="活动左侧小图"
                >
                  <Upload {...{
                    action: '/base/UploadImg',
                    listType: 'picture',
                    name: 'img',
                    data: { userName: localStorage.getItem('user_name') },
                    onChange: (info) => {
                      let fileList = info.fileList;
                      fileList = fileList.map((file) => {
                        if (file.response) {
                          // Component will show file.url as link
                          file.url = file.response.url;
                          this.setState({
                            pubact_imgUrl: 'https://dl.hbygxh.org/uploads/' + file.response.url
                          })
                        }
                        return file;
                      });


                    }
                  }}>
                    <Button>
                      <Icon type="upload" /> Upload
              </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col>
             

              <BraftEditor
              value={ this.state.editorState }
    onChange = { this.handleChange }
    controls = { controls }
    extendControls = { extendControls }
      />
              </Col>
            </Row>

          </Form>
        </Card>

        <div style={{float:"right"}}>
        <Button type='dashed' icon='tool' onClick={this.setLocalstorge}>保存此步骤</Button>
        <Divider type="vertical" />
        <Button type='primary'  onClick={this.showXiaYiBuConfirm}>下一步</Button>
        </div>
        
      </Fragment>
    );
  }
}

export default Step1;
