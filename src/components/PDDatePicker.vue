<template>
  <div class="date-picker-container">
    <div class="date-picker-bar">
      <button class="cancel btn" @click="cancelAction">取消</button>
      <p class="title">选择日期</p>
      <button class="confirm btn" @click="confirmAction">确定</button>
    </div>
    <mu-date-picker
            class="date-picker"
            color="primary"
            :date="selectedDate"
            :max-date="maxDate"
            @change="selectDateAction">
    </mu-date-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  const event = {
    datePickerCancel: 'datePickerCancel', //取消按钮
    datePickerConfirm: 'datePickerConfirm'  //确定按钮，返回选择的日期：Date
  };

  export default {
    name: 'PDDatePicker',
    props: [
        'originDate',  //初始日期，从父组件传过来，Date类型
        'maxDate',    //最大可选择日期,Date类型，默认无
    ],

    data () {
      return {
        selectedDate: undefined //选中的日期，默认当天
      }
    },

    created () {
      //如果设置了初始日期，那么设置为初始日期；如果没有设置，默认为当天
      this.selectedDate = (this.originDate && this.originDate.toString() !== 'Invalid Date') ? this.originDate : new Date();
    },

    methods: {
      selectDateAction (date) {
        this.selectedDate = date;
      },
      //取消选择
      cancelAction () {
        this.$emit(event.datePickerCancel);
      },
      //确定选择
      confirmAction () {
        this.$emit(event.datePickerConfirm, this.selectedDate);
      }
    }

  }
</script>

<style scoped lang="less">
  .date-picker-container {
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
    .date-picker-bar {
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
    .date-picker {
      width: 100%;
    }
  }
</style>
