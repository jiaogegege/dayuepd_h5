<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="系统设置"
                     color="white"
                     text-color="black"
                     z-depth="0">
            <mu-button icon slot="left" @click="$router.go(-1)">
              <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
            </mu-button>
            <mu-button flat slot="right"
                       textColor="white"
                       style="font-size: 18px;">____
            </mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex ref="content" class="content" direction="column" align-items="center">
          <mu-list class="list">
            <!--修改密码-->
            <mu-flex class="modify-psd list-item" justify-content="between" align-items="center" @click="$router.push({name: 'PDModifyPsdPage'})">
              <div>修改密码</div>
              <div>
                <mu-icon value=":mdi mdi-chevron-right" size="26" color="#e8e8e8"></mu-icon>
              </div>
            </mu-flex>
            <mu-divider class="middle-line"></mu-divider>
            <!--修改手机号-->
            <mu-flex class="modify-phone list-item" justify-content="between" align-items="center" @click="$router.push({name: 'PDModifyPhoneWithOldPhonePage'})">
              <div>修改手机号</div>
              <mu-flex justify-content="around" align-items="center">
                <div style="color: #95959e; margin-right: 10px;">{{phone}}</div>
                <div>
                  <mu-icon value=":mdi mdi-chevron-right" size="26" color="#e8e8e8"></mu-icon>
                </div>
              </mu-flex>
            </mu-flex>
            <mu-divider class="bottom-line"></mu-divider>
            <!--分割线-->
            <mu-divider class="top-line"></mu-divider>
            <!--计划提醒-->
            <mu-flex class="plan-remind list-item" justify-content="between" align-items="center">
              <div>计划提醒</div>
              <mu-switch v-model="planRemind" color="primary"></mu-switch>
            </mu-flex>
            <mu-divider class="middle-line"></mu-divider>
            <!--自动登录-->
            <mu-flex class="auto-login list-item" justify-content="between" align-items="center">
              <div>自动登录</div>
              <mu-switch v-model="autoLogin" color="primary"></mu-switch>
            </mu-flex>
            <mu-divider class="middle-line"></mu-divider>
            <!--语音提示-->
            <mu-flex class="voice-prompt list-item" justify-content="between" align-items="center">
              <div>语音提示</div>
              <mu-switch v-model="voicePrompt" color="primary"></mu-switch>
            </mu-flex>
            <mu-divider class="middle-line"></mu-divider>
            <!--游戏音效-->
            <mu-flex class="game-sound list-item" justify-content="between" align-items="center">
              <div>游戏音效</div>
              <mu-switch v-model="gameSoundEffect" color="primary"></mu-switch>
            </mu-flex>
            <mu-divider class="middle-line"></mu-divider>
            <!--游戏背景音乐-->
            <mu-flex class="game-music list-item" justify-content="between" align-items="center">
              <div>游戏背景音乐</div>
              <mu-switch v-model="gameBgMusic" color="primary"></mu-switch>
            </mu-flex>
            <mu-divider class="bottom-line"></mu-divider>
            <!--分割线-->
            <mu-divider class="top-line"></mu-divider>
            <!--自动上传数据-->
            <mu-flex class="auto-upload list-item" justify-content="between" align-items="center">
              <div>自动上传数据</div>
              <mu-switch v-model="autoUpload" color="primary"></mu-switch>
            </mu-flex>
            <mu-divider class="bottom-line"></mu-divider>
            <!--去App Store下载-->
            <mu-divider class="top-line"></mu-divider>
            <mu-flex class="download list-item" justify-content="between" align-items="center" @click="$router.push({name: 'PDSharePage'})">
              <div>去App Store下载</div>
              <div>
                <mu-icon value=":mdi mdi-chevron-right" size="26" color="#e8e8e8"></mu-icon>
              </div>
            </mu-flex>
            <mu-divider class="bottom-line"></mu-divider>
            <!--退出登录-->
            <mu-button class="logout" color="primary" @click="logoutAction">
              <mu-icon value=":mdi mdi-power" style="margin-right: 8px;"></mu-icon>
              退出登录
            </mu-button>
          </mu-list>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'PDSystemSettingPage',

    data() {
      return {
        phone: '',
        shareUrl: '',
      }
    },

    created () {
      this.phone = this.$util.changePhoneMiddleWithStar(this.getUserPhone);
    },

    computed: {
      ...mapGetters([
          "getUserId",
          "getUserPhone",
          "getSettingAutoLogin",
          "getSettingAutoUpload",
          "getSettingGameBgMusic",
          "getSettingGameSoundEffect",
          "getSettingPlanRemind",
          "getSettingVoicePrompt",
      ]),

      planRemind: {
        get () {
          return this.getSettingPlanRemind;
        },
        set (value) {
          this.setSettingPlanRemind(value);
        }
      },

      autoLogin: {
        get () {
          return this.getSettingAutoLogin;
        },
        set (value) {
          this.setSettingAutoLogin(value);
        }
      },

      voicePrompt: {
        get () {
          return this.getSettingVoicePrompt;
        },
        set (value) {
          this.setSettingVoicePrompt(value);
        }
      },

      gameSoundEffect: {
        get () {
          return this.getSettingGameSoundEffect;
        },
        set (value) {
          this.setSettingGameSoundEffect(value);
        }
      },

      gameBgMusic: {
        get () {
          return this.getSettingGameBgMusic;
        },
        set (value) {
          this.setSettingGameBgMusic(value);
        }
      },

      autoUpload: {
        get () {
          return this.getSettingAutoUpload;
        },
        set (value) {
          this.setSettingAutoUpload(value);
        }
      },



    },

    methods: {
      ...mapMutations([
          "setSettingAutoLogin",
          "setSettingAutoUpload",
          "setSettingGameBgMusic",
          "setSettingGameSoundEffect",
          "setSettingPlanRemind",
          "setSettingVoicePrompt",
          "setLogout",
      ]),

      ...mapActions([

      ]),


      logoutAction () {
        this.$iosConfirm(this.$util.getAlertContent(this.$str.logoutAlert, '退出', '取消'))
            .then(async () => {
              //删除所有本地信息并进入输入手机号界面
              this.setLogout(this.getUserId);
              this.$router.push({name: 'PDLoginRegisterPage'});
            })
            .catch(() => {
            });
      },

    },


  }
</script>

<style scoped lang="less">
  @import "../../assets/less/base";

  .top-line {
    margin-top: 10px;
    background-color: @gray-e5e5e5;
  }

  .middle-line {
    margin-left: 15px;
    background-color: @gray-e5e5e5;
  }

  .bottom-line {
    background-color: @gray-e5e5e5;
  }

  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      background-color: @gray-f7f7f7;
      height: 100vh;
      .app-bar {
        .app-bar-bottom-line;
      }
      .content {
        flex: auto;
        overflow: auto;
        font-size: 14px;
        width: 100vw;
        .list {
          padding: 0;
          .list-item {
            height: 60px;
            width: 100%;
            padding-left: 15px;
            padding-right: 15px;
            background-color: white;
          }
          .logout {
            font-size: 18px;
            font-weight: bolder;
            width: 282px;
            height: 50px;
            border-radius: 25px;
            margin-top: 40px;
            margin-bottom: 34px;
          }
        }
      }
    }

  }
</style>
