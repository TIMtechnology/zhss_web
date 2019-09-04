import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
import AvatarList from '@/components/AvatarList';

const { Description } = DescriptionList;

@connect(({ wenumlist, loading }) => ({
  wenumlist,
  loading: loading.effects['wenumlist/GetUserInfoByUserId'],
}))
export default class BasicProfile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.search);
    this.setState({
      url: props.location.search,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'wenumlist/GetUserInfoByUserId',
      payload: { ...this.props.location.query },
    });
  }

  render() {
    const { wenumlist, loading } = this.props;
    const { userinfo } = wenumlist;
    // let goodsData = [];
    //console.log(info);
    var data = '';
    //console.log(info[]);
    for (var index in userinfo) {
      // console.log(index,":",info[index])
      data = userinfo[index];
    }
    console.log(data);
    // WeNum_city: "大连"
    // WeNum_country: "中国"
    // WeNum_groupid: "103"
    // WeNum_headimgurl: "http://thirdwx.qlogo.cn/mmopen/4yKoRGt1ZMBA0hyWjzA2iaEYb50amfLTJSo8VxyRC3m0AJxOeH13Y84ongfW2QUjdSUUx8IkAE6pcwG3JYecHk3L3r7yJuTsl/132"
    // WeNum_isguanzhu: 1
    // WeNum_language: "zh_CN"
    // WeNum_nickname: "Mr.wonder"
    // WeNum_openid: "owfL1t7rUuIBgMb_ZEMluJQlVl-0"
    // WeNum_province: "辽宁"
    // WeNum_qr_scene: "0"
    // WeNum_qr_scene_str: ""
    // WeNum_remark: ""
    // WeNum_sex: 1
    // WeNum_subscribe_scene: "ADD_SCENE_SEARCH"
    // WeNum_subscribe_time: 1537685515
    // WeNum_tagid_list: "Array"
    // WeNum_unionid: "oO9k71Kibc5rj4dPmG8fj4pJa_Vc"
    // WeNum_user_id: 5429
    // Weapp_openid: "oiktN5VP0AkI13uVZXgN46KBRaDA"
    // admin_openid: null
    return (
      <PageHeaderWrapper title="用户详情页">
        <Card bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="用户头像">
              {' '}
              <AvatarList size="large">
                <AvatarList.Item tips="touxiang" src={data.WeNum_headimgurl} />
              </AvatarList>
            </Description>
            <Description term="用户姓名">{data.WeNum_nickname}</Description>
            <Description term="是否关注">{data.WeNum_isguanzhu}</Description>
            <Description term="微信标签id">{data.WeNum_groupid}</Description>
            <Description term="性别">{data.WeNum_sex}</Description>
            <Description term="所在地区">
              {data.WeNum_city}/{data.WeNum_province}/{data.WeNum_country}
            </Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList col="1" size="large" title="其他信息" style={{ marginBottom: 32 }}>
            <Description term="用户语言">{data.WeNum_language}</Description>
            <Description term="微信公众平台id">{data.WeNum_unionid}</Description>
            <Description term="小程序id">{data.Weapp_openid}</Description>
            <Description term="管理系统id">{data.admin_openid}</Description>
            <Description term="最后一次关注时间">{data.WeNum_subscribe_time}</Description>
            <Description term="备注">{data.WeNum_remark}</Description>
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
