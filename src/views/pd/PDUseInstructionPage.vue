<template>
  <div>
    <mu-appbar style="width:100%;" color="white" text-color="black" z-depth="0">
      <mu-button icon slot="left" @click="$router.go(-1)">
        <mu-icon value=":mdi mdi-chevron-left" color="black"></mu-icon>
      </mu-button>
      <p><b>使用说明</b></p>
      <mu-button flat slot="right" textColor="white">____</mu-button>
    </mu-appbar>
    <mu-container class="container">
      <mu-list class="list">
        <mu-divider style="height: 10px; background-color: #f7f7f7;"></mu-divider>
        <div v-for="item of dataArray" :key="item.id">
          <mu-list-item button :ripple="true" @click="clickAction(item)">
            <mu-list-item-action>
              <img :src="picHost + item.extValueTwo" :alt="item.sourceName">
            </mu-list-item-action>
            <mu-list-item-title style="font-size: 14px;">{{item.sourceName}}</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="chevron_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider class="divider" inset></mu-divider>
        </div>
      </mu-list>
    </mu-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {hosts} from "../../network/UrlDefine";

  export default {
    name: 'PDUseInstructionPage',
    data ()
    {
      return {
        picHost: '',
        dataArray: []   //数据源
      }
    },

    created ()
    {
      this.picHost = hosts.normalIconServerHost;
      //获取数据
      this.requestUserGuideList();
    },

    computed: {
      ...mapGetters([
          "getUserId"
      ])
    },

    methods: {
      //请求接口，获取使用说明列表
      requestUserGuideList ()
      {
        const loading = this.$loading();
        this.$http.getUserGuideList(this.getUserId)
            .then(res => {
              loading.close();
              this.dataArray = res;
            })
            .catch(err => {
              loading.close();
              this.$toast.error(err.message);
            });
      },

      //点击了某个item
      clickAction (item)
      {
        this.$router.push({
          name: 'PDUseInstructionDetailPage',
          params: {articleUrl: hosts.articleHost + item.extValueOne}
        });
      },
    }
  }
</script>

<style scoped lang="less">
  div {
    margin: 0;
    padding: 0;
  }
  .container {
    .list {
      height: 100vh - 10vh;
    }
  }
</style>
