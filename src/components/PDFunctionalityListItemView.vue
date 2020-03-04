<!--量表列表元素-->
<template>
  <div>
    <div class="container" @click="$emit('clickEvent', item)">
      <div class="top">
        <div class="top-left">
          <img :src="item.image" alt="" class="image">
          <p class="title">{{item.title}}</p>
        </div>
        <div class="top-right">
          <mu-icon value=":mdi mdi-chevron-right" color="#4a4a4a"></mu-icon>
        </div>
      </div>
      <div class="bottom">
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const event = {
    clickEvent: 'clickEvent',   //点击事件
  };

  export default {
    name: 'PDFunctionalityListItemView',

    props: {
      item: Object,   //元素对象
    },

    data() {
      return {};
    },

    created() {

    },

    computed: {},

    methods: {

    },
  }
</script>

<style scoped lang="less">
  .container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: column;
    .top {
      width: 100%;
      height: 59px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        margin-left: 18px;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
          margin-right: 18px;
        }
        p {
          font-size: 12px;
        }
      }
      .top-right {
        margin-right: 18px;
      }
    }
    .bottom {
      .line {
        background-color: #e5e5e5;
        height: 1px;
        width: 100%;
      }
    }
  }
</style>
