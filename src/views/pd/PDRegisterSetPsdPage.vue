<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column">
        <div class="title">
          <p>设置密码</p>
        </div>
        <mu-text-field class="psd-text"
                       color="primary"
                       v-model="userPassword"
                       placeholder="请设置登录密码"
                       :action-icon="visibility ? 'visibility_off' : 'visibility'"
                       :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'">
        </mu-text-field>
        <mu-button class="register-btn"
                   @click="registerAction"
                   :color="btnActive ? 'primary' : 'secondary'"
                   :disabled="!btnActive">注册
        </mu-button>
        <div class="psd-hint">
          <p>*依据医疗器械相关法律法规规定密码8-12位，需要同时包含大写字母、小写字母、数字、特殊字符（@或_或#）</p>
        </div>
      </mu-flex>
    </mu-container>
  </div>
</template>

<script>
  import {strMacros} from "../../utils/consts";
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: 'PDRegisterSetPsdPage',
    data () {
      return {
        userPassword: '',
        visibility: false   //密码可见性
      }
    },

    computed: {
      btnActive() {
        return this.userPassword.length > 0;
      },

      ...mapGetters([
        "getUserPhone",
        "getUserInfo"
      ])
    },

    methods: {
      //注册按钮
      registerAction () {
        if (this.$util.isEmptyString(this.getUserPhone)) {
          this.$toast.error(strMacros.phoneEmptyErrorHint);
          return;
        }
        this.userPassword = this.userPassword.trim();
        if (!this.$util.checkPsdFormat(this.userPassword)) {
          this.$toast.error(strMacros.psdFormatErrorHint);
          return;
        }
        //md5密码
        const loading = this.$loading();
        this.$http.finishRegister(this.getUserPhone, this.userPassword)
            .then(res => {
              loading.close();
              //保存用户信息
              this.setUserInfo(res.dayueAppUser);
              this.setUserConfigInfo(res.dayueAppUserConfig);
              this.$toast.success('注册成功');
              //进入注册成功界面
              this.$router.push({name: 'PDRegisterFinishPage'});
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      ...mapMutations([
        "setUserInfo",
        "setUserConfigInfo"
      ])
    }

  }
</script>

<style scoped lang="less">
  .container {
    padding: 0 46px;
    .wrapper {
      .title {
        padding-top: 100px;
        font-size: 18px;
        font-weight: bold;
      }
      .psd-text {
        font-size: 18px;
        width: 281px;
      }
      .register-btn {
        margin-top: 20px;
        color: white;
        width: 282px;
        height: 50px;
        font-size: 18px;
        border-radius: 25px;
      }
      .psd-hint {
        font-size: 12px;
        text-align: left;
        color: #95959e;
      }

    }
  }
</style>
