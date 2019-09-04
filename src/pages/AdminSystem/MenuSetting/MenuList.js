import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

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
import { Tree } from 'antd';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;
const confirm = Modal.confirm;
const TreeNodeselect = TreeSelect.TreeNode;
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { bind } from 'lodash-decorators/utils';
const ButtonGroup = Button.Group;
const Optionss = AutoComplete.Option;
const FormItem = Form.Item;

const { Option } = Select;

const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible, MenuTreeNode } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };
    const renderTreel = (data, idx) => {
        //console.log('树形菜单数据源', data);
        return data.map(item => {
            // console.log(item);
            if (!item.childs) {
                return (
                    <TreeNodeselect value={item.Admin_menu_id} title={item.Admin_menu_zhName + '' + item.Admin_menu_routeURL} key={item.Admin_menu_id} isLeaf />
                )
            } else {
                return (
                    <TreeNodeselect value={item.Admin_menu_id} title={item.Admin_menu_zhName + '' + item.Admin_menu_routeURL} key={item.Admin_menu_id}>
                        {renderTreel(item.childs)}
                    </TreeNodeselect>
                )
            }
        })

    };

    //console.log(MenuTreeNode);
    const treeElement = renderTreel(MenuTreeNode);
    return (
        <Modal
            title="添加菜单"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单中文名">
                {form.getFieldDecorator('Admin_menu_zhName', {
                    rules: [{ required: true, message: '请输入菜单中文名' }],
                })(<Input placeholder="请输入菜单中文名" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单英文名">
                {form.getFieldDecorator('Admin_menu_Name', {
                    rules: [{ required: true, message: '请输入菜单英文名' }],
                })(<Input placeholder="请输入菜单英文名" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单等级">
                {form.getFieldDecorator('Admin_menu_level', {
                    rules: [{ required: true, message: '请选择菜单等级' }],
                })(<Select style={{ width: '100%' }} >
                    <Option value='1'>
                        一级菜单
              </Option>
                    <Option value='2'>
                        二级菜单
              </Option>
                    <Option value='3'>
                        三级菜单
              </Option>
                </Select>)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级菜单">
                {form.getFieldDecorator('Admin_menu_parentId', {
                    rules: [{ required: false, message: '请选择上级菜单' }],
                })(<TreeSelect style={{ width: '100%' }}>
                    {treeElement}
                </TreeSelect>)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单路由地址">
                {form.getFieldDecorator('Admin_menu_routeURL', {

                    rules: [{ required: true, message: '请输入菜单路由地址' }],
                })(<Input placeholder="请输入菜单路由地址" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单模板地址">
                {form.getFieldDecorator('Admin_menu_compURL', {
                    rules: [{ required: false, message: '请输入菜单模板地址' }],
                })(<Input placeholder="请输入菜单模板地址" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否redirect">
                {form.getFieldDecorator('Admin_menu_isredirect', {
                    initialValue: "0",
                    rules: [{ required: true, message: '请选择是否跳转' }],

                })(<Select style={{ width: '100%' }} >
                    <Option value='0'>否</Option>
                    <Option value='1'>是</Option>
                </Select>)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否隐藏">
                {form.getFieldDecorator('Admin_menu_ishide', {
                    initialValue: "0",
                    rules: [{ required: true, message: '请选择是否隐藏' }],
                })(<Select style={{ width: '100%' }} >
                    <Option value='0'>否</Option>
                    <Option value='1'>是</Option>
                </Select>)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单图标">
                {form.getFieldDecorator('Admin_menu_icon', {
                    rules: [{ required: false, message: '请输入规定模板的icon英文名' }],
                })(<Input placeholder="请输入规定模板的icon英文名" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="隐藏子菜单">
                {form.getFieldDecorator('Admin_menu_hideChildrenInMenu', {
                    initialValue: "0",
                    rules: [{ required: true, message: '请选择是否隐藏子菜单' }],
                })(<Select style={{ width: '100%' }} >
                    <Option value='0'>否</Option>
                    <Option value='1'>是</Option>
                </Select>)}
            </FormItem>
        </Modal>
    );
});

const RstMenuForm = Form.create()(props => {
    const { modalVisible, form, RstMenuFormhandleAdd, RstMenuFormhandleModalVisible, RecoveryMenuList } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            RstMenuFormhandleAdd(fieldsValue);
        });
    };


    const children = [];
    if (RecoveryMenuList) {
        for (let i = 0; i < RecoveryMenuList.length; i++) {

            children.push(<Option value={RecoveryMenuList[i]['Admin_menu_id']} key={RecoveryMenuList[i]['Admin_menu_id']}>{RecoveryMenuList[i]['Admin_menu_zhName'] + RecoveryMenuList[i]['Admin_menu_routeURL']}</Option>);
        }
    }
    return (
        <Modal
            title="新建规则"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => RstMenuFormhandleModalVisible()}
        >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="已删除菜单">
                {form.getFieldDecorator('Admin_menu_id', {
                    rules: [{ required: true, message: '请选择要恢复的菜单' }],
                })(<Select style={{ width: '100%' }}>
                    {children}
                </Select>)}
            </FormItem>
        </Modal>
    );
});
@connect(({ Menu, loading }) => ({
    Menu,
    loading: loading.models.Menu,
}))

@Form.create()
export default class TableList extends PureComponent {
    state = {
        CreatMenuVisble: false,
        RstMenuFormCreatMenuVisble: false,
    };



    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "Menu/setGetAllMenuTreeNode"
        })
        dispatch({
            type: "Menu/setGetRecoveryMenuList"
        })

    }

    onSelect = (e) => {
        console.log('Trigger Select' + e);
    };

    onExpand = () => {
        console.log('Trigger Expand');
    };

    onRightClick = (key) => {
        const { dispatch } = this.props;
        console.log(key.node.props);
        var title = "    " + key.node.props.title + "    "
        confirm({
            title: '你确定删除此项菜单吗',
            content: '请您仔细确定' + title + '是否删除，删除将影响所有用户',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                var keynum = key.node.props.eventKey;

                if (keynum) {
                    dispatch({
                        type: "Menu/setSuperAdmindelMenu",
                        payload: {
                            Admin_menu_id: keynum
                        }
                    })
                } else {
                    alert("参数出错，请刷新重试");
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    handleModalVisible = flag => {
        this.setState({
            CreatMenuVisble: !!flag,
        });
    };

    handleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: "Menu/setSuperAdminCreatMenu",
            payload: {
                ...fields
            }
        })
        console.log(fields);
        this.setState({
            CreatMenuVisble: false,
        });
    };


    //
    RstMenuFormhandleModalVisible = flag => {
        this.setState({
            RstMenuFormCreatMenuVisble: !!flag,
        });
    };

    RstMenuFormhandleAdd = fields => {
        const { dispatch } = this.props;
        dispatch({
            type: "Menu/setSuperAdminRecMenu",
            payload: {
                ...fields
            }
        })
        console.log(fields);
        this.setState({
            RstMenuFormCreatMenuVisble: false,
        });
    };

    renderTree = (data, idx) => {
        //console.log('树形菜单数据源', data);
        return data.map(item => {
            // console.log(item);
            if (!item.childs) {
                return (
                    <TreeNode value={item.Admin_menu_id} title={item.Admin_menu_zhName + '' + item.Admin_menu_routeURL} key={item.Admin_menu_id} isLeaf />
                )
            } else {
                return (
                    <TreeNode value={item.Admin_menu_id} title={item.Admin_menu_zhName + '' + item.Admin_menu_routeURL} key={item.Admin_menu_id}>
                        {this.renderTree(item.childs)}
                    </TreeNode>
                )
            }
        })

    };
    render() {
        const { Menu: { MenuTreeNode, RecoveryMenuList } } = this.props;
        const { CreatMenuVisble, RstMenuFormCreatMenuVisble } = this.state





        // console.log(MenuTreeNode);
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            MenuTreeNode: MenuTreeNode
        };
        const RstMenuFormparentMethods = {
            RstMenuFormhandleAdd: this.RstMenuFormhandleAdd,
            RstMenuFormhandleModalVisible: this.RstMenuFormhandleModalVisible,
            RecoveryMenuList: RecoveryMenuList
        };
        const treeElement = this.renderTree(MenuTreeNode);
        //console.log(treeElement);

        const content = (
            <div>
                <p>菜单设置操作需要经过培训的用户完成。</p>
                <div className="link">
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 快速开始
                </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 产品简介
                </a>
                    <a>
                        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 产品文档
                </a>
                </div>
            </div>
        );

        return (
            <div>
                <PageHeaderWrapper
                    title='菜单列表'
                    content={content}
                >

                    <Card bordered={false} >
                        <ButtonGroup>
                            <Button type="primary" onClick={() => this.handleModalVisible(true)} >
                                添加菜单<Icon type="plus-square" />
                            </Button>

                            <Button type="primary" onClick={() => this.RstMenuFormhandleModalVisible(true)} >
                                恢复菜单<Icon type="cloud" />
                            </Button>
                        </ButtonGroup>

                        <DirectoryTree
                            multiple
                            defaultExpandAll
                            onSelect={this.onSelect}
                            onExpand={this.onExpand}
                            onRightClick={this.onRightClick}
                        >
                            {treeElement}

                        </DirectoryTree>
                    </Card>
                </PageHeaderWrapper>
                <CreateForm {...parentMethods} modalVisible={CreatMenuVisble} />
                <RstMenuForm {...RstMenuFormparentMethods} modalVisible={RstMenuFormCreatMenuVisble} />
            </div>
        );
    }
}
