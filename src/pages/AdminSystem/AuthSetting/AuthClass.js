import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row,
    Col,

    Form,
    Input,
    Select,

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
    AutoComplete,
    Skeleton, Switch, Card, Icon, Avatar,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const Optionss = AutoComplete.Option;
const FormItem = Form.Item;
const { Option } = Select;
const { Meta } = Card;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
const QXClassList = {
    1:'省级单位拥有',
    2:'市级单位拥有',
    3:'区级单位拥有',
    4:'协会类型拥有',
    5:'工委会类型拥有',
    6:'监管类型拥有',
    7:'其他类型拥有',
    8:'单位管理员拥有',
    9:'工作人员拥有',
    10:'小程序用户拥有'
};

@connect(({ AuthSystem, loading }) => ({
    AuthSystem,
    loading: loading.models.AuthSystem,
}))


@Form.create()
export default class TableList extends PureComponent {



    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'AuthSystem/setSuperAdminGetAuthClass',
            payload: this.props.location.query,
        });

    }

    handleCheckup(e,num){
        const {dispatch} = this.props;
        
        
        console.log(e)
        console.log(num)
        var AuthId = this.props.location.query.AuthId;
        if(AuthId){
            dispatch({
            type:'AuthSystem/setSuperAdminSetAuthClass',
            payload:{
                AuthId:AuthId,
                ClassId:[e],
                type:num
            }
        })
        }
       
    }
    handleAllCheckup(){
        const {dispatch} = this.props;
        
        var AuthId = this.props.location.query.AuthId;
        if(AuthId){
            dispatch({
            type:'AuthSystem/setSuperAdminSetAuthClass',
            payload:{
                AuthId:AuthId,
                ClassId:[1,2,3,4,5,6,7,8,9,10],
                type:true
            }
        })
        }
       
    }

    render() {

        const { loading } = this.props;
        const {AuthSystem:{AuthClass}} = this.props;
        console.log(AuthClass.payload);
        var children =[];
        if(AuthClass.payload){
            for (let i = 0; i < AuthClass.payload.length; i++) {
                var num = AuthClass.payload[i]['Admin_QXClass_class'];
                var checkedd = AuthClass.payload[i]['checked'];
                if(checkedd == 1){
                    checkedd = true;
                }else{
                    checkedd = false;
                }
                children.push(<Card.Grid  style={gridStyle} key={AuthClass.payload[i]['key']} >{QXClassList[num]}
                <Switch onChange={this.handleCheckup.bind(this,num)} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} checked={checkedd} />
                </Card.Grid>)
            }
            
        }

        return (
            <PageHeaderWrapper title="权限所有等级">
                <Card title="权限分配"
                extra={<Button onClick={this.handleAllCheckup.bind(this)}>全部授权</Button>}
                >
                    {children}
                </Card>
            </PageHeaderWrapper>
        );
    }
}
