<template>
  <div>
    <mu-appbar style="width:100%;"
               :class="'app-bar-bottom-line'"
               color="white"
               text-color="black"
               z-depth="0">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <mu-icon value=":mdi mdi-chevron-left" color="black"></mu-icon>
      </mu-button>
      <p><b>大悦盆底服务及隐私条款</b></p>
      <mu-button flat slot="right" textColor="white">____</mu-button>
    </mu-appbar>
    <div class="content">
      <iframe class="iframe" id="iframe" :src="serviceUrl" frameborder="no" ref="iframe"></iframe>
    </div>
  </div>
</template>

<script>
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDServiceClausePage',

    data() {
      return {
        serviceUrl: hosts.serviceUrl,
      };
    },

    computed: {},

    created() {

    },

    methods: {},

  }
</script>

<style scoped lang="less">
  @import "../../assets/less/base";

  .content {
    width: 100vw;
    height: 100vh - 8vh;
    .iframe {
      width: 100%;
      height: 100%;
      border: 0;
      margin: 0;
    }
  }
</style>
