import Vue from 'vue'
import Vuex from 'vuex'
import {utility} from "./utils/utility";
import {strMacros} from "./utils/consts";
import http from './network/NetworkAdapter';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userStatus: '',  //0:普通用户；1：VIP用户；2：高级VIP用户
    vipLevel: '',

    /**
     * 以下为大悦盆底相关数据
     */
    userPhone: '', //登录注册的时候保存的手机号
    userInfo: null,   //用户基础信息
    userConfigInfo: null,   //用户配置信息
    userQosArray: [],    //用户填写问题列表

    // 系统设置，默认都为true，可以从本地读取
    systemConfig: {
      planRemind: true,
      autoLogin: true,
      voicePrompt: true,
      gameSoundEffect: true,
      gameBgMusic: true,
      autoUpload: true,
    },

  },


  getters: {
    memberInfo (state) {
      switch (state.userStatus) {
        case 0:
          return '普通会员';
        case 1:
          return 'VIP会员';
        case 2:
          return `高级V${state.vipLevel}会员`;
        default:
          return '普通会员';
      }
    },

    //获得手机号
    getUserPhone (state) {
      if (!utility.isEmptyString(state.userPhone)) {
        return state.userPhone;
      }
      return '';
    },

    //获得用户id
    getUserId (state) {
      if (state.userInfo) {
        if (!utility.isEmptyString(state.userInfo.id)) {
          return state.userInfo.id;
        }
      }
      return '';
    },

    // 获得用户基础信息
    getUserInfo (state) {
      return state.userInfo;
    },

    //获得用户配置信息
    getUserConfigInfo (state) {
      return state.userConfigInfo;
    },

    //获得用户问题列表
    getUserQosArray (state) {
      return state.userQosArray;
    },

    //获取系统设置
    getSystemSetting (state) {
      const setting = {};
      return Object.assign(setting, state.systemConfig);
    },

    getSettingPlanRemind (state) {
      return state.systemConfig.planRemind;
    },

    getSettingAutoLogin (state) {
      return state.systemConfig.autoLogin;
    },

    getSettingVoicePrompt (state) {
      return state.systemConfig.voicePrompt;
    },

    getSettingGameSoundEffect (state) {
      return state.systemConfig.gameSoundEffect;
    },

    getSettingGameBgMusic (state) {
      return state.systemConfig.gameBgMusic;
    },

    getSettingAutoUpload (state) {
      return state.systemConfig.autoUpload;
    },



  },

  mutations: {
    login (state, v) {
      state.userInfo = v;
    },
    setMemberInfo (state, v) {
      state.userStatus = v.userStatus;
      state.vipLevel = v.vipLevel;
    },



    //设置手机号
    setUserPhone (state, v) {
      state.userPhone = v;
      //存储到本地
      localStorage.setItem('userPhoneKey', state.userPhone);
    },

    //设置密码
    setUserPsd (state, v) {
      state.userInfo.userPassword = v;
      localStorage.setItem('userInfoKey', JSON.stringify(state.userInfo));
    },

    //修改手机号
    setModifyUserPhone (state, newPhone) {
      state.userInfo.userPhone = newPhone;
      localStorage.setItem('userInfoKey', JSON.stringify(state.userInfo));
    },

    //设置用户基础信息
    setUserInfo (state, v) {
      //修改一下生日的格式，如果有的话
      if (v.birthDate) {
        let date = new Date(v.birthDate.split(' ')[0]);
        v.birthDate = utility.formatDateToSlashString(date, strMacros.dateFormatSlash);
      }
      //修改数字为字符串
      if (v.height) {
        v.height = v.height.toString();
      }
      if (v.weight) {
        v.weight = v.weight.toString();
      }
      if (v.abdominalCir) {
        v.abdominalCir = v.abdominalCir.toString();
      }
      state.userInfo = v;
      localStorage.setItem('userInfoKey', JSON.stringify(state.userInfo));
      //登录后保存系统设置信息
      localStorage.setItem('systemConfigKey', JSON.stringify(state.systemConfig));
    },

    //设置用户配置信息
    setUserConfigInfo (state, v) {
      state.userConfigInfo = v;
      localStorage.setItem('userConfigInfoKey', JSON.stringify(state.userConfigInfo));
    },

    //设置用户所有问题
    setUserQosArray (state, arr) {
      state.userQosArray = arr;
    },

    //设置用户系统设置
    setUserSystemConfig (state, v) {
      state.systemConfig = v;
      localStorage.setItem('systemConfigKey', JSON.stringify(state.systemConfig));
    },

    setSettingPlanRemind (state, v) {
      state.systemConfig.planRemind = v;
      localStorage.setItem('systemConfigKey', JSON.stringify(state.systemConfig));
    },

    setSettingAutoLogin (state, v) {
      state.systemConfig.autoLogin = v;
      localStorage.setItem('systemConfigKey', JSON.stringify(state.systemConfig));
    },

    setSettingVoicePrompt (state, v) {
      state.systemConfig.voicePrompt = v;
      localStorage.setItem('systemConfigKey', JSON.stringify(state.systemConfig));
    },

    setSettingGameSoundEffect (state, v) {
      state.systemConfig.gameSoundEffect = v;
      localStorage.setItem('systemConfigKey', JSON.stringify(state.systemConfig));
    },

    setSettingGameBgMusic (state, v) {
      state.systemConfig.gameBgMusic = v;
      localStorage.setItem('systemConfigKey', JSON.stringify(state.systemConfig));
    },

    setSettingAutoUpload (state, v) {
      state.systemConfig.autoUpload = v;
      localStorage.setItem('systemConfigKey', JSON.stringify(state.systemConfig));
    },

    //退出登录，value是userId
    setLogout (state, value) {
      state.userPhone = '';
      state.userInfo = null;
      state.userConfigInfo = null;
      state.userQosArray = [];
      // 系统设置，默认都为true，可以从本地读取
      state.systemConfig = {
        planRemind: true,
        autoLogin: true,
        voicePrompt: true,
        gameSoundEffect: true,
        gameBgMusic: true,
        autoUpload: true,
      };
      localStorage.clear();
    },


  },

  actions: {
    //提交用户信息
    uploadUserInfo({state, commit}, userInfo) {
      return new Promise((resolve, reject) => {
        http.modifyBasicUserInfo(userInfo)
            .then(res => {
              commit('setUserInfo', res.dayueAppUser);
              commit('setUserConfigInfo', res.dayueAppUserConfig);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
      });
    },

    //单独获取用户基础信息
    getUserBasicInfo ({state, commit}) {
      return new Promise((resolve, reject) => {
        http.getBasicUserInfo(state.userInfo.id)
            .then(res => {
              commit('setUserInfo', res.dayueAppUser);
              commit('setUserConfigInfo', res.dayueAppUserConfig);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
      });
    },

    //获取所有问题，返回所有问题对象列表
    getAllQuestions ({state, commit}) {
      return new Promise((resolve, reject) => {
        http.getUserQuestions(state.userInfo.id)
            .then(res => {
              //处理获取到的问题数据
              commit('setUserQosArray', res);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
      });
    },

    //提交一部分问题，pyaload包括两个参数：1：qosArray；2：isPerfect；
    uploadQuestions ({state, commit}, payload) {
      return new Promise((resolve, reject) => {
        http.uploadUserQuestions(state.userInfo.id, JSON.stringify(payload.qosArray), payload.isPerfect)
            .then(res => {
              //不保存问题，每次填写信息的时候都从接口获取
              //更新信息完善状态
              let userInfo = state.userInfo;
              userInfo.isPerfect = payload.isPerfect.toString();
              commit('setUserInfo', userInfo);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
      });
    },






    buyVip ({commit}, e) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('setMemberInfo', {
            userStatus: e.userStatus,
            vipLevel: e.vipLevel
          });
          resolve('购买成功');
        }, 500)
      });
    },

    getFreeVip ({commit, state}) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (state.userStatus === 0) {
            commit('setMemberInfo', {
              userStatus: 1,
              vipLevel: 1
            });
            resolve('分享成功,您已获得一个月高级VIP会员');
          }
          else {
            resolve('分享成功');
          }
        }, 500);
      });
    }

  }
})
