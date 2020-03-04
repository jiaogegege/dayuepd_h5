<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="验证原手机号"
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
            <!--原手机号-->
            <mu-flex class="list-item" direction="column" align-items="center">
              <mu-flex class="list-item-top" justify-content="start" align-items="center">
                <div>原手机号</div>
                <div style="margin-left: 34px;">{{starPhone}}</div>
              </mu-flex>
              <mu-divider class="bottom-line"></mu-divider>
            </mu-flex>
            <!--手机号丢失或停用-->
            <mu-flex class="lost-phone" direction="column" style="height: 60px;">
              <mu-button class="lost-phone-btn"
                         flat
                         color="#95959e"
                         @click="lostPhoneAction"
                         style="font-size: 12px; height: 59px; text-decoration: underline;">
                <mu-icon value=":mdi mdi-alert-circle" color="primary" style="margin-right: 2px;"></mu-icon>
                手机号丢失或停用？
              </mu-button>
              <mu-divider class="bottom-line"></mu-divider>
            </mu-flex>
            <!--获取验证码-->
            <mu-flex class="list-item" direction="column" align-items="center">
              <mu-flex class="list-item-top" justify-content="between" align-items="center">
                <div>验证码</div>
                <mu-text-field class="ver-code text-field"
                               color="primary"
                               solo
                               v-model="verCode"
                               style="width: 100px;"
                               placeholder="请输入验证码">
                </mu-text-field>
                <countdown-btn ref="countdownBtn" @startEvent="getVerCode" @countDownEvent="countDown" @stopEvent="stopCountDown"></countdown-btn>
              </mu-flex>
              <mu-divider class="bottom-line"></mu-divider>
            </mu-flex>
            <!--语音验证码-->
            <mu-flex class="speech-code" style="height: 60px;" justify-content="start">
              <div style="margin-left:15px; line-height: 60px; color: #95959e; font-size: 12px; text-align: right;">收不到短信?
              </div>
              <mu-button class="speech-btn"
                         flat
                         color="#95959e"
                         @click="getSpeechCode"
                         style="font-size: 12px; height: 59px; text-decoration: underline;">
                获取语音验证码
              </mu-button>
            </mu-flex>
            <!--提交按钮-->
            <mu-flex class="submit" direction="column" align-items="center">
              <mu-button class="submit-btn"
                         @click="submitAction"
                         :color="btnActive ? 'primary' : 'secondary'"
                         :disabled="!btnActive">提交
              </mu-button>
            </mu-flex>
          </mu-list>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import CountDownBtn from '../../components/CountDownBtn.vue';

  export default {
    name: 'PDModifyPhoneWithOldPhonePage',

    components: {
      'countdown-btn': CountDownBtn
    },

    data() {
      return {
        verCode: '',  //验证码
        speechActive: true,  //语音验证码是否可点击
        restTime: '',    //倒计时剩余时间

      };
    },

    computed: {
      ...mapGetters([
          "getUserPhone",
          "getUserId"
      ]),

      starPhone () {
        return this.$util.changePhoneMiddleWithStar(this.getUserPhone);
      },

      btnActive () {
        return this.verCode.length > 0;
      },

    },

    created() {
      const self = this;
      setTimeout(() => {
        if (this.$util.isEmptyString(self.restTime)) {
          //尝试发送验证码
          self.getVerCode();
        }
      }, 1100);
    },

    methods: {
      //倒计时按钮开始倒计时的事件
      getVerCode () {
        //请求验证码接口
        const loading = this.$loading();
        this.$http.modifyPhoneSendVerCode(this.getUserId, this.getUserPhone)
            .then(res => {
              loading.close();
              this.$toast.success('发送成功');
              this.$refs.countdownBtn.countDown(60);
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      //获取语音验证码
      getSpeechCode () {
        const loading = this.$loading();
        this.$http.modifyPhoneSendSpeechCode(this.getUserId, this.getUserPhone)
            .then(res => {
              loading.close();
              this.$toast.success('发送成功');
              this.$refs.countdownBtn.countDown(60);
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      //倒计时事件，1s触发一次
      countDown (restTime) {
        this.speechActive = false;
        this.restTime = '(' + String(restTime) + ')';
      },

      //结束倒计时事件
      stopCountDown () {
        this.speechActive = true;
        this.restTime = '';
      },

      //手机号丢失或停用
      lostPhoneAction () {
        this.$router.push({name: 'PDModifyPhoneWithPsdPage'});
      },

      //提交按钮
      submitAction () {
        const loading = this.$loading();
        this.$http.modifyPhoneCheckCode(this.getUserId, this.getUserPhone, this.getVerCode)
            .then(res => {
              loading.close();
              //进入新手机号界面
              this.$router.push({name: 'PDModifyPhoneNewPhonePage'});
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
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
    margin-left: 30px;
    background-color: @gray-e5e5e5;
  }

  .bottom-line {
    background-color: @gray-e5e5e5;
  }

  .text-field {
    font-size: 14px;
    caret-color: @red-da274d;
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
        width: 100vw;
        font-size: 14px;
        .list {
          padding: 0;
          .list-item {
            width: 100%;
            height: 60px;
            background-color: white;
            .list-item-top {
              width: 100%;
              height: 100%;
              padding-left: 15px;
              padding-right: 15px;
            }
          }
          .speech-code {
            width: 100%;
            .speech-btn {
              text-decoration: underline;
            }
          }
          .submit-btn {
            margin-top: 20px;
            color: white;
            width: 282px;
            height: 50px;
            font-size: 18px;
            border-radius: 25px;
          }

        }
      }
    }

  }
</style>
