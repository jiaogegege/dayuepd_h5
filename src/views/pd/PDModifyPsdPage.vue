<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="修改密码"
                     color="white"
                     text-color="black"
                     z-depth="0">
            <mu-button icon slot="left" @click="$router.go(-1)">
              <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
            </mu-button>
            <mu-button flat slot="right"
                       text-color="white"
                       style="font-size: 18px;">____
            </mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex ref="content" class="content" direction="column" align-items="center">
          <mu-list class="list">
            <!--原密码-->
            <mu-flex class="list-item" direction="column" align-items="center">
              <mu-flex class="list-item-top" justify-content="between" align-items="center">
                <div>原密码</div>
                <mu-text-field class="origin-psd text-field"
                               color="primary"
                               solo
                               type="password"
                               v-model="originPsd"
                               placeholder="请输入原密码">
                </mu-text-field>
              </mu-flex>
              <mu-divider class="middle-line"></mu-divider>
            </mu-flex>
            <!--新密码-->
            <mu-flex class="list-item" direction="column" align-items="center">
              <mu-flex class="list-item-top" justify-content="between" align-items="center">
                <div>新密码</div>
                <mu-text-field class="new-psd text-field"
                               color="primary"
                               solo
                               type="password"
                               v-model="newPsd"
                               placeholder="请输入新密码">
                </mu-text-field>
              </mu-flex>
              <mu-divider class="middle-line"></mu-divider>
            </mu-flex>
            <!--确认密码-->
            <mu-flex class="list-item" direction="column" align-items="center">
              <mu-flex class="list-item-top" justify-content="between" align-items="center">
                <div>确认密码</div>
                <mu-text-field class="confirm-psd text-field"
                               color="primary"
                               solo
                               type="password"
                               v-model="confirmPsd"
                               placeholder="请再次输入新密码">
                </mu-text-field>
              </mu-flex>
              <mu-divider class="bottom-line"></mu-divider>
            </mu-flex>
            <!--忘记密码-->
            <mu-flex style="margin: 5px 0 5px 0">
              <mu-button class="forget-btn" flat @click="forgetPsdAction">忘记密码？</mu-button>
            </mu-flex>
            <!--提交-->
            <mu-flex class="submit" direction="column" align-items="center">
              <mu-button class="submit-btn"
                         @click="submitAction"
                         :color="btnActive ? 'primary' : 'secondary'"
                         :disabled="!btnActive">提交
              </mu-button>
              <div class="psd-hint">
                <p>*依据医疗器械相关法律法规规定密码8-12位，需要同时包含大写字母、小写字母、数字、特殊字符（@或_或#）</p>
              </div>
            </mu-flex>
          </mu-list>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import {encryptMd5} from "../../crypto/des";

  export default {
    name: 'PDModifyPsdPage',

    data() {
      return {
        originPsd: '',  //原密码
        newPsd: '',   //新密码
        confirmPsd: '',   //确认密码
      };
    },

    computed: {
      ...mapGetters([
          "getUserId",
          "getUserPhone",
          "getUserInfo"
      ]),

      btnActive() {
        return !this.$util.isEmptyString(this.originPsd.trim()) && !this.$util.isEmptyString(this.newPsd.trim()) && !this.$util.isEmptyString(this.confirmPsd.trim());
      },
    },

    methods: {
      ...mapMutations([
          "setUserInfo",
          "setUserPsd"
      ]),

      ...mapActions([

      ]),

      forgetPsdAction () {
        this.$router.push({
          name: 'PDForgetPsdPage',
          params: {fromPersonalCenter: true}
        });
      },

      submitAction () {
        //原密码错误
        if (encryptMd5(this.originPsd.trim()) !== this.getUserInfo.userPassword) {
          this.$toast.error(this.$str.originPsdErrorHint);
        }
        //新密码格式错误
        else if (!this.$util.checkPsdFormat(this.newPsd.trim())) {
          this.$toast.error(this.$str.newPsdFormatErrorHint);
        }
        //两次密码不一致
        else if (this.newPsd !== this.confirmPsd) {
          this.$toast.error(this.$str.twicePsdNotFitHint);
        }
        else {
          //调用接口
          const loading = this.$loading();
          this.$http.modifyPsd(this.getUserId, this.originPsd.trim(), this.newPsd.trim())
              .then(res => {
                loading.close();
                //设置个人信息和密码
                this.setUserPsd(encryptMd5(this.newPsd.trim()));
                this.$toast.success(this.$str.psdModifySuccessHint);
                //返回上一页
                this.$router.go(-1);
              })
              .catch(err => {
                loading.close();
                this.$toast.error(err.message);
              });
        }
      },
    },

  }
</script>

<style scoped lang="less">
  @import "../../assets/less/base";

  .top-line {
    margin-top: 10px;
    background-color: @gray-e5e5e5;
  }

  .middle-line {
    margin-left: 30px;
    background-color: @gray-e5e5e5;
  }

  .bottom-line {
    background-color: @gray-e5e5e5;
  }

  .text-field {
    font-size: 14px;
    caret-color: @red-da274d;
  }

  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      background-color: @gray-f7f7f7;
      height: 100vh;
      .app-bar {
        .app-bar-bottom-line;
      }
      .content {
        flex: auto;
        overflow: auto;
        width: 100vw;
        font-size: 14px;
        .list {
          padding: 0;
          .list-item {
            width: 100%;
            height: 60px;
            background-color: white;
            .list-item-top {
              width: 100%;
              height: 100%;
              margin-left: 30px;
            }
          }
          .forget-btn {
            text-decoration: underline;
          }
          .submit {
            width: 100%;
            .submit-btn {
              margin-top: 20px;
              color: white;
              width: 282px;
              height: 50px;
              font-size: 18px;
              border-radius: 25px;
            }
            .psd-hint {
              color: @gray-95959e;
              font-size: 12px;
              text-align: left;
              width: 282px;
              margin-top: 10px;
            }
          }

        }
      }
    }

  }
</style>
