import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'activity', ...(require('F:/github/zhss_web/src/models/activity.js').default) });
app.model({ namespace: 'AuthSystem', ...(require('F:/github/zhss_web/src/models/AuthSystem.js').default) });
app.model({ namespace: 'global', ...(require('F:/github/zhss_web/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('F:/github/zhss_web/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('F:/github/zhss_web/src/models/login.js').default) });
app.model({ namespace: 'Menu', ...(require('F:/github/zhss_web/src/models/Menu.js').default) });
app.model({ namespace: 'ModeMsg', ...(require('F:/github/zhss_web/src/models/ModeMsg.js').default) });
app.model({ namespace: 'Order', ...(require('F:/github/zhss_web/src/models/Order.js').default) });
app.model({ namespace: 'project', ...(require('F:/github/zhss_web/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('F:/github/zhss_web/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('F:/github/zhss_web/src/models/user.js').default) });
app.model({ namespace: 'userRule', ...(require('F:/github/zhss_web/src/models/userRule.js').default) });
app.model({ namespace: 'weappact', ...(require('F:/github/zhss_web/src/models/weappact.js').default) });
app.model({ namespace: 'weapplist', ...(require('F:/github/zhss_web/src/models/weapplist.js').default) });
app.model({ namespace: 'wenumlist', ...(require('F:/github/zhss_web/src/models/wenumlist.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
