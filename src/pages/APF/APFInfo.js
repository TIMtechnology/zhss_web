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
    Modal
} from 'antd';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './APFInfo.less';
const confirm = Modal.confirm;
const { Step } = Steps;
const { Meta } = Card;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;





const setpNum = [0, 1, 2,2,1]


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
        审批中
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
        tab: '图片列表',
    },
    {
        key: 'tab2',
        tab: '文件列表',
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

@connect(({ APF, Menu
    , loading }) => ({
        APF,
        Menu,
        loading: loading.effects['APF/setGetAPFInfo'],
    }))
class AdvancedProfile extends Component {
    state = {
        operationkey: 'tab1',
        stepDirection: 'horizontal',
        APFstatus: ['创建', '审批中', '已通过', '驳回','待上上级审核']
    };
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'APF/setGetAPFInfo',
            payload: this.props.location.query,
        });
        dispatch({
            type: 'Menu/setCheckBTNAuth',
            payload: {
                BTNname: 'BTN-StartRunAPF',
            },
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
        const { APF, Menu: { BTNAuth }, loading } = this.props;
        const id = this.props.location.query;
        const { advancedOperation1, advancedOperation2, advancedOperation3, info } = APF;





        console.log(BTNAuth)
        if (info == undefined) {
            return (<PageHeaderWrapper
                title="审批流详情">

            </PageHeaderWrapper>);
        }
        if (info.info != undefined) {
            var T1children = [];
            if (info.info.ApprovalFlow_log_imgurl != undefined || info.info.ApprovalFlow_log_imgurl != null) {
                var json = JSON.parse(info.info.ApprovalFlow_log_imgurl);
                console.log(json.fileList)

                json.fileList.forEach(e => {
                    console.log(e)
                    T1children.push(
                        <Col span={8}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={'uploads/' + e.url} />}
                            >
                                <Meta
                                    title={e.name}
                                    description={"文件大小:" + Math.round(e.size / 1024) + 'KB'}
                                />
                            </Card>
                        </Col>
                    )
                });
            } else {
                T1children.push(
                    <Card>暂无图片</Card>
                )
            }
            var T2children = [];
            if (info.info.ApprovalFlow_log_fileurl != undefined || info.info.ApprovalFlow_log_fileurl != null) {
                var json = JSON.parse(info.info.ApprovalFlow_log_fileurl);
                console.log(json.fileList)

                json.fileList.forEach(e => {
                    console.log(e)
                    T2children.push(<Card
                        hoverable
                        actions={[<a href={"uploads/" + e.url} ><Icon type="download" /></a>]}

                    >
                        <Meta
                            title={e.name}
                            description={"文件大小:" + Math.round(e.size / 1024) + 'KB'}
                        />
                    </Card>)
                });
            } else {
                T2children.push(
                    <Card>暂无文件</Card>
                )
            }

            const contentList = {
                tab1: (
                    <Row gutter={16}>
                        {T1children}
                    </Row>


                ),
                tab2: (
                    <div>{T2children}</div>
                ),

            };

            const convertUnicode = input =>
                input.replace(/\\u(\w\w\w\w)/g, (a, b) =>
                    String.fromCharCode(parseInt(b, 16))
                );
            //     <ButtonGroup>

            //     <Dropdown overlay={
            //         <Menu>
            //             <Menu.Item key="1"> <Button type="primary"  {...BTNAuth} onClick  >审批拒绝</Button></Menu.Item>
            //         </Menu>
            //     } placement="bottomRight">
            //         <Button>
            //             <Icon type="ellipsis" />

            //         </Button>
            //     </Dropdown>
            // </ButtonGroup>
            const showOKConfirm =()=> {
                const {dispatch } = this.props;
                confirm({
                  title: '确定审批通过吗?',
                //   content: 'Some descriptions',
                  onOk() {

                    if(id){
                        dispatch({
                            type:"APF/setRunAPF",
                            payload:{
                                    log_id :id.id,
                                    flag:1
                            }
                        })
                    }else{
                        alert('获取基础参数错误需要重进此页');
                    }
                      
                    console.log('OK');
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              const showFAConfirm = () =>{
                  const {dispatch } = this.props;
                confirm({
                  title: '确定审批拒绝吗?',
                //   content: 'Some descriptions',
                  onOk() {
                    
                    if(id){
                        dispatch({
                            type:"APF/setRunAPF",
                            payload:{
                                    log_id :id.id,
                                    flag:0
                            }
                        })
                    }else{
                        alert('获取基础参数错误需要重进此页');
                    }
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              const cuiyixia =()=>{
                  const {dispatch } =this.props;
                  dispatch({
                      type:'APF/setCuiYiXia',
                      payload:{
                          log_id:id.id
                      }
                  })
              }

            return (
                <PageHeaderWrapper
                    title="审批流详情"
                    logo={
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
                    }
                    action={
                        <Fragment>
                            <Button type="primary"  {...BTNAuth} onClick={showOKConfirm}  >审批通过</Button>
                            <Button  {...BTNAuth} onClick={showFAConfirm}  >审批拒绝</Button>

                        </Fragment>
                    }
                    content={
                        <DescriptionList className={styles.headerList} size="small" col="2">
                            <Description term="流程代码">{info.info.ApprovalFlow_log_FlowCode}</Description>
                            <Description term="创建时间">{info.info.ApprovalFlow_log_Creattime}</Description>
                            <Description term="关联单据">
                                <a href="">{info.info.ApprovalFlow_log_GLid}</a>
                            </Description>
                            <Description term="审核时间">{info.info.ApprovalFlow_log_APFtime}</Description>
                            <Description term="正审核单位">{info.info.Admin_DW_name}</Description>
                        </DescriptionList>
                    }
                    extraContent={<Row>
                        <Col xs={24} sm={12}>
                            <div className={styles.textSecondary}>状态</div>
                            <div className={styles.heading}>{this.state.APFstatus[info.info.ApprovalFlow_log_status]}</div>
                        </Col>
                        <Col xs={24} sm={12}>
                            <div className={styles.textSecondary}>创建人</div>
                            <div className={styles.heading}>{info.info.APF_CT_NAME}</div>
                        </Col>
                    </Row>}
                    tabList={tabList}
                >
                    <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
                        <Steps direction={stepDirection} progressDot={customDot} current={setpNum[info.info.ApprovalFlow_log_status]}>
                            <Step title="创建审批" description={
                                <div className={classNames(styles.textSecondary, styles.stepDescription)}>
                                    <Fragment>
                                        {info.info.APF_CT_NAME}
                                        <Icon type="wechat" style={{ marginLeft: 8 }} />
                                    </Fragment>
                                    <div>{info.info.ApprovalFlow_log_Creattime}</div>
                                </div>
                            } />
                            <Step title="审批中" description={
                                <div className={styles.stepDescription}>
                                    <Fragment>
                                        已递交 <br />{info.info.Admin_DW_name} <br />审批
                              <Icon type="wechat" style={{ color: '#00A0E9', marginLeft: 8 }} />
                                    </Fragment>
                                    <div>
                                        <a onClick ={cuiyixia}>催一下</a>
                                    </div>
                                </div>
                            } />
                            <Step title="完成" />
                        </Steps>
                    </Card>
                    <Card title="内容正文" style={{ marginBottom: 24 }} bordered={false}>

                        <div dangerouslySetInnerHTML={{
                            __html: convertUnicode(info.info.ApprovalFlow_log_content)
                        }} />

                    </Card>
                    <Card
                        className={styles.tabsCard}
                        bordered={false}
                        tabList={operationTabList}
                        onTabChange={this.onOperationTabChange}
                    >
                        {contentList[operationkey]}
                    </Card>
                </PageHeaderWrapper>
            );
        } else {
            return (
                <PageHeaderWrapper
                    title="审批流详情">

                </PageHeaderWrapper>
            );
        }


    }
}

export default AdvancedProfile;