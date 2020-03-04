<template>
  <div>
    <div id="header"><router-link to="/"><p>返回</p></router-link></div>
    <hr>
    <mu-container class="container">
      <mu-flex class="flex-wrapper" direction="column" justify-content="center" align-items="center">
        <mu-button class="btn" color="primary" @click="phoneRegistered">判断手机号是否注册</mu-button>
        <mu-button class="btn" color="primary" @click="loginWithPhoneAndPsd">手机号和密码登录</mu-button>
        <mu-button class="btn" color="primary" @click="loginGetVerCode">验证码登录获取验证码</mu-button>
        <mu-button class="btn" color="primary" @click="loginGetSpeechCode">验证码登录获取语音验证码</mu-button>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  export default {
    name: 'RequestApis',
    methods: {
      //判断手机号是否注册
      phoneRegistered () {
        this.$http.phoneRegistered('18550480576')
            .then(res => {
              // console.log(res);
            })
            .catch(err => {
              // console.log(err);
            });
      },

      //手机号和密码登录
      loginWithPhoneAndPsd () {
        this.$http.loginPhoneAndPsd('18550480576', 'Qqqq111@')
            .then(res => {
              // console.log(res);
            })
            .catch(err => {
              // console.log(err);
            });
      },

      //验证码登录发送验证码
      loginGetVerCode () {
        this.$http.loginGetVerCode('18550480576')
            .then(res => {
              // console.log(res);
            })
            .catch(err => {
              // console.log(err);
            });
      },

      //验证码登录获取语音验证码
      loginGetSpeechCode () {
        this.$http.loginGetSpeechCode('18550480576')
            .then(res => {
              // console.log(res);
            })
            .catch(err => {
              // console.log(err);
            });
      }
    }
  }
</script>

<style scoped lang="less">
  .container {
    .flex-wrapper {

      .btn {
        height: 100px;
        border-radius: 50px;
        margin: 8px;
      }
    }
  }
</style>
