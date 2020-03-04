<template>
  <div>
    <mu-flex direction="column" class="flex">
      <div class="hint">
        <img src="../../assets/reg_success.png" alt="">
      </div>
      <div class="title">
        <p>注册成功</p>
      </div>
      <div class="subtitle">
        <p>欢迎加入大悦之家</p>
      </div>
      <!--分割线-->
      <div class="line"></div>
      <div class="description">
        <p>接下来，请您花几分钟回答下列问题</p>
      </div>
      <div class="detail">
        <p>请真实、有效的填写，这些信息很重要<br>越准确，我们就能给您更好的服务</p>
      </div>
      <mu-button class="start-btn"
                 @click="startAction"
                 color="primary">开始
      </mu-button>
    </mu-flex>


  </div>
</template>

<script>
  export default {
    name: 'PDRegisterFinishPage',

    methods: {
      startAction () {
        //进入填写个人信息界面
        this.$router.push({name: 'PDFillBasicInfoPage'});
      }
    }

  }
</script>

<style scoped lang="less">
  div, p {
    margin: 0;
    padding: 0;
  }
  .flex {
    margin-top: 80px;
    margin-left: 45px;
    margin-right: 45px;
    color: #2c2c3d;
    .hint {
      img {
        width: 60px;
        height: 60px;
      }
    }
    .title {
      text-align: left;
      font-size: 28px;
      font-weight: bold;
      margin-top: 32px;
    }
    .subtitle {
      text-align: left;
      font-size: 24px;
      font-weight: bold;
      margin-top: 5px;
    }
    .line {
      width: 20px;
      height: 2px;
      background-color: #9a9a9a;
      margin-top: 31px;
    }
    .description {
      text-align: left;
      font-size: 24px;
      font-weight: bold;
      margin-top: 31px;
    }
    .detail {
      font-size: 16px;
      text-align: left;
      margin-top: 7px;
    }
    .start-btn {
      color: white;
      width: 282px;
      height: 50px;
      font-size: 18px;
      font-weight: bold;
      border-radius: 25px;
      margin-top: 68px;
    }
  }

</style>
