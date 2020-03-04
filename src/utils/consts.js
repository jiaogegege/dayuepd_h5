/**
 * 常用宏定义
 *
 * 包括一些常量字符串，正则表达式，常量等
 *
 */

const strMacros = {
  /**
   * 版本信息
   */
  appName: '大悦盆底',
  appModel: 'PC-App-01',
  releaseVersion: 'V2',
  fullVersion: 'V2.2.0.0',
  emailAddress: "service@dyimedical.com",
  servicePhone: "4006906178",
  homePageUrl: "http://www.dyimedical.com/",




  //电话号码的正则表达式
  regPhone: /^1\d{10}$/,
  //校验密码正则
  regPsd: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#@_])[0-9a-zA-Z#@_]{8,12}$/,
  //汉字的正则，判断名字，2-10个汉字字母
  regName: /^[a-zA-Z\u4E00-\u9FA5]{2,10}$/,

  //日期格式字符串
  dateFormatSlash: 'yyyy/MM/dd HH:mm:ss',
  dateFormatDash: 'yyyy-MM-dd HH:mm:ss',

  /**
   * 常量字符串
   */
  //女
  sexMale: '男',
  sexfemale: '女',

  //是和否
  optYes: '是',
  optNo: '否',

  //是否完善了信息
  perfectYes: '1',
  perfectNo: '0',

  //女性生育状态
  bearStatus1: "已育，有再妊娠计划",
  bearStatus2: "已育，无再妊娠计划",
  bearStatus3: "未育",

  //既往病史
  female_MH_Changqi_Manxing_Kesou: "长期慢性咳嗽",
  female_MH_Cangqi_Bianmi: "长期便秘",
  female_MH_Pendi_Shoushu: "盆底手术",
  female_MH_Manxing_Penqiang_Tengtong: "慢性盆腔疼痛",
  female_MH_None: "无上述病史",

//吸奶器种类
  female_Breastpump_Jiayong_Shoudong: "家用手动",
  female_Breastpump_Jiayong_Dan_Diandong: "家用单边电动",
  female_Breastpump_Jiayong_Shuang_Diandong: "家用双边电动",
  female_Breastpump_Yiyong_Diandong: "医用电动",

//是否腹直肌分离
  female_Fuzhiji_Fenli_Yes: "是",
  female_Fuzhiji_Fenli_No: "否",
  female_Fuzhiji_Fenli_Unknown: "我目前不了解什么是腹直肌分离",

  //已育胎次列表
  bearCount: [1, 2, 3, 4],
  //单胎
  singleBear: '单胎',
  //多胎
  multiBear: '多胎',
  //顺产
  bearWayYield: '顺产',
  //剖腹产
  bearWayCaesarean: '剖腹产',

  //奶粉喂养次数
  milkPower_One2Three: "1-3次",
  milkPower_Three2Five: "3-5次",
  milkPower_FiveUp: "5次以上",

  //第几胎
  numberOfBear: {1: '一', 2: '二', 3: '三', 4: '四'},

  userGuideTypeUserGuide: 1,     //使用说明
  userGuideTypeMassageSkill: 2,       //使用视频
  userGuideTypeSoftWen: 3,            //医学科普

//量表相关
  sex_functionality_Id: "0001",       //女性性功能表id
  sex_functionality_Title: '女性性功能量表',
  uroclepsia_functionality_Id: "0002",    //尿失禁生活质量
  uroclepsia_functionality_Title: '尿失禁生活质量问卷',
  obstacle_functionality_Id: "0003",      //盆底障碍
  obstacle_functionality_Title: '盆底障碍影响简易问卷',
  pelvic_functionality_Id: "0004",        //盆腔脏器脱垂
  pelvic_functionality_Title: '盆腔器官脱垂/尿失禁性功能问卷',
  health_functionality_Id: "0005",        //健康调查简表
  health_functionality_Title: '健康调查量表',

  //软文类型
  useInstruction: 1,    //使用说明
  useVideo: 2,    //使用视频
  scienceShare: 3,    //科普分享


  /**
   * 问卷调查问题id和文案
   */
//男性问题4个
  male_Bianmi_Id: "00003",      //是否便秘
  male_bianmi_Text: '您是否有长期便秘的症状？',
  male_Jianjin_Suantong_Id: "00004",        //肩颈酸痛
  male_Jianjin_Suantong_Text: '您是否有肩颈部酸痛的症状？',
  male_Yaobei_Suantong_Id: "00005",     //腰背酸痛
  male_Yaobei_Suantong_Text: '您是否有腰背部酸痛的症状？',
  male_Jirou_Suantong_Id: "00006",          //其他肌肉酸痛
  male_Jirou_Suantong_Text: '您其他部位是否会有肌肉酸痛的症状？',

//女性选择当前状态问题
  female_Current_status_Id: "00001",        //女性当前状态

//已育，有再次妊娠计划
//女性问题第一页生育信息问题
  female_BearInfo_Id: "00002",         //生育信息
//女性问题第二页
  female_Known_Pendi_Kangfu_Id: "00007",       //是否了解或做过盆底康复
  female_Known_Pendi_Kangfu_Text: '您是否了解或做过产后盆底功能康复治疗？',
  female_Louniao_Tuochui_Id: "00008",          //"您产后是否出现漏尿、脏器脱垂或者盆腔痛的症状？"
  female_Louniao_Tuochui_Text: '您是产后否出现漏尿、脏器脱垂或者盆腔痛的症状？',
  female_Yindao_SongChi_Id: "00009",       //"您是否出现阴道及阴道口松弛的症状？"
  female_Yindao_SongChi_Text: '您是否出现阴道及阴道口松弛的症状？',
  female_Yindao_Shousuo_Xiajiang_Id: "00010",      //"您是否出现阴道收缩功能下降的症状？"
  female_Yindao_Shousuo_Xiajiang_Text: '您是否出现阴道收缩功能下降的症状？',
  female_Xinggongneng_Xiajiang_Id: "00011",    //"您是否出现女性性功能指数（包括：性欲、性唤起、性高潮、性湿润、性满意度、性交痛）下降的症状？"
  female_Xinggongneng_Xiajiang_Text: '您是否出现女性性功能指数（包括：性欲、性唤起、性高潮、性湿润、性满意度、性交痛）下降的症状？',
  female_Medical_History_Id: "00012",      //"既往病史（多选）"
  female_Medical_History_Text: '既往病史',
//女性问题第三页
  female_Buruqi_Id: "00013",       //您目前是否处于哺乳期？
  female_Buruqi_Text: '您目前是否处于哺乳期？',
  female_Tianjia_naifen_Id: "00014",       //在以往或目前的哺乳中，您每天是否需要 添加奶粉喂养？
  female_Tianjia_naifen_Text: '在以往或目前的哺乳中，您每天是否需要添加奶粉喂养？',
  female_Xiruqi_Id: "00015",       //在以往或目前的哺乳中，您是否有使用吸 乳器？
  female_Xiruqi_Text: '在以往或目前的哺乳中，您是否有使用吸乳器？',
  female_Ruzhangtong_Id: "00016",      //在以往或目前的哺乳中，您是否有乳胀痛 、乳腺管不通、堵奶的症状？
  female_Ruzhangtong_Text: '在以往或目前的哺乳中，您是否有乳胀痛、乳腺管不通、堵奶的症状？',
  female_Rutou_Neixian_Id: "00017",    //您是否有乳头内陷的困扰？
  female_Rutou_Neixian_Text: '您是否有乳头内陷的困扰？',
  female_Zigongfujiu_Id: "00018",      //您产后1个月内是否做过子宫复旧、促进 恶露排出的治疗？
  female_Zigongfujiu_Text: '您产后1个月内是否做过子宫复旧、促进恶露排出的治疗？',
  female_Tianjia_Naifen_Cishu_Id: "00019",     //在以往或目前的哺乳中，您每天添加奶粉 喂养的次数。
  female_Tianjia_Naifen_Cishu_Text: '在以往或目前的哺乳中，您每天添加奶粉喂养的次数。',
  female_Xiruqi_Zhonglei_Id: "00020",      //您的吸乳器的种类
  female_Xiruqi_Zhonglei_Text: '您的吸乳器的种类',
//女性问题第四页
  female_Fuzhiji_Fenli_Id: "00021",    //您是否有腹直肌分离的症状？
  female_Fuzhiji_Fenli_Text: '您是否有腹直肌分离的症状？',
  female_Fubi_Songchi_Id: "00022",     //您是否有腹壁松弛的症状？
  female_Fubi_Songchi_Text: '您是否有腹壁松弛的症状？',
  female_Tunbu_songchi_Id: "00023",    //您是否有臀部、腿部、手臂等部位松弛的 症状？
  female_Tunbu_songchi_Text: '您是否有臀部、腿部、手臂等部位松弛的症状？',
  female_Ruxian_Zengsheng_Id: "00024",     //生理期前后，您是否有乳腺增生（乳房胀 痛及结节）的症状？
  female_Ruxian_Zengsheng_Text: '生理期前后，您是否有乳腺增生（乳房胀痛及结节）的症状？',
  female_Jianjin_suantong_Id: "00025",     //您是否有肩颈部酸痛的症状？
  female_Jianjin_suantong_Text: '您是否有肩颈部酸痛的症状？',
  female_Yaobei_suantong_Id: "00026",      //您是否有腰背部酸痛的症状？
  female_Yaobei_suantong_Text: '您是否有腰背部酸痛的症状？',
  female_Jirou_Suantong_Id: "00027",       //您其他部位是否会有肌肉酸痛的症状？
  female_Jirou_Suantong_Text: '您其他部位是否会有肌肉酸痛的症状？',

//已育，无再次妊娠计划
//女性问题第一页生育信息问题
  female_BearInfo_Id2: "00002",         //生育信息
//女性问题第二页
  female_Known_Pendi_Kangfu_Id_NoMore: "00028",       //是否了解或做过盆底康复
  female_Known_Pendi_Kangfu_Text_NoMore: '您是否了解或做过产后盆底功能康复治疗？',
  female_Louniao_Tuochui_Id_NoMore: "00029",          //"您产后是否出现漏尿、脏器脱垂或者盆腔痛的症状？"
  female_Louniao_Tuochui_Text_NoMore: '您是产后否出现漏尿、脏器脱垂或者盆腔痛的症状？',
  female_Yindao_SongChi_Id_NoMore: "00030",       //"您是否出现阴道及阴道口松弛的症状？"
  female_Yindao_SongChi_Text_NoMore: '您是否出现阴道及阴道口松弛的症状？',
  female_Yindao_Shousuo_Xiajiang_Id_NoMore: "00031",      //"您是否出现阴道收缩功能下降的症状？"
  female_Yindao_Shousuo_Xiajiang_Text_NoMore: '您是否出现阴道收缩功能下降的症状？',
  female_Xinggongneng_Xiajiang_Id_NoMore: "00032",    //"您是否出现女性性功能指数（包括：性欲、性唤起、性高潮、性湿润、性满意度、性交痛）下降的症状？"
  female_Xinggongneng_Xiajiang_Text_NoMore: '您是否出现女性性功能指数（包括：性欲、性唤起、性高潮、性湿润、性满意度、性交痛）下降的症状？',
  female_Medical_History_Id_NoMore: "00033",      //"既往病史（多选）"
  female_Medical_History_Text_NoMore: '既往病史',
//女性问题第三页
  female_Buruqi_Id_NoMore: "00034",       //您目前是否处于哺乳期？
  female_Buruqi_Text_NoMore: '您目前是否处于哺乳期？',
  female_Tianjia_naifen_Id_NoMore: "00035",       //在以往或目前的哺乳中，您每天是否需要 添加奶粉喂养？
  female_Tianjia_naifen_Text_NoMore: '在以往或目前的哺乳中，您每天是否需要添加奶粉喂养？',
  female_Xiruqi_Id_NoMore: "00036",       //在以往或目前的哺乳中，您是否有使用吸 乳器？
  female_Xiruqi_Text_NoMore: '在以往或目前的哺乳中，您是否有使用吸乳器？',
  female_Ruzhangtong_Id_NoMore: "00037",      //在以往或目前的哺乳中，您是否有乳胀痛 、乳腺管不通、堵奶的症状？
  female_Ruzhangtong_Text_NoMore: '在以往或目前的哺乳中，您是否有乳胀痛、乳腺管不通、堵奶的症状？',
  female_Rutou_Neixian_Id_NoMore: "00038",    //您是否有乳头内陷的困扰？
  female_Rutou_Neixian_Text_NoMore: '您是否有乳头内陷的困扰？',
  female_Zigongfujiu_Id_NoMore: "00039",      //您产后1个月内是否做过子宫复旧、促进 恶露排出的治疗？
  female_Zigongfujiu_Text_NoMore: '您产后1个月内是否做过子宫复旧、促进恶露排出的治疗？',
  female_Tianjia_Naifen_Cishu_Id_NoMore: "00040",     //在以往或目前的哺乳中，您每天添加奶粉 喂养的次数。
  female_Tianjia_Naifen_Cishu_Text_NoMore: '在以往或目前的哺乳中，您每天添加奶粉喂 养的次数。',
  female_Xiruqi_Zhonglei_Id_NoMore: "00041",      //您的吸乳器的种类
  female_Xiruqi_Zhonglei_Text_NoMore: '您的吸乳器的种类',
//女性问题第四页
  female_Fuzhiji_Fenli_Id_NoMore: "00042",    //您是否有腹直肌分离的症状？
  female_Fuzhiji_Fenli_Text_NoMore: '您是否有腹直肌分离的症状？',
  female_Fubi_Songchi_Id_NoMore: "00043",     //您是否有腹壁松弛的症状？
  female_Fubi_Songchi_Text_NoMore: '您是否有腹壁松弛的症状？',
  female_Tunbu_songchi_Id_NoMore: "00044",    //您是否有臀部、腿部、手臂等部位松弛的 症状？
  female_Tunbu_songchi_Text_NoMore: '您是否有臀部、腿部、手臂等部位松弛的症状？',
  female_Ruxian_Zengsheng_Id_NoMore: "00045",     //生理期前后，您是否有乳腺增生（乳房胀 痛及结节）的症状？
  female_Ruxian_Zengsheng_Text_NoMore: '生理期前后，您是否有乳腺增生（乳房胀痛及结节）的症状？',
  female_Jianjin_suantong_Id_NoMore: "00046",     //您是否有肩颈部酸痛的症状？
  female_Jianjin_suantong_Text_NoMore: '您是否有肩颈部酸痛的症状？',
  female_Yaobei_suantong_Id_NoMore: "00047",      //您是否有腰背部酸痛的症状？
  female_Yaobei_suantong_Text_NoMore: '您是否有腰背部酸痛的症状？',
  female_Jirou_Suantong_Id_NoMore: "00048",       //您其他部位是否会有肌肉酸痛的症状？
  female_Jirou_Suantong_Text_NoMore: '您其他部位是否会有肌肉酸痛的症状？',

//女性未育问题第一页
  female_Un_Known_Pendi_Kangfu_Id: "00049",       //是否了解或做过盆底康复
  female_Un_Known_Pendi_Kangfu_Text: '您是否了解或做过产后盆底功能康复治疗？',
  female_Un_Louniao_Tuochui_Id: "00050",          //"您产后是否出现漏尿、脏器脱垂或者盆腔痛的症状？"
  female_Un_Louniao_Tuochui_Text: '您是否出现漏尿、脏器脱垂或者盆腔痛的症状？',
  female_Un_Yindao_SongChi_Id: "00051",       //"您是否出现阴道及阴道口松弛的症状？"
  female_Un_Yindao_SongChi_Text: '您是否出现阴道及阴道口松弛的症状？',
  female_Un_Yindao_Shousuo_Xiajiang_Id: "00052",      //"您是否出现阴道收缩功能下降的症状？"
  female_Un_Yindao_Shousuo_Xiajiang_Text: '您是否出现阴道收缩功能下降的症状？',
  female_Un_Xinggongneng_Xiajiang_Id: "00053",    //"您是否出现女性性功能指数（包括：性欲、性唤起、性高潮、性湿润、性满意度、性交痛）下降的症状？"
  female_Un_Xinggongneng_Xiajiang_Text: '您是否出现女性性功能指数（包括：性欲、性唤起、性高潮、性湿润、性满意度、性交痛）下降的症状？',
  female_Un_Medical_History_Id: "00054",      //"既往病史（多选）"
  female_Un_Medical_History_Text: '既往病史',
//女性未育问题第二页
  female_Un_Ruxianguan_Butong_Id: "00055",    //您是否对产后无乳、少乳、乳胀痛、乳腺管不通、堵奶的症状有过了解？
  female_Un_Ruxianguan_Butong_Text: '您是否对产后无乳、少乳、乳胀痛、乳腺管不通、 堵奶的症状有过了解？',
  female_Un_Rutou_Aoxian_Id: "00056",     //您是否有乳头内陷的困扰？
  female_Un_Rutou_Aoxian_Text: '您是否有乳头内陷的困扰？',
  female_Un_Gouzhi_Xiruqi_Id: "00057",    //在生产前，您是否会先购置吸乳器？
  female_Un_Gouzhi_Xiruqi_Text: '在生产前，您是否会先购置吸乳器？',
  female_Un_Xuanze_Zigongfujiu_Id: "00058",       //产后一个月内进行子宫复旧的治疗有助于 加速恶露排出，促进产后恢复，您会选择 子宫复旧的治疗吗？
  female_Un_Xuanze_Zigongfujiu_Text: '产后一个月内进行子宫复旧的治疗有助于加速恶露排出，促进产后恢复，您会选择子宫复旧的治疗吗？',
  female_Un_Xuanze_Xiruqi_Zhonglei_Id: "00059",       //吸乳器的种类，您会选择？
  female_Un_Xuanze_Xiruqi_Zhonglei_Text: '吸乳器的种类，您会选择？',
//女性未育问题第三页
  female_Un_Fuzhiji_Fenli_Id: "00060",    //您是否有腹直肌分离的症状？
  female_Un_Fuzhiji_Fenli_Text: '您是否有腹直肌分离的症状？',
  female_Un_Fubi_Songchi_Id: "00061",     //您是否有腹壁松弛的症状？
  female_Un_Fubi_Songchi_Text: '您是否有腹壁松弛的症状？',
  female_Un_Tunbu_songchi_Id: "00062",    //您是否有臀部、腿部、手臂等部位松弛的 症状？
  female_Un_Tunbu_songchi_Text: '您是否有臀部、腿部、手臂等部位松弛的症状？',
  female_Un_Ruxian_Zengsheng_Id: "00063",     //生理期前后，您是否有乳腺增生（乳房胀 痛及结节）的症状？
  female_Un_Ruxian_Zengsheng_Text: '生理期前后，您是否有乳腺增生（乳房胀痛及结节）的症状？',
  female_Un_Jianjin_suantong_Id: "00064",     //您是否有肩颈部酸痛的症状？
  female_Un_Jianjin_suantong_Text: '您是否有肩颈部酸痛的症状？',
  female_Un_Yaobei_suantong_Id: "00065",      //您是否有腰背部酸痛的症状？
  female_Un_Yaobei_suantong_Text: '您是否有腰背部酸痛的症状？',
  female_Un_Jirou_Suantong_Id: "00066",       //您其他部位是否会有肌肉酸痛的症状？
  female_Un_Jirou_Suantong_Text: '您其他部位是否会有肌肉酸痛的症状？',

  noneDisplay: '无',

  noneConnect: '未连接',




  /**
   * 提示文案
   */
  /*登录注册*/
  //手机号码不能为空
  phoneEmptyErrorHint: '手机号码不能为空',
  //手机号码格式错误
  phoneFormatErrorHint: "手机号码格式错误",
  //密码格式错误
  psdFormatErrorHint: "密码格式错误",
  //"姓名格式错误，请重新输入"
  nameFormatErrorHint: "姓名格式错误，请重新输入",
  //"您输入的姓名含有敏感词汇，请重新输入"
  nameSensitiveErrorHint: "您输入的姓名含有敏感词汇，请重新输入",

  /*完善信息*/
  //当前有未填写项
  haveUnfilledHint: '当前有未填写项',
  //修改信息成功
  modifyUserInfoSuccess: '修改信息成功',

  //敬请期待
  unCompleteHint: '敬请期待',

  //请前往更多完整信息
  sexCannotModifyHint: '请前往更多完整信息',

  //上传头像成功
  uploadHeadPicSuccess: '上传头像成功',

  //还有未保存的信息，是否保存并退出
  unSavedInfoAlert: '还有未保存的信息，是否保存并退出',

  //"当前信息有改动是否改动并保存"
  unSaveInfoAlert: '当前信息有改动是否改动并保存',

  //原密码错误
  originPsdErrorHint: '原密码错误',

  //新密码格式错误
  newPsdFormatErrorHint: '新密码格式错误',

  //两者密码不一致
  twicePsdNotFitHint: '两者密码不一致',

  //密码修改成功
  psdModifySuccessHint: '密码修改成功',

  //确定退出当前账号吗？
  logoutAlert: '确定退出当前账号吗？',

  //"请输入正确的原手机号码"
  originPhoneMatchErrorHint: "请输入正确的原手机号码",





};

export {strMacros};