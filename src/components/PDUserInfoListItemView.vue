<template>
  <div>
    <div class="bg">
      <div class="content">
        <div class="left">{{leftText ? leftText : emptyStr}}</div>
        <div class="right" :class="{'left-align': leftAlign, 'right-align': !leftAlign, 'right-underline': underLine}">{{rightText ? rightText : emptyStr}}</div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'PDUserInfoListItemView',

    props: {
      leftText: String,
      rightText: String,
      underLine: Boolean,   //右边的文字是否有下划线
    },

    data() {
      return {
        emptyStr: this.$str.noneDisplay,  //无信息的时候显示的值
        leftAlign: false, //右边文本是否左对齐，当文字过多的时候，需要左对齐
      }
    },

    created () {
      //文本太多的答案需要左对齐
      this.leftAlign = this.rightText.length > 6;
    },

    watch: {
      rightText () {
        this.leftAlign = this.rightText.length > 6;
      },
    },

  }
</script>

<style scoped lang="less">
  @import "../assets/less/base";

  .left-align {
    text-align: left;
  }
  .right-align {
    text-align: right;
  }

  .right-underline {
    text-decoration: underline;
  }

  .bg {
    background-color: white;
    min-height: 60px;
    width: @width-100-vw;
    display: flex;
    flex-direction: column;
    .content {
      height: 59px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        color: @black-2c2c3d;
        font-size: @font-14;
        margin-left: 15px;
        margin-right: 20px;
        text-align: left;
      }
      .right {
        color: @gray-95959e;
        font-size: @font-14;
        margin-right: 15px;
        min-width: 50px;
        max-width: 375px / 2;
      }
    }
    .line {
      background-color: @gray-e5e5e5;
      height: 1px;
      width: 100%;
    }
  }
</style>
