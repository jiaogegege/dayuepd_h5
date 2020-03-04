<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="更多完整信息"
                     color="white"
                     text-color="black"
                     z-depth="0">
            <mu-button icon slot="left" @click="$router.go(-1)">
              <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
            </mu-button>
            <mu-button flat slot="right"
                       textColor="#da274d"
                       @click="modifyInfoAction"
                       style="font-size: 18px;">修改信息
            </mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex ref="content" class="content" direction="column" align-items="center">
          <div class="bear-info-container">
            <bear-info-view class="bear-item"
                            v-for="(item, index) of bearInfoArr"
                            :bear-info="item"
                            :count="index + 1"
                            :key="item.id">
            </bear-info-view>
          </div>
          <div class="answer-container">
            <info-item class="answer-item"
                       v-for="(item, index) of answerArr"
                       :left-text="item.userInfoKey"
                       :right-text="item.userInfoValue.split('@').join('、')"
                       :style="{marginBottom: (index === 5 || index === 13 ? '16px' : 0)}"
                       :class="{'app-bar-top-line': index === 6 || index === 14}"
                       :key="item.userInfoId">
            </info-item>
          </div>
          <!--返回顶部-->
          <mu-button class="to-top-btn" color="primary" @click="scrollToTopAction">返回顶部</mu-button>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import PDUserInfoListItemView from '../../components/PDUserInfoListItemView';
  import PDBearInfoListView from '../../components/PDBearInfoListView';

  export default {
    name: 'PDMoreInfoFemaleChildStopPage',

    components: {
      'info-item': PDUserInfoListItemView,
      'bear-info-view': PDBearInfoListView,
    },

    data() {
      return {
        //生育信息
        bearInfoArr: [],

        qos1: {userInfoId: this.$str.female_Known_Pendi_Kangfu_Id_NoMore, userInfoKey: this.$str.female_Known_Pendi_Kangfu_Text_NoMore, userInfoValue: ''},
        qos2: {userInfoId: this.$str.female_Louniao_Tuochui_Id_NoMore, userInfoKey: this.$str.female_Louniao_Tuochui_Text_NoMore, userInfoValue: ''},
        qos3: {userInfoId: this.$str.female_Yindao_SongChi_Id_NoMore, userInfoKey: this.$str.female_Yindao_SongChi_Text_NoMore, userInfoValue: ''},
        qos4: {userInfoId: this.$str.female_Yindao_Shousuo_Xiajiang_Id_NoMore, userInfoKey: this.$str.female_Yindao_Shousuo_Xiajiang_Text_NoMore, userInfoValue: ''},
        qos5: {userInfoId: this.$str.female_Xinggongneng_Xiajiang_Id_NoMore, userInfoKey: this.$str.female_Xinggongneng_Xiajiang_Text_NoMore, userInfoValue: ''},
        //既往病史，将`@`替换成`、`
        qos6: {userInfoId: this.$str.female_Medical_History_Id_NoMore, userInfoKey: this.$str.female_Medical_History_Text_NoMore, userInfoValue: ''},
        qos7: {userInfoId: this.$str.female_Buruqi_Id_NoMore, userInfoKey: this.$str.female_Buruqi_Text_NoMore, userInfoValue: ''},
        qos8: {userInfoId: this.$str.female_Tianjia_naifen_Id_NoMore, userInfoKey: this.$str.female_Tianjia_naifen_Text_NoMore, userInfoValue: ''},
        qos9: {userInfoId: this.$str.female_Xiruqi_Id_NoMore, userInfoKey: this.$str.female_Xiruqi_Text_NoMore, userInfoValue: ''},
        qos10: {userInfoId: this.$str.female_Ruzhangtong_Id_NoMore, userInfoKey: this.$str.female_Ruzhangtong_Text_NoMore, userInfoValue: ''},
        qos11: {userInfoId: this.$str.female_Rutou_Neixian_Id_NoMore, userInfoKey: this.$str.female_Rutou_Neixian_Text_NoMore, userInfoValue: ''},
        qos12: {userInfoId: this.$str.female_Zigongfujiu_Id_NoMore, userInfoKey: this.$str.female_Zigongfujiu_Text_NoMore, userInfoValue: ''},
        qos13: {userInfoId: this.$str.female_Tianjia_Naifen_Cishu_Id_NoMore, userInfoKey: this.$str.female_Tianjia_Naifen_Cishu_Text_NoMore, userInfoValue: ''},
        //吸乳器种类，将`@`替换成`、`
        qos14: {userInfoId: this.$str.female_Xiruqi_Zhonglei_Id_NoMore, userInfoKey: this.$str.female_Xiruqi_Zhonglei_Text_NoMore, userInfoValue: ''},
        qos15: {userInfoId: this.$str.female_Fuzhiji_Fenli_Id_NoMore, userInfoKey: this.$str.female_Fuzhiji_Fenli_Text_NoMore, userInfoValue: ''},
        qos16: {userInfoId: this.$str.female_Fubi_Songchi_Id_NoMore, userInfoKey: this.$str.female_Fubi_Songchi_Text_NoMore, userInfoValue: ''},
        qos17: {userInfoId: this.$str.female_Tunbu_songchi_Id_NoMore, userInfoKey: this.$str.female_Tunbu_songchi_Text_NoMore, userInfoValue: ''},
        qos18: {userInfoId: this.$str.female_Ruxian_Zengsheng_Id_NoMore, userInfoKey: this.$str.female_Ruxian_Zengsheng_Text_NoMore, userInfoValue: ''},
        qos19: {userInfoId: this.$str.female_Jianjin_suantong_Id_NoMore, userInfoKey: this.$str.female_Jianjin_suantong_Text_NoMore, userInfoValue: ''},
        qos20: {userInfoId: this.$str.female_Yaobei_suantong_Id_NoMore, userInfoKey: this.$str.female_Yaobei_suantong_Text_NoMore, userInfoValue: ''},
        qos21: {userInfoId: this.$str.female_Jirou_Suantong_Id_NoMore, userInfoKey: this.$str.female_Jirou_Suantong_Text_NoMore, userInfoValue: ''},

      }
    },

    computed: {
      ...mapGetters([
        "getUserInfo",
        "getUserId",
        "getUserQosArray"
      ]),

      answerArr() {
        return [
          this.qos1,
          this.qos2,
          this.qos3,
          this.qos4,
          this.qos5,
          this.qos6,
          this.qos7,
          this.qos8,
          this.qos9,
          this.qos10,
          this.qos11,
          this.qos12,
          this.qos13,
          this.qos14,
          this.qos15,
          this.qos16,
          this.qos17,
          this.qos18,
          this.qos19,
          this.qos20,
          this.qos21
        ];
      },

    },

    created () {
      //获取问题答案
      const loading = this.$loading();
      this.getAllQuestions()
          .then(res => {
            loading.close();
            //解析生育信息
            let bearInfo = {userInfoId: this.$str.female_BearInfo_Id2, userInfoValue: ''};
            this.$util.answerQuestions(this.getUserQosArray, [bearInfo]);
            this.bearInfoArr = JSON.parse(bearInfo.userInfoValue);
            //获取其它问题答案
            this.$util.answerQuestions(this.getUserQosArray, this.answerArr);
          })
          .catch(err => {
            loading.close();
            this.$toast.error(err.message);
          });
    },

    methods: {
      ...mapMutations([

      ]),

      ...mapActions([
        "getAllQuestions"
      ]),

      //修改信息
      modifyInfoAction () {
        this.$router.push({
          name: 'PDFillBasicInfoPage',
          params: {updateUserInfo: true}
        });
      },

      //滚动到顶部
      scrollToTopAction () {
        this.$refs.content.scrollTo(0,0);
      },

    },

  }
</script>

<style scoped lang="less">
  @import "../../assets/less/base";

  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      background-color: @gray-f7f7f7;
      height: 100vh;
      .app-bar {
        .app-bar-bottom-line
      }
      .content {
        flex: auto;
        overflow: auto;
        .bear-info-container {
          margin-bottom: 16px;
        }
        .answer-container {
          .app-bar-top-line;
        }
        .to-top-btn {
          height: 50px;
          width: 282px;
          margin-top: 20px;
          margin-bottom: 30px;
          border-radius: 25px;
          font-size: 18px;
          font-weight: bolder;
        }
      }
    }

  }
</style>
