<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" justify-content="between">
        <mu-flex class="content">
          <!--在这里显示tabbar指向的子页面-->
          <router-view @openDrawer="open = true"></router-view>
        </mu-flex>
        <mu-bottom-nav :value="tabbarValue" class="tabbar" color="primary" @change="tabbarValueChanged">
          <mu-bottom-nav-item title="主页" icon="home"
                              :to="{name: 'PDHomePage'}"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="教程" icon="school"
                              :to="{name: 'PDCoursePage'}"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="数据管理" icon="equalizer"
                              :to="{name: 'PDDataManagePage'}"></mu-bottom-nav-item>
          <mu-bottom-nav-item title="联系我们" icon="face"
                              :to="{name: 'PDContactUsPage'}"></mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-flex>
      <!--抽屉-->
      <mu-drawer :open.sync="open" :docked="docked" class="drawer">
        <div class="head-container" @click="gotoPersonalCenterAction">
          <img v-lazy="avatar" alt="" class="head-image">
          <div class="name">
            <p>{{getUserInfo.realName}}</p>
          </div>
        </div>
        <div class="divider"></div>
        <mu-list class="list">
          <mu-list-item button class="list-item" @click="gotoPersonalCenterAction">
            <img src="../../assets/gerenziliao.png"
                 class="item-icon"
                 alt="">
            <mu-list-item-title style="margin-left: 30px;">用户信息</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="list-item" @click="gotoSystemSettingAction">
            <img src="../../assets/xirtongshezhi.png"
                 class="item-icon"
                 alt="">
            <mu-list-item-title style="margin-left: 30px;">系统设置</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="list-item" @click="gotoDeviceInfoAction">
            <img src="../../assets/shebeixiangqing.png"
                 class="item-icon"
                 alt="">
            <mu-list-item-title style="margin-left: 30px;">设备详情</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="list-item" @click="gotoAboutUsAction">
            <img src="../../assets/guanyuwomen.png"
                 class="item-icon"
                 alt="">
            <mu-list-item-title style="margin-left: 30px;">关于我们</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button class="list-item" @click="shareAction">
            <img src="../../assets/fenxiang.png"
                 class="item-icon"
                 alt="">
            <mu-list-item-title style="margin-left: 30px;">分享给好友</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-drawer>
    </mu-container>
    <!--分享菜单-->
      <div class="share-container" v-if="showShare">
        <div class="share-bg">
          <div class="share-content" :class="shareClass" style="animation-duration: 300ms;">
            <div class="share-title">分享给好友</div>
            <div class="share-items">
              <div class="item"  v-for="item of shareItems" :key="item.title" @click="shareTo(item)">
                <img :src="item.icon" alt="">
                <p>{{item.title}}</p>
              </div>
            </div>
            <div class="share-cancel" @click="showShare = false">取消</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDMainPage',
    data ()
    {
      return {
        open: false,  //抽屉是否打开
        showShare: false,    //是否显示分享菜单
        shareItems: [
          {icon: require('@/assets/sns_wechat.png'), title: '微信好友'},
          {icon: require('@/assets/sns_wechat_timeline.png'), title: '朋友圈'},
          {icon: require('@/assets/sns_sina.png'), title: '新浪微博'},
          {icon: require('@/assets/sns_qq.png'), title: 'QQ好友'},
        ],
        docked: false, //抽屉是否有阴影
        tabbarValue: 0, //选中的tabbar
        avatar: require('@/assets/user_head.png'),  //本地默认头像
      }
    },

    computed: {
      shareClass () {
        return {
          animated: true,
          slideInUp: this.showShare,
          slideOutDown: !this.showShare,
        };
      },

      ...mapGetters([
          "getUserInfo"
      ])
    },

    created () {
      if (this.getUserInfo) {
        //获取头像
        this.avatar = hosts.headPicHost + this.getUserInfo.id + '.png';
      }
    },

    methods: {
      //选择不同的tabbar
      tabbarValueChanged (value)
      {
        // 将选择的tabbar保存到session中
        sessionStorage.setItem('tabbarValue', String(value));
      },

      gotoPersonalCenterAction () {
        this.open = false;
        this.$router.push({
          name: 'PDPersonalCenterPage'
        });
      },

      gotoSystemSettingAction () {
        this.open = false;
        this.$router.push({
          name: 'PDSystemSettingPage'
        });
      },

      gotoDeviceInfoAction () {
        this.open = false;
        this.$router.push({
          name: 'PDDeviceDetailPage'
        });
      },

      gotoAboutUsAction () {
        this.open = false;
        this.$router.push({
          name: 'PDAboutUsPage'
        });
      },

      shareAction () {
        this.open = false;
        this.showShare = true;
      },

      //分享按钮事件
      shareTo (item) {
        this.$pToast({
          content: this.$str.unCompleteHint
        });
        this.showShare = false;
      },

    },

    beforeRouteEnter(to, from, next) {
      next(self => {
        //如果用户没有登录，那么导航到登录界面
        if (!self.getUserInfo) {
          next({name: 'PDLoginRegisterPage'});
        }
        //如果用户没有完善信息，那么导航到欢迎回来界面
        else if (self.getUserInfo.isPerfect.toString() === self.$str.perfectNo) {
          next({name: 'PDWelcomeBackPage'});
        }
        else
        {
          let tabbarValue = parseInt(sessionStorage.getItem('tabbarValue'));
          switch (tabbarValue) {
            case 1:
            {
              self.tabbarValue = 1;
              next({
                name: 'PDCoursePage'
              });
              break;
            }
            case 2:
            {
              self.tabbarValue = 2;
              next({
                name: 'PDDataManagePage'
              });
              break;
            }
            case 3:
            {
              self.tabbarValue = 3;
              next({
                name: 'PDContactUsPage'
              });
              break;
            }
            default:
            {
              self.tabbarValue = 0;
              next({
                name: 'PDHomePage'
              });
            }
          }
        }
      });
    },

  }
</script>

<style scoped lang="less">
  div {
    margin: 0;
    padding: 0;
  }

  .container {
    .wrapper {
      width: 100vw;
      height: 100vh;
      .content {
      }
      .tabbar {
        border-top: solid 1px #d6d6d9;
        width: 100%;
      }
    }
    .drawer {
      .head-container {
        margin-top: 52px;
        margin-left: 25px;
        margin-bottom: 43px;
        display: flex;
        .head-image {
          width: 60px;
          height: 60px;
          border-radius: 30px;
        }
        .name {
          line-height: 60px;
          margin-left: 19px;
          p {
            margin: 0;
          }
        }
      }
      .divider {
        margin-left: 32px;
        margin-right: 32px;
        background-color: #e5e5e5;
        height: 1px;
      }
      .list {
        .list-item {
          font-size: 18px;
          height: 60px;
          .item-icon {
            width: 29px;
            height: 29px;
            margin-left: 24px;
          }
        }
      }
    }
  }
  .share-container {
    .share-bg {
      background-color: rgba(0,0,0,0.42);
      height: 100vh;
      width: 100vw;
      position: fixed;
      left: 0;
      top: 0;
      .share-content {
        width: 375px;
        height: 218px;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: rgb(243,243,243);
        display: flex;
        flex-direction: column;
        .share-title {
          font-size: 14px;
          text-align: left;
          margin-left: 20px;
          height: 40px;
          line-height: 40px;
        }
        .share-items {
          flex: auto;
          overflow: auto;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin-top: 16px;
          .item {
            height: 131px;
            width: 60px;
          }
          img {
            width: 47px;
            height: 47px;
          }
          p {
            font-size: 12px;
          }
        }
        .share-cancel {
          width: 100%;
          height: 47px;
          background-color: white;
          font-size: 16px;
          font-weight: bold;
          line-height: 47px;
        }
      }
    }
  }

</style>
