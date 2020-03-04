<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="设备详情"
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
          <div class="info-container">
            <info-item class="info-item" left-text="状态" :right-text="noConnect"></info-item>
            <info-item class="info-item" left-text="当前电量" :right-text="noData" style="margin-bottom: 10px;"></info-item>
            <info-item class="info-item" left-text="设备型号" :right-text="noData" :class="'app-bar-top-line'"></info-item>
            <info-item class="info-item" left-text="序列号" :right-text="noData"></info-item>
            <info-item class="info-item" left-text="生产日期" :right-text="noData"></info-item>
            <info-item class="info-item" left-text="主处理器软件版本" :right-text="noData"></info-item>
            <info-item class="info-item" left-text="协处理器软件版本" :right-text="noData"></info-item>
            <info-item class="info-item" left-text="发布版本" :right-text="noData" style="margin-bottom: 10px;"></info-item>
            <info-item class="info-item" left-text="阴道电极型号" :right-text="noData" :class="'app-bar-top-line'"></info-item>
            <info-item class="info-item" left-text="阴道电极序列号" :right-text="noData"></info-item>
            <info-item class="info-item" left-text="阴道电极生产日期" :right-text="noData"></info-item>
            <info-item class="info-item" left-text="阴道电极使用总时间" :right-text="noData"></info-item>
            <info-item class="info-item" left-text="阴道电极使用剩余时间" :right-text="noData"></info-item>
            <info-item class="info-item" left-text="阴道电极状态" :right-text="noConnect"></info-item>
          </div>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import PDUserInfoListItemView from '../../components/PDUserInfoListItemView';

  export default {
    name: 'PDDeviceDetailPage',

    components: {
      'info-item': PDUserInfoListItemView,
    },

    data() {
      return {
        noData: this.$str.noneDisplay,
        noConnect: this.$str.noneConnect,

      };
    },

    computed: {
      ...mapGetters([
        "getUserInfo",
        "getUserId",
        "getUserQosArray"
      ]),

    },

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
      }
    }

  }
</style>