<template>
  <div class="background">
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <mu-appbar class="appbar"
                   title="完善个人信息"
                   style="width:100%;"
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
            <p>您是否有长期便秘的症状？</p>
            <switch-bar class="first-qos switch-bar"
                        :origin-opt="firstAnswer"
                        @switchChanged="firstQosAction">
            </switch-bar>
          </div>
          <div class="second item">
            <p>您是否有肩颈部酸痛的症状？</p>
            <switch-bar class="second-qos switch-bar"
                        :origin-opt="secondAnswer"
                        @switchChanged="secondQosAction">
            </switch-bar>
          </div>
          <div class="third item">
            <p>您是否有腰背部酸痛的症状？</p>
            <switch-bar class="third-qos switch-bar"
                        :origin-opt="thirdAnswer"
                        @switchChanged="thirdQosAction">
            </switch-bar>
          </div>
          <div class="forth item">
            <p>您其他部位是否会有肌肉酸痛的症状？</p>
            <switch-bar class="forth-qos switch-bar"
                        :origin-opt="forthAnswer"
                        @switchChanged="forthQosAction">
            </switch-bar>
          </div>
          <!--页码-->
          <div class="page-num">
            <p>1/1</p>
          </div>
        </mu-flex>
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
  import {strMacros} from "../../utils/consts";
  import PDSwitchBar from '../../components/PDSwitchBar';

  export default {
    name: 'PDFillMaleQosPage',

    components: {
      'switch-bar': PDSwitchBar
    },

    data () {
      return {
        firstQos: {userInfoId: strMacros.male_Bianmi_Id, userInfoValue: ''},
        secondQos: {userInfoId: strMacros.male_Jianjin_Suantong_Id, userInfoValue: ''},
        thirdQos: {userInfoId: strMacros.male_Yaobei_Suantong_Id, userInfoValue: ''},
        forthQos: {userInfoId: strMacros.male_Jirou_Suantong_Id, userInfoValue: ''},

        //用户是否是更新信息
        updateUserInfo: false,
      }
    },

    //初始化的时候设置问题
    mounted () {
      this.updateUserInfo = this.$route.params.updateUserInfo || this.updateUserInfo;

      let unAnswerArr = [
          this.firstQos,
          this.secondQos,
          this.thirdQos,
          this.forthQos
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
        return !this.$util.isEmptyString(this.firstAnswer) && !this.$util.isEmptyString(this.secondAnswer) && !this.$util.isEmptyString(this.thirdAnswer) && !this.$util.isEmptyString(this.forthAnswer);
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

      ...mapGetters([
          "getUserId",
          "getUserQosArray"
      ])
    },

    methods: {
      //您是否有长期便秘的症状？
      firstQosAction (value) {
        this.firstQos.userInfoValue = value;
      },

      //您是否有肩颈部酸痛的症状？
      secondQosAction (value) {
        this.secondQos.userInfoValue = value;
      },

      //您是否有腰背部酸痛的症状？
      thirdQosAction (value) {
        this.thirdQos.userInfoValue = value;
      },

      //您其他部位是否会有肌肉酸痛的症状？
      forthQosAction (value) {
        this.forthQos.userInfoValue = value;
      },

      //完成按钮
      finishAction () {
        const loading = this.$loading();
        let qosArray = [this.firstQos, this.secondQos, this.thirdQos, this.forthQos];
        this.uploadQuestions({qosArray, isPerfect: strMacros.perfectYes})
            .then(res => {
              loading.close();
              this.$toast.success(strMacros.modifyUserInfoSuccess);
              //完善信息后进入主页或返回个人中心
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
        .content {
          height: 667px - 56px - 20px - 80px;
          width: 323px;
          overflow: scroll;
          border-radius: 13px;
          background-color: white;
          margin: 20px 20px 0 20px;
          font-size: 16px;
          font-weight: bolder;
          .item {
            width: 281px;
            margin: 20px 0;
            p {
              text-align: left;
            }
          }
          .switch-bar {
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
