<template>
  <div>
    <div class="app-bar" style="height: 57px; width: 100%;">
      <mu-appbar class="appbar"
                 color="white"
                 :title="title"
                 :class="'app-bar-bottom-line'"
                 text-color="black"
                 z-depth="0">
        <mu-button icon slot="left" @click="$router.go(-1)">
          <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
        </mu-button>
        <mu-button flat slot="right"
                   textColor="white"
                   style="font-size: 18px;">___
        </mu-button>
      </mu-appbar>
    </div>
    <div class="content">
      <iframe :src="adUrl" frameborder="0" class="iframe"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PDProductIntroducePage',

    data() {
      return {
        adUrl: '',    //url
        title: '',
      };
    },

    computed: {},

    created() {
      this.adUrl = this.$route.params.adUrl;
      this.title = this.$route.params.title;
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