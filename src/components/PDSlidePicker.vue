<template>
  <div class="picker-container">
    <div class="picker-bar">
      <button class="cancel btn" @click="cancelAction">取消</button>
      <p class="title">{{titleDisplay}}</p>
      <button class="confirm btn" @click="confirmAction">确定</button>
    </div>
    <div style="background-color: white;">
      <mu-slide-picker
              class="picker"
              :slots="slots"
              :visible-item-count="5"
              @change="valueChangeAction"
              :values="selectedValue">
      </mu-slide-picker>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const event = {
    pickerCancel: 'pickerCancel', //取消按钮
    pickerConfirm: 'pickerConfirm'  //确定按钮，返回选择的值：Array
  };

  export default {
    name: 'PDSlidePicker',
    props: {
      originValue: Array,    //初始数据，从父组件传过来
      dataArray: Array,   //数据源，父组件传入所有选择项
      title: String //标题
    },

    data () {
      return {
        selectedValue: [],    //选中的数据

      }
    },

    computed: {
      //显示的标题
      titleDisplay () {
        if (!this.$util.isEmptyString(this.title)) {
          return this.title;
        }
        return '请选择';
      },
      //选择器使用的配置数据
      slots () {
        return [
          {
            width: '100%',
            textAlign: 'center',
            values: this.dataArray
          }
        ]
      }

    },

    created () {
      //如果设置了初始值，那么赋值，如果没有设置初始值，默认选择第一个（什么都不做）
      if (this.originValue) {
        this.selectedValue = this.originValue;
      }
    },

    methods: {
      //选择了某个东西
      valueChangeAction (value, index) {
        this.selectedValue[index] = value;
      },

      //取消选择
      cancelAction () {
        this.$emit(event.pickerCancel);
      },
      //确定选择
      confirmAction () {
        this.$emit(event.pickerConfirm, this.selectedValue);
      }

    }

  }
</script>

<style scoped lang="less">
  .picker-container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .picker-bar {
      height: 44px;
      width: 100%;
      background-color: rgba(249,249,249,1);
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
        padding: 0;
        line-height: 44px;
      }
      .btn {
        height: 44px;
        width: 80px;
        color: #da274d;
        border: none;
        background-color: rgba(249,249,249,1);
      }
    }
    .picker {
      width: 100%;
    }
  }
</style>
