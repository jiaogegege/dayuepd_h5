<template>
  <div class="main">
    <div class="left">
      <CLeft></CLeft>
    </div>
    <div class="right">
      <div class="top"><img src="images/top_header.png" alt="头部"></div>
      <div class="bottom">
        <CRight></CRight>
      </div>
    </div>
  </div>
</template>

<script>
  import CLeft from '../components/CLeft';
  import CRight from '../components/CRight';

  export default {
    path: '/c',
    name: 'C',
    components: {CLeft, CRight}
  }
</script>

<style scoped lang="less">
  /*常量定义*/
  @bgColor: #f5f5f5;
  @right-width: 970px;

  * {
    padding: 0;
    margin: 0;
  }
  .main {
    width: 1100px;
    margin: 20px auto;
  }
  .left {
    width: 100px;
    float: left;
    margin-right: 10px;
    background-color: @bgColor;
  }
  .right {
    width: @right-width;
    float: left;
    margin-left: 10px;
    background-color: @bgColor;
  }
  .top img {
    height: 200px;
    width: @right-width;
  }
</style>
