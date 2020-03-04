<template>
  <div>
    <mu-appbar style="width:100%; border-bottom: 1px solid #e5e5e5;" color="white" text-color="black" z-depth="0">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <mu-icon value=":mdi mdi-chevron-left" color="black"></mu-icon>
      </mu-button>
      <p><b>{{title}}</b></p>
      <mu-button flat slot="right" textColor="white">____</mu-button>
    </mu-appbar>
    <mu-linear-progress class="progress"
                        v-if="false"
                        color="secondary"></mu-linear-progress>
    <div class="content">
      <iframe class="iframe" :src="totalUrl" frameborder="no" ref="iframe"></iframe>
    </div>
  </div>
</template>

<script>
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDscienceShareDetailPage',
    data () {
      return {
        totalUrl: '',
        title: '',
      }
    },

    created () {
      this.totalUrl = hosts.articleHost + this.$route.query.articleUrl;
      this.title = this.$route.query.title;
    }

  }
</script>

<style scoped lang="less">
  .progress {
    height: 1px;
  }
  .content {
    width: 100vw;
    height: 100vh - 8vh;
    .iframe {
      width: 100%;
      height: 100%;
      border: 0;
      margin: 0;
      padding: 0;
    }
  }
</style>
