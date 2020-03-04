<template>
    <div>
        <h1>我是A1</h1>
        <p><router-link to="/a">返回上一级</router-link></p>
        <p><router-link to="/">返回首页</router-link></p>
        <p><router-link to="/a1/a1-1">跳转A1-1</router-link></p>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        path: '/a1',
        name: 'A1'
    };
</script>

<style scoped lang="less">
    div {
        background: lightblue;
    }
</style>
