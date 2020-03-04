<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" wrap="wrap">
        <!--标题-->
        <mu-flex class="section">
          <div class="title">
            <p>请注册/登录您的账号</p>
          </div>
        </mu-flex>
        <!--手机号输入框-->
        <mu-flex class="section" direction="column">
          <div class="hint">
            <p>输入手机号</p>
          </div>
          <div class="content">
            <label for="phone-text" class="hint">+86</label>
            <mu-text-field id="phone-text"
                           type="number"
                           class="phone-text"
                           color="primary"
                           v-model="userPhone"
                           placeholder="请输入手机号码"
                           action-icon=":mdi mdi-close-circle"
                           :action-click="()=>this.userPhone = ''">
            </mu-text-field>
          </div>
        </mu-flex>
        <!--下一步按钮-->
        <mu-flex class="section">
          <div class="bottom">
            <mu-button class="btn" @click="nextAction" :color="btnActive ? 'primary' : 'secondary'" :disabled="!btnActive">下一步</mu-button>
          </div>
        </mu-flex>
      </mu-flex>
    </mu-container>
  </div>
</template>

<!--启动app输入手机号界面-->
<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {strMacros} from "../../utils/consts";
  import {errorCode} from "../../network/UrlDefine";

  export default {
    name: 'PDLoginRegisterPage',
    data () {
      return {
        userPhone: ''
      }
    },
    computed: {
      btnActive () {
        return this.userPhone.length > 0;
      },

      ...mapGetters([
          "getUserId",
          "getUserPhone"
      ])
    },

    created () {
      this.userPhone = this.getUserPhone;
    },

    beforeRouteEnter (to, from, next) {
      next(self => {
        // 通过 `self` 访问组件实例
        if (self.$util.isEmptyString(self.getUserId)) {
          next();
        }
        else {
          //如果登录过了，那么导航到主页
          next({
            name: 'PDMainPage'
          });
        }
      })
    },

    methods: {
      //下一步按钮
      nextAction () {
        this.userPhone = this.userPhone.trim();
        if (!this.$util.checkPhoneFormat(this.userPhone)) {
          this.$toast.error(strMacros.phoneFormatErrorHint);
          return;
        }
        const loading = this.$loading();
        this.$http.phoneRegistered(this.userPhone)
            .then(res => {
              loading.close();
              this.setUserPhone(this.userPhone);
              //跳转登录界面或注册界面
              if (parseInt(res) === errorCode.errorCode_UserRegisted) {
                this.$router.push({
                  name: 'PDLoginPage',
                  params: {userPhone: this.userPhone}
                });
              }
              else if (parseInt(res) === errorCode.errorCode_UserNotExist) {
                //进入服务条款界面
                this.$router.push({
                  name: 'PDServicePage'
                });
              }
              else
              {
                this.$toast.error(res);
              }
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      ...mapMutations([
          "setUserPhone"
      ]),
    }
  }
</script>

<style scoped lang="less">
  .container {
    padding: 0 46px;
    .wrapper {
      padding-top: 80px;
      .section {
        .title {
          font-size: 20px;
        }
        .hint {
          font-size: 18px;
          font-weight: bold;
        }
        .content {
          .phone-text {
            padding-left: 12px;
            width: 230px;
            font-size: 18px;
          }
        }
        .bottom {
          .btn {
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
