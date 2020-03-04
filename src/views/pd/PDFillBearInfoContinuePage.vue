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
        <div class="header">
          <div class="title">
            <p style="margin-top: 0;">已育胎次</p>
          </div>
          <slider-bar class="slider-bar"
                      :origin-options="bearCount"
                      :origin-opt="bearInfoArray.length"
                      @sliderBarChanged="sliderAction">
          </slider-bar>
        </div>
        <!--内容区域-->
        <mu-flex class="content" direction="column" align-items="center">
          <bear-view class="bear-info"
                     v-for="(bearInfo,index) of bearInfoArray"
                     :key="bearInfo.id"
                     :times="index + 1"
                     :last-page="index + 1 >= bearInfoArray.length"
                     @bearInfoChanged="bearInfoChanged"
                     :bear-info="bearInfo">
          </bear-view>
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
  import PDSliderBar from '../../components/PDSliderBar.vue';
  import PDBearInfoView from '../../components/PDBearInfoView.vue';

  export default {
    name: 'PDFillBearInfoContinuePage',

    components: {
      'slider-bar': PDSliderBar,
      'bear-view': PDBearInfoView,
    },

    data () {
      return {
        bearCount: this.$str.bearCount,
        bearInfoArray: [],    //生育信息对象数组
        index: 0,   //第几个生育信息，用来控制在这个界面的时候创建的生育信息总数，总是增加

        //用户是否是更新信息
        updateUserInfo: false,
      }
    },

    computed: {
      btnActive () {
        let ret = true;
        if (this.bearInfoArray.length <= 0) {
          ret = false;
        }
        else {
          for (let bearInfo of this.bearInfoArray) {
            if (!this.checkBearInfoComplete(bearInfo)) {
              ret = false;
              break;
            }
          }
        }
        return ret;
      },

      ...mapGetters([
        "getUserId",
        "getUserQosArray"
      ])

    },

    //初始化的时候设置问题
    created () {
      this.updateUserInfo = this.$route.params.updateUserInfo || this.updateUserInfo;

      let bearQos = {userInfoId: this.$str.female_BearInfo_Id, userInfoValue: ''};
      //尝试获取所有问题答案
      this.getAllQuestions()
          .then(res => {
            this.$util.answerQuestions(this.getUserQosArray, [bearQos]);
            if (!this.$util.isEmptyString(bearQos.userInfoValue)) {
              //解析宝宝信息
              this.bearInfoArray = JSON.parse(bearQos.userInfoValue);
              this.bearInfoArray.forEach((item, index) => {
                item.id = index;
                this.index += item.id;
              });
            }
            else {
              //创建一个空的宝宝信息
              this.bearInfoArray.push(this.getEmptyBearInfo());
            }
          })
          .catch(err => {
            this.$toast.error(err.message);
          });
    },

    methods: {
      //创建一个空的宝宝信息
      getEmptyBearInfo () {
        return {
          id: ++this.index,
          babyBirthday: '',
          babyCount: '',
          birthway: '',
          increaseWeight: '',
          babyWeight: '',
          showBabyWeight: true,   //是否检查宝宝体重，多胎不检查
        };
      },

      //检查某个宝宝信息是否完整
      checkBearInfoComplete (bearInfo) {
        if (bearInfo.showBabyWeight){
          return !this.$util.isEmptyString(bearInfo.babyBirthday) && !this.$util.isEmptyString(bearInfo.babyCount) && !this.$util.isEmptyString(bearInfo.birthway) && !this.$util.isEmptyString(bearInfo.increaseWeight) && !this.$util.isEmptyString(bearInfo.babyWeight);
        }
        else {
          return !this.$util.isEmptyString(bearInfo.babyBirthday) && !this.$util.isEmptyString(bearInfo.babyCount) && !this.$util.isEmptyString(bearInfo.birthway) && !this.$util.isEmptyString(bearInfo.increaseWeight);
        }
      },


      //已育胎次选择事件
      sliderAction (value) {
        //选择更多的时候，添加一个空的宝宝信息
        if (value > this.bearInfoArray.length) {
          for (let i = this.bearInfoArray.length; i < value; ++i) {
            this.bearInfoArray.push(this.getEmptyBearInfo());
          }
        }
        //选择更少的时候，清空所有宝宝信息，并添加选择数量的空宝宝信息
        else if (value < this.bearInfoArray.length) {
          this.bearInfoArray = [];
          for (let i = 0; i < value; ++i) {
            this.bearInfoArray.push(this.getEmptyBearInfo());
          }
        }
        else {
          //不做处理
        }
      },

      //生育信息发生变化
      bearInfoChanged (bearInfo) {
      },

      //构建宝宝信息参数
      buildBearInfo () {
        return {userInfoId: this.$str.female_BearInfo_Id, userInfoValue: JSON.stringify(this.bearInfoArray)};
      },

      //下一步按钮
      nextAction () {
        //调用接口提交信息
        const loading = this.$loading();
        let qosArray = [this.buildBearInfo()];
        this.uploadQuestions({qosArray, isPerfect: this.$str.perfectNo})
            .then(res => {
              loading.close();
              // this.$toast.success(this.$str.modifyUserInfoSuccess);
              //完善后进入下一页
              this.$router.push({
                name: 'PDFillContinueSecondPage',
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
        .header {
          .title {
            color: white;
            font-size: 18px;
            font-weight: bolder;
          }
          .slider-bar {
            width: 323px;
          }
        }
        .content {
          width: 323px;
          flex: auto;
          overflow: auto;
          border-radius: 13px;
          font-size: 16px;
          margin-top: 20px;
          .bear-info {
          }
        }
        .next-btn {
          margin-top: 20px;
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

