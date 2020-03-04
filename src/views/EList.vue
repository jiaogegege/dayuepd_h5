<template>
  <div>
    <div id="header"><router-link to="/"><p>返回</p></router-link></div>
    <hr>
    <ul class="list">
      <li v-for="item of articleList" :key="item.id"><router-link :to="{
        name: 'EPage',
        params: {url: item.extValueOne}
        }">
        <img :src="iconHost + item.extValueTwo" alt="">
        {{item.sourceName}}</router-link></li>
    </ul>
  </div>
</template>

<script>
  import {hosts} from "../network/UrlDefine";

  export default {
    name: 'EList',
    data () {
      return {
        articleList: []
      }
    },
    computed: {
      userId () {
        return this.$store.state.userInfo.id;
      },
      iconHost () {
        return hosts.normalIconServerHost;
      }
    },
    mounted() {
      this.$http.getUserGuideList(this.userId)
          .then(objValue => {
            this.articleList = objValue;
          });
    }
  }
</script>

<style scoped lang="less">
  ul.list {
    text-align: left;
    margin: 0;
    li {
      list-style: none;
      height: 80px;
      color: black;
    }
  }
</style>
