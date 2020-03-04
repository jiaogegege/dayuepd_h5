<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" justify-content="around" align-items="center">
        <button class="btn"
                :class="{'btn-active': currentIndex === index, 'btn-inactive': currentIndex !== index}"
                v-for="(item, index) of titleArr"
                @click="selectionAction(index)"
                :key="index">{{item}}
        </button>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script type="text/ecmascript-6">
  const event = {
    selectionEvent: 'selectionEvent',
  };

  export default {
    name: 'PDTopSelectionBar',

    props: {
      titleArr: Array,    //按钮标题列表
    },

    data() {
      return {
        currentIndex: -1,
      };
    },

    created() {
      //默认选中第一个
      this.selectionAction(0);
    },

    computed: {},

    methods: {
      //按钮点击事件，参数：按钮index
      selectionAction (index) {
        if (this.currentIndex !== index) {
          this.currentIndex = index;
          this.$emit(event.selectionEvent, index);
        }
      },

    },
  }
</script>

<style scoped lang="less">
  @import "../assets/less/base";

  .btn-inactive {
    color: @gray-d6d6d9;
    font-size: 14px;
    border: none;
  }
  .btn-active {
    color: @red-da274d;
    font-size: 14px;
    border-radius: 12px;
    border: 1px @red-da274d solid;
  }

  .container {
    background-color: white;
    margin: 0;
    padding: 0;
    height: 40px;
    min-height: 40px;
    width: 100vw;
    .wrapper {
      height: 100%;
      .btn {
        width: 80px;
        height: 24px;
        background-color: white;
        outline: none;
      }
    }
  }
</style>
