<template>
  <div>
    <div class="title">热门推荐</div>
    <ul class="menu">
      <li v-for="(item, index) of items" :key="index.id" :class="{active: activeItem === item.id}" @click=handleClick(item)>{{item.display}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {cLeftEvent, Msg} from './msg.js';

  export default {
    name: 'CLeft',
    props: [],
    data () {
      return {
        items: [
          {id: 'menu_computer', display: '笔记本电脑'},
          {id: 'menu_phone', display: '手机'},
          {id: 'menu_coat', display: '服饰'},
          {id: 'menu_watch', display: '手表'},
          {id: 'menu_book', display: '书籍'},
          {id: 'menu_toy', display: '玩具'},
          {id: 'menu_homeAppliance', display:'小家电'},
          {id: 'menu_study', display: '学习用品'},
          {id: 'menu_office', display: '办公用品'},
          {id: 'menu_travel', display: '旅游必备'},
          {id: 'menu_game', display: '游戏卡通'}
        ],
        activeItem: ''
      }
    },
    methods: {
      //选择条目后的事件，将值传给外部
      handleClick (value) {
        //首先修改界面显示效果
        this.activeItem = value.id;
        Msg.$emit(cLeftEvent.selectItem, value);
      }
    },
    mounted () {
      let _this = this;
      setTimeout(function () {
        _this.activeItem = _this.items[0].id;
        Msg.$emit(cLeftEvent.selectItem, _this.items[0]);
      }, 500);
    }
  }
</script>

<style scoped lang="less">
  @line-height: 40px;

  .active {
    background: #fd7522;
    color: white;
  }
  .title {
    width: 100px;
    color: red;
    height: @line-height;
    line-height: @line-height;
  }
  .menu {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      height: @line-height;
      margin-bottom: 1px;
      /*background-color: white;*/
      line-height: @line-height;
      cursor: pointer;
      &:hover {
        background: #fd7522;
        color: white;
      }
    }
  }
</style>
