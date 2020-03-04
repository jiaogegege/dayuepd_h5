<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column">
        <!--趋势报告-->
        <div class="report-container">
          <div class="report-title">趋势报告</div>
          <div class="line"></div>
          <div class="report-item">
            <mu-tabs class="tabs"
                     :value.sync="activeIndex"
                     inverse
                     color="primary"
                     indicator-color="primary"
                     full-width>
              <mu-tab>盆底最大肌电位</mu-tab>
              <mu-tab>I＆II 类肌肌力</mu-tab>
              <mu-tab>I＆II 类肌疲劳度</mu-tab>
            </mu-tabs>
          </div>
          <div class="line"></div>
          <!--趋势折线图-->
          <div class="report-content">
            <!--折线图-->
            <ve-line class="max-scale"
                     v-if="activeIndex === 0"
                     :data="maxMuscleData"
                     :tooltip-visible="true"
                     :grid="grid"
                     height="200px"
                     :colors="colors"
                     :settings="maxMuscleSettings"
                     :legend-visible="false">
            </ve-line>
            <ve-line class="muscle-force"
                     v-if="activeIndex === 1"
                     :data="muscleForceData"
                     :tooltip-visible="true"
                     :grid="grid"
                     height="200px"
                     :colors="colors"
                     :settings="muscleForceSettings"
                     :legend-visible="true">
            </ve-line>
            <ve-line class="fatigue"
                     v-if="activeIndex === 2"
                     :data="fatigueData"
                     :tooltip-visible="true"
                     :grid="grid"
                     height="200px"
                     :colors="colors"
                     :settings="fatigueSettings"
                     :legend-visible="true">
            </ve-line>
          </div>
          <div class="line"></div>
        </div>
        <!--评估列表-->
        <div class="report-list-container">
          <div class="report-list-title">评估列表</div>
          <div class="line"></div>
          <!--列表-->
          <mu-list class="report-list">
            <mu-flex class="list-item" direction="column" v-for="item of evaluationList" justify-content="around" :key="item.id">
              <mu-flex justify-content="around" align-items="center" style="width: 100%;">
                <p>标准评估</p>
                <p>5分钟</p>
                <p>{{$util.formatDateToLocalString(new Date(item.createDate))}}</p>
                <mu-icon value=":mdi mdi-chevron-right" color="#d6d6d9"></mu-icon>
              </mu-flex>
              <div class="line" style="margin-left: 12px;"></div>
            </mu-flex>
          </mu-list>
        </div>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'PDDataEvaluationPage',

    components: {
    },

    data() {
      this.maxMuscleSettings = {
        xAxisName: ['次数'],
        yAxisName: ['µV'],
      };
      this.muscleForceSettings = {
        xAxisName: ['次数'],
        yAxisName: ['级数'],
      };
      this.fatigueSettings = {
        xAxisName: ['次数'],
        yAxisName: ['疲劳度'],
      };
      this.grid = {
        show: false,
        top: 30,
        left: 5,
        right: 5,
        bottom: 20,
        backgroundColor: 'white',
      };
      this.colors = ['#da274d', '#4a90e2'];
      return {
        activeIndex: 0,   //当前激活的tab
        evaluationList: [],

      };
    },

    computed: {
      ...mapGetters([
          "getUserId"
      ]),

      //最大肌电位数据
      maxMuscleData () {
        let rows = [];
        this.evaluationList.forEach((item, index) => {
          rows.push({'次数': String(++index), 'µV': item.maxMyopotential.slice(0, -2)});
        });
        if (rows.length > 10) {
          rows = rows.slice(0, 10);
        }
        return {
          columns: ['次数', 'µV'],
          rows: rows
        };
      },
      //肌力数据
      muscleForceData () {
        let rows = [];
        this.evaluationList.forEach((item, index) => {
          rows.push({'次数': String(++index), 'I类肌肌力': item.oneMuscularStrength.slice(0,1),'II类肌肌力': item.twoMuscularStrength.slice(0,1)});
        });
        if (rows.length > 10) {
          rows = rows.slice(0, 10);
        }
        return {
          columns: ['次数', 'I类肌肌力', 'II类肌肌力'],
          rows: rows
        };
      },
      //疲劳度数据
      fatigueData () {
        let rows = [];
        this.evaluationList.forEach((item, index) => {
          rows.push({'次数': String(++index), 'I类肌疲劳度': item.oneMuscularTired.slice(0,-1),'II类肌疲劳度': item.twoMuscularTired.slice(0,1)});
        });
        if (rows.length > 10) {
          rows = rows.slice(0, 10);
        }
        return {
          columns: ['次数', 'I类肌疲劳度', 'II类肌疲劳度'],
          rows: rows
        };
      },

    },

    created() {
      //下载数据
      this.requestGetEvaluationList();
    },

    methods: {
      //下载标准评估历史记录
      requestGetEvaluationList () {
        const loading = this.$loading();
        this.$http.downloadEvaluationInfo(this.getUserId)
            .then(res => {
              loading.close();
              this.evaluationList = res;
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

    },

  }
</script>

<style scoped lang="less">
  .line {
    background-color: #d8d8d8;
    height: 1px;
    width: 100%;
  }

  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      width: 100vw;
      height: 100vh - 23vh;
      .report-container {
        width: 100%;
        .report-title {
          width: 100%;
          height: 30px;
          padding-left: 12px;
          line-height: 30px;
          text-align: left;
          font-size: 12px;
          background-color: #f7f7f7;
        }
        .report-item {

        }
        .report-content {

        }
      }
      .report-list-container {
        width: 100%;
        flex: auto;
        overflow: auto;
        .report-list-title {
          width: 100%;
          height: 30px;
          padding-left: 12px;
          line-height: 30px;
          text-align: left;
          font-size: 12px;
          background-color: #f7f7f7;
        }
        .report-list {
          .list-item {
            font-size: 12px;
            width: 100%;
          }
        }
      }
    }
  }
</style>
