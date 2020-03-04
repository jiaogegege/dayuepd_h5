<!--多选/单选控件，支持两种选项互斥-->
<template>
  <div class="background">
    <div class="container">
      <div class="item"
           v-for="item of oneTypeArray.concat(anotherTypeArray)"
           :key="item.value"
           @click="itemClicked(item)">
        <i class="icon mdi mdi-checkbox-marked-circle" v-if="item.selected"></i>
        <i class="icon empty" v-else></i>
        <p class="label">{{item.value}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const event = {
    selectChanged: 'selectChanged'
  };

  export default {
    name: 'PDSelectionView',
    props: {
      singleSelection: Boolean,   //是否单选，默认false
      originOneTypeArray: Array,    //一种类型的选项
      originAnotherTypeArray: Array,    //另一种类型的选项
      originSelection: Array    //被选中的项，如果有的话
    },

    data () {
      return {
        oneTypeArray: [],
        anotherTypeArray: [],
      }
    },

    created () {
      this.oneTypeArray = this.originOneTypeArray.map(item => {
        return {value: item, selected: false};
      });
      if (this.originAnotherTypeArray) {
        this.anotherTypeArray = this.originAnotherTypeArray.map(item => {
          return {value: item, selected: false};
        });
      }
    },

    computed: {
    },

    watch: {
      //设置一些项被选中
      originSelection () {
        for (let str of this.originSelection) {
          for (let item of this.oneTypeArray.concat(this.anotherTypeArray)) {
            if (item.value === str) {
              item.selected = true;
            }
          }
        }
      }
    },

    methods: {
      //选择或取消选择某个选项
      itemClicked (item) {
        if (item.selected) {
          //如果已经选中，那么取消选择
          item.selected = false;
        }
        else {
          //如果是单选，那么取消所有其它选项，选中这个选项
          if (this.singleSelection) {
            this.oneTypeArray.forEach(val => {
              val.selected = false;
            });
            this.anotherTypeArray.forEach(val => {
              val.selected = false;
            });
            item.selected = true;
          }
          else {
            //没有选中的情况
            if (this.oneTypeArray.includes(item)) {
              //另一个数组需要全部变为不选中
              this.anotherTypeArray.forEach(val => {
                val.selected = false;
              });
              //选中这个选项
              item.selected = true;
            }
            else {
              this.oneTypeArray.forEach(val => {
                val.selected = false;
              });
              item.selected = true;
            }
          }
        }

        let arr = [];
        for (item of this.oneTypeArray) {
          if (item.selected) {
            arr.push(item.value);
          }
        }
        if (!arr.length) {
          for (item of this.anotherTypeArray) {
            if (item.selected) {
              arr.push(item.value);
            }
          }
        }
        this.$emit(event.selectChanged, arr);
      },


    }

  }
</script>

<style scoped lang="less">
  .background {
    .container {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        display: flex;
        align-items: center;
        flex: auto;
        width: 140px;
        height: 35px;
        .icon {
          color: #da274d;
        }
        .empty {
          background-color: #d8d8d8;
          height: 14px;
          width: 14px;
          margin-left: 4px;
          margin-right: 6px;
          border-radius: 7px;
        }
        .mdi {
          margin-left: 4px;
          margin-right: 4px;
        }
        .label {
          margin: 0;
        }
      }
    }
  }
</style>
