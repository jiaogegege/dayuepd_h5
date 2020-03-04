<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 57px; width: 100%;">
          <mu-appbar class="appbar"
                     title="验证"
                     color="white"
                     text-color="black"
                     z-depth="0">
            <mu-button icon slot="left" @click="$router.go(-1)">
              <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
            </mu-button>
            <mu-button flat slot="right"
                       textColor="white"
                       style="font-size: 18px;">____
            </mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex ref="content" class="content" direction="column" align-items="center">
          <mu-list class="list">
            <!--提示语-->
            <mu-flex class="tip">
              <mu-button class="tip-btn"
                         flat
                         :ripple="Boolean(false)"
                         color="#95959e"
                         style="font-size: 12px; height: 59px; text-decoration: underline;">
                <mu-icon value=":mdi mdi-alert-circle" color="primary" style="margin-right: 2px;"></mu-icon>
                手机号丢失或停用？
              </mu-button>
            </mu-flex>
            <!--原手机号-->
            <mu-flex class="list-item" direction="column" align-items="center">
              <mu-flex class="list-item-top" justify-content="start" align-items="center">
                <div style="margin-right: 35px; width: 56px; text-align: left;">原手机号</div>
                <mu-text-field class="old-phone text-field"
                               color="primary"
                               solo
                               v-model="oldPhone"
                               style="width: 200px;"
                               placeholder="请输入原手机号码">
                </mu-text-field>
              </mu-flex>
              <mu-divider class="middle-line"></mu-divider>
            </mu-flex>
            <!--密码-->
            <mu-flex class="list-item" direction="column" align-items="center">
              <mu-flex class="list-item-top" justify-content="start" align-items="center">
                <div style="margin-right: 35px; width: 56px; text-align: left;">密码</div>
                <mu-text-field class="psd text-field"
                               color="primary"
                               solo
                               v-model="psd"
                               type="password"
                               style="width: 200px;"
                               placeholder="请输入密码">
                </mu-text-field>
              </mu-flex>
              <mu-divider class="bottom-line"></mu-divider>
            </mu-flex>
            <!--提交按钮-->
            <mu-flex class="submit" direction="column" align-items="center">
              <mu-button class="submit-btn"
                         @click="submitAction"
                         :color="btnActive ? 'primary' : 'secondary'"
                         :disabled="!btnActive">提交
              </mu-button>
            </mu-flex>
          </mu-list>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'PDModifyPhoneWithPsdPage',

    data() {
      return {
        oldPhone: '',
        psd: '',
      };
    },

    computed: {
      ...mapGetters([
          "getUserPhone"
      ]),

      btnActive () {
        return this.oldPhone.length > 0 && this.psd.length > 0;
      },

    },

    created() {

    },

    methods: {
      submitAction () {
        if (!this.$util.checkPhoneFormat(this.oldPhone.trim())) {
          this.$toast.error(this.$str.phoneFormatErrorHint);
        }
        else if (this.oldPhone.trim() !== this.getUserPhone) {
          this.$toast.error(this.$str.originPhoneMatchErrorHint);
        }
        else if (!this.$util.checkPsdFormat(this.psd.trim())) {
          this.$toast.error(this.$str.psdFormatErrorHint);
        }
        else {
          //请求接口
          const loading = this.$loading();
          this.$http.modifyPhoneWithPassword(this.oldPhone.trim(), this.psd.trim())
              .then(res => {
                loading.close();
                //进入新手机号界面
                this.$router.push({name: 'PDModifyPhoneNewPhonePage'});
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
              padding-left: 15px;
              padding-right: 15px;
            }
          }
          .submit-btn {
            margin-top: 40px;
            color: white;
            width: 282px;
            height: 50px;
            font-size: 18px;
            border-radius: 25px;
          }

        }
      }
    }
  }
</style>
