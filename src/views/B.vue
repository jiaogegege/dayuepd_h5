<template>
  <div class="view">
    <h1> 我是B页面。。。</h1>
    <p><router-link to="/">返回</router-link></p>
    <h2>todolist</h2>
    <div id="todolist">
      <label for="todolist"><input type="text" v-model="inputValue" /></label>
      <button @click="buttonClick">提交</button>
      <!--<ul>-->
      <!--<li v-for="(item, index) of todolist" :key="index">{{item}}</li>-->
      <!--</ul>-->
      <todo-item :todolist="todolist" @delete="handleDelete"></todo-item>
    </div>
  </div>
</template>

<script>
  import TodoItem from '@/components/TodoItem';

  export default {
    path: '/b',
    name: 'B',
    data () {
      return {
        inputValue: '',
        todolist: []
      };
    },
    components: {
      'todo-item': TodoItem
    },
    methods: {
      buttonClick () {
        this.todolist.push(this.inputValue);
        this.inputValue = '';

        //调用接口
        this.$http.loginPhoneAndPsd('18550480576', 'Qqqq111@')
            .then(res => {
                // console.log(res);
            });
      },

      handleDelete (index) {
        this.todolist.splice(index, 1);
      }
    }
  };
</script>

<style scoped lang="less">
  div.view {
    #todolist {
      text-align: left;
    }
    width: 750px;
    background: yellow;
  }
</style>
