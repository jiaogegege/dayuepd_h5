<template>
  <div class="background">
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <mu-appbar class="appbar"
                   title="完善个人信息"
                   style="width:100%; margin: 20px 0 20px 0;"
                   color="transparent"
                   z-depth="0">
          <mu-button icon slot="left" @click="$router.go(-1)">
            <mu-icon value=":mdi mdi-chevron-left"></mu-icon>
          </mu-button>
          <p>完善个人信息</p>
          <mu-button flat slot="right" textColor="transparent">____</mu-button>
        </mu-appbar>
        <mu-flex class="content" direction="column" align-items="center">
          <div class="first item">
            <p>您是否对产后无乳、少乳、乳胀痛、乳腺管不通、堵奶的症状有过了解？</p>
            <switch-bar class="first-qos switch-bar"
                        :origin-opt="firstAnswer"
                        @switchChanged="firstQosAction">
            </switch-bar>
          </div>
          <div class="second item">
            <p>您是否有乳头内陷的困扰？</p>
            <switch-bar class="second-qos switch-bar"
                        :origin-opt="secondAnswer"
                        @switchChanged="secondQosAction">
            </switch-bar>
          </div>
          <div class="third item">
            <p>在生产前，您是否会先购置吸乳器？</p>
            <switch-bar class="third-qos switch-bar"
                        :origin-opt="thirdAnswer"
                        @switchChanged="thirdQosAction">
            </switch-bar>
          </div>
          <div class="forth item">
            <p>产后一个月内进行子宫复旧的治疗有助于加速恶露排出，促进产后恢复，您会选择子宫复旧的治疗吗？</p>
            <switch-bar class="forth-qos switch-bar"
                        :origin-opt="forthAnswer"
                        @switchChanged="forthQosAction">
            </switch-bar>
          </div>
          <div class="fifth item">
            <p>吸乳器的种类，您会选择？（多选）</p>
            <selection-view class="fifth-qos selection-view"
                            :origin-one-type-array="breastPumps"
                            :origin-selection="fifthAnswer.split('@')"
                            @selectChanged="fifthQosAction">
            </selection-view>
          </div>
          <!--页码-->
          <div class="page-num">
            <p style="margin-top: 0;">2/3</p>
          </div>
        </mu-flex>
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
    name: 'PDFillChildlessSecondPage',

    components: {
      'switch-bar': PDSwitchBar,
      'selection-view': PDSelectionView,
    },

    data () {
      return {
        //吸乳器种类
        breastPumps: [
          this.$str.female_Breastpump_Jiayong_Shoudong,
          this.$str.female_Breastpump_Jiayong_Dan_Diandong,
          this.$str.female_Breastpump_Jiayong_Shuang_Diandong,
          this.$str.female_Breastpump_Yiyong_Diandong
        ],

        firstQos: {userInfoId: this.$str.female_Un_Ruxianguan_Butong_Id, userInfoValue: ''},
        secondQos: {userInfoId: this.$str.female_Un_Rutou_Aoxian_Id, userInfoValue: ''},
        thirdQos: {userInfoId: this.$str.female_Un_Gouzhi_Xiruqi_Id, userInfoValue: ''},
        forthQos: {userInfoId: this.$str.female_Un_Xuanze_Zigongfujiu_Id, userInfoValue: ''},
        fifthQos: {userInfoId: this.$str.female_Un_Xuanze_Xiruqi_Zhonglei_Id, userInfoValue: ''},

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
        return !this.$util.isEmptyString(this.firstAnswer) && !this.$util.isEmptyString(this.secondAnswer) && !this.$util.isEmptyString(this.thirdAnswer) && !this.$util.isEmptyString(this.forthAnswer) && !this.$util.isEmptyString(this.fifthAnswer);
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

      ...mapGetters([
        "getUserId",
        "getUserQosArray"
      ])
    },

    methods: {
      //您是否对产后无乳、少乳、乳胀痛、乳腺 管不通、堵奶的症状有过了解？
      firstQosAction (value) {
        this.firstQos.userInfoValue = value;
      },

      //您是否有乳头内陷的困扰？
      secondQosAction (value) {
        this.secondQos.userInfoValue = value;
      },

      //在生产前，您是否会先购置吸乳器？
      thirdQosAction (value) {
        this.thirdQos.userInfoValue = value;
      },

      //产后一个月内进行子宫复旧的治疗有助于 加速恶露排出，促进产后恢复，您会选择 子宫复旧的治疗吗？
      forthQosAction (value) {
        this.forthQos.userInfoValue = value;
      },

      //吸乳器的种类，您会选择？（多选）
      fifthQosAction (array) {
        this.fifthQos.userInfoValue = array.join('@');
      },

      //下一步按钮
      nextAction () {
        const loading = this.$loading();
        let qosArray = [this.firstQos, this.secondQos, this.thirdQos, this.forthQos, this.fifthQos];
        this.uploadQuestions({qosArray, isPerfect: this.$str.perfectNo})
            .then(res => {
              loading.close();
              // this.$toast.success(this.$str.modifyUserInfoSuccess);
              //完善后进入下一页
              this.$router.push({
                name: 'PDFillChildlessThirdPage',
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
