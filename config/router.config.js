export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/wxbind', component: './User/wxbind' },
    ],
  },
  {
    path: '/ModeMsg',
    component: '../layouts/BasicLayout',

    routes: [
      {
        path: '/ModeMsg/ModeMsg',
        name: 'ModeMsg',
        component: './ModeMsg/ModeMsg',
        icon: 'dashboard',
      },
    ],
  },
  {
    path: '/Unit',
    component: '../layouts/BasicLayout',

    routes: [
      {
        path: '/Unit/Update',
        name: 'Update',
        component: './Unit/Update',
        icon: 'dashboard',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/Workplace' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',

        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
            hideInMenu: true,
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            hideInMenu: true,
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
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
                //养老订单中心 列表性质
                path: '/Order/OlderOrder/Center',
                name: 'OlderOrderCenter',
                icon: 'flag',
                component: './OlderOrder/OlderOrderCenter',
                authority: ['admin', 'sxhyl', 'sxhall', 'shixhyl', 'shixhall'],
              },
              {
                //养老订单中心 服务单位接单中心
                path: '/Order/OlderOrder/CenterXJDW',
                name: 'OlderOrderCenterXJDW',
                icon: 'flag',
                component: './OlderOrder/OlderOrderCenterXJDW',
              },
              {
                //养老订单中心 本单位接单中心
                path: '/Order/OlderOrder/CenterBDW',
                name: 'OlderOrderCenterBDW',
                icon: 'flag',
                component: './OlderOrder/OlderOrderCenterBDW',
              },
              {
                //养老订单中心 本单位接单中心
                path: '/Order/OlderOrder/CenterFWRY',
                name: 'OlderOrderCenterFWRY',
                icon: 'flag',
                component: './OlderOrder/OlderOrderCenterFWRY',
              },
              {
                //养老订单创建
                path: '/Order/OlderOrder/CreatOlderOrder',
                name: 'CreatOlderOrder',
                icon: 'flag',
                component: './OlderOrder/CreatOlderOrder',
              },
              {
                //养老订单创建
                path: '/Order/OlderOrder/AdminUserOrderList',
                name: 'AdminUserOrderList',
                icon: 'flag',
                component: './OlderOrder/AdminUserOrderList',
              },

              {
                //养老订单详情（服务人员）
                path: '/Order/OlderOrder/AdminUserOrderInfo',
                name: 'AdminUserOrderInfo',
                icon: 'flag',
                hideInMenu: true,
                component: './OlderOrder/AdminUserOrderInfo',
              },
            ],
          },
          {
            path: '/Order/OlderHome',
            name: 'OlderHome',
            icon: 'tag',

            routes: [
              {
                //养老家庭列表
                path: '/Order/OlderHome/List',
                name: 'OlderHomeList',
                icon: 'flag',
                component: './OlderOrder/OlderHome/OlderHomeList',
              },
              {
                //养老家庭创建
                path: '/Order/OlderHome/Creat',
                name: 'CreatOlderHomeCenter',
                icon: 'flag',
                component: './OlderOrder/OlderHome/CreatOlderHomeCenter',
              },
              {
                //养老家庭订单列表
                path: '/Order/OlderHome/OrderList',
                name: 'OlderHomeOrderList',
                icon: 'flag',
                hideInMenu: true,
                component: './OlderOrder/OlderHome/OlderHomeOrderList',
              },
            ],
          },
        ],
      },
      //微信小程序管理
      {
        path: '/weapp',
        icon: 'wechat',
        name: 'weapp',

        routes: [
          //活动管理
          {
            path: '/weapp/activity/',
            name: 'activity',
            icon: 'tag',

            routes: [
              {
                // 发布活动
                path: '/weapp/activity/act-admin',
                name: 'act-admin',
                icon: 'flag',
                component: './weapp/activity/act-admin',

                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/weapp/activity/act-admin',
                    name: 'act-admin',
                    redirect: '/weapp/activity/act-admin/info',
                  },
                  {
                    path: '/weapp/activity/act-admin/info',
                    name: 'weapp-act-admin-info',
                    component: './weapp/activity/act-admin/Step1',
                  },
                  {
                    path: '/weapp/activity/act-admin/confirm',
                    name: 'weapp-act-admin-confirm',
                    component: './weapp/activity/act-admin/Step2',
                  },
                  {
                    path: '/weapp/activity/act-admin/payment',
                    name: 'weapp-act-admin-payment',
                    component: './weapp/activity/act-admin/Step3',
                  },
                  {
                    path: '/weapp/activity/act-admin/verifi',
                    name: 'weapp-act-admin-verifi',
                    component: './weapp/activity/act-admin/Step4',
                  },
                  {
                    path: '/weapp/activity/act-admin/signin',
                    name: 'weapp-act-admin-signin',
                    component: './weapp/activity/act-admin/Step5',
                  },
                  {
                    path: '/weapp/activity/act-admin/signoff',
                    name: 'weapp-act-admin-signoff',
                    component: './weapp/activity/act-admin/Step6',
                  },
                  {
                    path: '/weapp/activity/act-admin/reward',
                    name: 'weapp-act-admin-reward',
                    component: './weapp/activity/act-admin/Step7',
                  },
                  {
                    path: '/weapp/activity/act-admin/result',
                    name: 'weapp-act-admin-result',
                    component: './weapp/activity/act-admin/Step8',
                  },
                ],
              },
              {
                // 活动列表
                path: '/weapp/activity/activityList',
                name: 'activityList',
                icon: 'flag',
                component: './weapp/activity/ActivityList/ActivityList',
              },
              {
                // 活动列表
                path: '/weapp/activity/ActUserList',
                name: 'ActUserList',
                icon: 'flag',
                hideInMenu: true,
                component: './weapp/activity/ActivityList/ActUserList',
              },
              {
                path: '/weapp/activity/activityInfo',
                name: 'activityInfo',
                icon: 'flag',
                component: './weapp/activity/ActivityInfor/ActivityInfor',

                hideInMenu: true,
              },
              
            ],
          },
          //轮播
          {
            path: '/weapp/Lunbo',
            name: 'weapp-Lunbo',

            icon: 'tag',
            component: './weapp/activity/Lunbo/Lunbo',
          },
          //列表管理
          {
            path: '/weapp/lists/',
            name: 'lists',
            icon: 'tag',

            routes: [
              // 用户列表
              {
                path: '/weapp/lists/UserList',
                name: 'UserList',
                icon: 'flag',
                component: './weapp/lists/UserList/UserList',
              },
              {
                path: '/weapp/lists/UserList/userinfo',
                name: 'Userinfo',
                icon: 'flag',
                component: './weapp/lists/UserList/userinfo',
                hideInMenu: true,
              },
              {
                path: '/weapp/lists/GroupList',
                name: 'GroupList',
                icon: 'flag',
                component: './weapp/lists/GroupList/GroupList',
              },
              {
                path: '/weapp/lists/GroupInfo',
                name: 'GroupInfo',
                icon: 'flag',
                hideInMenu: true,
                component: './weapp/lists/GroupList/GroupInfo',
              },
            ],
          },
          //福利管理
          {
            path: '/weapp/welfare',
            name: 'welfare',
            icon: 'tag',
            routes: [
              {
                path: '/weapp/welfare/CreatNewWelfare',
                name: 'CreatNewWelfare',
                icon: 'flag',
                component: './weapp/welfare/CreatNewWelfare',
              },
            ],
          },
          
        ],
      },
      {
        path: '/WeNum',
        icon: 'wechat',
        name: 'WeNum',

        routes: [
          {
            //微信公众平台列表管理
            path: '/WeNum/lists',
            name: 'lists',
            icon: 'tag',

            routes: [
              {
                path: '/WeNum/lists/UserList',
                name: 'UserList',
                icon: 'flag',
                component: './WeNum/lists/UserList/UserList',
              },
              {
                path: '/WeNum/lists/UserList/UserInfo',
                name: 'UserInfo',
                icon: 'flag',
                hideInMenu: true,
                component: './WeNum/lists/UserList/UserInfo',
              },
              {
                path: '/WeNum/lists/GroupList',
                name: 'GroupList',
                icon: 'flag',
                component: './WeNum/lists/GroupList/GroupList',
              },
              {
                path: '/WeNum/lists/GroupInfo',
                name: 'GroupInfo',
                icon: 'flag',
                hideInMenu: true,
                component: './WeNum/lists/GroupList/GroupInfo',
              },
            ],
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
            //微信公众平台列表管理
            path: '/ModeMsg/ModeMsg',
            name: 'ModeMsg',
            icon: 'tag',
            authority: ['admin'],
            component: './ModeMsg/ModeMsg',
          },
        ],
      },
      {
        path: '/AdminSystem',
        icon: 'setting',
        name: 'AdminSystem',

        routes: [
          {
            //单位权限等管理
            path: '/AdminSystem/AuthSystem',
            name: 'AuthSystem',
            icon: 'tag',

            routes: [
              {
                path: '/AdminSystem/AuthSystem/UnitManageList',
                name: 'UnitManageList',
                icon: 'flag',

                component: './AdminSystem/AuthSystem/UnitManageList',
              },
              {
                path: '/AdminSystem/AuthSystem/RoleManageList',
                name: 'RoleManageList',
                icon: 'flag',

                component: './AdminSystem/AuthSystem/RoleManageList',
              },
              {
                path: '/AdminSystem/AuthSystem/RoleManageInfo',
                name: 'RoleManageInfo',
                icon: 'flag',

                component: './AdminSystem/AuthSystem/RoleManageInfo',
                hideInMenu: true,
              },
              {
                path: '/AdminSystem/AuthSystem/UserManageList',
                name: 'UserManageList',
                icon: 'flag',

                component: './AdminSystem/AuthSystem/UserManageList',
              },
              {
                path: '/AdminSystem/AuthSystem/DepartmentList',
                name: 'DepartmentList',
                icon: 'flag',

                component: './AdminSystem/AuthSystem/DepartmentList',
              },
              {
                path: '/AdminSystem/AuthSystem/DepartmentInfo',
                name: 'DepartmentInfo',
                icon: 'flag',

                hideInMenu: true,
                component: './AdminSystem/AuthSystem/DepartmentInfo',
              },
              // {
              //   path: '/AdminSystem/AuthSystem/DepartmentListSJ',
              //   name: 'DepartmentListSJ',
              //   icon: 'flag',

              //   component: './AdminSystem/AuthSystem/DepartmentListSJ',
              // },
            
            ],
          },
          {
            //菜单管理
            path: '/AdminSystem/MenuSetting',
            name: 'MenuSetting',
            icon: 'tag',
            routes: [
              {
                path: '/AdminSystem/MenuSetting/MenuList',
                name: 'MenuList',
                icon: 'flag',
                component: './AdminSystem/MenuSetting/MenuList',
              },
            ],
          },
          // {
          //   //审批管理
          //   path: '/AdminSystem/APFUser',
          //   name: 'APFAdmin',
          //   icon: 'tag',
          //   routes: [
          //     {
          //       path: '/AdminSystem/APFUser/APFUser',
          //       name: 'APFUser',
          //       icon: 'flag',
          //       component: './AdminSystem/APFUser/APFUser',
          //     },
          //   ],
          // },
          {
            //权限管理
            path: '/AdminSystem/AuthSetting',
            name: 'AuthSetting',
            icon: 'tag',
            routes: [
              {
                path: '/AdminSystem/AuthSetting/AuthList',
                name: 'AuthList',
                icon: 'flag',
                component: './AdminSystem/AuthSetting/AuthList',
              },
              {
                path: '/AdminSystem/AuthSetting/AuthClass',
                name: 'AuthClass',
                icon: 'flag',
                component: './AdminSystem/AuthSetting/AuthClass',
              },
            ],
          },
        ],
      },

      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        hideInMenu: true,
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: true,
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
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
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
          {
            path: '/account/Organize',
            name: 'Organize',
            routes: [
              {
                path: '/account/Organize/SelectOrg',
                component: './Account/Organize/SelectOrg',
              },
            ],
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
            name:'WaitingForMe',
            component: './APF/WaitingForMe',
          },
          {
            path: '/APF/APFInfo',
            name:'APFInfo',
            component: './APF/APFInfo',
          },
          {
            path: '/APF/CreatByMe',
            name:'CreatByMe',
            component: './APF/CreatByMe',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
