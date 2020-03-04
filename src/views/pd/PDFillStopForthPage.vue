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
            <p>您是否有腹直肌分离的症状？</p>
            <selection-view class="seventh-qos selection-view"
                            :origin-one-type-array="rectusSeparation"
                            :single-selection="true"
                            :origin-selection="firstAnswer.split('@')"
                            @selectChanged="firstQosAction">
            </selection-view>
          </div>
          <div class="second item">
            <p>您是否有腹壁松弛的症状？</p>
            <switch-bar class="second-qos switch-bar"
                        :origin-opt="secondAnswer"
                        @switchChanged="secondQosAction">
            </switch-bar>
          </div>
          <div class="third item">
            <p>您是否有臀部、腿部、手臂等部位松弛的症状？</p>
            <switch-bar class="third-qos switch-bar"
                        :origin-opt="thirdAnswer"
                        @switchChanged="thirdQosAction">
            </switch-bar>
          </div>
          <div class="forth item">
            <p>生理期前后，您是否有乳腺增生（乳房胀痛及结节）的症状？</p>
            <switch-bar class="forth-qos switch-bar"
                        :origin-opt="forthAnswer"
                        @switchChanged="forthQosAction">
            </switch-bar>
          </div>
          <div class="fifth item">
            <p>您是否有肩颈部酸痛的症状？</p>
            <switch-bar class="fifth-qos switch-bar"
                        :origin-opt="fifthAnswer"
                        @switchChanged="fifthQosAction">
            </switch-bar>
          </div>
          <div class="sixth item">
            <p>您是否有腰背部酸痛的症状？</p>
            <switch-bar class="sixth-qos switch-bar"
                        :origin-opt="sixthAnswer"
                        @switchChanged="sixthQosAction">
            </switch-bar>
          </div>
          <div class="seventh item">
            <p>您其他部位是否会有肌肉酸痛的症状？</p>
            <switch-bar class="seventh-qos switch-bar"
                        :origin-opt="seventhAnswer"
                        @switchChanged="seventhQosAction">
            </switch-bar>
          </div>
          <!--页码-->
          <div class="page-num">
            <p style="margin-top: 0;">4/4</p>
          </div>
        </mu-flex>
        <!--底部按钮-->
        <mu-button class="finish-btn"
                   @click="finishAction"
                   :color="btnActive ? 'primary' : 'secondary'"
                   :disabled="!btnActive">完成
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
    name: 'PDFillContinueForthPage',

    components: {
      'switch-bar': PDSwitchBar,
      'selection-view': PDSelectionView,
    },

    data () {
      return {
        //腹直肌分离选项
        rectusSeparation: [
          this.$str.female_Fuzhiji_Fenli_Yes,
          this.$str.female_Fuzhiji_Fenli_No,
          this.$str.female_Fuzhiji_Fenli_Unknown,
        ],

        firstQos: {userInfoId: this.$str.female_Fuzhiji_Fenli_Id_NoMore, userInfoValue: ''},
        secondQos: {userInfoId: this.$str.female_Fubi_Songchi_Id_NoMore, userInfoValue: ''},
        thirdQos: {userInfoId: this.$str.female_Tunbu_songchi_Id_NoMore, userInfoValue: ''},
        forthQos: {userInfoId: this.$str.female_Ruxian_Zengsheng_Id_NoMore, userInfoValue: ''},
        fifthQos: {userInfoId: this.$str.female_Jianjin_suantong_Id_NoMore, userInfoValue: ''},
        sixthQos: {userInfoId: this.$str.female_Yaobei_suantong_Id_NoMore, userInfoValue: ''},
        seventhQos: {userInfoId: this.$str.female_Jirou_Suantong_Id_NoMore, userInfoValue: ''},

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
        return !this.$util.isEmptyString(this.firstAnswer) && !this.$util.isEmptyString(this.secondAnswer) && !this.$util.isEmptyString(this.thirdAnswer) && !this.$util.isEmptyString(this.forthAnswer) && !this.$util.isEmptyString(this.fifthAnswer) && !this.$util.isEmptyString(this.sixthAnswer) && !this.$util.isEmptyString(this.seventhAnswer);
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

      ...mapGetters([
        "getUserId",
        "getUserQosArray"
      ])
    },

    methods: {
      firstQosAction (array) {
        this.firstQos.userInfoValue = array.join('@');
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
      seventhQosAction (value) {
        this.seventhQos.userInfoValue = value;
      },

      //完成按钮
      finishAction () {
        const loading = this.$loading();
        let qosArray = [this.firstQos, this.secondQos, this.thirdQos, this.forthQos, this.fifthQos, this.sixthQos, this.seventhQos];
        this.uploadQuestions({qosArray, isPerfect: this.$str.perfectYes})
            .then(res => {
              loading.close();
              this.$toast.success(this.$str.modifyUserInfoSuccess);
              // this.$pToast({
              //   type: 'success',
              //   content: this.$str.modifyUserInfoSuccess,
              //   duration: 2500
              // })
              //完善后进入下一页
              if (this.updateUserInfo) {
                this.$router.push({
                  name: 'PDPersonalCenterPage'
                });
              }
              else {
                this.$router.push({
                  name: 'PDMainPage'
                });
              }
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
        .finish-btn {
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
