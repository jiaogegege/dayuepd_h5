<template>
  <div>
    <mu-appbar class="appbar" style="width: 100%;" color="white" z-depth="0">
      <img class="head" :src="avatar" alt="" slot="left" @click="openDrawer">
      <img class="logo" v-lazy="logo" alt="" slot="default">
      <img class="bluetooth" v-lazy="bluetooth" alt="" slot="right" @click="bluetoothAction">
    </mu-appbar>
    <mu-container class="container">
      <mu-list class="list">
        <mu-list-item class="item" button :ripple="Boolean(false)" v-for="item of items" :key="item.index" @click="selectItemAction(item)">
          <img v-bind:src="item.img" :alt="item.name">
        </mu-list-item>
      </mu-list>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {hosts} from "../../network/UrlDefine";

  //事件
  const homePageEvent = {
    openDrawer: 'openDrawer'
  };

  export default {
    name: 'PDHomePage',
    data ()
    {
      return {
        avatar: require('@/assets/user_head.png'),  //本地默认头像
        logo: require('@/assets/logo_dark.png'),    //dayue logo
        bluetooth: require('@/assets/BluetoothOff.png'),    //蓝牙图标
        items: []   //项目列表
      }
    },

    computed: {
      ...mapGetters([
        "getUserInfo"
      ])
    },

    created ()
    {
      //初始化数据结构
      this.items = [
        {index: 0, name:'标准评估', img: require('@/assets/biaozhunpinggu.png')},
        {index: 1, name:'康复治疗', img: require('@/assets/kangfuzhiliao.png')},
        {index: 2, name:'自由锻炼', img: require('@/assets/ziyouduanlian.png')},
        {index: 3, name:'医学科普', img: require('@/assets/yixuekepu.png')},
        {index: 4, name:'大悦产康', img: require('@/assets/dayuechankang.png')},
        {index: 5, name:'大悦塑形', img: require('@/assets/dayuesuxing.png')}
      ];
    },

    mounted ()
    {
      if (this.getUserInfo) {
        //获取头像
        this.avatar = hosts.headPicHost + this.getUserInfo.id + '.png';
      }
    },

    methods: {
      //打开抽屉
      openDrawer ()
      {
        this.$emit(homePageEvent.openDrawer);
      },

      bluetoothAction () {
        this.$pToast({
          content: this.$str.unCompleteHint
        });
      },

      selectItemAction (item) {
        if (item.index === 3)   //医学科普
        {
          this.$router.push({
            name: 'PDMedicalSciencePage'
          });
        }
        else if (item.index === 4) {
          //产康
          this.$router.push({
            name: 'PDProductIntroducePage',
            params: {title: '大悦产康', adUrl: hosts.ckAdUrl}
          });
        }
        else if (item.index === 5) {
          //塑形
          this.$router.push({
            name: 'PDProductIntroducePage',
            params: {title: '大悦塑形', adUrl: hosts.sxAdUrl}
          });
        }
        else {
          this.$pToast({
            content: this.$str.unCompleteHint
          });
        }
      },

    }
  }
</script>

<style scoped lang="less">
  div {
    width: 100vw;
    margin: 0;
    padding: 0;
  }
  .appbar {
    .head {
      width: 28px;
      height: 28px;
      margin-left: 8px;
      border-radius: 14px;
    }
    .logo {
      width: 60px;
      height: 20px;
      margin-top: 28px;
    }
    .bluetooth {
      width: 20px;
      height: 24px;
      margin-right: 8px;
    }
  }
  .container {
    .list {
      height: 100vh - 17vh;
      .item {
        height: 126px;
        margin-bottom: 10px;
        img {
          width: 355px;
          height: 126px;
          position: absolute;
          top: 0;
          left: 10px;

        }
      }
    }
  }
</style>
