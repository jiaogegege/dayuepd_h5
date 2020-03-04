<template>
  <div class="captcha-row">
    <!--<input class="captcha-input" placeholder="输入验证码" auto-focus />-->
    <div v-if="showtime===null" class="captcha-button-enable" @click="send">
      获取验证码
    </div>
    <div v-else class="captcha-button-disable">
      {{showtime}}
    </div>
  </div>
</template>

<script>
  import {utility} from "../utils/utility";

  //可能触发的事件
  const countDownBtnEvent = {
    startEvent: 'startEvent',    //点击了按钮的事件
    stopEvent: 'stopEvent',     //结束倒计时事件
    countDownEvent: 'countDownEvent'    //倒计时事件，1s触发一次，参数1：restTime:number
  };

  export default {
    name: 'CountDownBtn',
    data() {
      return {
        // 计时器,注意需要进行销毁
        timeCounter: null,
        // null 则显示按钮 秒数则显示读秒
        showtime: null
      }
    },
    mounted () {
      //获取保存在本地的倒计时，如果有的话
      let restTime = localStorage.getItem('restTime');
      if (!utility.isEmptyString(restTime)) {
        let time = parseInt(restTime);
        if (!isNaN(time)) {
          this.countDown(time);
        }
      }
    },
    destroyed() {
      clearTimeout(this.timeCounter);
    },
    methods: {
      // 倒计时显示处理
      countDownText(s) {
        this.showtime = `重新获取(${s})`
      },

      // 倒计时 60秒 不需要很精准
      countDown(times) {
        const self = this;
        // 时间间隔 1秒
        const interval = 1000;
        let count = 0;
        self.countDownText(times);
        self.timeCounter = setTimeout(countDownStart, interval);
        function countDownStart() {
          if (self.timeCounter == null) {
            return false;
          }
          count++;
          //剩余时间保存到本地,下次进来可以读取
          let restTime = times - count;
          localStorage.setItem('restTime', String(restTime));
          self.countDownText(restTime);
          self.$emit(countDownBtnEvent.countDownEvent, restTime);
          if (count > times) {
            clearTimeout(self.timeCounter);
            self.showtime = null;
            //清空本地存储
            localStorage.removeItem('restTime');
            //结束倒计时
            self.$emit(countDownBtnEvent.stopEvent);
          } else {
            self.timeCounter = setTimeout(countDownStart, interval)
          }
        }
      },

      send() {
        this.$emit(countDownBtnEvent.startEvent);
        // this.countDown(60);
      },

      //重置倒计时
      reset ()
      {
        localStorage.removeItem('restTime');
      }
    },
  }
</script>

<style lang="less" scoped>
  .captcha-row {
    display: flex;
    font-size: 12px;
    text-align: center;
    .captcha-button-enable {
      width: 100px;
      height: 40px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      border: 1px solid #da274d;
      background: #da274d;
    }
    .captcha-button-disable {
      width: 100px;
      height: 40px;
      color: #d6d6d9;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      border: 1px solid #d6d6d9;
      background: white;
    }
  }
</style>