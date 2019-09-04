import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
import AvatarList from '@/components/AvatarList';

const { Description } = DescriptionList;

@connect(({ weapplist, loading }) => ({
  weapplist,
  loading: loading.effects['weapplist/fetchuserinfo'],
}))
export default class BasicProfile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.query);
    this.setState({
      url: props.location.query,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'weapplist/fetchuserinfo',
      payload: this.props.location.query, 
    });
  }

  render() {
    const { weapplist, loading } = this.props;
    const { info } = weapplist;
    // let goodsData = [];
    console.log(info);
    var data = '';
    //console.log(info[]);
    for (var index in info) {
      // console.log(index,":",info[index])
      data = info[index];
    }
    console.log(data);

    return (
      <PageHeaderWrapper title="用户详情页">
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="用户头像">
              {' '}
              <AvatarList size="large">
                <AvatarList.Item tips="touxiang" src={data.user_headImgURL} />
              </AvatarList>
            </Description>
            <Description term="用户姓名">{data.user_name}</Description>
            <Description term="用户手机">{data.user_phoneNum}</Description>
            <Description term="用户组">{data.group_name}</Description>
            <Description term="所在地区">
              {data.area_cityName}/{data.area_countyName}
            </Description>
            <Description term="用户年龄">{data.user_age}</Description>
            <Description term="性别">{data.user_sex}</Description>
            <Description term="用户邮箱">{data.user_mailingAddress}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="其他信息" style={{ marginBottom: 32 }}>
            <Description term="是否培训">{data.user_isTrain}</Description>
            <Description term="用户身份">{data.user_polStatus}</Description>
            <Description term="邮寄地址">{data.user_postAddress}</Description>
            <Description term="民族">{data.user_ethnic}</Description>
            <Description term="用户单位">{data.user_company}</Description>
            <Description term="义工服尺码">{data.user_clothesSize}</Description>
            <Description term="是否加入车队">{data.user_isJoinCarTeam}</Description>
            <Description term="最高学历">{data.user_highEdu}</Description>
            <Description term="车辆类型">{data.user_carType}</Description>
            <Description term="车牌号码">{data.user_carNumber}</Description>
            <Description term="用户生日">{data.user_birth}</Description>
            <Description term="职业类型">{data.voc_name}</Description>
            <Description term="志愿方向">{data.vk_name}</Description>
            <Description term="是否老用户">{data.user_isOldUser}</Description>
            <Description term="最后登录">{data.user_lastLoginTime}</Description>
            <Description term="注册时间">{data.user_registerTime}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
