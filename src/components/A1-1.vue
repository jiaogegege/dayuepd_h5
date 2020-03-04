<template>
    <div>
        <h1>这里是A1-1</h1>
        <p><router-link to="/a1">返回A1</router-link></p>
    </div>
</template>

<script>
    export default {
        path: '/a1/a1-1',
        name: 'A1-1'
    };
</script>

<style scoped lang="less">
    div {
        background: lightcoral;
    }
</style>
