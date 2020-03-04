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
        <mu-flex class="content" direction="column" justify-content="around" align-items="center">
          <div class="title">
            <p>您目前的状态</p>
          </div>
          <mu-button class="first btn"
                     flat
                     :class="{'btn-active': firstActive, 'btn-inactive': !firstActive}"
                     @click="firstAction">已育，有再妊娠计划
          </mu-button>
          <mu-button class="second btn"
                     flat
                     :class="{'btn-active': secondActive, 'btn-inactive': !secondActive}"
                     @click="secondAction">已育，无再妊娠计划
          </mu-button>
          <mu-button class="third btn"
                     flat
                     :class="{'btn-active': thirdActive, 'btn-inactive': !thirdActive}"
                     @click="thirdAction">未育
          </mu-button>
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

  export default {
    name: 'PDFillFemaleStatusPage',

    data () {
      return {
        stateQos: {userInfoId: this.$str.female_Current_status_Id, userInfoValue: ''},
        firstActive: false,
        secondActive: false,
        thirdActive: false,

        //用户是否是更新信息
        updateUserInfo: false,
      }
    },

    computed: {
      btnActive () {
        return !this.$util.isEmptyString(this.stateQos.userInfoValue);
      },

      ...mapGetters([
        "getUserId",
        "getUserQosArray"
      ])
    },

    created () {
      this.updateUserInfo = this.$route.params.updateUserInfo || this.updateUserInfo;

      //尝试获取所有问题答案
      this.getAllQuestions()
          .then(res => {
            this.$util.answerQuestions(this.getUserQosArray, [this.stateQos]);
            if (this.stateQos.userInfoValue === this.$str.bearStatus1) {
              this.firstActive = true;
            }
            else if (this.stateQos.userInfoValue === this.$str.bearStatus2) {
              this.secondActive = true;
            }
            else if (this.stateQos.userInfoValue === this.$str.bearStatus3) {
              this.thirdActive = true;
            }
          })
          .catch(err => {
            this.$toast.error(err.message);
          });
    },

    methods: {
      firstAction () {
        this.stateQos.userInfoValue = this.$str.bearStatus1;
        this.firstActive = true;
        this.secondActive = false;
        this.thirdActive = false;
      },

      secondAction () {
        this.stateQos.userInfoValue = this.$str.bearStatus2;
        this.firstActive = false;
        this.secondActive = true;
        this.thirdActive = false;
      },

      thirdAction () {
        this.stateQos.userInfoValue = this.$str.bearStatus3;
        this.firstActive = false;
        this.secondActive = false;
        this.thirdActive = true;
      },

      nextAction () {
        const loading = this.$loading();
        let qosArray = [this.stateQos];
        this.uploadQuestions({qosArray, isPerfect: this.$str.perfectNo})
            .then(res => {
              loading.close();
              // this.$toast.success(this.$str.modifyUserInfoSuccess);
              //完善信息后进入下一个界面
              this.gotoDifferentPage(this.stateQos.userInfoValue);
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      //根据选择项进入不同的界面
      gotoDifferentPage (value) {
        if (value === this.$str.bearStatus1) {
          this.$router.push({
            name: 'PDFillBearInfoContinuePage',
            params: {updateUserInfo: this.updateUserInfo}
          });
        }
        else if (value === this.$str.bearStatus2) {
          this.$router.push({
            name: 'PDFillBearInfoStopPage',
            params: {updateUserInfo: this.updateUserInfo}
          });
        }
        else {
          this.$router.push({
            name: 'PDFillChildlessFirstPage',
            params: {updateUserInfo: this.updateUserInfo}
          });
        }
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
        height: 667px;
        .content {
          /* height: 667px - 56px - 20px - 80px; */
          flex: auto;
          width: 323px;
          overflow: scroll;
          border-radius: 13px;
          background-color: white;
          margin: 20px 20px 0 20px;
          font-size: 18px;
          font-weight: bolder;
          .item {
            width: 281px;
            margin: 20px 0;
            p {
              text-align: left;
            }
          }
          .btn {
            height: 66px;
            width: 234px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 33px;
          }
          .btn-active {
            border: none;
            background-color: #da273d;
            color: white;
          }
          .btn-inactive {
            border: 1px #d6d6d9 solid;
            color: #d6d6d9;
            background-color: white;
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
