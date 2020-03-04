<!--医学科普界面-->
<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="医学科普"
                     color="white"
                     text-color="black"
                     z-depth="0">
            <mu-button icon slot="left" @click="$router.go(-1)">
              <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
            </mu-button>
            <mu-button flat slot="right"
                       color="white"
                       style="font-size: 18px;">____
            </mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex ref="content" class="content" direction="column" align-items="center">
          <!--顶部tab-->
          <top-bar class="top-bar" :title-arr="['科普分享', '量表测评']" @selectionEvent="selectionAction"></top-bar>
          <!--分割线-->
          <div class="line"></div>
          <!--科普列表-->
          <mu-list class="science-list" v-if="currentIndex === 0">
            <mu-flex class="science-item"
                     direction="column"
                     align-items="center"
                     v-for="(item, index) of scienceArr"
                     @click="scienceAction(item)"
                     :key="item.sourceType">
              <mu-flex class="science-item-top" align-items="center">
                <img :src="item.image" alt="">
                <p>{{item.title}}</p>
              </mu-flex>
              <div class="middle-line" :class="{'last-line': index === scienceArr.length - 1}"></div>
            </mu-flex>
          </mu-list>
          <!--量表列表-->
          <mu-list class="functionality-list" v-else>
            <func-list-item class="functionality-item"
                            v-for="item of functionalityArr"
                            :item="item"
                            @clickEvent="functionalityAction"
                            :key="item.id">
            </func-list-item>
          </mu-list>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import PDTopSelectionBar from '../../components/PDTopSelectionBar';
  import PDFunctionalityListItemView from '../../components/PDFunctionalityListItemView';
  import {consts} from "../../network/UrlDefine";

  export default {
    name: 'PDMedicalSciencePage',

    components: {
      'top-bar': PDTopSelectionBar,
      'func-list-item': PDFunctionalityListItemView,
    },

    data() {
      return {
        currentIndex: -1,   //当前选中的列表
        scienceArr: [],   //科普分享列表
        functionalityArr: [],   //量表列表
      };
    },

    computed: {},

    created() {
      this.scienceArr = [
        {sourceType: consts.sourceType_pd, image: require('@/assets/pendi-icon.png'), title: '盆底康复'},
        {sourceType: consts.sourceType_ck, image: require('@/assets/chankang-icon.png'), title: '产后康复'},
        {sourceType: consts.sourceType_sx, image: require('@/assets/suxing-icon.png'), title: '产后塑形'},
      ];
      this.functionalityArr = [
        {id: this.$str.sex_functionality_Id, image: require('@/assets/女性性功能量表-icon.png'), title: this.$str.sex_functionality_Title},
        {id: this.$str.uroclepsia_functionality_Id, image: require('@/assets/尿失禁-icon.png'), title: this.$str.uroclepsia_functionality_Title},
        {id: this.$str.obstacle_functionality_Id, image: require('@/assets/盆底障碍-icon.png'), title: this.$str.obstacle_functionality_Title},
        {id: this.$str.pelvic_functionality_Id, image: require('@/assets/盆腔器官脱垂-icon.png'), title: this.$str.pelvic_functionality_Title},
        {id: this.$str.health_functionality_Id, image: require('@/assets/健康调查-icon.png'), title: this.$str.health_functionality_Title},
      ];
    },

    methods: {
      //切换选择项
      selectionAction (index) {
        this.currentIndex = index;
      },

      //科普分享
      scienceAction (item) {
        this.$router.push({
          path: '/dayuepd/home/scienceShare',
          query: {sourceType: item.sourceType, title: item.title, articleType: this.$str.scienceShare}
        });
      },

      //量表测评
      functionalityAction (item) {
        this.$pToast({
          content: this.$str.unCompleteHint
        });
      },

    },

  }
</script>

<style scoped lang="less">
  @import "../../assets/less/base";

  .middle-line {
    margin-left: 30px;
  }
  .last-line {
    margin-left: 0;
  }

  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      height: 100vh;
      .content {
        flex: auto;
        overflow: auto;
        .line {
          background-color: #d8d8d8;
          height: 1px;
          width: 100%;
        }
        .science-list {
          padding: 0;
          .science-item {
            height: 117px;
            margin: 0;
            padding: 0;
            .science-item-top {
              height: 100%;
              width: 100%;
            }
            img {
              height: 90px;
              width: 90px;
              margin-left: 18px;
              margin-right: 18px;
            }
            p {
              font-size: 16px;
              font-weight: bold;
            }
          }
          .middle-line {
            background-color: @gray-e5e5e5;
            height: 1px;
            width: 100%;
          }
        }
        .functionality-list {
          padding: 0;
          .functionality-item {
            height: 60px;
            margin: 0;
            padding: 0;
            .functionality-item-top {
              height: 100%;
              width: 100%;
            }
            img {
              height: 20px;
              width: 20px;
              margin-left: 18px;
              margin-right: 18px;
            }
            p {
              font-size: 12px;
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
