// use localStorage to store the authority info, which might be sent from server in actual project.
import router from 'umi/router';
import request from './request';



export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  //console.log('获取授权');

  let authority = localStorage.getItem('Authority');
  let user_name = localStorage.getItem('user_name');
  // let use_wechat = localStorage.getItem('use_wechat');

  // if(use_wechat==1){

  // }else{

  // }
  //console.log(location);

  // if (!user_name) {
  //   router.push('/user/login');
  // }
  // let token = localStorage.getItem('token');
  // let time = localStorage.getItem('time');
  // if (!token || !time) {
  //   router.push('/user/login');
  // } else {
  //   var timestamp2 = Date.parse(new Date());
  //   // var timer =  timestamp2 - time
  //   var times = time * 1000;
  //   //console.log(timestamp2 - time);
  //   var cha = timestamp2 - times;
  //   if (cha > 60 * 60 * 1000) {
  //     router.push('/user/login'); // 如果超过60分钟 那么需要重新登陆 (目前无法限制到不刷新界面)
  //   } else {
  //     const rst = request('/service/checktoken.php', {
  //       method: 'POST',
  //       body: {
  //         token: token,
  //       },
  //     });

  //     rst.then(result => {
  //       localStorage.setItem('is', result.status);
  //       return result.status;
  //     });
  //     const rs = localStorage.getItem('is');
  //     if (rs === '0') {
  //       console.log('token检测成功');
  //     } else {
  //       router.push('/user/login');
  //     }
  //   }
  // }
  if (authority) {
    if (authority == 'undefined') {
      localStorage.setItem('Authority', '"guest"');
      router.push('/user/login');
      return false;
    }
    if (authority.includes('[')) {
      authority = JSON.parse(authority);
    } else {
      authority = [JSON.parse(authority)];
    }

  } else {
    // 如果不存在权限 需要跳转前去登陆
    localStorage.setItem('Authority', '"guest"');
    router.push('/user/login');
    return false;
  }
  return authority;
}

export function setAuthority(authority) {
  return localStorage.setItem('Authority', JSON.stringify(authority));
}
