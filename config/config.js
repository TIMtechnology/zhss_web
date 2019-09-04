// https://umijs.org/config/
import os from 'os';
import pageRoutes from './router.config';
import webpackplugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

export default {
  // add for transfer to umi

  history: 'hash',
  runtimePublicPath: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },

        polyfills: ['ie11'],
        ...(!process.env.TEST && os.platform() === 'darwin'
          ? {
              dll: {
                include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
                exclude: ['@babel/runtime'],
              },
              hardSource: true,
            }
          : {}),
      },
    ],
  ],

  proxy: {
    
    '/admin': {
      target: 'https://dl.hbygxh.org/admin/',
      changeOrigin: true,
      pathRewrite: { '^/admin': '' },
    },
    '/api/v1/': {
      target: 'https://zhss.timkj.com/api/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/User': {
      target: 'https://dl.hbygxh.org/User/',
      changeOrigin: true,
      pathRewrite: { '^/User': '' },
    },
    '/ModeMsg': {
      target: 'https://dl.hbygxh.org/ModeMsg/',
      changeOrigin: true,
      pathRewrite: { '^/ModeMsg': '' },
    },
    '/base': {
      target: 'https://dl.hbygxh.org/base/',
      changeOrigin: true,
      pathRewrite: { '^/base': '' },
    },
    
    '/WeNum': {
      target: 'https://dl.hbygxh.org/WeNum/',
      changeOrigin: true,
      pathRewrite: { '^/WeNum': '' },
    },
    '/WeApp': {
      target: 'https://dl.hbygxh.org/WeApp/',
      changeOrigin: true,
      pathRewrite: { '^/WeApp': '' },
    },
    '/Unit': {
      target: 'https://dl.hbygxh.org/Unit/',
      changeOrigin: true,
      pathRewrite: { '^/Unit': '' },
    },
    '/SA': {
      target: 'https://dl.hbygxh.org/SA/',
      changeOrigin: true,
      pathRewrite: { '^/SA': '' },
    },
    '/APF': {
      target: 'https://dl.hbygxh.org/APF/',
      changeOrigin: true,
      pathRewrite: { '^/APF': '' },
    },
    '/Act': {
      target: 'https://dl.hbygxh.org/Act/',
      changeOrigin: true,
      pathRewrite: { '^/Act': '' },
    },
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    name: '河北省义务工作者协会',
    background_color: '#FFF',
    description: 'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    display: 'standalone',
    start_url: '/index.html',
    icons: [
      {
        src: '/favicon.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  },

  chainWebpack: webpackplugin,
  cssnano: {
    mergeRules: false,
  },
};
