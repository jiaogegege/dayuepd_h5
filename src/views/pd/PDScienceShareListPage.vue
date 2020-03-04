<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     :title="title"
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
        <mu-list ref="content" class="content" direction="column" align-items="center">
          <div class="list-item" v-for="(item, index) of dataArray" :key="item.id" @click="gotoDetailAction(item)">
            <div class="element">
              <div class="item-left">
                <img :src="iconHost + item.articleImg" alt="">
              </div>
              <div class="item-right">
                <div class="item-right-top">
                  <p class="title">{{item.articleTitle}}</p>
                  <p class="subtitle">{{item.articleSubtitle}}</p>
                </div>
                <div class="item-right-bottom">
                  <p class="date">{{$util.formatDateToLocalString(new Date(item.createDate.split(' ')[0]))}}</p>
                </div>
              </div>
            </div>
            <div class="middle-line" :class="{'last-line': index === dataArray.length - 1}"></div>
          </div>
        </mu-list>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDScienceShareListPage',

    props: {
    },

    data() {
      return {
        sourceType: '2',   //来源类型，默认盆底
        title: '',
        articleType: '',    //文章类型（科普/使用说明/使用视频）
        dataArray: [],    //数据列表
        iconHost: hosts.articleIconHost,    //图标文件路径
      };
    },

    computed: {
      ...mapGetters([
          "getUserId"
      ]),


    },

    created() {
      this.sourceType = this.$route.query.sourceType;
      this.title = this.$route.query.title;
      this.articleType = this.$route.query.articleType;
      this.requestGetList();
    },

    methods: {
      ...mapMutations([

      ]),

      ...mapActions([

      ]),

      //获取接口数据
      requestGetList () {
        const loading = this.$loading();
        this.$http.getArticleList(this.getUserId, this.articleType, 10000, 1, this.sourceType)
            .then(res => {
              loading.close();
              this.dataArray = res['list'];
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      //去详情界面
      gotoDetailAction(item) {
        this.$router.push({
          path: '/dayuepd/home/scienceShareDetail',
          query: {articleUrl: item.articleUrl, title: this.title}
        })
      },


    },

  }
</script>

<style scoped lang="less">
  @import "../../assets/less/base";

  .middle-line {
    margin-left: 18px;
  }
  .last-line {
    margin-left: 0;
  }

  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      background-color: @gray-f7f7f7;
      height: 100vh;
      .app-bar {
        .app-bar-bottom-line;
      }
      .content {
        flex: auto;
        overflow: auto;
        margin: 0;
        padding: 0;
        .list-item {
          background-color: white;
          width: 100vw;
          height: 115px;
          display: flex;
          flex-direction: column;
          .element {
            height: 115px;
            display: flex;
            align-items: center;
            .item-left {
              margin-left: 18px;
              display: flex;
              align-items: center;
              img {
                width: 90px;
                height: 90px;
                border-radius: 6px;
                background-color: @gray-e5e5e5;
              }
            }
            .item-right {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              padding-top: 15px;
              padding-bottom: 15px;
              .item-right-top {
                text-align: left;
                margin-left: 20px;
                .title {
                  font-size: 16px;
                  font-weight: bold;
                  margin: 0;
                }
                .subtitle {
                  color: @gray-95959e;
                  font-size: 10px;
                  margin: 0;
                }
              }
              .item-right-bottom {
                margin-left: 20px;
                .date {
                  margin: 0;
                  text-align: left;
                  color: @gray-d6d6d9;
                  font-size: 10px;
                }
              }
            }
          }
          .middle-line {
            background-color: @gray-e5e5e5;
            height: 1px;
            width: 100%;
          }
        }
      }
    }

  }
</style>
