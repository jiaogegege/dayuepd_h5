<template>
  <div>
    <h1>欢迎访问</h1>
    <br>
    <div>
      <router-link to="/d/home">点击进入首页</router-link>
    </div>
    <div class="a">aaaaaaaaaaaaa</div>
    <div class="b">bbbbbbbbbbbbbbb</div>
    <div class="c">cccccccccccccc</div>
  </div>
</template>

<script>
  export default {
    name: 'D'

  }
</script>

<style scoped lang="less">
  .mixin(dark, @color) {
    background-color: darken(@color, 10%);
  }
  .mixin(light, @color) {
    background-color: lighten(@color, 10%);
  }
  .mixin(@_, @color) {
    color: red;
    border: 1px solid black;
  }

  @switch1: light;
  @switch2: dark;
  .a {
    width: 200px;
    height: 200px;
    .mixin(@switch1, green);
  }
  .b {
    width: 200px;
    height: 200px;
    .mixin(@switch2, green);
  }
</style>
