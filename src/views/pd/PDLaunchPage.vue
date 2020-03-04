<template>
  <div>
    <img class="launch" src="@/assets/launch.png" alt="">
  </div>
</template>

<!--启动页-->
<script>
  export default {
    name: 'PDLaunchPage',
    mounted () {
      setTimeout(() => {
        //进入输入手机号界面
        this.$router.push({
          name: 'PDLoginRegisterPage'
        });
      }, 2000);
    }
  }
</script>

<style scoped lang="less">
  .launch {
    width: 100vw;
    height: 100vh;
  }
</style>
