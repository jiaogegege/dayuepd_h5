<template>
  <div class="background">
    <mu-appbar class="appbar" title="完善个人信息" style="width:100%;" color="rgba(0,0,0,0)" z-depth="0"></mu-appbar>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <mu-flex class="name" direction="column" align-items="center">
          <p>姓名</p>
          <input class="name-text text-field"
                 color="primary"
                 v-model="name"
                 placeholder="请输入您的姓名">
          <mu-divider class="line"></mu-divider>
        </mu-flex>
        <mu-flex class="birthday" direction="column" align-items="center">
          <p>出生日期</p>
          <input class="birthday-text text-field"
                 color="primary"
                 :value="birthdayDisplay"
                 readonly
                 @click="showBirthdayPicker = true"
                 placeholder="请选择您的出生年月日">
          <mu-divider class="line"></mu-divider>
        </mu-flex>
        <mu-flex class="sex" direction="column" align-items="center">
          <p>性别</p>
          <input class="sex-text text-field"
                 color="primary"
                 :value="sex"
                 readonly
                 @click="showSexPicker = true"
                 placeholder="请选择您的性别">
          <mu-divider class="line"></mu-divider>
        </mu-flex>
        <mu-flex class="region" direction="column" align-items="center">
          <p>城市</p>
          <input class="region-text text-field"
                 color="primary"
                 :value="region"
                 readonly
                 @click="showRegionPicker = true"
                 placeholder="请选择您所在的城市">
          <mu-divider class="line"></mu-divider>
        </mu-flex>
        <mu-flex class="height" direction="column" align-items="center">
          <p>身高</p>
          <input class="height-text text-field"
                 color="primary"
                 :value="height ? height + 'cm' : ''"
                 readonly
                 @click="showHeightPicker = true"
                 placeholder="请选择您的身高">
          <mu-divider class="line"></mu-divider>
        </mu-flex>
        <mu-flex class="weight" direction="column" align-items="center">
          <p>体重</p>
          <input class="weight-text text-field"
                 color="primary"
                 :value="weight ? weight + 'kg' : ''"
                 readonly
                 @click="showWeightPicker = true"
                 placeholder="请选择您的体重">
          <mu-divider class="line"></mu-divider>
        </mu-flex>
        <mu-flex class="abdomen" direction="column" align-items="center">
          <p>腹围</p>
          <input class="abdomen-text text-field"
                 color="primary"
                 :value="abdomen ? abdomen + 'cm' : ''"
                 readonly
                 @click="showAbdomenPicker = true"
                 placeholder="请选择您的腹围">
          <mu-divider class="line"></mu-divider>
        </mu-flex>
      </mu-flex>
    </mu-container>
    <mu-flex class="btn">
      <mu-button class="next-btn"
                 @click="nextAction"
                 :color="btnActive ? 'primary' : 'secondary'"
                 :disabled="!btnActive">下一步
      </mu-button>
    </mu-flex>
    <!--生日选择器-->
    <date-picker class="birthday-picker"
                 v-if="showBirthdayPicker"
                 @datePickerCancel="showBirthdayPicker = false"
                 @datePickerConfirm="selectBirthdayAction"
                 :origin-date="birthday ? new Date(birthday) : new Date('1990/01/01')">
    </date-picker>
    <!--性别选择器-->
    <common-picker class="sex-picker"
                   v-if="showSexPicker"
                   :title="'选择性别'"
                   :data-array="$util.getSexArray()"
                   :origin-value="sex ? [sex] : ['女']"
                   @pickerCancel="showSexPicker = false"
                   @pickerConfirm="selectSexAction">
    </common-picker>
    <!--城市选择器-->
    <region-picker class="region-picker"
                   v-if="showRegionPicker"
                   :province="province"
                   :city="city"
                   :area="area"
                   @cityPickerCancel="showRegionPicker = false"
                   @cityPickerConfirm="selectRegionAction">
    </region-picker>
    <!--身高选择器-->
    <common-picker class="height-picker"
                   v-if="showHeightPicker"
                   :title="'选择身高'"
                   :data-array="$util.getHeightArray()"
                   :origin-value="height ? [height] : ['160']"
                   @pickerCancel="showHeightPicker = false"
                   @pickerConfirm="selectHeightAction">
    </common-picker>
    <!--体重选择器-->
    <common-picker class="weight-picker"
                   v-if="showWeightPicker"
                   :title="'选择体重'"
                   :data-array="$util.getWeightArray()"
                   :origin-value="weight ? [weight] : ['50']"
                   @pickerCancel="showWeightPicker = false"
                   @pickerConfirm="selectWeightAction">
    </common-picker>
    <!--腹围选择器-->
    <common-picker class="abdomen-picker"
                   v-if="showAbdomenPicker"
                   :title="'选择腹围'"
                   :data-array="$util.getAbdomenArray()"
                   :origin-value="abdomen ? [abdomen] : ['60']"
                   @pickerCancel="showAbdomenPicker = false"
                   @pickerConfirm="selectAbdomenAction">
    </common-picker>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import {strMacros} from "../../utils/consts";
  import PDDatePicker from '../../components/PDDatePicker';
  import PDSlidePicker from '../../components/PDSlidePicker';
  import PDCityPicker from '../../components/PDCityPicker';

  export default {
    name: 'PDFillBasicInfoPage',

    components: {
      'date-picker': PDDatePicker,
      'common-picker': PDSlidePicker,
      'region-picker': PDCityPicker
    },

    data () {
      return {
        name: '',
        birthday: '',
        sex: '',
        area: '',
        city: '',
        province: '',
        height: '',
        weight: '',
        abdomen: '',

        //是否显示相关选择器
        showBirthdayPicker: false,
        showSexPicker: false,
        showRegionPicker: false,
        showHeightPicker: false,
        showWeightPicker: false,
        showAbdomenPicker: false,

        //用户是否是更新信息
        updateUserInfo: false,
      }
    },

    computed: {
      //日期计算属性
      birthdayDisplay () {
        return this.$util.formatDateToLocalString(this.birthday);
      },
      //城市计算属性
      region () {
        return this.province + this.city + this.area;
      },

      //下一步按钮是否可点
      btnActive() {
        return !this.$util.isEmptyString(this.name) && !this.$util.isEmptyString(this.birthday) && !this.$util.isEmptyString(this.sex) && !this.$util.isEmptyString(this.province) && !this.$util.isEmptyString(this.city) && !this.$util.isEmptyString(this.area) && !this.$util.isEmptyString(this.height) && !this.$util.isEmptyString(this.weight) && !this.$util.isEmptyString(this.abdomen);
      },

      ...mapGetters([
          "getUserId",
          "getUserInfo"
      ])
    },

    created () {
      this.updateUserInfo = this.$route.params.updateUserInfo || this.updateUserInfo;

      //从缓存中获取个人基础信息
      this.name = this.$util.getUnEmptyString(this.getUserInfo.realName);
      this.birthday = this.$util.getUnEmptyString(this.getUserInfo.birthDate);
      this.sex = this.$util.getUnEmptyString(this.getUserInfo.sex);
      this.province = this.$util.getUnEmptyString(this.getUserInfo.province);
      this.city = this.$util.getUnEmptyString(this.getUserInfo.city);
      this.area = this.$util.getUnEmptyString(this.getUserInfo.area);
      this.height = this.$util.getUnEmptyString(this.getUserInfo.height);
      this.weight = this.$util.getUnEmptyString(this.getUserInfo.weight);
      this.abdomen = this.$util.getUnEmptyString(this.getUserInfo.abdominalCir);

    },

    methods: {
      //选择了生日
      selectBirthdayAction (date) {
        this.birthday = date.Format(strMacros.dateFormatSlash);
        this.showBirthdayPicker = false;
      },

      //选择了性别
      selectSexAction (values) {
        this.sex = values[0];
        this.showSexPicker = false;
      },

      //选择地区
      selectRegionAction (values) {
        this.province = values[0];
        this.city = values[1];
        this.area = values[2];
        this.showRegionPicker = false;
      },

      selectHeightAction (values) {
        this.height = values[0];
        this.showHeightPicker = false;
      },

      selectWeightAction (values) {
        this.weight = values[0];
        this.showWeightPicker = false;
      },

      selectAbdomenAction (values) {
        this.abdomen = values[0];
        this.showAbdomenPicker = false;
      },

      //下一步按钮
      nextAction () {
        this.name = this.name.trim();
        if (!this.btnActive) {
          this.$toast.warning(strMacros.haveUnfilledHint);
        }
        else {
          //检查名字格式
          if (!this.$util.checkNameFormat(this.name)) {
            this.$toast.error(strMacros.nameFormatErrorHint);
          }
          else {
            //检查敏感词
            if (!this.$util.checkSensitiveWords(this.name)) {
              this.$toast.error(strMacros.nameSensitiveErrorHint);
            }
            else {
              //提交接口
              //userId/realName/height/weight/birthDate/sex/abdominalCir/province/city/area
              let userInfo = {
                userId: this.getUserId,
                realName: this.name,
                height: this.height,
                weight: this.weight,
                birthDate: this.birthday,
                sex: this.sex,
                abdominalCir: this.abdomen,
                province: this.province,
                city: this.city,
                area: this.area
              };
              const loading = this.$loading();
              this.$http.perfectBasicUserInfo(userInfo, '0')
                  .then(res => {
                    loading.close();
                    //保存用户信息
                    this.setUserInfo(res.dayueAppUser);
                    this.setUserConfigInfo(res.dayueAppUserConfig);
                    //界面跳转，根据性别跳转不同的界面
                    if (this.sex === strMacros.sexMale) {
                      this.$router.push({
                        name: 'PDFillMaleQosPage',
                        params: {updateUserInfo: this.updateUserInfo}
                      });
                    }
                    else {
                      this.$router.push({
                        name: 'PDFillFemaleStatusPage',
                        params: {updateUserInfo: this.updateUserInfo}
                      });
                    }
                  })
                  .catch(err => {
                    loading.close();
                    this.$toast.error(err.message);
                  });
            }
          }
        }
      },

      ...mapMutations([
          "setUserInfo",
          "setUserConfigInfo"
      ]),

      ...mapActions([
          "getAllQuestions"
      ])

    }

  }
</script>

<style scoped lang="less">
  .line {
    margin-bottom: 10px;
  }
  .text-field {
    font-size: 25px;
    text-align: center;
    outline-style: none;
    border: 0;
    caret-color: #da274d;
  }

  .background {
    background: linear-gradient(#5B5B7B, #2C2C3C);
    .container {
      overflow: scroll;
      height: 100vh - 20.4vh;
      color: #2C2C3C;
      margin: 0;
      padding: 0;
      p {
        font-size: 18px;
        font-weight: bold;
      }
      .wrapper {
        background-color: white;
        border-radius: 13px;
        margin: 20px 20px 0 20px;
        padding-bottom: 20px;
      }
    }
    .next-btn {
      margin-top: 30px;
      color: white;
      width: 100%;
      height: 50px;
      font-size: 18px;
      font-weight: bold;
      border-radius: 0;
    }
  }
</style>
