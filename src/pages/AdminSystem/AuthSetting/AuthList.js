import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider,
    Steps,
    Radio,
    TreeSelect,
    AutoComplete, Table, Input, InputNumber, Popconfirm
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const TreeNodeselect = TreeSelect.TreeNode;
const Optionss = AutoComplete.Option;
const ButtonGroup = Button.Group;
const { Option } = Select;
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
const FormItem = Form.Item;
const EditableContext = React.createContext();


const CreateForm = Form.create()(props => {
    const { modalVisible, form, handleAdd, handleModalVisible, QXModule, MenuTreeNode } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            handleAdd(fieldsValue);
        });
    };

    var children = [];
    if (QXModule.payload) {
        for (let i = 0; i < QXModule.payload.length; i++) {

            children.push(<Option value={QXModule.payload[i]['Admin_QXModule_id']} key={QXModule.payload[i]['Admin_QXModule_id']}>{QXModule.payload[i]['Admin_QXModule_name']}</Option>);
        }
    }

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
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限编码">
                {form.getFieldDecorator('Admin_QX_code', {
                    rules: [{ required: true, message: '请输入权限编码' }],
                })(<Input placeholder="请输入权限编码" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限名称">
                {form.getFieldDecorator('Admin_QX_name', {
                    rules: [{ required: true, message: '请输入权限名称' }],
                })(<Input placeholder="请输入权限名称" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限模块">
                {form.getFieldDecorator('Admin_QX_moduleID', {
                    rules: [{ required: false, message: '请选择权限模块' }],
                })(<Select style={{ width: '100%' }}>
                    {children}
                </Select>)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限路由">
                {form.getFieldDecorator('Admin_QX_URL', {
                    rules: [{ required: true, message: '请输入权限路由' }],
                })(<Input placeholder="请输入权限路由地址或权限名" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限类型">
                {form.getFieldDecorator('Admin_QX_control', {
                    rules: [{ required: true, message: '请选择菜单类型' }],
                })(<Select style={{ width: '100%' }} >
                    <Option value='1'>
                        路由/菜单
              </Option>
                    <Option value='2'>
                        按钮
              </Option>
                    <Option value='3'>
                        接口/API
              </Option>
                </Select>)}
            </FormItem>

            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="关联菜单">
                {form.getFieldDecorator('Admin_QX_menu_id', {
                    rules: [{ required: false, message: '请选择关联菜单' }],
                })(
                    <TreeSelect style={{ width: '100%' }}>
                        {treeElement}
                    </TreeSelect>
                )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
                {form.getFieldDecorator('Admin_QX_remark', {
                    rules: [{ required: false, message: '请输入' }],
                })(<Input placeholder="可在此处添加备注" />)}
            </FormItem>

        </Modal>
    );
});

const RstMenuForm = Form.create()(props => {
    const { modalVisible, form, RstMenuFormhandleAdd, RstMenuFormhandleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            form.resetFields();
            RstMenuFormhandleAdd(fieldsValue);
        });
    };


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

                </Select>)}
            </FormItem>
        </Modal>
    );
});






const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);


const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: false,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}


@connect(({ AuthSystem, Menu, loading }) => ({
    AuthSystem,
    Menu,
    loading: loading.models.AuthSystem,
}))



@Form.create()
export default class TableList extends PureComponent {
    state = {
        CreatMenuVisble: false,
        RstMenuFormCreatMenuVisble: false,
    };
    constructor(props) {
        super(props);
        this.state = { data, editingKey: '' };
        this.columns = [
            {
                title: '权限id',
                dataIndex: 'Admin_QX_id',
                width: '5%',
                editable: false,
            },
            {
                title: '编码',
                dataIndex: 'Admin_QX_code',
                width: '5%',
                editable: true,
            },
            {
                title: 'Admin_QX_name',
                dataIndex: 'Admin_QX_name',
                width: '15%',
                editable: true,
            },
            {
                title: 'Admin_QX_control',
                dataIndex: 'Admin_QX_control',
                width: '5%',
                editable: true,
            },
            {
                title: 'Admin_QX_URL',
                dataIndex: 'Admin_QX_URL',
                width: '30%',
                editable: true,
            }, {
                title: 'Admin_QX_remark',
                dataIndex: 'Admin_QX_remark',
                width: '20%',
                editable: true,
            },
            {
                title: '关联菜单',
                dataIndex: 'Admin_QX_menu_id',
                width: '6%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                                style={{ marginRight: 8 }}
                                            >
                                                保存
                      </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="确认取消保存?"
                                        onConfirm={() => this.cancel(record.key)}
                                    >
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                <div>
                                    <a onClick={() => this.edit(record.key)}>编辑</a>
                                    |
                                    <a href={`/#/AdminSystem/AuthSetting/AuthClass?AuthId=${record.key}`}>权限等级</a> 
                                    </div>
                                )}
                        </div>
                    );
                },
            },
        ];
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {

        console.log(key);
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            console.log(row);
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }


    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "AuthSystem/setSuperAdminGetAllAuth"
        })
        dispatch({
            type: "AuthSystem/setGetAllQXModule"
        })
        dispatch({
            type: "Menu/setGetAllMenuTreeNode"
        })
    }


    handleModalVisible = flag => {
        this.setState({
            CreatMenuVisble: !!flag,
        });
    };

    handleAdd = fields => {
        const { dispatch } = this.props;

        dispatch({
            type: 'AuthSystem/setSuperAdminCreatQX',
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

        console.log(fields);
        this.setState({
            RstMenuFormCreatMenuVisble: false,
        });
    };



    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        const { AuthSystem: { AllAuthList, QXModule }, Menu: { MenuTreeNode } } = this.props;
        //console.log(AllAuthList.payload);
        this.setState({
            data: AllAuthList.payload
        })

        const { CreatMenuVisble, RstMenuFormCreatMenuVisble } = this.state





        // console.log(MenuTreeNode);
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            QXModule: QXModule,
            MenuTreeNode: MenuTreeNode
        };
        const RstMenuFormparentMethods = {
            RstMenuFormhandleAdd: this.RstMenuFormhandleAdd,
            RstMenuFormhandleModalVisible: this.RstMenuFormhandleModalVisible,

        };
        return (
            <PageHeaderWrapper title="权限列表">
                <Card>
                    <ButtonGroup>
                        <Button type="primary" onClick={() => this.handleModalVisible(true)} >

                            添加权限<Icon type="plus-square" />
                        </Button>

                        <Button type="primary" onClick={() => this.RstMenuFormhandleModalVisible(true)} >

                            恢复权限<Icon type="cloud" />
                        </Button>
                    </ButtonGroup>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        rowClassName="editable-row"
                    />
                </Card>

                <CreateForm {...parentMethods} modalVisible={CreatMenuVisble} />
                <RstMenuForm {...RstMenuFormparentMethods} modalVisible={RstMenuFormCreatMenuVisble} />
            </PageHeaderWrapper>
        );
    }
}
