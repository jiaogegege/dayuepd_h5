<!--宝宝信息组件-->
<template>
  <div style="width: 100%;">
    <div class="bear-info-bg">
      <div class="container">
        <div class="item">
          <div class="title">
            <p>第{{times}}次生育胎数</p>
          </div>
          <switch-bar class="switch-bar"
                      :ori-left-opt="$str.singleBear"
                      :ori-right-opt="$str.multiBear"
                      :origin-opt="babyCount"
                      @switchChanged="bearCountChanged">
          </switch-bar>
        </div>
        <div class="item">
          <div class="title">
            <p>第{{times}}次生育方式</p>
          </div>
          <switch-bar class="switch-bar"
                      :ori-left-opt="$str.bearWayYield"
                      :ori-right-opt="$str.bearWayCaesarean"
                      :origin-opt="bearWay"
                      @switchChanged="bearWayChanged">
          </switch-bar>
        </div>
        <div class="item">
          <div class="title">
            <p>宝宝出生日期</p>
          </div>
          <input class="birthday text-field"
                 color="primary"
                 :value="displayBirthday"
                 readonly
                 @click="showBirthdayPicker = true"
                 placeholder="请选择宝宝出生日期">
          <div class="line"></div>
        </div>
        <div class="item">
          <div class="title">
            <p>孕期增长体重</p>
          </div>
          <input class="increase-weight text-field"
                 color="primary"
                 :value="increaseWeight ? increaseWeight + 'kg' : ''"
                 readonly
                 @click="showIncreaseWeightPicker = true"
                 placeholder="请选择孕期增长体重">
          <div class="line"></div>
        </div>
        <div class="item" v-if="showBabyWeight">
          <div class="title">
            <p>宝宝出生体重</p>
          </div>
          <input class="baby-weight text-field"
                 color="primary"
                 :value="babyWeight ? babyWeight + 'kg' : ''"
                 readonly
                 @click="showBabyWeightPicker = true"
                 placeholder="请选择宝宝出生体重">
          <div class="line"></div>
        </div>
      </div>
      <!--页码-->
      <div class="page-num" v-if="lastPage">
        <p>1/4</p>
      </div>
      <!--宝宝生日选择器-->
      <date-picker class="birthday-picker"
                   v-if="showBirthdayPicker"
                   @datePickerCancel="showBirthdayPicker = false"
                   @datePickerConfirm="selectBirthdayAction"
                   :origin-date="birthDay ? new Date(birthDay) : new Date()"
                   :max-date="maxBirthday">
      </date-picker>
      <!--孕期增长体重-->
      <common-picker class="increase-weight-picker"
                     v-if="showIncreaseWeightPicker"
                     :title="'选择增长体重'"
                     :data-array="$util.getIncreaseWeightArray()"
                     :origin-value="increaseWeight ? [increaseWeight] : ['10']"
                     @pickerCancel="showIncreaseWeightPicker = false"
                     @pickerConfirm="selectIncreaseWeightAction">
      </common-picker>
      <!--宝宝出生体重-->
      <common-picker class="baby-weight-picker"
                     v-if="showBabyWeightPicker"
                     :title="'选择体重'"
                     :data-array="$util.getBabyWeightArray()"
                     :origin-value="babyWeight ? [babyWeight] : ['3.0']"
                     @pickerCancel="showBabyWeightPicker = false"
                     @pickerConfirm="selectBabyWeightAction">
      </common-picker>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PDSwitchBar from './PDSwitchBar';
  import PDDatePicker from './PDDatePicker';
  import PDSlidePicker from './PDSlidePicker';

  const event = {
    bearInfoChanged: 'bearInfoChanged'    //生育信息发生了变化，回传生育信息
  };

  export default {
    name: 'PDBearInfoView',

    components: {
      'switch-bar': PDSwitchBar,
      'date-picker': PDDatePicker,
      'common-picker': PDSlidePicker,
    },

    props: {
      times: Number,    //第几次生育
      bearInfo: Object,
      lastPage: Boolean,    //最后一页显示页码
    },

    data () {
      return {
        showBirthdayPicker: false,
        showIncreaseWeightPicker: false,
        showBabyWeightPicker: false,
        //最大生日范围
        maxBirthday: (new Date()),
      }
    },

    created () {
      let now = new Date();
      now.setFullYear(now.getFullYear() + 1);
      this.maxBirthday = now;
    },

    computed: {
      //生育次数
      babyCount () {
        return this.bearInfo.babyCount;
      },

      //生育方式
      bearWay () {
        return this.bearInfo.birthway;
      },

      //显示的出生日期
      displayBirthday () {
        return this.$util.formatDateToLocalString(this.bearInfo.babyBirthday);
      },
      //宝宝出生日期
      birthDay () {
        return this.bearInfo.babyBirthday;
      },

      //孕期增长体重
      increaseWeight () {
        return this.bearInfo.increaseWeight;
      },

      //宝宝出生体重
      babyWeight () {
        return this.bearInfo.babyWeight;
      },

      //是否显示宝宝出生体重
      showBabyWeight () {
        return this.bearInfo.showBabyWeight;
      },

    },

    methods: {
      bearCountChanged (value) {
        this.bearInfo.babyCount = value;
        if (value === this.$str.multiBear) {
          //多胎不显示宝宝体重
          this.bearInfo.showBabyWeight = false;
        }
        else {
          this.bearInfo.showBabyWeight = true;
        }
        this.$emit(event.bearInfoChanged, this.bearInfo);
      },

      bearWayChanged (value) {
        this.bearInfo.birthway = value;
        this.$emit(event.bearInfoChanged, this.bearInfo);
      },

      //选择宝宝出生日期
      selectBirthdayAction (date) {
        this.bearInfo.babyBirthday = date.Format(this.$str.dateFormatSlash);
        this.showBirthdayPicker = false;
        this.$emit(event.bearInfoChanged, this.bearInfo);
      },

      //选择孕期增长体重
      selectIncreaseWeightAction (values) {
        this.bearInfo.increaseWeight = values[0];
        this.showIncreaseWeightPicker = false;
        this.$emit(event.bearInfoChanged, this.bearInfo);
      },

      //选择宝宝体重
      selectBabyWeightAction (values) {
        this.bearInfo.babyWeight = values[0];
        this.showBabyWeightPicker = false;
        this.$emit(event.bearInfoChanged, this.bearInfo);
      },

    },

  }
</script>

<style scoped lang="less">
  @width: 100%;

  div {
    margin: 0;
    padding: 0;
  }

  .line {
    background-color: #e5e5e5;
    height: 1px;
    margin-left: 21px;
    margin-right: 21px;
  }

  .text-field {
    font-size: 25px;
    text-align: center;
    outline-style: none;
    border: 0;
    caret-color: #da274d;
  }

  .bear-info-bg {
    width: @width;
    border-radius: 13px;
    padding-bottom: 10px;
    margin: 10px 0;
    background-color: white;
    .container {
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        flex-direction: column;
        .title {
          font-size: 18px;
          font-weight: bolder;
        }
        .switch-bar {
          padding-left: 21px;
          padding-right: 21px;
        }
      }
    }
    .page-num {
      padding-top: 12px;
    }
  }
</style>
