<template>
  <div>
    <h1>首页</h1>
    <p>你好，尊敬的
    <span style="color: red;">{{memberInfo}}</span>，欢迎来到慕课网
    </p>
    <div class="course" v-for="(item, index) of courseList" :key="index" @click="gotoCourseDetail(item)">{{item.title}}</div>
    <button class="btn" @click="gotoUserCenter">充值</button>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: 'DHome',
    data () {
      return {
        courseList: []
      };
    },
    mounted () {
      this.courseList = [
        {id: '1', title: '基础课程', charge: '基础课程', userStatus: 0, vipLevel: 0},
        {id: '2', title: '实战课程', charge: '实战课程', userStatus: 1, vipLevel: 1},
        {id: '3', title: '高级VIP课程', charge: '高级VIP课程', userStatus: 2, vipLevel: 12}
      ];
    },
    computed: {
      ...mapState({
        userInfo: 'userInfo',
        userStatus: 'userStatus',
        vipLevel: 'vipLevel'
      }),
      ...mapGetters(['memberInfo'])
    },
    methods: {
      //判断用户等级是否足够
      checkPermission (item) {
        return (this.userStatus >= item.userStatus && this.vipLevel >= item.vipLevel);
      },

      gotoCourseDetail (item) {
        let result = this.checkPermission(item);
        if (result) {
          this.$router.push({
            name: 'DCourse',
            params: {
              id: item.id
            }
          });
        }
        else {
          alert('权限不足，请购买权限');
        }
      },

      gotoUserCenter () {
        this.$router.push('/d/usercenter');
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   next(vm => {
    //     if (!vm.userInfo) {
    //       //导航到登陆页
    //       next({path: '/d/login'});
    //     }
    //   });
    // }
  }
</script>

<style scoped lang="less">
  @height: 200px;
  .course {
    width: 88%;
    height: @height;
    background-color: lightgray;
    margin: 50px;
    line-height: @height;
  }
  .btn {
    width: 400px;
    height: @height / 2;
    background-color: black;
    color: white;
    font-size: 1.1rem;
  }
</style>
