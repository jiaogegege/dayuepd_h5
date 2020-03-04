<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper">
        <mu-flex class="wrapper" direction="column">
          <!--总共治疗-->
          <div class="header">
            <div class="header-title">总共锻炼</div>
            <div class="line"></div>
            <div class="header-content">
              <mu-flex class="top" justify-content="center" align-items="baseline" style="margin-bottom: 16px;">
                <p style="color: #da274d; font-size: 24px; margin-bottom: 2px;">{{exerciseStatistics ? String(exerciseStatistics.feedbackTime + exerciseStatistics.stimTime) : 0}}</p>
                <p style="font-size: 12px; margin-bottom: 2px;">分钟</p>
              </mu-flex>
              <mu-flex class="bottom" justify-content="around">
                <mu-flex class="bottom-item" direction="column" justify-content="around" align-items="center">
                  <p style="font-size: 10px; margin: 0;">电刺激</p>
                  <mu-flex class="detail" justify-content="center" align-items="baseline">
                    <p style="color: #da274d; font-size: 16px; margin: 0;">{{exerciseStatistics ? exerciseStatistics.stimTime : 0}}</p>
                    <p style="font-size: 12px; margin: 0;">分钟</p>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="bottom-item" direction="column" justify-content="around" align-items="center">
                  <p style="font-size: 10px; margin: 0;">生物反馈</p>
                  <mu-flex class="detail" justify-content="center" align-items="baseline">
                    <p style="color: #da274d; font-size: 16px; margin: 0;">{{exerciseStatistics ? exerciseStatistics.feedbackTime : 0}}</p>
                    <p style="font-size: 12px; margin: 0;">分钟</p>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="bottom-item" direction="column" justify-content="around" align-items="center">
                  <p style="font-size: 10px; margin: 0;">完成次数</p>
                  <mu-flex class="detail" justify-content="center" align-items="baseline">
                    <p style="color: #da274d; font-size: 16px; margin: 0;">{{completeTimes}}</p>
                    <p style="font-size: 12px; margin: 0;">次</p>
                  </mu-flex>
                </mu-flex>
                <mu-flex class="bottom-item" direction="column" justify-content="around" align-items="center">
                  <p style="font-size: 10px; margin: 0;">累计天数</p>
                  <mu-flex class="detail" justify-content="center" align-items="baseline">
                    <p style="color: #da274d; font-size: 16px; margin: 0;">{{totalDays}}</p>
                    <p style="font-size: 12px; margin: 0;">天</p>
                  </mu-flex>
                </mu-flex>
              </mu-flex>
            </div>
            <div class="line"></div>
          </div>
          <div class="list-container">
            <mu-list class="list" style="margin: 0; padding: 0;">
              <!--治疗列表-->
              <div class="list-title">锻炼列表</div>
              <div class="line"></div>
              <mu-flex class="list-item" direction="column" v-for="item of exerciseHisList" justify-content="around" :key="item.id">
                <mu-flex justify-content="around" align-items="center" style="width: 100%; height: 60px;">
                  <mu-flex class="left" style="font-size: 12px; margin: 0; max-width: 145px; overflow: hidden;" direction="column" justify-content="center">
                    <p style="margin: 0;">{{item.programmeId}}</p>
                  </mu-flex>
                  <p style="font-size: 12px; margin: 0; color: #9b9b9b;">{{item.programmeTime}}分钟</p>
                  <p style="font-size: 14px; color: #9b9b9b;">{{$util.formatDateToLocalString(new Date(item.createDate))}}</p>
                </mu-flex>
                <div class="line" style="margin-left: 12px;"></div>
              </mu-flex>
            </mu-list>
          </div>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'PDDataExercisePage',

    data() {
      this.maxMuscleSettings = {
        xAxisName: ['次数'],
        yAxisName: ['µV'],
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
        exerciseStatistics: null,
        exerciseHisList: [],
      };
    },

    computed: {
      ...mapGetters([
        "getUserId"
      ]),

      //完成次数
      completeTimes () {
        return this.exerciseHisList.length;
      },

      //累计天数
      totalDays () {
        //遍历列表统计一共有几天
        let days = {};
        this.exerciseHisList.forEach((item, index) => {
          let dateStr = item.createDate.split(' ')[0];
          if (days.hasOwnProperty(dateStr)) {
            days[dateStr] += 1;
          }
          else {
            days[dateStr] = 0;
          }
        });
        return Object.keys(days).length;
      },


    },

    created() {
      this.requestGetStatistics();
      this.requestGetExerciseList();
    },

    methods: {
      //获取统计信息
      requestGetStatistics () {
        this.$http.downloadStatisticsData(this.getUserId)
            .then(res => {
              this.exerciseStatistics = res[1];
            })
            .catch(err => {
              this.$toast.error(err.message);
            });
      },

      //获取自由锻炼数据
      requestGetExerciseList () {
        this.$http.downloadExerciseHis(this.getUserId)
            .then(res => {
              this.exerciseHisList = res;
            })
            .catch(err => {
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
      .header {
        width: 100%;
        .header-title {
          width: 100%;
          height: 30px;
          padding-left: 12px;
          line-height: 30px;
          text-align: left;
          font-size: 12px;
          background-color: #f7f7f7;
        }
        .header-content {
          height: 140px;
          width: 100%;
        }
        .report-item {

        }
        .report-content {

        }
      }
      .list-container {
        width: 100%;
        flex: auto;
        overflow: auto;
        .list-title {
          width: 100%;
          height: 30px;
          padding-left: 12px;
          line-height: 30px;
          text-align: left;
          font-size: 12px;
          background-color: #f7f7f7;
        }
        .list {
          .list-item {
            width: 100%;
          }
        }
      }
    }
  }
</style>
