<template>
  <div>
    <mu-appbar style="width:100%;" color="white" text-color="black" z-depth="0">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <mu-icon value=":mdi mdi-chevron-left" color="black"></mu-icon>
      </mu-button>
      <p><b>大悦盆底服务及隐私条款</b></p>
      <mu-button flat slot="right" textColor="white">____</mu-button>
    </mu-appbar>
    <div class="content">
      <iframe class="iframe" id="iframe" :src="serviceUrl" frameborder="no" ref="iframe"></iframe>
    </div>
    <mu-flex class="bottom" justify-content="center" align-items="center">
      <mu-button class="btn"
                 @click="nextAction"
                 :color="btnActive ? 'primary' : 'secondary'"
                 :disabled="!btnActive">已阅读并同意上述条款
      </mu-button>
    </mu-flex>
  </div>
</template>

<script>
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDServicePage',
    data () {
      return {
        serviceUrl: '',
        btnActive: true
      }
    },

    created () {
      this.serviceUrl = hosts.serviceUrl;
    },

    methods: {
      nextAction () {
        //跳转获取验证码界面
        this.$router.push({
          name: 'PDRegisterCodePage'
        })
      },

    }

  }
</script>

<style scoped lang="less">
  .content {
    width: 100vw;
    height: 100vh - 20vh;
    .iframe {
      width: 100%;
      height: 100%;
      border: 0;
      margin: 0;
    }
  }
  .bottom {
    height: 12vh;
    .btn {
      color: white;
      width: 282px;
      height: 50px;
      font-size: 18px;
      border-radius: 25px;
    }
  }
</style>
