<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="关于我们"
                     color="white"
                     text-color="black"
                     z-depth="0">
            <mu-button icon slot="left" @click="$router.go(-1)">
              <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
            </mu-button>
            <mu-button flat slot="right"
                       textColor="white"
                       style="font-size: 18px;">____
            </mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex ref="content" class="content" direction="column" align-items="center">
          <div class="icon-container">
            <img class="icon" src="../../assets/p_icon.png" alt="">
            <div>大悦盆底</div>
            <div class="line"></div>
          </div>
          <info-item class="info-item" left-text="名称" right-text="大悦盆底"></info-item>
          <info-item class="info-item" left-text="型号" :right-text="$str.appModel"></info-item>
          <info-item class="info-item" left-text="发布版本" :right-text="$str.releaseVersion"></info-item>
          <info-item class="info-item" left-text="完整版本" :right-text="$str.fullVersion"></info-item>
          <info-item class="info-item" left-text="邮箱" :right-text="$str.emailAddress"></info-item>
          <info-item class="info-item" left-text="电话" :right-text="$str.servicePhone"></info-item>
          <info-item class="info-item"
                     left-text="官网"
                     :right-text="$str.homePageUrl"
                     :under-line="true"
                     @click.native="$router.push({name: 'PDOfficialWebsitePage'})">
          </info-item>
          <!--服务和隐私条款-->
          <div class="services">
            <mu-button flat color="#2c2c3d" @click="$router.push({name: 'PDServiceClausePage'})">《大悦盆底服务及隐私条款》</mu-button>
          </div>
          <!--版权信息-->
          <div class="copyright">
            <p>大悦创新（苏州）医疗科技股份有限公司 版权所有</p>
            <p>Copyright © 2018 Da-Yue Innovation (Suzhou) Medical Technology Co.,Ltd.</p>
          </div>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import PDUserInfoListItemView from '../../components/PDUserInfoListItemView';

  export default {
    name: 'PDAboutUsPage',

    components: {
      'info-item': PDUserInfoListItemView,
    },

    data() {
      return {};
    },

    computed: {},

    created() {

    },

    methods: {},

  }
</script>

<style scoped lang="less">
  @import "../../assets/less/base";

  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      background-color: @gray-f7f7f7;
      height: 100vh;
      .app-bar {
        .app-bar-bottom-line
      }
      .content {
        flex: auto;
        overflow: auto;
        .icon-container {
          font-size: 10px;
          color: @black-2c2c3d;
          background-color: white;
          width: 100vw;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          .icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            margin-bottom: 10px;
          }
          .line {
            background-color: @gray-e5e5e5;
            width: 100%;
            height: 1px;
            position: absolute;
            bottom: 0;
          }
        }
        .services {
          font-size: 12px;
          margin-top: 12px;
        }
        .copyright {
          font-size: 10px;
          color: @gray-d6d6d9;
          margin-bottom: 12px;
          p {
            margin: 2px 0;
          }
        }
      }
    }

  }
</style>