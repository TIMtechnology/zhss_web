import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import AvatarList from '@/components/AvatarList';

const { Description } = DescriptionList;

@connect(({ wenumlist, loading }) => ({
  wenumlist,
  loading: loading.effects['wenumlist/GetUserInfoByUserId'],
}))
export default class BasicProfile extends Component {
  constructor(props) {
    super(props);
    this.setState({
      url: props.location.search,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    return <PageHeaderWrapper title="用户详情页" />;
  }
}
