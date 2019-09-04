import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/timkeji/gz/zhss_web/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    redirect: '/user/login',
    exact: true,
  },
  {
    path: '/weapp/activity/act-admin',
    name: 'act-admin',
    redirect: '/weapp/activity/act-admin/info',
    exact: true,
  },
  {
    path: '/account/center',
    redirect: '/account/center/articles',
    exact: true,
  },
  {
    path: '/account/settings',
    redirect: '/account/settings/base',
    exact: true,
  },
  {
    path: '/',
    redirect: '/dashboard/Workplace',
    exact: true,
  },
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/UserLayout'),
          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/timkeji/gz/zhss_web/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () => import('../User/Login'),
              LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Login').default,
        exact: true,
      },
      {
        path: '/user/wxbind',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/timkeji/gz/zhss_web/src/pages/User/models/register.js').then(
                  m => {
                    return { namespace: 'register', ...m.default };
                  },
                ),
              ],
              component: () => import('../User/wxbind'),
              LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                .default,
            })
          : require('../User/wxbind').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/ModeMsg',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/ModeMsg/ModeMsg',
        name: 'ModeMsg',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../ModeMsg/ModeMsg'),
              LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                .default,
            })
          : require('../ModeMsg/ModeMsg').default,
        icon: 'dashboard',
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/Unit',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/Unit/Update',
        name: 'Update',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import('/Users/timkeji/gz/zhss_web/src/pages/Unit/models/Unit.js').then(
                  m => {
                    return { namespace: 'Unit', ...m.default };
                  },
                ),
              ],
              component: () => import('../Unit/Update'),
              LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                .default,
            })
          : require('../Unit/Update').default,
        icon: 'dashboard',
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    Routes: [require('../Authorized').default],
    routes: [
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/activities.js').then(
                      m => {
                        return { namespace: 'activities', ...m.default };
                      },
                    ),
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/chart.js').then(
                      m => {
                        return { namespace: 'chart', ...m.default };
                      },
                    ),
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/monitor.js').then(
                      m => {
                        return { namespace: 'monitor', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Dashboard/Analysis'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Dashboard/Analysis').default,
            hideInMenu: true,
            exact: true,
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            hideInMenu: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/activities.js').then(
                      m => {
                        return { namespace: 'activities', ...m.default };
                      },
                    ),
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/chart.js').then(
                      m => {
                        return { namespace: 'chart', ...m.default };
                      },
                    ),
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/monitor.js').then(
                      m => {
                        return { namespace: 'monitor', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Dashboard/Monitor'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Dashboard/Monitor').default,
            exact: true,
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/activities.js').then(
                      m => {
                        return { namespace: 'activities', ...m.default };
                      },
                    ),
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/chart.js').then(
                      m => {
                        return { namespace: 'chart', ...m.default };
                      },
                    ),
                    import('/Users/timkeji/gz/zhss_web/src/pages/Dashboard/models/monitor.js').then(
                      m => {
                        return { namespace: 'monitor', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Dashboard/Workplace'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Dashboard/Workplace').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/Order',
        icon: 'appstore',
        name: 'Order',
        routes: [
          {
            path: '/Order/OlderOrder',
            name: 'OlderOrder',
            icon: 'tag',
            routes: [
              {
                path: '/Order/OlderOrder/Center',
                name: 'OlderOrderCenter',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import('../OlderOrder/OlderOrderCenter'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/OlderOrderCenter').default,
                authority: ['admin', 'sxhyl', 'sxhall', 'shixhyl', 'shixhall'],
                exact: true,
              },
              {
                path: '/Order/OlderOrder/CenterXJDW',
                name: 'OlderOrderCenterXJDW',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../OlderOrder/OlderOrderCenterXJDW'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/OlderOrderCenterXJDW').default,
                exact: true,
              },
              {
                path: '/Order/OlderOrder/CenterBDW',
                name: 'OlderOrderCenterBDW',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../OlderOrder/OlderOrderCenterBDW'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/OlderOrderCenterBDW').default,
                exact: true,
              },
              {
                path: '/Order/OlderOrder/CenterFWRY',
                name: 'OlderOrderCenterFWRY',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../OlderOrder/OlderOrderCenterFWRY'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/OlderOrderCenterFWRY').default,
                exact: true,
              },
              {
                path: '/Order/OlderOrder/CreatOlderOrder',
                name: 'CreatOlderOrder',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import('../OlderOrder/CreatOlderOrder'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/CreatOlderOrder').default,
                exact: true,
              },
              {
                path: '/Order/OlderOrder/AdminUserOrderList',
                name: 'AdminUserOrderList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../OlderOrder/AdminUserOrderList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/AdminUserOrderList').default,
                exact: true,
              },
              {
                path: '/Order/OlderOrder/AdminUserOrderInfo',
                name: 'AdminUserOrderInfo',
                icon: 'flag',
                hideInMenu: true,
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../OlderOrder/AdminUserOrderInfo'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/AdminUserOrderInfo').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/Order/OlderHome',
            name: 'OlderHome',
            icon: 'tag',
            routes: [
              {
                path: '/Order/OlderHome/List',
                name: 'OlderHomeList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../OlderOrder/OlderHome/OlderHomeList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/OlderHome/OlderHomeList').default,
                exact: true,
              },
              {
                path: '/Order/OlderHome/Creat',
                name: 'CreatOlderHomeCenter',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../OlderOrder/OlderHome/CreatOlderHomeCenter'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/OlderHome/CreatOlderHomeCenter')
                      .default,
                exact: true,
              },
              {
                path: '/Order/OlderHome/OrderList',
                name: 'OlderHomeOrderList',
                icon: 'flag',
                hideInMenu: true,
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../OlderOrder/OlderHome/OlderHomeOrderList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../OlderOrder/OlderHome/OlderHomeOrderList')
                      .default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/weapp',
        icon: 'wechat',
        name: 'weapp',
        routes: [
          {
            path: '/weapp/activity/',
            name: 'activity',
            icon: 'tag',
            routes: [
              {
                path: '/weapp/activity/act-admin',
                name: 'act-admin',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                          m => {
                            return { namespace: 'act', ...m.default };
                          },
                        ),
                      ],
                      component: () => import('../weapp/activity/act-admin'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/activity/act-admin').default,
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/weapp/activity/act-admin/info',
                    name: 'weapp-act-admin-info',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          app: require('@tmp/dva').getApp(),
                          models: () => [
                            import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                              m => {
                                return { namespace: 'act', ...m.default };
                              },
                            ),
                          ],
                          component: () =>
                            import('../weapp/activity/act-admin/Step1'),
                          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../weapp/activity/act-admin/Step1').default,
                    exact: true,
                  },
                  {
                    path: '/weapp/activity/act-admin/confirm',
                    name: 'weapp-act-admin-confirm',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          app: require('@tmp/dva').getApp(),
                          models: () => [
                            import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                              m => {
                                return { namespace: 'act', ...m.default };
                              },
                            ),
                          ],
                          component: () =>
                            import('../weapp/activity/act-admin/Step2'),
                          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../weapp/activity/act-admin/Step2').default,
                    exact: true,
                  },
                  {
                    path: '/weapp/activity/act-admin/payment',
                    name: 'weapp-act-admin-payment',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          app: require('@tmp/dva').getApp(),
                          models: () => [
                            import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                              m => {
                                return { namespace: 'act', ...m.default };
                              },
                            ),
                          ],
                          component: () =>
                            import('../weapp/activity/act-admin/Step3'),
                          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../weapp/activity/act-admin/Step3').default,
                    exact: true,
                  },
                  {
                    path: '/weapp/activity/act-admin/verifi',
                    name: 'weapp-act-admin-verifi',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          app: require('@tmp/dva').getApp(),
                          models: () => [
                            import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                              m => {
                                return { namespace: 'act', ...m.default };
                              },
                            ),
                          ],
                          component: () =>
                            import('../weapp/activity/act-admin/Step4'),
                          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../weapp/activity/act-admin/Step4').default,
                    exact: true,
                  },
                  {
                    path: '/weapp/activity/act-admin/signin',
                    name: 'weapp-act-admin-signin',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          app: require('@tmp/dva').getApp(),
                          models: () => [
                            import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                              m => {
                                return { namespace: 'act', ...m.default };
                              },
                            ),
                          ],
                          component: () =>
                            import('../weapp/activity/act-admin/Step5'),
                          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../weapp/activity/act-admin/Step5').default,
                    exact: true,
                  },
                  {
                    path: '/weapp/activity/act-admin/signoff',
                    name: 'weapp-act-admin-signoff',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          app: require('@tmp/dva').getApp(),
                          models: () => [
                            import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                              m => {
                                return { namespace: 'act', ...m.default };
                              },
                            ),
                          ],
                          component: () =>
                            import('../weapp/activity/act-admin/Step6'),
                          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../weapp/activity/act-admin/Step6').default,
                    exact: true,
                  },
                  {
                    path: '/weapp/activity/act-admin/reward',
                    name: 'weapp-act-admin-reward',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          app: require('@tmp/dva').getApp(),
                          models: () => [
                            import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                              m => {
                                return { namespace: 'act', ...m.default };
                              },
                            ),
                          ],
                          component: () =>
                            import('../weapp/activity/act-admin/Step7'),
                          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../weapp/activity/act-admin/Step7').default,
                    exact: true,
                  },
                  {
                    path: '/weapp/activity/act-admin/result',
                    name: 'weapp-act-admin-result',
                    component: __IS_BROWSER
                      ? _dvaDynamic({
                          app: require('@tmp/dva').getApp(),
                          models: () => [
                            import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                              m => {
                                return { namespace: 'act', ...m.default };
                              },
                            ),
                          ],
                          component: () =>
                            import('../weapp/activity/act-admin/Step8'),
                          LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                            .default,
                        })
                      : require('../weapp/activity/act-admin/Step8').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                path: '/weapp/activity/activityList',
                name: 'activityList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                          m => {
                            return { namespace: 'act', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import('../weapp/activity/ActivityList/ActivityList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/activity/ActivityList/ActivityList')
                      .default,
                exact: true,
              },
              {
                path: '/weapp/activity/ActUserList',
                name: 'ActUserList',
                icon: 'flag',
                hideInMenu: true,
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                          m => {
                            return { namespace: 'act', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import('../weapp/activity/ActivityList/ActUserList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/activity/ActivityList/ActUserList')
                      .default,
                exact: true,
              },
              {
                path: '/weapp/activity/activityInfo',
                name: 'activityInfo',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                          m => {
                            return { namespace: 'act', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import('../weapp/activity/ActivityInfor/ActivityInfor'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/activity/ActivityInfor/ActivityInfor')
                      .default,
                hideInMenu: true,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/weapp/Lunbo',
            name: 'weapp-Lunbo',
            icon: 'tag',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/weapp/activity/models/act.js').then(
                      m => {
                        return { namespace: 'act', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../weapp/activity/Lunbo/Lunbo'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../weapp/activity/Lunbo/Lunbo').default,
            exact: true,
          },
          {
            path: '/weapp/lists/',
            name: 'lists',
            icon: 'tag',
            routes: [
              {
                path: '/weapp/lists/UserList',
                name: 'UserList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../weapp/lists/UserList/UserList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/lists/UserList/UserList').default,
                exact: true,
              },
              {
                path: '/weapp/lists/UserList/userinfo',
                name: 'Userinfo',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../weapp/lists/UserList/userinfo'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/lists/UserList/userinfo').default,
                hideInMenu: true,
                exact: true,
              },
              {
                path: '/weapp/lists/GroupList',
                name: 'GroupList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../weapp/lists/GroupList/GroupList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/lists/GroupList/GroupList').default,
                exact: true,
              },
              {
                path: '/weapp/lists/GroupInfo',
                name: 'GroupInfo',
                icon: 'flag',
                hideInMenu: true,
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../weapp/lists/GroupList/GroupInfo'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/lists/GroupList/GroupInfo').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/weapp/welfare',
            name: 'welfare',
            icon: 'tag',
            routes: [
              {
                path: '/weapp/welfare/CreatNewWelfare',
                name: 'CreatNewWelfare',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../weapp/welfare/CreatNewWelfare'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../weapp/welfare/CreatNewWelfare').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/WeNum',
        icon: 'wechat',
        name: 'WeNum',
        routes: [
          {
            path: '/WeNum/lists',
            name: 'lists',
            icon: 'tag',
            routes: [
              {
                path: '/WeNum/lists/UserList',
                name: 'UserList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../WeNum/lists/UserList/UserList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../WeNum/lists/UserList/UserList').default,
                exact: true,
              },
              {
                path: '/WeNum/lists/UserList/UserInfo',
                name: 'UserInfo',
                icon: 'flag',
                hideInMenu: true,
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../WeNum/lists/UserList/UserInfo'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../WeNum/lists/UserList/UserInfo').default,
                exact: true,
              },
              {
                path: '/WeNum/lists/GroupList',
                name: 'GroupList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../WeNum/lists/GroupList/GroupList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../WeNum/lists/GroupList/GroupList').default,
                exact: true,
              },
              {
                path: '/WeNum/lists/GroupInfo',
                name: 'GroupInfo',
                icon: 'flag',
                hideInMenu: true,
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../WeNum/lists/GroupList/GroupInfo'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../WeNum/lists/GroupList/GroupInfo').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/ModeMsg',
        icon: 'wechat',
        name: 'ModeMsgAdmin',
        authority: ['admin'],
        routes: [
          {
            path: '/ModeMsg/ModeMsg',
            name: 'ModeMsg',
            icon: 'tag',
            authority: ['admin'],
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../ModeMsg/ModeMsg'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../ModeMsg/ModeMsg').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/AdminSystem',
        icon: 'setting',
        name: 'AdminSystem',
        routes: [
          {
            path: '/AdminSystem/AuthSystem',
            name: 'AuthSystem',
            icon: 'tag',
            routes: [
              {
                path: '/AdminSystem/AuthSystem/UnitManageList',
                name: 'UnitManageList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/AuthSystem/UnitManageList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/AuthSystem/UnitManageList').default,
                exact: true,
              },
              {
                path: '/AdminSystem/AuthSystem/RoleManageList',
                name: 'RoleManageList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/AuthSystem/RoleManageList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/AuthSystem/RoleManageList').default,
                exact: true,
              },
              {
                path: '/AdminSystem/AuthSystem/RoleManageInfo',
                name: 'RoleManageInfo',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/AuthSystem/RoleManageInfo'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/AuthSystem/RoleManageInfo').default,
                hideInMenu: true,
                exact: true,
              },
              {
                path: '/AdminSystem/AuthSystem/UserManageList',
                name: 'UserManageList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/AuthSystem/UserManageList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/AuthSystem/UserManageList').default,
                exact: true,
              },
              {
                path: '/AdminSystem/AuthSystem/DepartmentList',
                name: 'DepartmentList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/AuthSystem/DepartmentList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/AuthSystem/DepartmentList').default,
                exact: true,
              },
              {
                path: '/AdminSystem/AuthSystem/DepartmentInfo',
                name: 'DepartmentInfo',
                icon: 'flag',
                hideInMenu: true,
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/AuthSystem/DepartmentInfo'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/AuthSystem/DepartmentInfo').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/AdminSystem/MenuSetting',
            name: 'MenuSetting',
            icon: 'tag',
            routes: [
              {
                path: '/AdminSystem/MenuSetting/MenuList',
                name: 'MenuList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/MenuSetting/MenuList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/MenuSetting/MenuList').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/AdminSystem/AuthSetting',
            name: 'AuthSetting',
            icon: 'tag',
            routes: [
              {
                path: '/AdminSystem/AuthSetting/AuthList',
                name: 'AuthList',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/AuthSetting/AuthList'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/AuthSetting/AuthList').default,
                exact: true,
              },
              {
                path: '/AdminSystem/AuthSetting/AuthClass',
                name: 'AuthClass',
                icon: 'flag',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () =>
                        import('../AdminSystem/AuthSetting/AuthClass'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../AdminSystem/AuthSetting/AuthClass').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        hideInMenu: true,
        routes: [
          {
            path: '/profile/basic',
            name: 'basic',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Profile/models/profile.js').then(
                      m => {
                        return { namespace: 'profile', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Profile/BasicProfile'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Profile/BasicProfile').default,
            exact: true,
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Profile/models/profile.js').then(
                      m => {
                        return { namespace: 'profile', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Profile/AdvancedProfile'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Profile/AdvancedProfile').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: true,
        routes: [
          {
            path: '/result/success',
            name: 'success',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../Result/Success'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Result/Success').default,
            exact: true,
          },
          {
            path: '/result/fail',
            name: 'fail',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../Result/Error'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Result/Error').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Exception/403'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/403').default,
            exact: true,
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Exception/404'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/404').default,
            exact: true,
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Exception/500'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/500').default,
            exact: true,
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Exception/models/error.js').then(
                      m => {
                        return { namespace: 'error', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Exception/TriggerException'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Exception/TriggerException').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../Account/Center/Center'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Account/Center/Center').default,
            routes: [
              {
                path: '/account/center/articles',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import('../Account/Center/Articles'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/Center/Articles').default,
                exact: true,
              },
              {
                path: '/account/center/applications',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import('../Account/Center/Applications'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/Center/Applications').default,
                exact: true,
              },
              {
                path: '/account/center/projects',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import('../Account/Center/Projects'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/Center/Projects').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/Account/Settings/models/geographic.js').then(
                      m => {
                        return { namespace: 'geographic', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../Account/Settings/Info'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../Account/Settings/Info').default,
            routes: [
              {
                path: '/account/settings/base',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import('/Users/timkeji/gz/zhss_web/src/pages/Account/Settings/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                      ],
                      component: () => import('../Account/Settings/BaseView'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/Settings/BaseView').default,
                exact: true,
              },
              {
                path: '/account/settings/security',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import('/Users/timkeji/gz/zhss_web/src/pages/Account/Settings/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import('../Account/Settings/SecurityView'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/Settings/SecurityView').default,
                exact: true,
              },
              {
                path: '/account/settings/binding',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import('/Users/timkeji/gz/zhss_web/src/pages/Account/Settings/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import('../Account/Settings/BindingView'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/Settings/BindingView').default,
                exact: true,
              },
              {
                path: '/account/settings/notification',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import('/Users/timkeji/gz/zhss_web/src/pages/Account/Settings/models/geographic.js').then(
                          m => {
                            return { namespace: 'geographic', ...m.default };
                          },
                        ),
                      ],
                      component: () =>
                        import('../Account/Settings/NotificationView'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/Settings/NotificationView').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/account/Organize',
            name: 'Organize',
            routes: [
              {
                path: '/account/Organize/SelectOrg',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import('../Account/Organize/SelectOrg'),
                      LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../Account/Organize/SelectOrg').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/APF',
        icon: 'appstore',
        name: 'APF',
        routes: [
          {
            path: '/APF/WaitingForMe',
            name: 'WaitingForMe',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/APF/models/APF.js').then(
                      m => {
                        return { namespace: 'APF', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../APF/WaitingForMe'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../APF/WaitingForMe').default,
            exact: true,
          },
          {
            path: '/APF/APFInfo',
            name: 'APFInfo',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/APF/models/APF.js').then(
                      m => {
                        return { namespace: 'APF', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../APF/APFInfo'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../APF/APFInfo').default,
            exact: true,
          },
          {
            path: '/APF/CreatByMe',
            name: 'CreatByMe',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/timkeji/gz/zhss_web/src/pages/APF/models/APF.js').then(
                      m => {
                        return { namespace: 'APF', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../APF/CreatByMe'),
                  LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                    .default,
                })
              : require('../APF/CreatByMe').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../404'),
              LoadingComponent: require('/Users/timkeji/gz/zhss_web/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/timkeji/gz/zhss_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen = () => {};

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
