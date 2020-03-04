<template>
  <div>
    <mu-appbar class="appbar" style="width: 100vw;" color="white" textColor="black" z-depth="1">
      <p class="title" slot="default"><b>教程</b></p>
    </mu-appbar>
    <mu-container class="container">
      <mu-list class="list" @change="didSelectItem">
        <mu-list-item class="item" v-for="item of items" :key="item.index">
          <img v-bind:src="item.img" :alt="item.name" @click="didSelectItem(item.index)">
        </mu-list-item>
      </mu-list>
    </mu-container>
  </div>
</template>

<script>
  export default {
    name: 'PDCoursePage',
    data () {
      return {
        items: []   //图片数组
      }
    },

    created ()
    {
      //初始化数据结构
      this.items = [
        {index: 0, name:'使用说明', img: require('@/assets/shiyongshuoming.png')},
        {index: 1, name:'使用视频', img: require('@/assets/shiyongshipin.png')},
        {index: 2, name:'禁忌症', img: require('@/assets/jinjizheng.png')}
      ];
    },

    methods: {
      didSelectItem (index)
      {
        switch (index) {
          case 0: //使用说明
          {
            this.$router.push({
              name: 'PDUseInstructionPage'
            });
            break;
          }
          case 1: //使用视频
          {
            this.$router.push({
              name: 'PDUseVideoPage'
            });
            break;
          }
          case 2: //禁忌症
          {
            this.$router.push({
              name: 'PDContraindicationPage'
            });
            break;
          }
          default:
            // console.log('No selection');
        }
      },
    }

  }
</script>

<style scoped lang="less">
  div {
    background-color: #f7f7f7;
  }
  .container {
    .list {
      height: 100vh - 17vh;
      .item {
        height: 162px;
        margin-bottom: 10px;
        img {
          width: 355px;
          height: 162px;
          position: absolute;
          top: 0;
          left: 2px;
        }
      }
    }
  }
</style>
