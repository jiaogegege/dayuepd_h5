import Vue from 'vue';

//左右组件通信用到的事件
const cLeftEvent = {
  selectItem: 'selectItem'  //选择某个左侧的item，参数：item的id之类
};

//新建一个Vue实例来作为左右组件传递数据的桥梁
const v = new Vue;

export {cLeftEvent, v as Msg};
