<template>
  <div name="GoodsList" id="main">
    <ul class="goodList">
      <li v-for="good in this.goods" :key="good.id">
        <img v-bind:src="good.img">
        <p>{{good.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'GoodsList',
    props: {
      goods: Array
    }
  }
</script>

<style scoped lang="less">
  #main {
    margin-top: 20px;
  }
  ul.goodList {
    margin: 0;
    padding: 0;
    li {
      width: 192px;
      height: 200px;
      list-style: none;
      float: left;
      font-size: 9px;
      color: red;
      margin-bottom: 20px;
      img {
        width: 180px;
        height: 180px;
      }
      p {
        margin: 0;
      }
    }
  }
</style>
