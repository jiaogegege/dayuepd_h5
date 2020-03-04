<template>
  <div>
    <mu-appbar style="width:100%;" color="white" text-color="black" z-depth="0">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <mu-icon value=":mdi mdi-chevron-left" color="black"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column">
        <!--标题-->
        <mu-flex class="title">
          <div><p>验证码已发送至 {{starPhone}}</p></div>
        </mu-flex>
        <!--验证码区域-->
        <mu-flex class="section" direction="column">
          <div class="title">
            <p>输入验证码</p>
          </div>
          <mu-flex class="ver-code" justify-content="between">
            <mu-text-field class="code-text"
                           color="primary"
                           v-model="code"
                           placeholder="请输入验证码"></mu-text-field>
            <!--倒计时组件-->
            <countdown-btn ref="countdownBtn" @startEvent="getVerCode" @countDownEvent="countDown" @stopEvent="stopCountDown"></countdown-btn>
          </mu-flex>
        </mu-flex>
        <!--语音验证码-->
        <mu-flex class="section" direction="column">
          <div class="speech-title">
            <p>收不到短信?</p>
          </div>
          <mu-button class="speech-btn"
                     :disabled="!speechActive"
                     @click="getSpeechCode" flat>获取语音验证码{{restTime}}
          </mu-button>
        </mu-flex>
        <!--下一步按钮-->
        <mu-flex class="section" justify-content="center">
          <mu-button class="login-btn"
                     @click="loginAction"
                     :color="btnActive ? 'primary' : 'secondary'"
                     :disabled="!btnActive">登录
          </mu-button>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<!--验证码登录界面-->
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {utility} from "../../utils/utility";
  import CountDownBtn from '../../components/CountDownBtn.vue';

  export default {
    name: 'PDLoginCodePage',
    components: {
      'countdown-btn': CountDownBtn
    },
    data () {
      return {
        userPhone: '',
        starPhone: '',
        code: '',   //验证码
        speechActive: true,  //语音验证码是否可点击
        restTime: ''    //倒计时剩余时间
      }
    },

    //创建完成后获取手机号码
    created () {

    },

    mounted () {
      this.userPhone = this.getUserPhone;
      this.starPhone = utility.changePhoneMiddleWithStar(this.userPhone);
      const self = this;
      setTimeout(() => {
        if (utility.isEmptyString(self.restTime)) {
          //尝试发送验证码
          self.getVerCode();
        }
      }, 1100);
    },

    computed: {
      btnActive() {
        return this.code.length > 0;
      },

      ...mapGetters([
          "getUserPhone",
          "getUserInfo",
          "getUserConfigInfo"
      ])
    },
    methods: {
      //倒计时按钮开始倒计时的事件
      getVerCode () {
        //请求验证码接口
        const loading = this.$loading();
        this.$http.loginGetVerCode(this.userPhone)
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
        this.$http.loginGetSpeechCode(this.userPhone)
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

      //登录按钮
      loginAction () {
        const loading = this.$loading();
        this.$http.loginWithCode(this.userPhone, this.code)
            .then(res => {
              loading.close();
              //保存用户信息
              this.setUserInfo(res.dayueAppUser);
              this.setUserConfigInfo(res.dayueAppUserConfig);
              this.$toast.success('登录成功');
              //跳转主页或者进入修改个人信息页面
              if (this.getUserInfo.isPerfect) {
                this.$router.push({
                  name: 'PDMainPage'
                });
              }
              else {
                this.$router.push({
                  name: 'PDWelcomeBackPage'
                });
              }
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      ...mapMutations([
          "setUserInfo",
          "setUserConfigInfo"
      ])

    }
  }
</script>

<style scoped lang="less">
  .container {
    padding: 0 46px;
    .wrapper {
      .title {
        font-size: 16px;
      }
      .section {
        width: 100%;
        .title {
          font-size: 18px;
          font-weight: bold;
        }
        .ver-code {
          width: 100%;
          .code-text {
            width: 147px;
          }
          .ver-code-btn {
            height: 40px;
            border: 1px #d6d6d9 solid;
            border-radius: 20px;
          }
        }
        .speech-title {
          font-size: 15px;
        }
        .speech-btn {
          font-size: 15px;
          margin-left: -15px;
          margin-top: -20px;
          color: #000;
          text-decoration: underline;
        }
        .login-btn {
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
</style>
