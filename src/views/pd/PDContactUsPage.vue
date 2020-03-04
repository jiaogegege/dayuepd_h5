<template>
  <div>
    <!--导航栏-->
    <div class="app-bar" style="height: 56px; width: 100vw;">
      <mu-appbar class="appbar"
                 color="white"
                 text-color="black"
                 z-depth="0">
        <div><p>联系我们</p></div>
      </mu-appbar>
    </div>
    <!--内容区域-->
    <div class="content">
      <div class="bg-img">
        <img src="../../assets/kefurenwu.png" alt="" class="big-img">
      </div>
      <div class="action-btn">
        <img src="../../assets/weixinzhuanshu.png" alt="" class="one" @click="qrCodeAction">
        <img src="../../assets/lianxikefu.png" alt="" class="two" @click="serviceAction">
        <img src="../../assets/bodadianhua.png" alt="" class="three" @click="hotLineAction">
      </div>
    </div>
    <!--二维码-->
    <div class="qr-code" v-if="showQrCode" @click="hideQrCodeAction">
      <div class="qr-content">
        <img :src="qrCode" alt="" class="qr">
        <p class="title">伴您悦健康悦自信悦美丽</p>
        <p class="subtitle">长按保存至相册，打开微信识别图中二维码</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDContactUsPage',

    data () {
      return {
        qrCode: require('@/assets/erweima.png'),
        showQrCode: false,
      };
    },

    methods: {
      qrCodeAction () {
        //加载二维码
        const loading = this.$loading();
        this.$http.getQrCode()
            .then(res => {
              loading.close();
              this.qrCode = hosts.normalIconServerHost + res;
              this.showQrCode = true;
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      serviceAction () {
        this.$pToast({
          content: this.$str.unCompleteHint
        });
      },

      hotLineAction () {
        location.href = 'tel:400-6906-178';
      },

      //隐藏二维码
      hideQrCodeAction () {
        this.showQrCode = false;
      },

    },

  }
</script>

<style scoped lang="less">
  .content {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 55px;
    background-color: #F0EFF1;
    .bg-img {
      width: 375px;
      height: 258px;
      .big-img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .action-btn {
      background-color: white;
      width: 328px;
      position: absolute;
      top: 174px;
      left: 24px;
      right: 24px;
      bottom: 14px;
      border-radius: 15px;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      img {
        width: auto;
        height: auto;
        max-width: 95%;
        max-height: 95%;
        margin-top: 10px;
      }
    }
  }
  .qr-code {
    background-color: rgba(0,0,0,0.5);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .qr-content {
      background-color: white;
      width: 270px;
      height: 284px;
      border-radius: 15px;
      .qr {
        width: 180px;
        height: 180px;
        max-width: 100%;
        max-height: 100%;
        margin-top: 18px;
      }
    }
  }
</style>
