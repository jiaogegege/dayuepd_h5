<template>
  <div>
    <ul>
      <li><h2><router-link :to="{name: 'A'}">转向A页面</router-link></h2></li>
      <li><h2><router-link to="/b">转向todolist页面</router-link></h2></li>
      <li><h2><router-link to="/c">转向商品列表页面</router-link></h2></li>
      <li><h2><router-link to="/d">转向登录流程页面</router-link></h2></li>
      <li><h2><router-link to="/e">转向普通HTML页面</router-link></h2></li>
      <li><h2><router-link to="/f">转向Style页面</router-link></h2></li>
      <li><h2><router-link to="/apis">转向接口调用页面</router-link></h2></li>
      <li><h2><router-link :to="{name: 'PDLaunchPage'}">转向大悦盆底</router-link></h2></li>
    </ul>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'Test',
    // mounted () {
    //   //调用登录接口
    //   this.$http.loginPhoneAndPsd('18550480576', 'Qqqq111@')
    //       .then((objValue) => {
    //         this.login(objValue.dayueAppUser);
    //         console.log(objValue.dayueAppUser);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    // },
    methods: {
      ...mapMutations(['login'])
    }
  };
</script>

<style scoped lang="less">
  li {
    text-align: left;
    height: 40px;
  }
</style>
