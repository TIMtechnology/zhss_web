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
const Optionss = AutoComplete.Option;
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ AuthSystem, loading }) => ({
    AuthSystem,
    loading: loading.models.AuthSystem,
}))

@Form.create()
export default class TableList extends PureComponent {
    state = {
    };

    componentDidMount() {
        const { dispatch } = this.props;

    }


    render() {
        return (
            <PageHeaderWrapper title="用户管理">
                
            </PageHeaderWrapper>
        );
    }
}
