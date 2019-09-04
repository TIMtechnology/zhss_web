import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider,
    Steps,
    Radio,
    TreeSelect,
    AutoComplete
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UnitManageList.less';
import { returnAtIndex } from 'lodash-decorators/utils';
const Optionss = AutoComplete.Option;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['success', 'error'];
const status = ['可用', '禁用'];


const CreateForm = Form.create()(props => {
    //console.log(props)
    const { modalVisible, form, handleAdd, handleModalVisible, RoleList, MenuList } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };

    //console.log(RoleList.length)
    const children = [];
    if (RoleList) {
        for (let i = 0; i < RoleList.length; i++) {

            children.push(<Option key={RoleList[i]['Admin_JS_id']}>{RoleList[i]['Admin_JS_name']}</Option>);
        }
    }

    const MenuL = [];
    if (MenuList) {
        for (let i = 0; i < MenuList.length; i++) {

            MenuL.push(<Option key={MenuList[i]['Admin_MenuType_value']}>{MenuList[i]['Admin_MenuType_name']}</Option>);
        }
    }


    function handleChange(value) {
        console.log(`Selected: ${value}`);
    }
    return (
        <Modal
            title="新建用户"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户账号">
                {form.getFieldDecorator('UserNum', {
                    rules: [{ required: true, message: '请输入用户账号' }],
                })(<Input placeholder="请输入用户账号" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="登陆密码">
                {form.getFieldDecorator('UserPsw', {
                    rules: [{ required: true, message: '请输入用户密码' }],
                })(<Input placeholder="请输入用户密码" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="默认头像">
                {form.getFieldDecorator('avatarurl', {
                    rules: [{ required: true, message: '请输入默认头像链接' }],
                    initialValue: 'https://app.hbygxh.org/img/logo.png'
                })(<Input placeholder="请输入默认头像链接" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户姓名">
                {form.getFieldDecorator('UserInfoName', {
                    rules: [{ required: true, message: '请输入用户姓名' }],

                })(<Input placeholder="请输入用户姓名" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账户角色">
                {form.getFieldDecorator('Roleid', {
                    rules: [{ required: true, message: '请选择账户角色' }],
                })(
                    <Select

                        onChange={handleChange}
                        style={{ width: 200 }}
                    >
                        {children}
                    </Select>
                )}

            </FormItem>
        </Modal>
    );
});


const SetAPFUserForm = Form.create()(props => {
    const { modalVisible, form, SetAPFUserAction, handleUpdateUserBMVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            SetAPFUserAction(fieldsValue);
        });
    };
    return (
        <Modal
            title="赋予账号审批权限"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleUpdateUserBMVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="审批等级">
                {form.getFieldDecorator('LV', {
                    rules: [{ required: true, message: '请输入等级' }],
                })(<Input placeholder="请输入等级" />)}
            </FormItem>
        </Modal>
    );
});

const UpdateUserBMFrom = Form.create()(props => {
    console.log(props)
    const { form, handleUserBMBind, handleUpdateUserBMVisible, UnitBMList, modalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleUserBMBind(fieldsValue);
        });
    };

    console.log(UnitBMList)
    const children = [];
    if (UnitBMList) {
        for (let i = 0; i < UnitBMList.length; i++) {

            children.push(<Option key={UnitBMList[i]['Admin_BM_id']}>{UnitBMList[i]['Admin_BM_name']}</Option>);
        }
    }



    function handleChange(value) {
        console.log(`Selected: ${value}`);
    }
    return (
        <Modal
            title="管理部门"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleUpdateUserBMVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属部门">
                {form.getFieldDecorator('BMid', {
                    rules: [{ required: true, message: '请选择账户所属部门' }],
                })(
                    <Select

                        onChange={handleChange}
                        style={{ width: 200 }}
                    >
                        {children}
                    </Select>
                )}

            </FormItem>
        </Modal>
    );
});
@connect(({ AuthSystem,APF, loading }) => ({
    AuthSystem,
    APF,
    loading: loading.models.AuthSystem,
}))

@Form.create()
export default class TableList extends PureComponent {
    state = {
        modalVisible: false,
        showUpdateUserBM: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
        dataSource: [],
        showSetAPFUser: false
    };




    componentDidMount() {
        const { dispatch } = this.props;


        const params = {
            currentPage: 1,
            pageSize: 10,
        };
        dispatch({
            type: 'AuthSystem/GetUnitUserList',
            payload: params,
        });
        dispatch({
            type: 'AuthSystem/GetRoleManageListForUserManage',
            payload: params
        })//setGetUnitMenuTypeList
        dispatch({
            type: 'AuthSystem/reGetUnitBMList',
            payload: params,
        });

    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'AuthSystem/GetUnitUserList',
            payload: params,
        });
    };

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'AuthSystem/GetUnitUserList',
            payload: {},
        });
    };

    toggleForm = () => {
        const { expandForm } = this.state;
        this.setState({
            expandForm: !expandForm,
        });
    };

    handleMenuClick = e => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;

        if (!selectedRows) return;

        switch (e.key) {
            case 'remove':
                dispatch({
                    type: 'userlist/remove',
                    payload: {
                        no: selectedRows.map(row => row.no).join(','),
                    },
                    callback: () => {
                        this.setState({
                            selectedRows: [],
                        });
                    },
                });
                break;
            case "approval":// 赋予审批权限
                console.log(selectedRows);
                this.handleSetAPFUserFlag(true)
            default:
                break;
        }
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    handleSearch = e => {
        e.preventDefault();

        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'AuthSystem/GetUnitUserList',
                payload: values,
            });
        });
    };

    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };
    handleUpdateUserBMVisible = flag => {
        var that = this;
        console.log(flag)
        that.setState({
            showUpdateUserBM: !!flag
        })
    }
    handleSetAPFUserFlag = flag => {
        var that = this;
        console.log(flag)
        that.setState({
            showSetAPFUser: !!flag
        })
    }


    handleAdd = fields => {
        const { dispatch } = this.props;


        dispatch({
            type: 'AuthSystem/UserRoleBindToDB',
            payload: fields,
        });

        this.setState({
            modalVisible: false,
        });
    };
    handleUserBMBind = fields => {
        const { dispatch } = this.props;
        console.log(this.state.selectedRows);
        var count = this.state.selectedRows.length;
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push(this.state.selectedRows[i]['key'])
        }
        console.log(JSON.stringify(arr));
        dispatch({
            type: 'AuthSystem/setUserBMBind',
            payload: {
                ...fields,
                Userid: arr
            },
        });

        this.setState({
            showUpdateUserBM: false,
        });
    }

    handleSetAPFuser = fields => {
        const { dispatch } = this.props;
        console.log(this.state.selectedRows);
        console.log(fields);
        var count = this.state.selectedRows.length;
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push(this.state.selectedRows[i]['key'])
        }
        console.log(JSON.stringify(arr));

        dispatch({
            type:"AuthSystem/setSetAPFUser",
            payload:{
                ...fields,
                UserId:arr
            }
        })
        this.setState({
            showSetAPFUser: false,
        });
    }

    renderSimpleForm() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="用户姓名">
                            {getFieldDecorator('Admin_userinfo_name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="是否禁用">
                            {getFieldDecorator('isdel')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">未禁用</Option>
                                    <Option value="1">已禁用</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">
                                查询
              </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                                重置
              </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderAdvancedForm() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="手机号">
                            {getFieldDecorator('phonenum')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="新老用户">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">新用户</Option>
                                    <Option value="1">老用户</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="调用次数">
                            {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="更新日期">
                            {getFieldDecorator('date')(
                                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status3')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status4')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ overflow: 'hidden' }}>
                    <span style={{ float: 'right', marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">
                            查询
            </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                            重置
            </Button>
                        <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                        </a>
                    </span>
                </div>
            </Form>
        );
    }

    renderForm() {
        const { expandForm } = this.state;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    render() {
        const {
            AuthSystem: { data },
            AuthSystem: { RoleList },
            AuthSystem: { UnitBMList },
            AuthSystem: { MenuList },
            loading,
        } = this.props;

        const { selectedRows, modalVisible, showUpdateUserBM, showSetAPFUser } = this.state;

        const columns = [
            {
                title: '用户ID',
                dataIndex: 'Admin_user_id',
            },
            {
                title: '系统账号',
                dataIndex: 'Admin_user_num',
            },
            {
                title: '用户姓名',
                dataIndex: 'Admin_userinfo_name',
            },
            {
                title: '最近登陆',
                dataIndex: 'Admin_user_lastLoginTime',
            },

            // ,
            // {
            //   title: '服务调用次数',
            //   dataIndex: 'callNo',
            //   sorter: true,
            //   align: 'right',
            //   render: val => `${val} 万`,
            //   // mark to display a total number
            //   needTotal: true,
            // }
            {
                title: "账户类型",
                dataIndex: "Admin_user_type",
                render: function (text, record) {
                    switch (record.Admin_JS_type) {
                        case 0:
                            return '管理员';
                            break;
                        case 1:
                            return '普通账户';
                            break;
                        default:
                            return '其他'
                    }
                }
            },
            // {
            //     title:"菜单类型",
            //     dataIndex:"Admin_user_menutype",

            // },
            // {
            //     title: '是否禁用',
            //     dataIndex: 'Admin_user_del',
            //     filters: [
            //         {
            //             text: status[1],
            //             value: 1,
            //         },
            //         {
            //             text: status[0],
            //             value: 0,
            //         },
            //     ],
            //     onFilter: (value, record) => record.status.toString() === value,
            //     render(val) {
            //         return <Badge status={statusMap[val]} text={status[val]} />;
            //     },
            // },
            // {
            //     title: '操作',
            //     dataIndex: 'key',
            //     fixed: 'right',
            //     width: 100,
            //     render: val => (
            //         <Fragment>
            //             <a href={`/#/AdminSystem/AuthSystem/RoleManageInfo?Roleid=${val}`}>权限详情</a>
            //         </Fragment>
            //     ),
            // },
            // {
            //   title: '更新时间',
            //   dataIndex: 'updatedAt',
            //   sorter: true,
            //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            // },
        ];

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Menu.Item key="remove" onClick={() => this.handleUpdateUserBMVisible(true)}>删除</Menu.Item>
                <Menu.Item key="approval">赋予审批权限</Menu.Item>
            </Menu>
        );
        console.log(MenuList);
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,

            RoleList: RoleList,
            MenuList: MenuList
        };
        const showBMVisible = {
            handleUserBMBind: this.handleUserBMBind,
            handleUpdateUserBMVisible: this.handleUpdateUserBMVisible,
            UnitBMList: UnitBMList
        };
        const SetAPFuserVisible = {
            SetAPFUserAction: this.handleSetAPFuser,
            handleUpdateUserBMVisible: this.handleSetAPFUserFlag,
        };
        return (
            <PageHeaderWrapper title="用户管理">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新建用户
              </Button>
                            {selectedRows.length > 0 && (
                                <span>
                                    <Button onClick={() => this.handleUpdateUserBMVisible(true)}>批量操作</Button>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            更多操作 <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </span>
                            )}
                        </div>

                        <StandardTable
                            selectedRows={selectedRows}
                            loading={loading}
                            data={data}
                            //paginationProps={data.pagination}

                            columns={columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={modalVisible} />
                <UpdateUserBMFrom {...showBMVisible} modalVisible={showUpdateUserBM} />
                <SetAPFUserForm {...SetAPFuserVisible} modalVisible={showSetAPFUser} />
            </PageHeaderWrapper>
        );
    }
}
