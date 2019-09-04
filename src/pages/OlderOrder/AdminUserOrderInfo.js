import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';

import { connect } from 'dva';
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

} from 'antd';
import classNames from 'classnames';
import Ellipsis from '@/components/Ellipsis';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdminUserOrderInfo.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;
const status = ['未知', '已创建', '已派单', '已接单', '已拒绝', '服务中', '已完成', '已评价', '未完成', '已取消'];

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment>
);






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


const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
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

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
  {
    key: 'tab2',
    tab: '操作日志二',
  },
  {
    key: 'tab3',
    tab: '操作日志三',
  },
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="成功" />
      ) : (
          <Badge status="error" text="驳回" />
        ),
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect(({ profile, loading, Order }) => ({
  profile,
  Order,
  loading: loading.effects['profile/fetchAdvanced'],
}))
class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'Order/setGetOrderInfoByOrderId',
      payload: this.props.location.query,
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
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

  render() {
    const { stepDirection, operationkey } = this.state;
    const { profile, loading, Order } = this.props;
    const { AdminUserOrderInfo } = Order;
    console.log(AdminUserOrderInfo);
    var ldata = '';
    //console.log(info[]);
    for (var index in AdminUserOrderInfo) {
      // console.log(index,":",info[index])
      ldata = AdminUserOrderInfo[index];
    }
    ldata = ldata[0];
    console.log(ldata)
    if (!ldata) {
      ldata = [];
    }
    var currentnum = '';
    switch (ldata.Admin_orderOlder_mode) {
      case 0:
        currentnum = 0;
        break;
      case 1:
      case 2:
      case 3:
        currentnum = 1;
        break;
      case 4:
      case 8:
      case 9:
      case 7:
        currentnum = 3;
        break;
      default:
        currentnum = 2;

    }
    console.log(currentnum);
  

    return (
      <PageHeaderWrapper
        title={'订单名称:' + ldata.Admin_orderOlder_orderName}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        content={

          <DescriptionList className={styles.headerList} size="small" col="1">
            <Ellipsis tooltip lines={1}>
              <Description term="创建人">{ldata.Admin_userinfo_name}</Description>
              <Description term="服务类型">{ldata.Admin_service_oneName + '/' + ldata.Admin_service_secondName}</Description>
              <Description term="订单号">{ldata.Admin_order_selfNum}</Description>
              <Description term="创建时间">{ldata.Admin_order_writeTime}</Description>
              <Description term="预计服务">{ldata.Admin_orderOlder_service_time}</Description>
              <Description term="备注">{ldata.Admin_older_description}</Description>
            </Ellipsis>
          </DescriptionList>

        }
        extraContent={

          <Row>
            <Col >
              <div className={styles.textSecondary}>状态</div>
              <div className={styles.heading}>{status[ldata.Admin_orderOlder_mode]}</div>
            </Col>

          </Row>

        }
        tabList={tabList}
      >
        <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={currentnum}>
            <Step title="创建订单" description={
              <div className={classNames(styles.textSecondary, styles.stepDescription)}>
                <Fragment>
                  <Description term="创建人:">{ldata.Admin_userinfo_name}</Description>
                </Fragment>
                <div>创建时间:{ldata.Admin_order_writeTime}</div>
              </div>

            } />
            <Step title="分配/接单" description={
              <div className={classNames(styles.textSecondary, styles.stepDescription)}>
                <Fragment>
                  {status[ldata.Admin_orderOlder_mode]}
                </Fragment>
                <div>接单时间:<br></br>{ldata.Admin_orderOlder_acceptOrRefuseTime}</div>
              </div>
            } />
            <Step title="服务/评价" />
            <Step title="完成" />
          </Steps>
        </Card>
        <Card title="养老家庭信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }} col="2">
            <Description term="老人姓名">{ldata.Admin_older_name}</Description>
            <Description term="联系方式">{ldata.Admin_older_phoneNum}</Description>
            
            <Description term="城市区域">{ldata.streetNameList}</Description>
            <Description term="联系地址">
              {ldata.streetNameList +' '+ldata.Admin_older_placeInfor}
            </Description>
          </DescriptionList>
         
        </Card>
        <Card title="更多信息" style={{ marginBottom: 24 }} bordered={false}>
        <DescriptionList style={{ marginBottom: 24 }} col="2">
            <Description term="外来系统订单编号">{ldata.Admin_order_num}</Description>
            <Description term="订单派单时间">{ldata.Admin_orderOlder_deliveryTime}</Description>
            <Description term="接单/拒单时间">{ldata.Admin_orderOlder_acceptOrRefuseTime}</Description>
            <Description term="服务开始时间">
              {ldata.Admin_orderOlder_startServiceTime}
            </Description>
            <Description term="服务结束时间">
              {ldata.Admin_orderOlder_stopServiceTime}
            </Description>
          </DescriptionList>
        </Card>
      
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
