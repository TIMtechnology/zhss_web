import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import Exception from '@/components/Exception';
import { getAuthority } from '@/utils/authority';
import { matchRoutes } from 'react-router-config';
import intersection from 'lodash/intersection';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Button } from 'antd';


const Authorized = RenderAuthorized(getAuthority());

export default ({ children, route, location }) => {
  const routes = matchRoutes(route.routes, location.pathname);
  const authorities = [];
  routes.forEach(item => {
    if (Array.isArray(item.route.authority) && item.route.authority.length) {
      authorities.push(item.route.authority);
    } else if (typeof item.route.authority === 'string' && item.route.authority) {
      authorities.push([item.route.authority]);
    }
  });
  const actions = (
    <div>
      <Button type="primary"  href='#/user/login'>返回登陆</Button>
      <Button  href='#/'>返回首页</Button>
    </div>
  );
  
  

  
  const noMatch = (
    <Exception
      type="403"
      desc={formatMessage({ id: 'app.exception.description.403' })}
      linkElement={Link}
      actions={actions}
      backText={formatMessage({ id: 'app.exception.back' })}
    />
  );
  return (
    <Authorized
      authority={authorities.length === 0 ? undefined : intersection(...authorities)}
      noMatch={noMatch}
    >
      {children}
    </Authorized>
  );
};
