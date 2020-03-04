<template>
  <div class="background">
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <mu-appbar class="appbar"
                   title="完善个人信息"
                   style="width:100%; margin-top: 20px;"
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
            <p>您是否了解过或做过产后盆底功能康复治疗？</p>
            <switch-bar class="first-qos switch-bar"
                        :origin-opt="firstAnswer"
                        @switchChanged="firstQosAction">
            </switch-bar>
          </div>
          <div class="second item">
            <p>您是否出现漏尿、脏器脱垂或者盆腔痛的症状？</p>
            <switch-bar class="second-qos switch-bar"
                        :origin-opt="secondAnswer"
                        @switchChanged="secondQosAction">
            </switch-bar>
          </div>
          <div class="third item">
            <p>您是否出现阴道及阴道口松弛的症状？</p>
            <switch-bar class="third-qos switch-bar"
                        :origin-opt="thirdAnswer"
                        @switchChanged="thirdQosAction">
            </switch-bar>
          </div>
          <div class="forth item">
            <p>您是否出现阴道收缩功能下降的症状？</p>
            <switch-bar class="forth-qos switch-bar"
                        :origin-opt="forthAnswer"
                        @switchChanged="forthQosAction">
            </switch-bar>
          </div>
          <div class="fifth item">
            <p>您是否出现女性性功能指数（包括：性欲、性唤起、性高潮、性湿润、性满意度、性交痛）下降的症状？</p>
            <switch-bar class="fifth-qos switch-bar"
                        :origin-opt="fifthAnswer"
                        @switchChanged="fifthQosAction">
            </switch-bar>
          </div>
          <div class="sixth item">
            <p>既往病史（多选）</p>
            <selection-view class="sixth-qos selection-view"
                            :origin-one-type-array="diseases"
                            :origin-another-type-array="noDisease"
                            :origin-selection="sixthAnswer.split('@')"
                            @selectChanged="sixthQosAction">
            </selection-view>
          </div>
          <!--页码-->
          <div class="page-num">
            <p style="margin-top: 0;">1/3</p>
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
    name: 'PDFillChildlessFirstPage',

    components: {
      'switch-bar': PDSwitchBar,
      'selection-view': PDSelectionView,
    },

    data () {
      return {
        //所有疾病
        diseases: [
            this.$str.female_MH_Changqi_Manxing_Kesou,
            this.$str.female_MH_Cangqi_Bianmi,
            this.$str.female_MH_Pendi_Shoushu,
            this.$str.female_MH_Manxing_Penqiang_Tengtong
        ],
        //无疾病
        noDisease: [this.$str.female_MH_None],

        firstQos: {userInfoId: this.$str.female_Un_Known_Pendi_Kangfu_Id, userInfoValue: ''},
        secondQos: {userInfoId: this.$str.female_Un_Louniao_Tuochui_Id, userInfoValue: ''},
        thirdQos: {userInfoId: this.$str.female_Un_Yindao_SongChi_Id, userInfoValue: ''},
        forthQos: {userInfoId: this.$str.female_Un_Yindao_Shousuo_Xiajiang_Id, userInfoValue: ''},
        fifthQos: {userInfoId: this.$str.female_Un_Xinggongneng_Xiajiang_Id, userInfoValue: ''},
        sixthQos: {userInfoId: this.$str.female_Un_Medical_History_Id, userInfoValue: ''},

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
        this.sixthQos
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
        return !this.$util.isEmptyString(this.firstAnswer) && !this.$util.isEmptyString(this.secondAnswer) && !this.$util.isEmptyString(this.thirdAnswer) && !this.$util.isEmptyString(this.forthAnswer) && !this.$util.isEmptyString(this.fifthAnswer) && !this.$util.isEmptyString(this.sixthAnswer);
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

      ...mapGetters([
        "getUserId",
        "getUserQosArray"
      ])
    },

    methods: {
      //您是否了解过或做过产后盆底功能康复 治疗？
      firstQosAction (value) {
        this.firstQos.userInfoValue = value;
      },

      //您是否出现漏尿、脏器脱垂或者盆腔痛 的症状？
      secondQosAction (value) {
        this.secondQos.userInfoValue = value;
      },

      //您是否出现阴道及阴道口松弛的症状？
      thirdQosAction (value) {
        this.thirdQos.userInfoValue = value;
      },

      //您是否出现阴道收缩功能下降的症状？
      forthQosAction (value) {
        this.forthQos.userInfoValue = value;
      },

      //您是否出现女性性功能指数（包括：性 欲、性唤起、性高潮、性湿润、性满意 度、性交痛）下降的症状？
      fifthQosAction (value) {
        this.fifthQos.userInfoValue = value;
      },

      //既往病史（多选）
      sixthQosAction (array) {
        this.sixthQos.userInfoValue = array.join('@');
      },

      //下一步按钮
      nextAction () {
        const loading = this.$loading();
        let qosArray = [this.firstQos, this.secondQos, this.thirdQos, this.forthQos, this.fifthQos, this.sixthQos];
        this.uploadQuestions({qosArray, isPerfect: this.$str.perfectNo})
            .then(res => {
              loading.close();
              // this.$toast.success(this.$str.modifyUserInfoSuccess);
              //完善后进入下一页
              this.$router.push({
                name: 'PDFillChildlessSecondPage',
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
          margin-top: 20px;
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
