<template>
  <div>
    <div id="header"><router-link to="/e"><p>返回</p></router-link></div>
    <hr>
    <div class="body" v-html="htmlStr"></div>
  </div>
</template>

<script>
  import {consts} from "../network/UrlDefine";

  export default {
    name: 'EPage',
    props: [
      'url'
    ],
    data () {
      return {
        htmlStr: ''
      }
    },
    mounted () {
      this.loadHtml(consts.ppAdmin + this.url);
    },
    methods: {
      //加载一个url的html文档
      loadHtml (url) {
        this.$http.get(url)
            .then((res) => {
              this.$toast.success('获取数据成功');
              this.htmlStr = res;
            })
            .catch(err => {
              this.$toast.error(err);
            });
      }
    }
  }
</script>

<style scoped lang="less">

</style>
