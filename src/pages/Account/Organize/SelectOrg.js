import React, { PureComponent } from 'react';
import { List, Icon, Avatar, Tag,Radio } from 'antd';
import moment from 'moment';
import { connect } from 'dva';

@connect(({ list }) => ({
  list,
}))
class Center extends PureComponent {
  render() {
  
    return (
      <Radio>Radio</Radio>
    );
  }
}

export default Center;
