<template>
  <div class="background">
    <div class="container">
      <button class="left-btn btn"
              :class="{'active-btn': activeLeftBtn}"
              @click="leftBtnAction">{{leftOpt}}
      </button>
      <button class="right-btn btn"
              :class="{'active-btn': activeRightBtn}"
              @click="rightBtnAction">{{rightOpt}}
      </button>
      <div class="slide" :class="{'left-slide': leftSlide, 'right-slide': rightSlide}" v-show="showSlide"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {strMacros} from "../utils/consts";

  const event = {
    switchChanged: 'switchChanged'    //控件选择了某个选项，传入选择项
  };

  export default {
    name: 'PDSwitchBar',
    props: {
      oriLeftOpt: String,    //左边选项
      oriRightOpt: String,   //右边选项
      originOpt: String  //被选中的项，如果有的话
    },

    data () {
      return {
        leftOpt: undefined,
        rightOpt: undefined,
        selectedOpt: undefined,   //选中的项
        showSlide: false,   //显示滑块
        leftSlide: true,    //移动到左边
        rightSlide: false,    //移动到右边
        activeLeftBtn: false,
        activeRightBtn: false,
      }
    },

    created () {
      //设置选项
      this.leftOpt = this.oriLeftOpt ? this.oriLeftOpt : strMacros.optYes;
      this.rightOpt = this.oriRightOpt ? this.oriRightOpt : strMacros.optNo;
      this.setSelection();
    },

    computed: {
    },

    watch: {
      originOpt () {
        //设置被选中的项
        this.setSelection();
      }
    },

    methods: {
      //设置被选中的项
      setSelection () {
        if (this.originOpt) {
          this.selectedOpt = this.originOpt;
          if (this.selectedOpt === this.leftOpt) {
            this.setLeftSelected();
          }
          else if (this.rightOpt === this.selectedOpt) {
            this.setRightSelected();
          }
        }
      },

      //设置左边被选中
      setLeftSelected () {
        this.showSlide = true;
        this.leftSlide = true;
        this.rightSlide = false;
        this.activeLeftBtn = true;
        this.activeRightBtn = false;
        this.selectedOpt = this.leftOpt;
      },
      //设置右边被选中
      setRightSelected () {
        this.showSlide = true;
        this.leftSlide = false;
        this.rightSlide = true;
        this.activeLeftBtn = false;
        this.activeRightBtn = true;
        this.selectedOpt = this.rightOpt;
      },

      leftBtnAction () {
        this.setLeftSelected();
        this.$emit(event.switchChanged, this.selectedOpt);
      },

      rightBtnAction () {
        this.setRightSelected();
        this.$emit(event.switchChanged, this.selectedOpt);
      }

    }

  }
</script>

<style scoped lang="less">
  @height: 50px;
  @width: 100%;

  .background {
    width: @width;
    height: @height;
    margin: 0;
    padding: 0;
    background-color: white;
    .container {
      border: 1px solid #d6d6d9;
      border-radius: @height / 2;
      background-color: white;
      height: @height;
      position: relative;
      .btn {
        height: @height - 2;
        width: @width / 2;
        font-size: 16px;
        color: #d6d6d9;
        position: relative;
        z-index: 1;
        border: none;
        background-color: transparent;
      }
      .slide {
        width: @width / 2;
        height: @height - 2px;
        border-radius: @height / 2;
        z-index: 0;
        background-color: #da274d;
        position: absolute;
        left: 0;
        top: 0;
      }
      .active-btn {
        color: white;
      }
      .left-slide {
        transition: transform 0.2s ease-in-out 0s;
        transform: translate(0px,0px);
      }
      .right-slide {
        transition: transform 0.2s ease-in-out 0s;
        transform: translate(@width,0px);
      }
    }
  }
</style>
