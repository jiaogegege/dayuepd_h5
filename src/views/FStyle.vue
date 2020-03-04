<template>
  <div>
    <div id="header"><router-link to="/"><p>返回</p></router-link></div>
    <hr>
    <div class="color animated swing slow">
      <mu-button class="demo-color-btn" color="primary"> primary </mu-button>
      <mu-button class="demo-color-btn" color="secondary"> secondary </mu-button>
      <mu-button class="demo-color-btn" color="success"> success </mu-button>
      <mu-button class="demo-color-btn" color="warning"> warning </mu-button>
      <mu-button class="demo-color-btn" color="info"> info </mu-button>
      <mu-button class="demo-color-btn" color="error"> error </mu-button>
      <mu-button class="demo-color-btn" color="indigo400"> indigo400 </mu-button>
      <mu-button class="demo-color-btn" color="#1565c0"> Custom </mu-button>
    </div>
    <hr>
    <div class="icon">
      <mu-flex justify-content="center" align-items="center" wrap="wrap" class="icon-flex-wrap">
        <mu-button color="primary">
          ACCEPT
          <mu-icon value="check_circle" right></mu-icon>
        </mu-button>
        <mu-button color="red">
          DECLINE
          <mu-icon value="block" right></mu-icon>
        </mu-button>
        <mu-button color="darkBlack">
          <mu-icon value="remove_circle" left></mu-icon>CANCEL
        </mu-button>
        <mu-button color="orange">
          <mu-icon value="arrow_back" left></mu-icon>BACK
        </mu-button>
        <mu-button color="purple">
          <mu-icon value="build"></mu-icon>
        </mu-button>
        <mu-button color="indigo">
          <mu-icon value="backup"></mu-icon>
        </mu-button>
        <mu-button color="blue" icon>
          <mu-icon value="thumb_up"></mu-icon>
        </mu-button>
        <mu-button color="red" icon>
          <mu-icon value="thumb_down"></mu-icon>
        </mu-button>
      </mu-flex>
    </div>
    <hr>
    <div class="layout">
      <mu-flex class="flex-wrapper" justify-content="start" wrap="wrap">
        <mu-flex class="flex-demo" justify-content="center" >left</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" justify-content="center">
        <mu-flex class="flex-demo" justify-content="center" >center</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" justify-content="end">
        <mu-flex class="flex-demo" justify-content="center" >right</mu-flex>
      </mu-flex>
      <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>fill</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>fill</mu-flex>
        <mu-flex class="flex-demo" justify-content="center" fill>fill</mu-flex>
      </mu-flex>
    </div>
    <hr>
    <div class="grid">
      <mu-container class="demo-container is-stripe">
        <mu-row gutter>
          <mu-col span="12"><div class="grid-cell"></div></mu-col>
        </mu-row>
        <mu-row gutter>
          <mu-col span="6"><div class="grid-cell"></div></mu-col>
          <mu-col span="6"><div class="grid-cell"></div></mu-col>
        </mu-row>
        <mu-row gutter>
          <mu-col span="4"><div class="grid-cell"></div></mu-col>
          <mu-col span="4"><div class="grid-cell"></div></mu-col>
          <mu-col span="4"><div class="grid-cell"></div></mu-col>
        </mu-row>
        <mu-row gutter>
          <mu-col span="3"><div class="grid-cell"></div></mu-col>
          <mu-col span="3"><div class="grid-cell"></div></mu-col>
          <mu-col span="3"><div class="grid-cell"></div></mu-col>
          <mu-col span="3"><div class="grid-cell"></div></mu-col>
        </mu-row>
        <mu-row gutter>
          <mu-col span="2"><div class="grid-cell"></div></mu-col>
          <mu-col span="2"><div class="grid-cell"></div></mu-col>
          <mu-col span="2"><div class="grid-cell"></div></mu-col>
          <mu-col span="2"><div class="grid-cell"></div></mu-col>
          <mu-col span="2"><div class="grid-cell"></div></mu-col>
          <mu-col span="2"><div class="grid-cell"></div></mu-col>
        </mu-row>
      </mu-container>
    </div>
    <hr>
    <div class="transition">
      <mu-container>
        <mu-button @click="show2 = !show2">Click Me</mu-button>
        <mu-flex class="mu-transition-row">
          <mu-slide-top-transition>
            <div class="mu-transition-box mu-primary-color mu-inverse" v-show="show2">mu-slide-top-transition</div>
          </mu-slide-top-transition>
          <mu-slide-bottom-transition>
            <div class="mu-transition-box mu-primary-color mu-inverse" v-show="show2">mu-slide-bottom-transition</div>
          </mu-slide-bottom-transition>
        </mu-flex>
        <mu-flex class="mu-transition-row">
          <mu-slide-left-transition>
            <div class="mu-transition-box mu-primary-color mu-inverse" v-show="show2">mu-slide-left-transition</div>
          </mu-slide-left-transition>
          <mu-slide-right-transition>
            <div class="mu-transition-box mu-primary-color mu-inverse" v-show="show2">mu-slide-right-transition</div>
          </mu-slide-right-transition>
        </mu-flex>
      </mu-container>
    </div>
    <hr>
    <div class="elevation">
      <mu-container>
        <mu-flex wrap="wrap" justify-content="between" align-items="center">
          <mu-slider :max="24" v-model="elevation" :step="1" style="width: 400px;"></mu-slider>
          <div v-elevation="elevation" style="width: 300px; height: 200px; background-color: #fff;"></div>
        </mu-flex>
      </mu-container>
    </div>
    <hr>
    <div class="ripple">
      <mu-ripple class="mu-ripple-demo demo-1">
        Click Me
      </mu-ripple>
      <mu-ripple class="mu-ripple-demo demo-2" color="yellow" :opacity="0.7">
        Click Me
      </mu-ripple>
      <mu-ripple class="mu-ripple-demo demo-3" color="red" :opacity="0.5">
        Click Me
      </mu-ripple>
    </div>
    <hr>
    <div class="toast">
      <mu-button class="demo-button" @click="$toast.message('Hello World')" color="primary">message</mu-button>
      <mu-button class="demo-button" @click="$toast.success('Hello World')" color="success">success</mu-button>
      <mu-button class="demo-button" @click="$toast.warning('Hello World')" color="warning">warning</mu-button>
      <mu-button class="demo-button" @click="$toast.info('Hello World')" color="info">info</mu-button>
      <mu-button class="demo-button" @click="$toast.error('Hello World')" color="error">error</mu-button>
    </div>
    <hr>
    <div class="loading">
      <mu-container data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading2" class="demo-loading-wrap">
        <mu-button color="primary" @click="loading()">区域加载</mu-button>
        <mu-button color="secondary" v-loading="loading1" data-mu-loading-size="24" @click="loading1 = !loading1">按钮加载</mu-button>
        <mu-button color="teal" @click="fullscreen()">全屏加载</mu-button>
      </mu-container>
    </div>
    <hr>
    <div class="progress">
      <mu-container class="nprogress-wrap">
        <mu-button color="primary" @click="$progress.start()">start</mu-button>
        <mu-button color="secondary" @click="$progress.done()">Done</mu-button>
      </mu-container>
    </div>
    <hr>
    <div class="message">
      <mu-container>
        <mu-button class="demo-button" color="primary" @click="alert()">Alert</mu-button>
        <mu-button class="demo-button" color="secondary" @click="confirm()">Confirm</mu-button>
        <mu-button class="demo-button" color="teal" @click="prompt()">Prompt</mu-button>
      </mu-container>
    </div>
    <hr>
    <mu-container>
      <mu-bottom-nav>
        <mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
    <hr>
    <div class="chip">
      <mu-container class="demo-chip-wrapper">
        <mu-chip class="demo-chip">
          default chip
        </mu-chip>
        <mu-chip class="demo-chip" @delete="handleClose" delete>
          delete chip
        </mu-chip>
        <mu-chip class="demo-chip" color="red">
          <mu-avatar :size="32">
            <img src="../assets/logo.png" alt="">
          </mu-avatar>
          avatar chip
        </mu-chip>
        <mu-chip class="demo-chip" color="green" @delete="handleClose" delete>
          <mu-avatar :size="32">
            <img src="../assets/logo.png" alt="">
          </mu-avatar>
          avatar delete chip
        </mu-chip>
        <mu-chip class="demo-chip" color="teal" @delete="handleClose" delete>
          <mu-avatar :size="32" color="blue">
            <mu-icon value="face"></mu-icon>
          </mu-avatar>
          icon avatar chip
        </mu-chip>

        <mu-chip class="demo-chip" color="blue300" @delete="handleClose" delete>
          <mu-avatar text-color="blue300" color="indigo900" :size="32">MB</mu-avatar> custom chip
        </mu-chip>
      </mu-container>
    </div>

  </div>
</template>

<script>
  import theme from 'muse-ui/lib/theme';
  import * as colors from 'muse-ui/lib/theme/colors';

  theme.add('custom-theme', {
    primary: colors.indigo,
    secondary: '#ff4081'
  });
  theme.use('custom-theme');

  export default {
    name: 'FStyle',
    data () {
      return {
        show2: true,
        elevation: 4,
        loading1: false,
        loading2: false
      };
    },
    methods: {
      alert () {
        this.$alert('Hello World', '提示', {
          okLabel: '知道了'
        }).then(() => {
          this.$toast.message('提示信息');
        });
      },
      confirm () {
        this.$confirm('确定要删除？', '提示', {
          type: 'warning'
        }).then(({ result }) => {
          if (result) {
            this.$toast.message('点击了确定');
          } else {
            this.$toast.message('点击了取消');
          }
        });
      },
      prompt () {
        this.$prompt('请输入邮箱', '提示', {
          validator (value) {
            return {
              valid: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value),
              message: '请输入正确邮箱格式'
            }
          }
        }).then(({ result, value }) => {
          if (result) {
            this.$toast.message('你输入的邮箱：' + value);
          } else {
            this.$toast.message('点击了取消');
          }
        });
      },
      loading () {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
        }, 2000)
      },
      fullscreen () {
        const loading = this.$loading();
        setTimeout(() => {
          loading.close();
        }, 2000)
      },
      handleClose () {
        window.alert('你点击了删除按钮')
      }
    }
  }
</script>

<style scoped lang="less">
  .demo-color-btn {
    height: 100px;
    margin: 8px;
  }

  .icon-flex-wrap .mu-button {
    height: 2rem;
    margin: 6px 8px;
  }

  .flex-wrapper {
    width: 100%;
    height: 56px;
    margin-top: 8px;
    .flex-demo {
      width: 200px;
      height: 32px;
      background-color: #e0e0e0;
      text-align: center;
      line-height: 32px;
      margin-left: 8px;
      &:first-child {
        margin-left: 0;
      }
    }
    &:first-child {
      margin-top: 0;
    }
  }

  .demo-container {
    .row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .grid-cell {
      border-radius: 4px;
      height: 36px;
      background: rgba(128, 255, 255, 0.8);
    }
  }
  .demo-container.is-stripe .col:nth-child(2n) .grid-cell{
    background: rgba(0, 0, 0, 0.54);
  }

  .mu-transition-row {
    margin-top: 16px;
    height: 100px;
  }
  .mu-transition-box {
    min-width: 200px;
    height: 100px;
    margin-right: 16px;
    border-radius: 4px;
    padding: 0 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mu-ripple-demo {
    position: relative;
    width: 400px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    background-color: #fff;
    border-radius: 4px;
    &.demo-1 {
      color: #2196f3;
      border: 1px solid #2196f3;
    }
    &.demo-2 {
      background-color: #2196f3;
      color: #fff;
    }
    &.demo-3 {
      background-color: #4caf50;
      color: #fff;
    }
  }

  .demo-button {
    height: 100px;
    margin: 6px 8px;
  }

  .demo-loading-wrap {
    height: 300px;
    position: relative;
    .mu-button {
      margin: 6px 8px;
    }
  }

  .nprogress-wrap .mu-button{
    margin: 6px 8px;
  }

  .demo-chip-wrapper {
    text-align: center;
  }
  .demo-chip {
    margin: 8px;
    vertical-align: middle;
  }

</style>
