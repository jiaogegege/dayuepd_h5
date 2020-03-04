<template>
  <div>
    <h1>这是一个课程</h1>
    <div id="back">
      <router-link to="/d/home">返回</router-link>
    </div>
    <img src="../../public/images/menu_coat.png" alt="">
    <p>这是课程内容</p>
    <button class="share" @click="share">分享</button>
  </div>
</template>

<script>
  export default {
    name: 'DCourse',
    methods: {
      share () {
        this.$store.dispatch('getFreeVip').then((res) => {
          alert(res);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @height: 200px;
  #back {
    height: 2rem;
    font-size: 1.5rem;
  }
  .share {
    width: 400px;
    height: @height / 2;
    background-color: black;
    color: white;
    font-size: 1.1rem;
    line-height: @height / 2;
  }
</style>
