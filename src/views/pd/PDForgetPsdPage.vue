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
          <mu-button class="next-btn"
                     @click="nextAction"
                     :color="btnActive ? 'primary' : 'secondary'"
                     :disabled="!btnActive">下一步
          </mu-button>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {utility} from "../../utils/utility";
  import CountDownBtn from '../../components/CountDownBtn.vue';

  export default {
    name: 'PDForgetPsdPage',
    components: {
      'countdown-btn': CountDownBtn
    },
    data () {
      return {
        userPhone: '',
        starPhone: '',
        code: '',   //验证码
        speechActive: true,  //语音验证码是否可点击
        restTime: '',    //倒计时剩余时间

        //是否从系统设置过来
        fromPersonalCenter: false,
      }
    },

    //创建完成后获取手机号码
    created () {
      this.fromPersonalCenter = this.$route.params.fromPersonalCenter || this.fromPersonalCenter;
    },

    //尝试发送验证码
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
          "getUserPhone"
      ])
    },
    methods: {
      //倒计时按钮开始倒计时的事件
      getVerCode () {
        //请求验证码接口
        const loading = this.$loading();
        this.$http.forgetPsdGetVerCode(this.userPhone)
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
        this.$http.forgetPsdGetSpeechCode(this.userPhone)
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

      //下一步按钮
      nextAction () {
        const loading = this.$loading();
        this.$http.forgetPsdCheckCode(this.userPhone, this.code)
            .then(res => {
              loading.close();
              //进入重置密码界面
              this.$router.push({
                name: 'PDResetPsdPage',
                params: {fromPersonalCenter: this.fromPersonalCenter}
              });
              this.$refs.countdownBtn.reset();
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      }

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
        .next-btn {
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
