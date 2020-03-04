<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="数据管理"
                     color="white"
                     text-color="black"
                     z-depth="0">
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex ref="content" class="content" direction="column" align-items="center">
          <!--顶部tab-->
          <top-bar class="top-bar" :title-arr="['标准评估', '康复治疗', '自由锻炼']" @selectionEvent="selectionAction"></top-bar>
          <!--分割线-->
          <div class="line"></div>
          <!--不同的方案数据界面-->
          <!--在这里显示子页面-->
          <router-view></router-view>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import PDTopSelectionBar from '../../components/PDTopSelectionBar';

  export default {
    name: 'PDDataManagePage',

    components: {
      'top-bar': PDTopSelectionBar,
    },

    data () {
      return {
        currentIndex: -1, //当前选中的tab
      }
    },

    created () {
    },

    methods: {
      //选择了某个tab
      selectionAction (index) {
        this.currentIndex = index;
        switch (index) {
          case 0: //标准评估
          {
            this.$router.push({
              name: 'PDDataEvaluationPage'
            });
            break;
          }
          case 1: //康复治疗
          {
            this.$router.push({
              name: 'PDDataRecoveryPage'
            });
            break;
          }
          case 2: //自由锻炼
          {
            this.$router.push({
              name: 'PDDataExercisePage'
            });
            break;
          }
          case 3: //量表测评
          {
            this.$router.push({
              name: 'PDDataFunctionalityPage'
            });
            break;
          }
          default:
          {
            break;
          }
        }
      },


    }

  }
</script>

<style scoped lang="less">
  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      .content {
        .line {
          background-color: #d8d8d8;
          height: 1px;
          width: 100%;
        }
      }
    }
  }
</style>
