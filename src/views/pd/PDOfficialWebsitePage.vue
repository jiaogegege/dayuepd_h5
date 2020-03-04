<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     color="white"
                     text-color="black"
                     z-depth="0">
            <mu-button icon slot="left" @click="$router.go(-1)">
              <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
            </mu-button>
            <div slot="default" style="font-size: 12px; margin: 0; padding: 0;">大悦创新（苏州）医疗科技股份有限公司</div>
            <mu-button flat slot="right"
                       textColor="white"
                       style="font-size: 18px;">___
            </mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <div class="content">
          <iframe class="iframe" :src="homePageUrl" frameborder="no" ref="iframe"></iframe>
        </div>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  export default {
    name: 'PDOfficialWebsitePage',

    data() {
      return {
        homePageUrl: this.$str.homePageUrl,
      };
    },

    computed: {},

    created() {

    },

    methods: {},

  }
</script>

<style scoped lang="less">
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
