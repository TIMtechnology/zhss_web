import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
  Input,
  Form,
  Modal,
  Upload,
} from 'antd';
import { Select } from 'antd';
import classNames from 'classnames';
import styless from './styles.less';
import TableForm from './TableForm';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ActivityInfor.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { Description } = DescriptionList;
const { Meta } = Card;
const ButtonGroup = Button.Group;
const { Option } = Select;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, id } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="开启签到"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="活动id">
        {form.getFieldDecorator('pubactid', {
          rules: [{ required: true, message: '请输入或使用默认活动ID' }],
          initialValue: id,
        })(<Input placeholder="请输入或使用默认活动ID" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="签到条件">
        {form.getFieldDecorator('exeType', {
          rules: [{ required: true, message: '请选择签到条件' }],
        })(
          <Select style={{ width: '100%' }}>
            <Option value="0">报名条件</Option>
            <Option value="1">参与条件</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="签到类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择签到类型' }],
        })(
          <Select style={{ width: '100%' }}>
            <Option value="4">签到</Option>
            <Option value="5">签退</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="签到开关">
        {form.getFieldDecorator('flag', {
          rules: [{ required: true, message: '请选择签到开关' }],
        })(
          <Select style={{ width: '100%' }}>
            <Option value="1">开启</Option>
            <Option value="0">关闭</Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="当前开启签到次序">
        {form.getFieldDecorator('cursignNum', {
          rules: [{ required: true, message: '当前开启签到次序' }],
          initialValue: 1,
        })(<Input placeholder="当前开启签到次序" />)}
      </FormItem>
    </Modal>
  );
});

const tabList = [
  {
    key: 'detail',
    tab: '详情',
  },
  {
    key: 'rule',
    tab: '规则',
  },
];

const popoverContent = (
  <div style={{ width: 160 }}>
    无加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  );

@connect(({ weappact, act, loading }) => ({
  weappact,
  act,
  loading: loading.effects['weappact/GetActInfo'],
}))
@Form.create()
export default class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
    url: '',
    modalVisible: false,
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'weappact/GetActInfo',
      payload: this.props.location.query,
    });
    dispatch({
      type: 'act/setGetActArea',
      payload: { ActId: this.props.location.query.id },
    });

    this.setState({
      id: this.props.location.query.id,
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  onInputChange = (e, a) => {
    var value = a.target.value;
    var type = e;

    switch (type) {
      case 1: //缩略图
        this.setState({
          pubact_imgUrl: value,
        });
        break;
      case 2: //原文链接
        this.setState({
          pubact_sourceUrl: value,
        });
        break;
      case 3: //输入发送数量
        this.setState({ user_limit: value });
        break;
    }
  };

  onSelectChange = (type, event) => {
    switch (type) {
      case 1: //选择发送地区
        this.setState({
          cityCode: event,
        });
        break;
      case 2: //选择是否随机
        this.setState({ isOrder: event });
        break;
    }
  };
  onsubmitModeMsg = () => {
    const { dispatch } = this.props;
    console.log(this.state);
    //检测state中是否包含 三个重要参数
    //如果存在 按照Url提交即可
    //2019-05-21 07:23 下午回来做。
    var cityCode = this.state.cityCode;
    var isOrder = this.state.isOrder;
    var user_limit = this.state.user_limit;
    if (cityCode && user_limit && user_limit != 0) {
      dispatch({
        type: 'act/setCurltoPHP',
        payload: {
          data: {
            type_T: '1',
            place_num: cityCode,
            is_order: isOrder,
            user_limit: user_limit,
            act_id: this.props.location.query.id,
          },
        },
      });
    }
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  handleAdd = fields => {
    const { dispatch } = this.props;
    console.log(fields);

    dispatch({
      type: 'act/setChengeActSign',
      payload: {
        ...fields,
      },
    });
  };

  onsubmitUrl = () => {
    const { dispatch } = this.props;
    //获取state中值  查询是否存在
    var data = {};
    if (this.state.pubact_imgUrl) {
      //检测是否与当前一致？
      data['pubact_imgUrl'] = this.state.pubact_imgUrl;
    }
    if (this.state.pubact_sourceUrl) {
      data['pubact_sourceUrl'] = this.state.pubact_sourceUrl;
    }

    //获取query
    data['pubactid'] = this.props.location.query.id;
    console.log(data);

    dispatch({
      type: 'act/setUpdateActInfoFirst',
      payload: {
        ...data,
      },
    });
  };

  render() {
    // console.log(this.props.location.search);
    const { modalVisible } = this.state;
    const { weappact, loading, act } = this.props;
    const { info } = weappact;
    const { ActArea } = act;
    //重要
    //伪动态 检测 用户账户 hbygxh后 开启模板消息推送
    var isable = true;
    //console.log(localStorage.getItem('user_name'));
    if (localStorage.getItem('user_name') == 'hbygxh') {
      isable = false;
    }
    //
    var data = '';
    console.log(ActArea);
    if (info) {
      data = info.info[0];
    }
    var ActAreaChildren = [];
    if (ActArea) {
      for (let i = 0; i < ActArea.length; i++) {
        ActAreaChildren.push(
          <Option value={ActArea[i]['actArea_cityCode']} key={ActArea[i]['actArea_cityCode']}>
            {ActArea[i]['city_cityName']}
          </Option>
        );
      }
    }

    if (!info) {
      var infoMent = [];
    } else {
      var infoMent = info;
    }
    console.log(data);
    var siteElements = [];
    var fileList = [];

    const getqrcode = re => {
      var actid = data.activity_id;
      const { dispatch } = this.props;
      dispatch({
        type: 'activity/getqrcode',
        payload: { actid: actid },
      });
    };

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      id: this.state.id,
    };

    var count = 1;
    switch (data.activity_mode) {
      case 4:
        var desc4 = (
          <div className={styles.stepDescription}>
            <Fragment>已完成</Fragment>
            <div>{data.activity_writeTime}</div>
          </div>
        );
        var desc3 = (
          <div className={styles.stepDescription}>
            <Fragment>已完成</Fragment>
          </div>
        );
        count = 3;
        break;
      default:
        var desc4 = '';
        var desc3 = '';
        count = 1;
    }

    const onChangeJzKx = a => {
      console.log(a);
    };

    const OnsetJzKx = a => {};

    const columns = [
      {
        title: '次序ID',
        dataIndex: 'PASO_id',
        key: 'PASO_id',
      },
      {
        title: '签到状态',
        dataIndex: 'PASO_isOpenSign',
        key: 'PASO_isOpenSign',
      },
      {
        title: '签到次序',
        dataIndex: 'PASO_signNum',
        key: 'PASO_signNum',
      },
      {
        title: '自动开启时间',
        dataIndex: 'PASO_setOpenSignTime',
        key: 'PASO_setOpenSignTime',
      },
      {
        title: '默认关闭时间',
        dataIndex: 'PASO_setCloseSignTime',
        key: 'PASO_setCloseSignTime',
      },
    ];
    return (
      <PageHeaderWrapper
        title={'活动名称：' + data.pubact_name}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={
          <Fragment>
            <ButtonGroup>
              <Button onClick={() => this.handleModalVisible(true)}>开启签到</Button>

              {/* <Dropdown overlay={
               <Menu>
               <Menu.Item key="open" onClick={openSecondsignup}>开启二次确认</Menu.Item>
               <Menu.Item key="close" onClick={closeSecondsignup}>关闭二次确认</Menu.Item>
               
             </Menu>
            } placement="bottomRight">
              <Button>
                <Icon type="ellipsis" />
              </Button>
            </Dropdown> */}
            </ButtonGroup>
            <Button type="primary">删除活动</Button>
          </Fragment>
        }
        content={
          <DescriptionList className={styles.headerList} size="small" col="1">
            <Description term="活动ID">{data.pubact_id}</Description>
            <Description term="活动地点名称">{data.pubact_place}</Description>
            <Description term="活动地点经纬度">{data.pubact_coordinate}</Description>
            <Description term="活动开始日期">{data.pubact_startDate}</Description>
            <Description term="活动结束日期">{data.pubact_stopDate}</Description>
            <Description term="报名开始时间">{data.pubact_signupStartTime}</Description>
            <Description term="报名结束时间">{data.pubact_signupStopTime}</Description>
            {infoMent.NeedTrain_signup == 1 && <Description term="是否需要培训">需要</Description>}
            {infoMent.NeedTrain_signup == 0 && (
              <Description term="是否需要培训">不需要</Description>
            )}
          </DescriptionList>
        }
        extraContent={
          <Row>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>活动状态</div>
              <div className={styles.heading}>{data.PAStep_userMode}</div>
            </Col>
            <Col xs={24} sm={12}>
              <div className={styles.textSecondary}>访问数/收藏数</div>
              <div className={styles.heading}>
                {data.pubact_scanNum}/{data.pubact_likeNum}
              </div>
            </Col>
            <Col span={24}>
              <Card
                bordered={false}
                hoverable
                cover={<img alt="example" src={data.pubact_QRImgUrl} />}
              >
                <Meta description="活动二维码" />
              </Card>
            </Col>
          </Row>
        }
      >
        <Card title="其他信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }} col="1">
            <Description term="活动缩略图链接">
              <Input
                defaultValue={data.pubact_imgUrl}
                onChange={this.onInputChange.bind(this, 1)}
              />
            </Description>
            <Description term="活动原文链接">
              <Input
                defaultValue={data.pubact_sourceUrl}
                onChange={this.onInputChange.bind(this, 2)}
              />
            </Description>
            <Button style={{ marginLeft: 20 }} onClick={this.onsubmitUrl}>
              提交链接
            </Button>
          </DescriptionList>
        </Card>
        <Card title="模板消息" style={{ marginBottom: 24 }} bordered={false} hidden={isable}>
          <div>
            <Divider>按地区推送</Divider>
            <DescriptionList style={{ marginBottom: 24 }} col="1">
              <Description term="地区选择">
                <Select style={{ width: '100%' }} onChange={this.onSelectChange.bind(this, 1)}>
                  {ActAreaChildren}
                </Select>
              </Description>
              <Description term="推广人数">
                <Input onChange={this.onInputChange.bind(this, 3)} />
              </Description>
              <Description term="是否随机">
                <Select style={{ width: '100%' }} onChange={this.onSelectChange.bind(this, 2)}>
                  <Option value="1" key="1">
                    是
                  </Option>
                  <Option value="2" key="2">
                    否
                  </Option>
                </Select>
              </Description>
            </DescriptionList>
            <Button style={{ marginLeft: 20 }} onClick={this.onsubmitModeMsg}>
              提交发送
            </Button>
          </div>
        </Card>
        <Card title="模块信息" style={{ marginBottom: 24 }} bordered={false}>
          {infoMent.signinMent_cy && (
            <div>
              <Divider>参与签到</Divider>

              <Row>
                <Col span={12}>
                  <DescriptionList style={{ marginBottom: 24 }} col="1">
                    <Description term="签到ID">{infoMent.signinMent_cy[0].PASign_id}</Description>
                    <Description term="当前签到次序">
                      {infoMent.signinMent_cy[0].PASign_curSignNum}
                    </Description>
                    <Description term="签到限制类型">
                      {infoMent.signinMent_cy[0].PASign_signLimitType}
                    </Description>
                  </DescriptionList>
                </Col>
                <Col span={12}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={
                      <img alt="签到二维码" src={infoMent.signinMent_cy[0].PASign_signQRImgUrl} />
                    }
                  >
                    <Meta description="签到二维码" />
                  </Card>
                </Col>
              </Row>

              <Divider>参与签到次序</Divider>
              <Table dataSource={infoMent.signinOrderMent_cy} columns={columns} />
            </div>
          )}
          {
            // {infoMent.JzKx &&
            //   <div>
            //     <Divider>进展快讯模块</Divider>
            //     <Row>
            //       <DescriptionList style={{ marginBottom: 24 }} col='1'>
            //       </DescriptionList>
            //     </Row>
            //     <Button style={{ marginLeft: 20 }} onClick={this.OnsetJzKx}>提交进展快讯</Button>
            //   </div>
            // }
          }

          {infoMent.rewardMent_cy && (
            <div>
              <Divider>参与奖励</Divider>
              <DescriptionList style={{ marginBottom: 24 }} col="1">
                <Description term="奖励ID">{infoMent.rewardMent_cy[0].PAR_id}</Description>
                <Description term="奖励内容">{infoMent.rewardMent_cy[0].PAR_rewCont}</Description>
                <Description term="奖励1">{infoMent.rewardMent_cy[0].PAR_rewNum}</Description>
                <Description term="奖励2">{infoMent.rewardMent_cy[0].PAR_rewNumSec}</Description>
              </DescriptionList>
            </div>
          )}
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <FooterToolbar extra="图片上传工具栏">
          <Upload
            {...{
              action: '/base/UploadImg',
              listType: 'picture',
              name: 'img',
              data: { userName: localStorage.getItem('user_name') },
              onChange: info => {
                let fileList = info.fileList;
                fileList = fileList.map(file => {
                  if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url;
                    alert('文件链接:' + 'https://dl.hbygxh.org/uploads/' + file.response.url);
                    this.setState({
                      ImgURL: 'https://dl.hbygxh.org/uploads/' + file.response.url,
                    });
                  }
                  return file;
                });
              },
            }}
          >
            <Button>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}
