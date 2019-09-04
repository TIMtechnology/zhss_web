import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'activity', ...(require('C:/pro/hbyg_sys/src/models/activity.js').default) });
app.model({ namespace: 'AuthSystem', ...(require('C:/pro/hbyg_sys/src/models/AuthSystem.js').default) });
app.model({ namespace: 'global', ...(require('C:/pro/hbyg_sys/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('C:/pro/hbyg_sys/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('C:/pro/hbyg_sys/src/models/login.js').default) });
app.model({ namespace: 'Menu', ...(require('C:/pro/hbyg_sys/src/models/Menu.js').default) });
app.model({ namespace: 'ModeMsg', ...(require('C:/pro/hbyg_sys/src/models/ModeMsg.js').default) });
app.model({ namespace: 'Order', ...(require('C:/pro/hbyg_sys/src/models/Order.js').default) });
app.model({ namespace: 'project', ...(require('C:/pro/hbyg_sys/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('C:/pro/hbyg_sys/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('C:/pro/hbyg_sys/src/models/user.js').default) });
app.model({ namespace: 'userRule', ...(require('C:/pro/hbyg_sys/src/models/userRule.js').default) });
app.model({ namespace: 'weappact', ...(require('C:/pro/hbyg_sys/src/models/weappact.js').default) });
app.model({ namespace: 'weapplist', ...(require('C:/pro/hbyg_sys/src/models/weapplist.js').default) });
app.model({ namespace: 'wenumlist', ...(require('C:/pro/hbyg_sys/src/models/wenumlist.js').default) });
