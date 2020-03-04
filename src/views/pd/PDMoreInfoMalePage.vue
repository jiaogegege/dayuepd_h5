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
        <mu-flex class="content" direction="column" align-items="center">
          <info-item class="item" v-for="item of answerArr" :left-text="item.userInfoKey" :right-text="item.userInfoValue" :key="item.userInfoId"></info-item>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import PDUserInfoListItemView from '../../components/PDUserInfoListItemView';

  export default {
    name: 'PDMoreInfoMalePage',

    components: {
      'info-item': PDUserInfoListItemView
    },

    data() {
      return {
        firstQos: {userInfoId: this.$str.male_Bianmi_Id, userInfoKey: this.$str.male_bianmi_Text, userInfoValue: ''},
        secondQos: {userInfoId: this.$str.male_Jianjin_Suantong_Id, userInfoKey: this.$str.male_Jianjin_Suantong_Text, userInfoValue: ''},
        thirdQos: {userInfoId: this.$str.male_Yaobei_Suantong_Id, userInfoKey: this.$str.male_Yaobei_Suantong_Text, userInfoValue: ''},
        forthQos: {userInfoId: this.$str.male_Jirou_Suantong_Id, userInfoKey: this.$str.male_Jirou_Suantong_Text, userInfoValue: ''},
      }
    },

    computed: {
      ...mapGetters([
        "getUserInfo",
        "getUserId",
        "getUserQosArray"
      ]),

      answerArr () {
        return [this.firstQos, this.secondQos, this.thirdQos, this.forthQos];
      },

    },

    created () {
      //获取问题答案
      const loading = this.$loading();
      this.getAllQuestions()
          .then(res => {
            loading.close();
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
      }
    }

  }
</style>
