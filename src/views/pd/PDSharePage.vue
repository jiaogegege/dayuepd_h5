<template>
  <div>
    <div class="back" @click="backAction">
      <i class="mdi mdi-arrow-left"></i>
    </div>
    <div class="content">
      <iframe class="iframe" :src="shareUrl" frameborder="no" ref="iframe"></iframe>
    </div>
  </div>
</template>

<script>
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDSharePage',

    data() {
      return {
        shareUrl: '',
      };
    },

    created () {
      this.shareUrl = hosts.shareUrl;
    },

    methods: {
      backAction () {
        this.$router.go(-1);
      },
    },

  }
</script>

<style scoped lang="less">
  @import "../../assets/less/base";

  .content {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    .iframe {
      width: 100%;
      height: 100%;
      border: 0;
      margin: 0;
    }
  }
  .back {
    position: fixed;
    left: 8px;
    bottom: 72px;
    font-size: 30px;
    background-color: white;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    line-height: 50px;
    color: @red-da274d;
  }
</style>
