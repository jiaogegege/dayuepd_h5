<template>
    <div>
        <ul>
            <li v-for="(item, index) of todolist" :key="index" @click=handleClick(index)>{{item}}</li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    //自定义事件常量
    const TodoItemEvent = {
        delete: 'delete' //删除事件，回传index参数
    };

    export default {
        name: 'todo-item',
        props: {
            todolist: Array
        },
        methods: {
            handleClick (index) {
                this.$emit(TodoItemEvent.delete, index);
            }
        }
    }
</script>

<style scoped lang="less">

</style>
