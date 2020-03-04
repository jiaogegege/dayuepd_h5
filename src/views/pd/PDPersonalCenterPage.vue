<template>
  <div>
    <mu-container class="container">
      <mu-flex class="wrapper" direction="column" align-items="center">
        <!--导航栏-->
        <div class="app-bar" style="height: 56px; width: 100%;">
          <mu-appbar class="appbar"
                     title="完善个人信息"
                     color="white"
                     text-color="black"
                     z-depth="0">
            <mu-button icon slot="left" @click="backAction">
              <mu-icon value=":mdi mdi-chevron-left" color="#2c2c3d"></mu-icon>
            </mu-button>
            <p>用户信息</p>
            <mu-button flat slot="right"
                       textColor="#da274d"
                       v-if="showSave"
                       @click="saveAction(false)"
                       style="font-size: 18px;">保存
            </mu-button>
            <mu-button v-else flat slot="right" text-color="white">____</mu-button>
          </mu-appbar>
        </div>
        <!--内容区域-->
        <mu-flex class="content" direction="column" align-items="center">
          <div class="avatar list-item" @click="avatarAction">
            <div class="item-left">
              <p>头像</p>
            </div>
            <div class="item-right">
              <mu-avatar size="38" class="item-right-left"><img :src="avatar" alt=""></mu-avatar>
              <i class="mdi mdi-chevron-right"></i>
            </div>
            <input type="file" name="avatar-input" class="avatar-input" @click="avatarAction" @change="selectAvatarAction" accept="image/*">
          </div>
          <!--分割线-->
          <mu-divider style="background-color: #e5e5e5;"></mu-divider>
          <div class="name list-item">
            <div class="item-left">
              <p>姓名</p>
            </div>
            <div class="item-right">
              <input class="item-right-left"
                     :value="name"
                     @input="nameChanged($event.target.value)"
                     style="text-align: right; outline: none; caret-color: #da274d; border: none;">
              <i class="mdi mdi-chevron-right"></i>
            </div>
          </div>
          <div class="sex list-item" @click="sexAction">
            <div class="item-left">
              <p>性别</p>
            </div>
            <div class="item-right">
              <p class="item-right-left">{{sex}}</p>
              <i class="mdi mdi-chevron-right" style="color: white;"></i>
            </div>
          </div>
          <div class="height list-item" @click="showHeightPicker = true">
            <div class="item-left">
              <p>身高</p>
            </div>
            <div class="item-right">
              <p class="item-right-left">{{height !== $str.noneDisplay ? height + 'cm' : $str.noneDisplay}}</p>
              <i class="mdi mdi-chevron-right"></i>
            </div>
          </div>
          <div class="weight list-item" @click="showWeightPicker = true">
            <div class="item-left">
              <p>体重</p>
            </div>
            <div class="item-right">
              <p class="item-right-left">{{weight !== $str.noneDisplay ? weight + 'kg' : $str.noneDisplay}}</p>
              <i class="mdi mdi-chevron-right"></i>
            </div>
          </div>
          <div class="abdominal list-item" style="margin-bottom: 5px;" @click="showAbdomenPicker = true">
            <div class="item-left">
              <p>腹围</p>
            </div>
            <div class="item-right">
              <p class="item-right-left">{{abdominal !== $str.noneDisplay ? abdominal + 'cm' : $str.noneDisplay}}</p>
              <i class="mdi mdi-chevron-right"></i>
            </div>
          </div>
          <!--分割线-->
          <mu-divider style="background-color: #e5e5e5;"></mu-divider>
          <div class="city list-item" @click="showRegionPicker = true">
            <div class="item-left">
              <p>所在城市</p>
            </div>
            <div class="item-right">
              <p class="item-right-left">{{province + city + area}}</p>
              <i class="mdi mdi-chevron-right"></i>
            </div>
          </div>
          <div class="birthday list-item" style="margin-bottom: 5px;" @click="showBirthdayPicker = true">
            <div class="item-left">
              <p>出生日期</p>
            </div>
            <div class="item-right">
              <p class="item-right-left">{{$util.formatDateToLocalString(new Date(birthday))}}</p>
              <i class="mdi mdi-chevron-right"></i>
            </div>
          </div>
          <!--分割线-->
          <mu-divider style="background-color: #e5e5e5;"></mu-divider>
          <div class="more-info list-item" @click="moreInfoAction">
            <div class="item-left">
              <p>更多完整信息</p>
            </div>
            <div class="item-right">
              <p class="item-right-left"></p>
              <i class="mdi mdi-chevron-right"></i>
            </div>
          </div>
        </mu-flex>
      </mu-flex>
    </mu-container>
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
                   :origin-value="abdominal ? [abdominal] : ['60']"
                   @pickerCancel="showAbdomenPicker = false"
                   @pickerConfirm="selectAbdomenAction">
    </common-picker>
    <!--生日选择器-->
    <date-picker class="birthday-picker"
                 v-if="showBirthdayPicker"
                 @datePickerCancel="showBirthdayPicker = false"
                 @datePickerConfirm="selectBirthdayAction"
                 :origin-date="birthday ? new Date(birthday) : new Date('1990/01/01')">
    </date-picker>
    <!--城市选择器-->
    <region-picker class="region-picker"
                   v-if="showRegionPicker"
                   :province="province"
                   :city="city"
                   :area="area"
                   @cityPickerCancel="showRegionPicker = false"
                   @cityPickerConfirm="selectRegionAction">
    </region-picker>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import {hosts} from "../../network/UrlDefine";
  import PDDatePicker from '../../components/PDDatePicker';
  import PDSlidePicker from '../../components/PDSlidePicker';
  import PDCityPicker from '../../components/PDCityPicker';

  export default {
    name: 'PDPersonalCenterPage',

    components: {
      'date-picker': PDDatePicker,
      'common-picker': PDSlidePicker,
      'region-picker': PDCityPicker
    },

    data() {
      return {
        showSave: false,    //是否显示保存按钮
        avatar: require('@/assets/user_head.png'),  //本地默认头像
        name: this.$str.noneDisplay,
        sex: this.$str.noneDisplay,
        height: this.$str.noneDisplay,
        weight: this.$str.noneDisplay,
        abdominal: this.$str.noneDisplay,
        province: this.$str.noneDisplay,
        city: this.$str.noneDisplay,
        area: this.$str.noneDisplay,
        birthday: this.$str.noneDisplay,

        //是否显示相关选择器
        showBirthdayPicker: false,
        showRegionPicker: false,
        showHeightPicker: false,
        showWeightPicker: false,
        showAbdomenPicker: false,

      }
    },

    computed: {
      ...mapGetters([
        "getUserInfo",
        "getUserId",
        "getUserQosArray"
      ])
    },

    created () {
      if (this.getUserId) {
        //获取基础信息
        // const loading = this.$loading();
        this.getUserBasicInfo()
            .then(res => {
              // loading.close();
              //获取头像和个人信息
              this.avatar = hosts.headPicHost + this.getUserInfo.id + '.png';
              this.name = this.getUserInfo.realName;
              this.sex = this.getUserInfo.sex;
              this.height = this.getUserInfo.height;
              this.weight = this.getUserInfo.weight;
              this.abdominal = this.getUserInfo.abdominalCir;
              this.province = this.getUserInfo.province;
              this.city = this.getUserInfo.city;
              this.area = this.getUserInfo.area;
              this.birthday = this.getUserInfo.birthDate;
            })
            .catch(err => {
              // loading.close();
              this.$toast.error(err.message);
            });

        //获取一下所有问题答案
        this.getAllQuestions();
      }

    },

    methods: {
      ...mapMutations([
      ]),

      ...mapActions([
        'uploadUserInfo',
        "getAllQuestions",
        "getUserBasicInfo"
      ]),

      //返回按钮
      backAction () {
        if (this.showSave) {
          this.$iosConfirm(this.$util.getAlertContent(this.$str.unSavedInfoAlert, '保存并退出', '退出'))
              .then(() => {
                //保存
                this.saveAction(true);
              })
              .catch(() => {
                //退出
                this.$router.push({
                  name: 'PDMainPage'
                });
              });
        }
        else {
          this.$router.push({
            name: 'PDMainPage'
          });
        }
      },

      //点击了头像
      avatarAction (event) {
      },

      //选择头像
      selectAvatarAction (event) {
        let fileList = event.target.files;
        if (fileList.length > 0) {
          let file = fileList[0];
          let fileReader = new FileReader();
          let self = this;
          fileReader.onload = () => {
            let imgStr = fileReader.result;
            let image = new Image();
            image.src = imgStr;
            image.onload = () => {
              //ios拍照图片会旋转90度，没办法解决
              let compressedImg = self.$util.compress(image);
              let blobImg = self.$util.dataURLtoBlob(compressedImg);
              self.$util.blobToBinaryString(blobImg, (binaryImg) => {
                self.uploadHeadPic(binaryImg, compressedImg);
              });
            };
          };
          fileReader.readAsDataURL(file);
        }

      },

      //上传头像
      uploadHeadPic (imgData, originDataUrl) {
        let img64 = btoa(imgData);
        this.$http.uploadHeadPic(this.getUserId, img64)
            .then(res => {
              //上传成功后把图片设置到界面上
              this.avatar = originDataUrl;
              this.$toast.success(this.$str.uploadHeadPicSuccess);
            })
            .catch(err => {
              this.$toast.error(err.message);
            });
      },

      //修改姓名
      nameChanged (val) {
        this.name = val;
        this.showSave = true;
      },

      //性别提示
      sexAction () {
        this.$pToast({
          content: this.$str.sexCannotModifyHint
        });
      },

      selectHeightAction (values) {
        this.height = values[0];
        this.showHeightPicker = false;
        this.showSave = true;
      },

      selectWeightAction (values) {
        this.weight = values[0];
        this.showWeightPicker = false;
        this.showSave = true;
      },

      selectAbdomenAction (values) {
        this.abdominal = values[0];
        this.showAbdomenPicker = false;
        this.showSave = true;
      },

      //选择地区
      selectRegionAction (values) {
        this.province = values[0];
        this.city = values[1];
        this.area = values[2];
        this.showRegionPicker = false;
        this.showSave = true;
      },

      //选择了生日
      selectBirthdayAction (date) {
        this.birthday = date.Format(this.$str.dateFormatSlash);
        this.showBirthdayPicker = false;
        this.showSave = true;
      },

      //保存用户信息，参数：是否自动退出本界面
      saveAction (autoExit = false) {
        //检查名字格式
        if (!this.$util.checkNameFormat(this.name)) {
          this.$toast.error(this.$str.nameFormatErrorHint);
        }
        else {
          //检查敏感词
          if (!this.$util.checkSensitiveWords(this.name)) {
            this.$toast.error(this.$str.nameSensitiveErrorHint);
          }
          else {
            //接口
            //userId/realName/height/weight/birthDate/sex/abdominalCir/province/city/area
            let userInfo = {
              userId: this.getUserId,
              realName: this.name,
              height: this.height,
              weight: this.weight,
              birthDate: this.birthday,
              sex: this.sex,
              abdominalCir: this.abdominal,
              province: this.province,
              city: this.city,
              area: this.area
            };
            const loading = this.$loading();
            this.uploadUserInfo(userInfo)
                .then(res => {
                  this.showSave = false;
                  loading.close();
                  this.$toast.success(this.$str.modifyUserInfoSuccess);
                  if (autoExit) {
                    this.$router.push({
                      name: 'PDMainPage'
                    });
                  }
                })
                .catch(err => {
                  loading.close();
                  this.$toast.error(err.message);
                });
          }
        }
      },

      //更多信息
      moreInfoAction () {
        if (this.showSave) {
          this.$iosConfirm(this.$util.getAlertContent(this.$str.unSaveInfoAlert, '是', '否'))
              .then(() => {
                //提交信息并跳转更多界面
                //检查名字格式
                if (!this.$util.checkNameFormat(this.name)) {
                  this.$toast.error(this.$str.nameFormatErrorHint);
                }
                else {
                  //检查敏感词
                  if (!this.$util.checkSensitiveWords(this.name)) {
                    this.$toast.error(this.$str.nameSensitiveErrorHint);
                  }
                  else {
                    //接口
                    //userId/realName/height/weight/birthDate/sex/abdominalCir/province/city/area
                    let userInfo = {
                      userId: this.getUserId,
                      realName: this.name,
                      height: this.height,
                      weight: this.weight,
                      birthDate: this.birthday,
                      sex: this.sex,
                      abdominalCir: this.abdominal,
                      province: this.province,
                      city: this.city,
                      area: this.area
                    };
                    const loading = this.$loading();
                    this.uploadUserInfo(userInfo)
                        .then(res => {
                          this.showSave = false;
                          loading.close();
                          this.gotoMoreInfoVC();
                        })
                        .catch(err => {
                          loading.close();
                          this.$toast.error(err.message);
                        });
                  }
                }
              })
              .catch( () => {
                //丢弃修改并跳转界面
                this.discardChanges();
                this.gotoMoreInfoVC();
              });
        }
        else {
          this.gotoMoreInfoVC();
        }
      },

      //丢弃修改
      discardChanges () {
        if (this.getUserInfo) {
          //获取头像
          this.avatar = hosts.headPicHost + this.getUserInfo.id + '.png';
          this.name = this.getUserInfo.realName;
          this.sex = this.getUserInfo.sex;
          this.height = this.getUserInfo.height;
          this.weight = this.getUserInfo.weight;
          this.abdominal = this.getUserInfo.abdominalCir;
          this.province = this.getUserInfo.province;
          this.city = this.getUserInfo.city;
          this.area = this.getUserInfo.area;
          this.birthday = this.getUserInfo.birthDate;
        }
      },

      //更多信息跳转不同的界面
      gotoMoreInfoVC () {
        //判断性别进入不同的界面
        if (this.getUserInfo.sex === this.$str.sexMale) {
          //男性
          this.$router.push({
            name: 'PDMoreInfoMalePage'
          });
        }
        else {
          //女性
          //判断生育状态
          let statusQos = {userInfoId: this.$str.female_Current_status_Id, userInfoValue: ''};
          this.$util.answerQuestions(this.getUserQosArray, [statusQos]);
          if (statusQos.userInfoValue === this.$str.bearStatus3) {
            //未育
            this.$router.push({
              name: 'PDMoreInfoFemaleChildlessPage'
            });
          }
          else if (statusQos.userInfoValue === this.$str.bearStatus2) {
            //已育，无再育计划
            this.$router.push({
              name: 'PDMoreInfoFemaleChildStopPage'
            });
          }
          else if (statusQos.userInfoValue === this.$str.bearStatus1) {
            //已育，有再育计划
            this.$router.push({
              name: 'PDMoreInfoFemaleChildContinuePage'
            });
          }
          else {
            this.$pToast({
              content: '未知信息'
            });
          }
        }
      },

    },


  }
</script>

<style scoped lang="less">
  .list-item {
    background-color: white;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: #e5e5e5 solid 1px;
    height: 60px;
    .item-left {
      margin-left: 15px;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
    .item-right {
      margin-right: 10px;
      height: 100%;
      display: flex;
      align-items: center;
      .item-right-left {
        margin-right: 8px;
        color: #95959E;
        font-size: 14px;
      }
    }
  }
  .mdi {
    color: #e8e8e8;
    font-size: 30px;
  }

  .container {
    margin: 0;
    padding: 0;
    .wrapper {
      height: 100vh;
      .app-bar {
      }
      .content {
        flex: auto;
        overflow: auto;
        font-size: 16px;
        background-color: #f7f7f7;
        width: 100vw;
        .avatar {
          border-top: #e5e5e5 solid 1px;
          border-bottom: #e5e5e5 solid 1px;
          margin-bottom: 5px;
          height: 70.5px;
          position: relative;
          .avatar-input {
            width: 100%;
            height: 70.5px;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
          }
        }
      }
    }
  }
</style>
