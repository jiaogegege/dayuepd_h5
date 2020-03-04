import {strMacros} from "./consts";
import sensitive from './sensitive';

const utility = {
  //校验手机号格式
  checkPhoneFormat (userPhone) {
    return userPhone.match(strMacros.regPhone);
  },

  //校验密码格式
  checkPsdFormat (userPassword) {
    return userPassword.match(strMacros.regPsd);
  },

  //校验姓名格式
  checkNameFormat (userName) {
    return userName.match(strMacros.regName);
  },

  //敏感词校验
  checkSensitiveWords (userName) {
    let senArr = sensitive.split('\n');
    return !senArr.includes(userName);
  },

  //将手机号中间4位变成指定符号，默认`*`
  changePhoneMiddleWithStar (userPhone, start = 3, length = 4, replaceChar = '*') {
    let strArr = userPhone.split('');
    strArr.splice(start, length, replaceChar.repeat(length));
    return strArr.join('');
  },

  //判断是否空对象
  isEmptyObject (obj) {
    if (obj && obj !== null && obj !== undefined) {
      return false;
    }
    else {
      return true;
    }
  },

  //判断空字符串
  isEmptyString (str) {
    if (str && str.length > 0 && str !== '' && str !== '<null>' && str !== 'null' && str !== null && str !== undefined) {
      return false;
    }
    else {
      return true;
    }
  },

  //获取非空字符串，如果为空，返回空字符串
  getUnEmptyString (str) {
    str = String(str);
    if (this.isEmptyString(str)) {
      return '';
    }
    else {
      return str;
    }
  },

  //将日期转成不同格式的字符串形式
  formatDateToSlashString (date, fmt){
    let o = {
      "M+": date.getMonth()+1,
      "d+": date.getDate(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "S+": date.getMilliseconds()
    };
    //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
    if(/(y+)/.test(fmt)){
      //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。
      fmt=fmt.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length));
    }
    for(let k in o){
      if (new RegExp("(" + k +")").test(fmt)){
        //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
      }
    }
    return fmt;
  },

  //将日期转成年/月/日形式
  formatDateToLocalString (date) {
    if (!date) {
      return '';
    }
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    return year + '年' + month + '月' + day + '日';
  },

  //返回性别选项数组
  getSexArray () {
    return ['女', '男'];
  },

  //返回一个数字序列，参数1：起始值，默认0；参数2：结束值，默认100；参数3：步长，默认1
  getNumberArray (start=0, end=100, step=1) {
    let arr = Array.from({length:Math.ceil((end + (step < 1 ? 0 : 1) - start) / step)},(item, index)=> start + index * step);
    //步长为小数的时候，结束边界取不到，所以手动判断，如果最后一个值加上步长小于等于结束边界，那么最后一个值加上步长添加到数组中
    if (step < 1) {
      let last = arr[arr.length - 1];
      if (last + step - end <= Number.EPSILON) {
        arr.push(last + step);
      }
    }
    return arr;
  },

  //返回身高选项数组
  getHeightArray () {
    return this.getNumberArray(120, 200).map((item) => {
      return item.toFixed(0).toString();
    });
  },

  //返回体重选项数组
  getWeightArray () {
    return this.getNumberArray(30, 100).map(item => {
      return item.toFixed(0).toString();
    });
  },

  //返回体重增长数组
  getIncreaseWeightArray () {
    return this.getNumberArray(0, 100).map(item => {
      return item.toFixed(0).toString();
    });
  },

  //返回腹围选项数组
  getAbdomenArray () {
    return this.getNumberArray(40, 120).map(item => {
      return item.toFixed(0).toString();
    });
  },

  //宝宝体重数组
  getBabyWeightArray () {
    return this.getNumberArray(1, 10, 0.1).map(item => {
      return item.toFixed(1).toString();
    });
  },

  //返回生育次数数组
  getBearCountArray () {
    return ['1', '2', '3', '4'];
  },

  //传入一个问题列表，尝试回答所有的问题，qosArr自动改变元素的属性不需要返回
  answerQuestions (answerArr, qosArr) {
    for (let qos of qosArr) {
      for (let qos2 of answerArr) {
        if (qos.userInfoId === qos2.userInfoId) {
          qos.userInfoValue = qos2.userInfoValue;
          break;
        }
      }
      if (!qos.userInfoValue) {
        qos.userInfoValue = '';
      }
    }
  },

  //图片压缩
  compress(img,Orientation) {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');
    //瓦片canvas
    let tCanvas = document.createElement("canvas");
    let tctx = tCanvas.getContext("2d");
    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio;
    if ((ratio = width * height / 4000000) > 1) {
      // console.log("大于400万像素")
      ratio = Math.sqrt(ratio);
      width /= ratio;
      height /= ratio;
    } else {
      ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
//        铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    let count;
    if ((count = width * height / 1000000) > 1) {
      // console.log("超过100W像素");
      count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
//            计算每块瓦片的宽和高
      let nw = ~~(width / count);
      let nh = ~~(height / count);
      tCanvas.width = nw;
      tCanvas.height = nh;
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    //修复ios上传图片的时候 被旋转的问题
    if(Orientation != "" && Orientation != 1){
      switch(Orientation){
        case 6://需要顺时针（向左）90度旋转
          this.rotateImg(img,'left',canvas);
          break;
        case 8://需要逆时针（向右）90度旋转
          this.rotateImg(img,'right',canvas);
          break;
        case 3://需要180度旋转
          this.rotateImg(img,'right',canvas);//转两次
          this.rotateImg(img,'right',canvas);
          break;
      }
    }
    //进行最小压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.1);
    // console.log('压缩前：' + initSize);
    // console.log('压缩后：' + ndata.length);
    // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
  },

  //base64转blob
  dataURLtoBlob (dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },

  //blob转binaryString
  blobToBinaryString (blob, callback) {
    let reader = new FileReader();
    reader.onload = function (e) { callback(e.target.result); };
    reader.readAsBinaryString(blob);
  },

  //返回一个弹框内容对象，包括：title/text/cancelText（左）/okText（右）
  getAlertContent (text = '', okText = '确定', cancelText = '取消', title = '') {
    return {
      title: title,
      text: text,
      cancelText: cancelText,
      okText: okText,
    };
  },





};

export {utility};