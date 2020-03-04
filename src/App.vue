<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'App',
    data(){
      return {
        transitionName:''
      }
    },

    methods: {
      ...mapMutations([
          "setUserPhone",
          "setUserInfo",
          "setUserConfigInfo"
      ])
    },

    created () {
      //读取用户信息
      let userPhone = localStorage.getItem('userPhoneKey');
      if (!this.$util.isEmptyString(userPhone)) {
        this.setUserPhone(userPhone);
      }
      let userInfo = localStorage.getItem('userInfoKey');
      if (!this.$util.isEmptyString(userInfo)) {
        this.setUserInfo(JSON.parse(userInfo));
      }
      let userConfigInfo = localStorage.getItem('userConfigInfoKey');
      if (!this.$util.isEmptyString(userConfigInfo)) {
        this.setUserConfigInfo(JSON.parse(userConfigInfo));
      }
    },

    watch: {//使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > from.meta.index){
          //设置动画名称
          this.transitionName = 'slide-left';
        }else{
          this.transitionName = 'slide-right';
        }
      }
    }
  }
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nprogress .bar {
  background: #da274d !important; //自定义颜色
}

/*页面切换动画效果*/
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

/*#nav {*/
  /*padding: 30px;*/
  /*a {*/
    /*font-weight: bold;*/
    /*color: #2c3e50;*/
    /*&.router-link-exact-active {*/
      /*color: #42b983;*/
    /*}*/
  /*}*/
/*}*/
</style>
