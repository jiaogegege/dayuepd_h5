<template>
    <div>
        <h1 v-bind:title="title">{{ msg }}</h1>
        <p v-text="msg" v-on:click="handleClick"></p>
        <p v-html="msg"></p>
        <label><input type="text" v-model="content"></label>
        <p>{{content}}</p>
        <br>
        <p>姓名：{{fullName}}</p>
        <label>姓：<input type="text" v-model="firstName"></label>
        <label>名：<input type="text" v-model="lastName"></label>
        <p>次数：{{count}}</p>
        <p v-show="flag">Hello World</p>
        <button @click="handleShow">toggle</button>
        <ul>
            <li v-for="(item, index) in items" :key="index">{{item}}</li>
        </ul>
        <p><router-link to="/">返回</router-link></p>
        <p><router-link to="/a1">转向A1</router-link></p>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        path: '/a',   //路由路径常量
        name: 'A',
        data () {
            return {
                msg: '我是A页面...哈哈',
                flag: true,
                title: '这是一个title',
                content: 'content',
                firstName: '',
                lastName: '',
                count: 0,
                items: [1, 2, 3, 4, 5]
            };
        },
        methods: {
            handleClick () {
                if (this.flag) {
                    this.msg = '这是什么';
                    this.flag = false;
                } else {
                    this.msg = '我是A页面...哈哈';
                    this.flag = true;
                }
            },
            handleShow () {
                this.flag = !this.flag;
            }
        },
        computed: {
            fullName () {
                return this.firstName + this.lastName;
            }
        },
        watch: {
            firstName: function () {
                this.count++;
            },
            lastName: function () {
                this.count++;
            }
        }
    };
</script>

<style scoped lang="less">
  div {
    width: 750px;
    background: yellow;
  }
</style>
