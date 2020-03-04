<!--选择胎次的滑块-->
<template>
  <div class="background">
    <div class="container">
      <div class="btn-wrapper">
        <button class="btn"
                v-for="opt of options"
                :key="opt.value"
                :class="{'active-btn': opt.selected}"
                :style="btnStyleObj"
                @click="btnAction(opt)">{{opt.value}}
        </button>
      </div>
      <div class="slide"
           :style="slideStyleObj">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const event = {
    sliderBarChanged: 'sliderBarChanged'    //点击事件传出，回传参数：value
  };

  export default {
    name: 'PDSliderBar',
    props: {
      originOptions: Array,    //传入的选项列表
      originOpt: Number,    //初始值
    },

    data () {
      return {
        options: [],    //从`originOptions`计算得到一个带有`value` `selected`的对象
        selectedOpt: undefined    //被选中的项
      }
    },

    created () {
      this.options = this.originOptions.map((item, index) => {
        return {index: index, value: item, selected: false};
      });
    },

    watch: {
      originOpt () {
        this.setOriginValue();
      },
    },

    computed: {
      btnStyleObj () {
        let totalWidth = 100;
        return {
          width: totalWidth / this.options.length + '%',
        }
      },

      slideStyleObj () {
        let totalWidth = 100;
        let width = totalWidth / this.options.length;
        let left = 0;
        if (this.selectedOpt) {
          left = this.selectedOpt.index * width;
        }
        return {
          width: width + '%',
          transition: 'left 0.2s ease-in-out 0s',
          left: left + '%'
        }
      }

    },

    methods: {
      //设置初始值
      setOriginValue () {
        //设置初始值
        if (this.originOpt) {
          for (let i = 0; i < this.options.length; ++i) {
            if (this.options[i].value === this.originOpt) {
              this.btnAction(this.options[i]);
              break;
            }
          }
        }
        else {
          //选中第一个
          this.btnAction(this.options[0]);
        }
      },

      btnAction (option) {
        //选择了不同的按钮才进行操作
        if (option !== this.selectedOpt) {
          //将其它所有选项设置为未选中
          for (let opt of this.options) {
            opt.selected = false;
          }
          //将自己设为选中
          option.selected = true;
          this.selectedOpt = option;
          //将选中的值传出
          this.$emit(event.sliderBarChanged, option.value);
        }
      }
    },

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
    border-radius: @height / 2;
    .container {
      background-color: #454161;
      height: @height;
      width: @width;
      margin: 0;
      padding: 0;
      border-radius: @height / 2;
      position: relative;
      .btn-wrapper {
        display: flex;
        justify-content: space-around;
        .btn {
          color: #76738a;
          height: @height;
          font-size: 18px;
          z-index: 1;
          border: none;
          background-color: transparent;
        }
        .active-btn {
          color: white;
        }
      }
      .slide {
        height: @height;
        border-radius: @height / 2;
        z-index: 0;
        background-color: #da274d;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>
