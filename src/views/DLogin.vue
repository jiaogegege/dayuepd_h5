<template>
  <div class="login">
    <h1>登陆页</h1>
    <br>
    <div class="section">
      <label for="account">账号：
        <input
                class="input-section"
                type="text"
                id="account"
                v-model="form.account"
                placeholder="请输入您的账号">
      </label>
    </div>
    <div class="section">
      <label for="password">密码：
        <input
                class="input-section"
                type="text"
                id="password"
                v-model="form.password"
                placeholder="请输入您的密码">
      </label>
    </div>
    <button class="btn" @click="handleLogin">登陆</button>
    <p class="copyright">版权归属</p>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'Login',
    data () {
      return {
        form: {
          account: '',
          password: ''
        }
      }
    },
    methods: {
      //登陆按钮
      handleLogin () {
        if (!this.form.account) {
          alert('请填写账号');
          return;
        }
        if (!this.form.password) {
          alert('请填写密码');
          return;
        }
        let _this = this;
        setTimeout(() => {
          _this.login({
            account: _this.form.account,
            password: _this.form.password
          });
          _this.$store.commit('setMemberInfo', {
            userStatus: 0,
            vipLevel: 0
          });
          _this.$router.push('/d/home')
              .then((res) => {
                // console.log(res);
              });
        }, 1000);
      },
      ...mapMutations({
        login: 'login'
      })
    }
  }
</script>

<style scoped lang="less">
  label {
    font-size: 1.5rem;
  }
  .input-section {
    font-size: 1.5rem;
    border: gray 1px solid;
    margin: 10px;
  }
  .btn {
    font-size: 2rem;
    border: black 1px solid;
    border-radius: 2rem;
    background-color: coral;
    height: 4rem;
    width: 10rem;
    color: white;
    margin-top: 20px;
  }
  .copyright {
    position: absolute;
    width: 100%;
    height: 1rem;
    left: 0;
    bottom: 10px;
  }
</style>
