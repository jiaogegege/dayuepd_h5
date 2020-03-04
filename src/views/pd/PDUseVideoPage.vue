<template>
  <div>
    <mu-appbar style="width:100%; border-bottom: 1px solid #e5e5e5;" color="white" text-color="black" z-depth="0">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <mu-icon value=":mdi mdi-chevron-left" color="black"></mu-icon>
      </mu-button>
      <p><b>使用视频</b></p>
      <mu-button flat slot="right" textColor="white">____</mu-button>
    </mu-appbar>
    <mu-container class="container" v-if="dataArray.length > 0">
      <mu-list class="list">
        <div v-for="item of dataArray" :key="item.id" class="item">
          <mu-list-item class="list-item" avatar :ripple="false" button @click="clickAction(item)">
            <mu-list-item-action>
              <img class="img" :src="item.articleImg" :alt="item.articleContent">
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title class="title">{{item.articleTitle}}</mu-list-item-title>
              <mu-list-item-sub-title class="subtitle">{{item.articleSubtitle}}</mu-list-item-sub-title>
              <mu-list-item-sub-title class="date">{{$util.formatDateToLocalString(new Date(item.createDate))}}</mu-list-item-sub-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider class="divider" shallow-inset></mu-divider>
        </div>
      </mu-list>
    </mu-container>
    <mu-flex direction="column" justify-content="center" align-items="center" class="no-video" v-else>
      <div style="margin-top: -120px; padding: 0;">
        <img src="../../assets/novideo.png" alt="novideo" style="width: 217px; height: 140px;">
        <p style="color: #95959d;">暂无视频</p>
      </div>
    </mu-flex>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDUseVideoPage',
    data () {
      return {
        picHost: hosts.normalIconServerHost,
        dataArray: [],
        pageNumber: 0,
        pageSize: 1000,
        isLastPage: false,
      }
    },

    computed: {
      ...mapGetters([
          "getUserId"
      ])
    },

    created () {
      this.picHost = hosts.normalIconServerHost;
      this.requestGetArticleList(this.pageNumber + 1);
    },

    methods: {
      requestGetArticleList (pageNum) {
        //请求数据
        const loading = this.$loading();
        this.$http.getArticleList(this.getUserId, this.$str.useVideo, pageNum, this.pageSize)
            .then(res => {
              loading.close();
              let arr = res.list;
              if (arr.length > 0)
              {
                this.dataArray.concat(arr);
                this.pageNumber++;    //页码+1
              }
              this.isLastPage = res.isLastPage;
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      //点击了某个item
      clickAction (item)
      {
        this.$router.push({
          name: 'PDUseInstructionDetailPage',
          params: {articleUrl: hosts.articleHost + item.articleUrl}
        });
      },

    },

    components: {
    },
  }
</script>

<style scoped lang="less">
  div {
    margin: 0;
    padding: 0;
  }
  .no-video {
    height: 100vh - 8vh;
    background-color: #f7f7f7;
    font-size: 14px;
  }
  .container {
    .list {
      height: 100vh - 8vh;
      .item {
        height: 116px;
        .list-item {
          height: 116px;
          .img {
            width: 90px;
            height: 90px;
            border-radius: 6px;
            background-color: #e5e5e5;
            position: absolute;
            left: 19px;
            top: 12px;
          }
          .title {
            position: absolute;
            left: 129px;
            top: 16px;
            font-size: 16px;
            font-weight: bold;
          }
          .subtitle {
            position: absolute;
            left: 129px;
            top: 44px;
            font-size: 10px;
            color: #95959d;
          }
          .date {
            position: absolute;
            left: 129px;
            top: 86px;
            color: #d6d6d9;
            font-size: 10px;
          }
        }
      }
    }
  }
</style>
