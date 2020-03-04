import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App.vue'
import router from './router'
import store from './store'
import networkAdapter from './network/NetworkAdapter'
import VueLazyload from 'vue-lazyload'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import theme from 'muse-ui/lib/theme';
import 'typeface-roboto';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import iosAlertView from 'vue-ios-alertview';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import NProgress from 'muse-ui-progress';
import 'muse-ui-progress/dist/muse-ui-progress.css';
import Message from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import animated from 'animate.css';
import 'amfe-flexible';
import '@mdi/font/css/materialdesignicons.css';
import {utility} from "./utils/utility";
import pToast from './ptoast/PToast';
import {strMacros} from "./utils/consts";

Vue.config.productionTip = false;
Vue.prototype.$http = networkAdapter;
Vue.prototype.$util = utility;
Vue.prototype.$pToast = pToast;
Vue.prototype.$str = strMacros;

//定制主题
theme.add('dayue', {
  primary: '#da274d',
  secondary: '#d6d6d9',
  success: '#4caf50',
  warning: '#fdd835',
  info: '#2196f3',
  error: '#f44336',
  track: '#bdbdbd',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    alternate: '#fff',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)' // 提示文字颜色
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#fff',
    chip: '#e0e0e0',
    default: '#fff'
    // default: '#fafafa'
  }
});
theme.use('dayue');

Vue.use(VueLazyload);
Vue.use(MuseUI);
Vue.use(Toast, {
  position: 'top',               // 弹出的位置
  // time: 2000,                       // 显示的时长
  // closeIcon: 'close',               // 关闭的图标
  // close: true,                      // 是否显示关闭按钮
  // successIcon: 'check_circle',      // 成功信息图标
  // infoIcon: 'info',                 // 信息信息图标
  // warningIcon: 'priority_high',     // 提醒信息图标
  // errorIcon: 'warning'
});
Vue.use(Loading, {
  overlayColor: 'rgba(0,0,0,.2)',        // 背景色
  size: 48,
  color: '#da274d',                           // color
  className: ''                               // loading class name
});
Vue.use(NProgress, {
  color: '#da274d'
});

Vue.use(Message, {
  successIcon: 'check_circle',                    // 成功图标
  infoIcon: 'info',                               // 信息图标
  warningIcon: 'priority_high',                   // 提醒图标
  errorIcon: 'warning',                           // 错误图标
  iconSize: 24,                                   // 图标大小
  width: 350,                                     // 对话框的宽度
  maxWidth: '80%',                                // 对话框最大宽度
  className: '',                                  // 对话框的样式
  okLabel: '确定',                                 // 对话框确定按钮文字
  cancelLabel: '取消',                             // 对话框取消按钮文字
  transition: 'scale'                             // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
});

Vue.use(iosAlertView);
Vue.use(animated);
Vue.use(VCharts);

// NProgress.inc(0.2);
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

//读取用户配置信息
let systemConfig = localStorage.getItem('systemConfigKey');
if (!utility.isEmptyString(systemConfig)) {
  store.commit('setUserSystemConfig', JSON.parse(systemConfig));
}
//读取用户信息
let userPhone = localStorage.getItem('userPhoneKey');
if (!utility.isEmptyString(userPhone)) {
  store.commit('setUserPhone', userPhone);
}
let userInfo = localStorage.getItem('userInfoKey');
if (!utility.isEmptyString(userInfo)) {
  store.commit('setUserInfo', JSON.parse(userInfo));
}
let userConfigInfo = localStorage.getItem('userConfigInfoKey');
if (!utility.isEmptyString(userConfigInfo)) {
  store.commit('setUserConfigInfo', JSON.parse(userConfigInfo));
}




router.beforeEach((to, from, next) => {
  // 如果访问了dayuepd相关的地址
  if (to.path.match(/^\/dayuepd\/.*/)) {
    if (store.state.userPhone || to.name === 'PDLoginRegisterPage') {
      next();
    }
    else {
      next({name: 'PDLoginRegisterPage'});
    }
  }
  else if (to.path.match(/^\/d\/.*/)) {
    if (store.state.userInfo || to.path === '/d/login') {
      next();
    }
    else {
      next({path: '/d/login'});
    }
  }
  else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


/**
 * 给预置对象增加新功能
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function(fmt){
  let o = {
    "M+": this.getMonth()+1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "S+": this.getMilliseconds()
  };
  //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
  if(/(y+)/.test(fmt)){
    //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。
    fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
  }
  for(let k in o){
    if (new RegExp("(" + k +")").test(fmt)){
      //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
    }
  }
  return fmt;
};
