<template>
  <div>
    <h1>会员中心</h1>
    <h2><router-link to="/d/home">返回</router-link></h2>
    <div class="user-info">
      <div id="account">
        <span class="left">账号：</span>
        <span class="right">{{userInfo.account}}</span>
      </div>
      <div id="vip">
        <span class="left">VIP等级：</span>
        <span class="right">{{memberInfo}}</span>
      </div>
    </div>
    <hr>
    <!--会员打折信息-->
    <section>
      <ul>
        <li v-for="(item, index) of vipList" :key="index" class="discount">
          <div>
            <p>{{item.name}}</p>
            <div>
              <span>{{item.charge}}元</span>
              <span>/30天</span>
            </div>
            <div class="btn">
              <button @click="buy(item)">购买</button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: 'DUserCenter',
    data () {
      return {
        vipList: []
      }
    },
    mounted () {
      this.vipList = [
        {name: '普通会员', charge: '10.00', vipLevel: 0, userStatus: 0},
        {name: 'VIP1会员', charge: '50.00', vipLevel: 1, userStatus: 1},
        {name: 'VIP2会员', charge: '100.00', vipLevel: 3, userStatus: 2},
        {name: 'VIP3会员', charge: '1000.00', vipLevel: 9, userStatus: 2},
        {name: 'VIP4会员', charge: '10000.00', vipLevel: 12, userStatus: 2}
      ];
    },
    computed: {
      ...mapState(['userInfo', 'userStatus', 'vipLevel']),
      ...mapGetters(['memberInfo'])
    },
    methods: {
      buy (item) {
        this.$store.dispatch('buyVip', item)
            .then(res => {
              alert(res);
            });
      }
    }
  }
</script>

<style scoped lang="less">
  div#account, div#vip {
    text-align: left;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  span.left {
    padding: 40px;
  }
  span.right {
    padding: 40px;
  }
  ul {
    margin: 0;
    padding: 0;
    li.discount {
      margin: 50px;
      padding: 20px;
      background: linear-gradient(to bottom, #AC2466, #CA5B3F);
      list-style: none;
      border-radius: 20px;
      div {
        text-align: left;
        p {
          color: white;
        }
        div {
          span:nth-child(1) {
            font-size: 1.5rem;
            color: #E7676B;
          }
          span:nth-child(2) {
            color: khaki;
          }
        }
        div.btn {
          height: 2.5rem;
          width: 5rem;
          margin: 20px;
          text-align: center;
          line-height: 2.5rem;
          border: 1px solid white;
          button {
            color: white;
            font-size: 1rem;
          }
        }
      }
    }
  }

</style>
