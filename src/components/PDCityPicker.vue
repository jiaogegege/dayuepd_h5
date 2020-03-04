<template>
  <div class="city-picker-container">
    <div class="city-picker-bar">
      <button class="cancel btn" @click="cancelAction">取消</button>
      <p class="title">{{titleDisplay}}</p>
      <button class="confirm btn" @click="confirmAction">确定</button>
    </div>
    <div style="background-color: white;">
      <mu-slide-picker
              class="city-picker"
              :slots="slots"
              :visible-item-count="5"
              @change="valueChangeAction"
              :values="region">
      </mu-slide-picker>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cities from '../utils/city';

  const event = {
    cityPickerCancel: 'cityPickerCancel', //取消按钮
    cityPickerConfirm: 'cityPickerConfirm'  //确定按钮，返回选择的值：Array
  };

  export default {
    name: 'PDCityPicker',
    props: {
      title: String, //标题
      province: String,
      city: String,
      area: String
    },

    data () {
      return {
        selectedProvince: '',
        selectedCity: '',
        selectedArea: '',
        provinceArray: [],   //所有省数组
      }
    },

    computed: {
      //显示的标题
      titleDisplay () {
        if (!this.$util.isEmptyString(this.title)) {
          return this.title;
        }
        return '选择城市';
      },

      region () {
        return [this.selectedProvince, this.selectedCity, this.selectedArea];
      },

      //某个省下面的市数组
      cityArray () {
        if (this.provinceArray.length) {
          //如果选择了省
          let index = this.provinceArray.indexOf(this.selectedProvince);
          if (index !== -1) {
            //找到那个省下面的所有市
            return cities.citylist[index].city;
          }
          else {
            //如果没有选择省，那么返回第一个省的所有市
            return cities.citylist[0].city;
          }
        }
        return [];
      },

      //市的名字数组
      cityNameArray () {
        return this.cityArray.map(item => {
          return item.name;
        });
      },

      //某个市下面的区数组
      areaArray () {
        if (this.cityArray.length) {
          //如果选择了市
          let index = this.cityNameArray.indexOf(this.selectedCity);
          if (index !== -1) {
            //找到市下面所有的区
            return this.cityArray[index].area;
          }
          else {
            //如果没有选择市
            return this.cityArray[0].area;
          }
        }
        return [];
      },

      //选择器使用的配置数据
      slots () {
        return [
          {
            width: '100%',
            textAlign: 'right',
            values: this.provinceArray
          },
          {
            width: '100%',
            textAlign: 'center',
            values: this.cityNameArray
          },
          {
            width: '100%',
            textAlign: 'left',
            values: this.areaArray
          }
        ]
      }

    },

    created () {
      //先获得所有的省
      cities.citylist.forEach(item => {
        this.provinceArray.push(item.name);
      });
      //如果设置了初始值，那么赋值，如果没有设置初始值，默认选择第一个（什么都不做）
      if (this.province) {
        this.selectedProvince = this.province;
      }
      else {
        this.selectedProvince = this.provinceArray[0];
      }
      if (this.city) {
        this.selectedCity = this.city;
      }
      else {
        this.selectedCity = this.cityNameArray[0];
      }
      if (this.area) {
        this.selectedArea = this.area;
      }
      else {
        this.selectedArea = this.areaArray[0];
      }
    },

    methods: {
      //选择了某个东西
      valueChangeAction (value, index) {
        switch (index) {
          case 0: //选择了省
          {
            this.selectedProvince = value;
            this.selectedCity = this.cityNameArray[0];
            this.selectedArea = this.areaArray[0];
            break;
          }
          case 1:
          {
            this.selectedCity = value;
            this.selectedArea = this.areaArray[0];
            break;
          }
          case 2:
          {
            this.selectedArea = value;
            break;
          }
        }
      },

      //取消选择
      cancelAction () {
        this.$emit(event.cityPickerCancel);
      },
      //确定选择
      confirmAction () {
        this.$emit(event.cityPickerConfirm, this.region);
      }

    }

  }
</script>

<style scoped lang="less">
  .city-picker-container {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .city-picker-bar {
      height: 44px;
      width: 100%;
      background-color: rgba(249,249,249,1);
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      p {
        margin: 0;
        padding: 0;
        line-height: 44px;
      }
      .btn {
        height: 44px;
        width: 80px;
        color: #da274d;
        border: none;
        background-color: rgba(249,249,249,1);
      }
    }
    .city-picker {
      width: 100%;
    }
  }
</style>
