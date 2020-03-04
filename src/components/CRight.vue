<template>
  <div>
    <div v-if="goods.length">
      <GoodsList :goods="goods"></GoodsList>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {cLeftEvent, Msg} from './msg.js';
  import GoodsList from './GoodsList';

  export default {
    name: 'CRight',
    props: [],
    data () {
      return {
        value: null,
        goods: []
      }
    },
    methods: {
      //根据item获取商品列表
      getGoods (value) {
        let array = [];
        for (let i = 0; i < 20; ++i) {
          let id = i;   //id
          let des = value.id;   //描述
          let img = `images/${value.id}.png`; //图片路径
          let title = value.display;    //标题
          array.push({id, des, img, title});
        }
        return array;
      }
    },
    mounted () {
      let _this = this;
      Msg.$on(cLeftEvent.selectItem, function (value) {
        _this.value = value;
        //创建商品数组
        _this.goods = _this.getGoods(value);
      });
    },
    components: {
      GoodsList
    }
  }
</script>

<style scoped lang="less">

</style>
