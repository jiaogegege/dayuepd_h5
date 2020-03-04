<template>
  <div>
    <mu-appbar style="width:100%;" color="white" text-color="black" z-depth="0">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <mu-icon value=":mdi mdi-chevron-left" color="black"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column">
        <!--输入密码-->
        <mu-flex class="section" direction="column">
          <div class="title">
            <p>输入密码</p>
          </div>
          <mu-text-field class="psd-text"
                         color="primary"
                         v-model="userPassword"
                         placeholder="请输入登录密码"
                         :action-icon="visibility ? 'visibility_off' : 'visibility'"
                         :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'">
          </mu-text-field>
        </mu-flex>
        <!--忘记密码/验证码登录-->
        <mu-flex class="section" direction="row" justify-content="between">
          <mu-button class="forget" flat @click="forgetPsdAction">忘记密码?</mu-button>
          <mu-button class="vercode" flat @click="codeLoginAction">验证码登录</mu-button>
        </mu-flex>
        <!--登录按钮和提示-->
        <mu-flex class="section" direction="column">
          <mu-button class="btn"
                     @click="loginAction"
                     :color="btnActive ? 'primary' : 'secondary'"
                     :disabled="!btnActive">登录
          </mu-button>
          <div class="psd-hint">
            <p>*依据医疗器械相关法律法规规定密码8-12位，需要同时包含大写字母、小写字母、数字、特殊字符（@或_或#）</p>
          </div>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {strMacros} from "../../utils/consts";
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: 'PDLoginPage',
    data () {
      return {
        userPassword: '',
        visibility: false
      }
    },
    computed: {
      btnActive() {
        return this.userPassword.length > 0;
      },

      ...mapGetters([
          "getUserPhone",
          "getUserInfo",
          "getUserConfigInfo"
      ])
    },
    methods: {
      //登录按钮
      loginAction () {
        this.userPassword = this.userPassword.trim();
        if (!this.$util.checkPsdFormat(this.userPassword)) {
          this.$toast.error(strMacros.psdFormatErrorHint);
          return;
        }
        //md5密码
        const loading = this.$loading();
        this.$http.loginPhoneAndPsd(this.getUserPhone, this.userPassword)
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
      //忘记密码事件
      forgetPsdAction () {
        this.$router.push({
          name: 'PDForgetPsdPage'
        });
      },
      //验证码登录事件
      codeLoginAction () {
        this.$router.push({
          name: 'PDLoginCodePage'
        })
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
      padding-top: 80px;
      .section {
        width: 100%;
        .title {
          font-size: 18px;
          font-weight: bold;
        }
        .psd-text {
          font-size: 18px;
          width: 281px;
        }
        .forget {
          text-decoration: underline;
        }
        .btn {
          margin-top: 20px;
          color: white;
          width: 282px;
          height: 50px;
          font-size: 18px;
          border-radius: 25px;
        }
        .psd-hint {
          font-size: 12px;
          text-align: left;
          color: #b7b7b7;
        }
      }
    }
  }
</style>
