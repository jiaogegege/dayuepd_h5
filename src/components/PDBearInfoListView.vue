<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <item-view class="item"
                   :left-text="'已育胎次'"
                   :right-text="bearCount ? bearCount : $str.noneDisplay">
        </item-view>
        <item-view class="item"
                   :left-text="'宝宝出生日期'"
                   :right-text="babyBirthday ? babyBirthday : $str.noneDisplay">
        </item-view>
        <item-view class="item"
                   :left-text="'生育胎数'"
                   :right-text="babyCount ? babyCount : $str.noneDisplay">
        </item-view>
        <item-view class="item"
                   :left-text="'生育方式'"
                   :right-text="birthway ? birthway : $str.noneDisplay">
        </item-view>
        <item-view class="item"
                   :left-text="'孕期增长体重'"
                   :right-text="increaseWeight ? increaseWeight : $str.noneDisplay">
        </item-view>
        <item-view class="item"
                   :left-text="'宝宝出生体重'"
                   v-if="bearInfo.showBabyWeight"
                   :right-text="babyWeight ? babyWeight : $str.noneDisplay">
        </item-view>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import PDUserInfoListItemView from './PDUserInfoListItemView';

  export default {
    name: 'PDBearInfoListView',

    components: {
      'item-view': PDUserInfoListItemView,
    },

    props: {
      bearInfo: undefined,
      count: undefined,   //第几胎
    },

    data() {
      return {
        bearCount: undefined,
        babyBirthday: undefined,
        babyCount: undefined,
        birthway: undefined,
        increaseWeight: undefined,
        babyWeight: undefined,
      };
    },

    created () {
      if (this.bearInfo) {
        this.bearCount = '第' + this.$str.numberOfBear[this.count] + '胎';
        this.babyBirthday = this.$util.formatDateToLocalString(new Date(this.bearInfo.babyBirthday));
        this.babyCount = this.bearInfo.babyCount;
        this.birthway = this.bearInfo.birthway;
        this.increaseWeight = this.bearInfo.increaseWeight + 'kg';
        this.babyWeight = this.bearInfo.babyWeight + 'kg';
      }
    },

  }
</script>

<style scoped lang="less">
  .container {
    .wrapper {
      background-color: white;
      .item {
      }
    }
  }
</style>
