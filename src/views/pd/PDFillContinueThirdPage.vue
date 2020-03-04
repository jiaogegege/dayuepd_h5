<template>
  <div class="background">
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 56px; width: 100%;">
          <mu-appbar class="appbar"
                     title="完善个人信息"
                     color="transparent"
                     z-depth="0">
            <mu-button icon slot="left" @click="$router.go(-1)">
              <mu-icon value=":mdi mdi-chevron-left"></mu-icon>
            </mu-button>
            <p>完善个人信息</p>
            <mu-button flat slot="right" textColor="transparent">____</mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex class="content" direction="column" align-items="center">
          <div class="first item">
            <p>您目前是否处于哺乳期？</p>
            <switch-bar class="first-qos switch-bar"
                        :origin-opt="firstAnswer"
                        @switchChanged="firstQosAction">
            </switch-bar>
          </div>
          <div class="second item">
            <p>在以往或目前的哺乳中，您每天是否需要添加奶粉喂养？</p>
            <switch-bar class="second-qos switch-bar"
                        :origin-opt="secondAnswer"
                        @switchChanged="secondQosAction">
            </switch-bar>
          </div>
          <div class="third item">
            <p>在以往或目前的哺乳中，您是否有使用吸乳器？</p>
            <switch-bar class="third-qos switch-bar"
                        :origin-opt="thirdAnswer"
                        @switchChanged="thirdQosAction">
            </switch-bar>
          </div>
          <div class="forth item">
            <p>在以往或目前的哺乳中，您是否有乳胀痛 、乳腺管不通、堵奶的症状？</p>
            <switch-bar class="forth-qos switch-bar"
                        :origin-opt="forthAnswer"
                        @switchChanged="forthQosAction">
            </switch-bar>
          </div>
          <div class="fifth item">
            <p>您是否有乳头内陷的困扰？</p>
            <switch-bar class="fifth-qos switch-bar"
                        :origin-opt="fifthAnswer"
                        @switchChanged="fifthQosAction">
            </switch-bar>
          </div>
          <div class="sixth item">
            <p>您产后1个月内是否做过子宫复旧、促进恶露排出的治疗？</p>
            <switch-bar class="sixth-qos switch-bar"
                        :origin-opt="sixthAnswer"
                        @switchChanged="sixthQosAction">
            </switch-bar>
          </div>
          <div class="seventh item">
            <p>在以往或目前的哺乳中，您每天添加奶粉喂养的次数。</p>
            <selection-view class="seventh-qos selection-view"
                            :origin-one-type-array="milkPowerTimes"
                            :single-selection="true"
                            :origin-selection="seventhAnswer.split('@')"
                            @selectChanged="seventhQosAction">
            </selection-view>
          </div>
          <div class="eighth item">
            <p>您的吸乳器的种类（多选）</p>
            <selection-view class="eighth-qos selection-view"
                             :origin-one-type-array="breastPumps"
                             :origin-selection="eighthAnswer.split('@')"
                             @selectChanged="eighthQosAction">
          </selection-view>
          </div>
          <!--页码-->
          <div class="page-num">
            <p style="margin-top: 0;">3/4</p>
          </div>
        </mu-flex>
        <!--底部按钮-->
        <mu-button class="next-btn"
                   @click="nextAction"
                   :color="btnActive ? 'primary' : 'secondary'"
                   :disabled="!btnActive">下一步
        </mu-button>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import PDSwitchBar from '../../components/PDSwitchBar';
  import PDSelectionView from '../../components/PDSelectionView';

  export default {
    name: 'PDFillContinueThirdPage',

    components: {
      'switch-bar': PDSwitchBar,
      'selection-view': PDSelectionView,
    },

    data () {
      return {
        //奶粉喂养次数
        milkPowerTimes: [
          this.$str.milkPower_One2Three,
          this.$str.milkPower_Three2Five,
          this.$str.milkPower_FiveUp,
        ],

        //吸乳器种类
        breastPumps: [
            this.$str.female_Breastpump_Jiayong_Shoudong,
            this.$str.female_Breastpump_Jiayong_Dan_Diandong,
            this.$str.female_Breastpump_Jiayong_Shuang_Diandong,
            this.$str.female_Breastpump_Yiyong_Diandong,
        ],

        firstQos: {userInfoId: this.$str.female_Buruqi_Id, userInfoValue: ''},
        secondQos: {userInfoId: this.$str.female_Tianjia_naifen_Id, userInfoValue: ''},
        thirdQos: {userInfoId: this.$str.female_Xiruqi_Id, userInfoValue: ''},
        forthQos: {userInfoId: this.$str.female_Ruzhangtong_Id, userInfoValue: ''},
        fifthQos: {userInfoId: this.$str.female_Rutou_Neixian_Id, userInfoValue: ''},
        sixthQos: {userInfoId: this.$str.female_Zigongfujiu_Id, userInfoValue: ''},
        seventhQos: {userInfoId: this.$str.female_Tianjia_Naifen_Cishu_Id, userInfoValue: ''},
        eighthQos: {userInfoId: this.$str.female_Xiruqi_Zhonglei_Id, userInfoValue: ''},

        //用户是否是更新信息
        updateUserInfo: false,
      }
    },

//初始化的时候设置问题
    created () {
      this.updateUserInfo = this.$route.params.updateUserInfo || this.updateUserInfo;

      let unAnswerArr = [
        this.firstQos,
        this.secondQos,
        this.thirdQos,
        this.forthQos,
        this.fifthQos,
        this.sixthQos,
        this.seventhQos,
        this.eighthQos,
      ];
      //尝试获取所有问题答案
      this.getAllQuestions()
          .then(res => {
            this.$util.answerQuestions(this.getUserQosArray, unAnswerArr);
          })
          .catch(err => {
            this.$toast.error(err.message);
          });
    },

    computed: {
      btnActive () {
        return !this.$util.isEmptyString(this.firstAnswer) && !this.$util.isEmptyString(this.secondAnswer) && !this.$util.isEmptyString(this.thirdAnswer) && !this.$util.isEmptyString(this.forthAnswer) && !this.$util.isEmptyString(this.fifthAnswer) && !this.$util.isEmptyString(this.sixthAnswer) && !this.$util.isEmptyString(this.seventhAnswer) && !this.$util.isEmptyString(this.eighthAnswer);
      },

      firstAnswer () {
        return this.firstQos.userInfoValue;
      },

      secondAnswer () {
        return this.secondQos.userInfoValue;
      },

      thirdAnswer () {
        return this.thirdQos.userInfoValue;
      },

      forthAnswer () {
        return this.forthQos.userInfoValue;
      },

      fifthAnswer () {
        return this.fifthQos.userInfoValue;
      },

      sixthAnswer () {
        return this.sixthQos.userInfoValue;
      },

      seventhAnswer () {
        return this.seventhQos.userInfoValue;
      },

      eighthAnswer () {
        return this.eighthQos.userInfoValue;
      },

      ...mapGetters([
        "getUserId",
        "getUserQosArray"
      ])
    },

    methods: {
      firstQosAction (value) {
        this.firstQos.userInfoValue = value;
      },

      secondQosAction (value) {
        this.secondQos.userInfoValue = value;
      },

      thirdQosAction (value) {
        this.thirdQos.userInfoValue = value;
      },

      forthQosAction (value) {
        this.forthQos.userInfoValue = value;
      },

      fifthQosAction (value) {
        this.fifthQos.userInfoValue = value;
      },

      sixthQosAction (value) {
        this.sixthQos.userInfoValue = value;
      },

      //奶粉喂养次数
      seventhQosAction (array) {
        this.seventhQos.userInfoValue = array.join('@');
      },

      //吸乳器种类
      eighthQosAction (array) {
        this.eighthQos.userInfoValue = array.join('@');
      },

      //下一步按钮
      nextAction () {
        const loading = this.$loading();
        let qosArray = [this.firstQos, this.secondQos, this.thirdQos, this.forthQos, this.fifthQos, this.sixthQos, this.seventhQos, this.eighthQos];
        this.uploadQuestions({qosArray, isPerfect: this.$str.perfectNo})
            .then(res => {
              loading.close();
              // this.$toast.success(this.$str.modifyUserInfoSuccess);
              //完善后进入下一页
              this.$router.push({
                name: 'PDFillContinueForthPage',
                params: {updateUserInfo: this.updateUserInfo}
              });
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      ...mapMutations([

      ]),

      ...mapActions([
        "getAllQuestions",
        "uploadQuestions"
      ])
    }


  }
</script>

<style scoped lang="less">
  .background {
    background: linear-gradient(#5B5B7B, #2C2C3C);
    .container {
      margin: 0;
      padding: 0;
      .wrapper {
        height: 100vh;
        .content {
          flex: auto;
          overflow: auto;
          border-radius: 13px;
          background-color: white;
          font-size: 16px;
          padding-left: 20px;
          padding-right: 20px;
          .item {
            width: 281px;
            margin: 20px 0;
            p {
              font-weight: bolder;
              text-align: left;
            }
          }
          .switch-bar {
            background: white;
          }
          .selection-view {
            background: white;
          }
        }
        .next-btn {
          margin-top: 30px;
          color: white;
          width: 100%;
          height: 50px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 0;
        }
      }
    }
  }
</style>
