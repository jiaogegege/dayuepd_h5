import Vue from 'vue'
import Router from 'vue-router'
import Test from './views/Test.vue'
import A from './views/A';
import A1 from './views/A1';
import A1_1 from './components/A1-1';
import B from './views/B';
import C from './views/C';
import D from './views/D';
import DUserCenter from './views/DUserCenter';
import DCourse from "./views/DCourse";
import EList from './views/EList';
import EPage from "./views/EPage";
import FStyle from './views/FStyle';
import PDLoginPage from './views/pd/PDLoginPage';
import PDMainPage from './views/pd/PDMainPage';
import PDHomePage from "./views/pd/PDHomePage";
import PDCoursePage from './views/pd/PDCoursePage';
import PDDataManagePage from './views/pd/PDDataManagePage';
import PDContactUsPage from './views/pd/PDContactUsPage';
import PDUseInstructionPage from './views/pd/PDUseInstructionPage';
import PDUseVideoPage from './views/pd/PDUseVideoPage';
import PDContraindicationPage from './views/pd/PDContraindicationPage';
import PDPersonalCenterPage from './views/pd/PDPersonalCenterPage';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'Test',
    //   meta:{index:0},
    //   component: Test
    // },
    {
      path: '/',
      name: 'PDLaunchPage',
      meta: {index: 0},
      component: () => import('./views/pd/PDLaunchPage.vue')
    },
    {
      path: A.path,
      name: A.name,
      meta:{index:1},
      component: A
    },
    {
      path: A1.path,
      name: A1.name,
      meta:{index:2},
      component: A1,
      children: [
        {
          path: A1_1.path,
          name: A1_1.name,
          meta:{index:3},
          component: A1_1
        }
      ]
    },
    {
      path: B.path,
      name: B.name,
      meta:{index:4},
      component: B
    },
    {
      path: C.path,
      name: C.name,
      meta:{index:5},
      component: C
    },
    {
      path: '/d',
      name: D.name,
      meta:{index:6},
      component: D
    },
    {
      path: '/d/login',
      name: 'DLogin',
      meta:{index:7},
      component: () => import('./views/DLogin.vue')
    },
    {
      //进入D模块的主页
      path: '/d/home',
      name: 'DHome',
      meta:{index:8},
      component: () => import('./views/DHome.vue')
    },
    {
      path: '/d/usercenter',
      name: DUserCenter.name,
      meta:{index:9},
      component: DUserCenter
    },
    {
      path: '/d/course/:id',
      name: 'DCourse',
      meta: {index: 10},
      component: DCourse
    },
    {
      path: '/e',
      name: 'EList',
      meta: {index: 11},
      component: EList
    },
    {
      path: '/e/page/:url',
      name: 'EPage',
      meta: {index: 12},
      component: EPage,
      props: true
    },
    {
      path: '/f',
      name: 'FStyle',
      meta: {index: 13},
      component: FStyle
    },
    {
      path: '/apis',
      name: 'RequestApis',
      meta: {index: 14},
      component: () => import('./views/RequestApis.vue')
    },
    {
      path: '/dayuepd',
      name: 'PDLaunchPage',
      meta: {index: 15},
      component: () => import('./views/pd/PDLaunchPage.vue')
    },
    {
      path: '/dayuepd/loginRegister',
      name: 'PDLoginRegisterPage',
      meta: {index: 16, keepAlive: false},
      component: () => import('./views/pd/PDLoginRegisterPage.vue')
    },
    {
      path: '/dayuepd/login',
      name: 'PDLoginPage',
      meta: {index: 17, keepAlive: false},
      component: PDLoginPage
    },
    {
      path: '/dayuepd/forgetPsd',
      name: 'PDForgetPsdPage',
      meta: {index: 18},
      component: () => import('./views/pd/PDForgetPsdPage.vue')
    },
    {
      path: '/dayuepd/resetPsd',
      name: 'PDResetPsdPage',
      meta: {index: 19},
      component: () => import('./views/pd/PDResetPsdPage.vue')
    },
    {
      path: '/dayuepd/login/code',
      name: 'PDLoginCodePage',
      meta: {index: 20},
      component: () => import('./views/pd/PDLoginCodePage.vue')
    },
    {
      path: '/dayuepd/register/service',
      name: 'PDServicePage',
      meta: {index: 21},
      component: () => import('./views/pd/PDServicePage.vue')
    },
    {
      path: '/dayuepd/register/code',
      name: 'PDRegisterCodePage',
      meta: {index: 22},
      component: () => import('./views/pd/PDRegisterCodePage.vue')
    },
    {
      path: '/dayuepd/register/setPsd',
      name: 'PDRegisterSetPsdPage',
      meta: {index: 23},
      component: () => import('./views/pd/PDRegisterSetPsdPage.vue')
    },
    {
      path: '/dayuepd/register/finish',
      name: 'PDRegisterFinishPage',
      meta: {index: 24},
      component: () => import('./views/pd/PDRegisterFinishPage.vue')
    },
    {
      path: '/dayuepd/welcomeBack',
      name: 'PDWelcomeBackPage',
      meta: {index: 25},
      component: () => import('./views/pd/PDWelcomeBackPage.vue')
    },
    {
      path: '/dayuepd/main',
      name: 'PDMainPage',
      meta: {index: 100},
      component: PDMainPage,
      children: [
        {
          path: '/dayuepd/main/home',
          name: 'PDHomePage',
          meta: {index: 101},
          component: PDHomePage
        },
        {
          path: '/dayuepd/main/course',
          name: 'PDCoursePage',
          meta: {index: 102},
          component: PDCoursePage
        },
        {
          path: '/dayuepd/main/data',
          name: 'PDDataManagePage',
          meta: {index: 103},
          component: PDDataManagePage,
          children: [
            { //标准评估
              path: '/dayuepd/main/data/evaluate',
              name: 'PDDataEvaluationPage',
              meta: {index: 127},
              component: () => import('./views/pd/PDDataEvaluationPage')
            },
            { //康复治疗
              path: '/dayuepd/main/data/recovery',
              name: 'PDDataRecoveryPage',
              meta: {index: 128},
              component: () => import('./views/pd/PDDataRecoveryPage')
            },
            { //自由锻炼
              path: '/dayuepd/main/data/exercise',
              name: 'PDDataExercisePage',
              meta: {index: 129},
              component: () => import('./views/pd/PDDataExercisePage')
            },
            { //量表测评
              path: '/dayuepd/main/data/functionality',
              name: 'PDDataFunctionalityPage',
              meta: {index: 130},
              component: () => import('./views/pd/PDDataFunctionalityPage')
            }
          ]
        },
        {
          path: '/dayuepd/main/contact',
          name: 'PDContactUsPage',
          meta: {index: 104},
          component: PDContactUsPage
        }
      ]
    },
    {
      path: '/dayuepd/course/instruction',
      name: 'PDUseInstructionPage',
      meta: {index: 105},
      component: PDUseInstructionPage
    },
    {
      path: '/dayuepd/course/video',
      name: 'PDUseVideoPage',
      meta: {index: 106},
      component: PDUseVideoPage
    },
    {
      path: '/dayuepd/course/contraindication',
      name: 'PDContraindicationPage',
      meta: {index: 107},
      component: PDContraindicationPage
    },
    {
      path: '/dayuepd/course/instruction/detail/:articleUrl',
      name: 'PDUseInstructionDetailPage',
      meta: {index: 108},
      component: () => import('./views/pd/PDUseInstructionDetailPage.vue'),
      props: true
    },
    {
      path: '/dayuepd/drawer/personalCenter',
      name: 'PDPersonalCenterPage',
      meta: {index: 109},
      component: PDPersonalCenterPage
    },
    {
      path: '/dayuepd/drawer/more/Male',
      name: 'PDMoreInfoMalePage',
      meta: {index: 110},
      component: () => import('./views/pd/PDMoreInfoMalePage')
    },
    {
      path: '/dayuepd/drawer/more/FemaleChildless',
      name: 'PDMoreInfoFemaleChildlessPage',
      meta: {index: 111},
      component: () => import('./views/pd/PDMoreInfoFemaleChildlessPage')
    },
    {
      path: '/dayuepd/drawer/more/FemaleChildContinue',
      name: 'PDMoreInfoFemaleChildContinuePage',
      meta: {index: 112},
      component: () => import('./views/pd/PDMoreInfoFemaleChildContinuePage')
    },
    {
      path: '/dayuepd/drawer/more/FemaleChildStop',
      name: 'PDMoreInfoFemaleChildStopPage',
      meta: {index: 112},
      component: () => import('./views/pd/PDMoreInfoFemaleChildStopPage')
    },
    {
      path: '/dayuepd/drawer/setting',
      name: 'PDSystemSettingPage',
      meta: {index: 113},
      component: () => import('./views/pd/PDSystemSettingPage')
    },
    {
      path: '/dayuepd/drawer/share',
      name: 'PDSharePage',
      meta: {index: 114},
      component: () => import('./views/pd/PDSharePage')
    },
    {
      path: '/dayuepd/drawer/modifyPsd',
      name: 'PDModifyPsdPage',
      meta: {index: 115},
      component: () => import('./views/pd/PDModifyPsdPage')
    },
    {
      path: '/dayuepd/drawer/modifyPhoneOldPhone',
      name: 'PDModifyPhoneWithOldPhonePage',
      meta: {index: 116},
      component: () => import('./views/pd/PDModifyPhoneWithOldPhonePage')
    },
    {
      path: '/dayuepd/drawer/modifyPhonePsd',
      name: 'PDModifyPhoneWithPsdPage',
      meta: {index: 117},
      component: () => import('./views/pd/PDModifyPhoneWithPsdPage')
    },
    {
      path: '/dayuepd/drawer/modifyPhoneNewPhone',
      name: 'PDModifyPhoneNewPhonePage',
      meta: {index: 118},
      component: () => import('./views/pd/PDModifyPhoneNewPhonePage')
    },
    {
      path: '/dayuepd/drawer/deviceDetail',
      name: 'PDDeviceDetailPage',
      meta: {index: 119},
      component: () => import('./views/pd/PDDeviceDetailPage')
    },
    {
      path: '/dayuepd/drawer/about',
      name: 'PDAboutUsPage',
      meta: {index: 120},
      component: () => import('./views/pd/PDAboutUsPage')
    },
    {
      path: '/dayuepd/drawer/homeWebPage',
      name: 'PDOfficialWebsitePage',
      meta: {index: 121},
      component: () => import('./views/pd/PDOfficialWebsitePage')
    },
    {
      path: '/dayuepd/drawer/services',
      name: 'PDServiceClausePage',
      meta: {index: 122},
      component: () => import('./views/pd/PDServiceClausePage')
    },
    {
      path: '/dayuepd/home/productIntroduce',
      name: 'PDProductIntroducePage',
      meta: {index: 123},
      component: () => import('./views/pd/PDProductIntroducePage')
    },
    {
      path: '/dayuepd/home/medicalScience',
      name: 'PDMedicalSciencePage',
      meta: {index: 124},
      component: () => import('./views/pd/PDMedicalSciencePage')
    },
    {
      path: '/dayuepd/home/scienceShare',
      name: 'PDScienceShareListPage',
      meta: {index: 125},
      component: () => import('./views/pd/PDScienceShareListPage'),
    },
    {
      path: '/dayuepd/home/scienceShareDetail',
      name: 'PDscienceShareDetailPage',
      meta: {index: 126},
      component: () => import('./views/pd/PDscienceShareDetailPage')
    },
    {
      path: '/dayuepd/fill/basic',
      name: 'PDFillBasicInfoPage',
      meta: {index: 200},
      component: () => import('./views/pd/PDFillBasicInfoPage.vue')
    },
    {
      path: '/dayuepd/fill/male',
      name: 'PDFillMaleQosPage',
      meta: {index: 201},
      component: () => import('./views/pd/PDFillMaleQosPage.vue')
    },
    {
      path: '/dayuepd/fill/female/status',
      name: 'PDFillFemaleStatusPage',
      meta: {index: 202},
      component: () => import('./views/pd/PDFillFemaleStatusPage.vue')
    },
    {
      path: '/dayuepd/fill/female/bearContinue',
      name: 'PDFillBearInfoContinuePage',
      meta: {index: 203},
      component: () => import('./views/pd/PDFillBearInfoContinuePage.vue')
    },
    {
      path: '/dayuepd/fill/female/bearStop',
      name: 'PDFillBearInfoStopPage',
      meta: {index: 204},
      component: () => import('./views/pd/PDFillBearInfoStopPage.vue')
    },
    {
      path: '/dayuepd/fill/female/childless/first',
      name: 'PDFillChildlessFirstPage',
      meta: {index: 205},
      component: () => import('./views/pd/PDFillChildlessFirstPage.vue')
    },
    {
      path: '/dayuepd/fill/female/childless/second',
      name: 'PDFillChildlessSecondPage',
      meta: {index: 206},
      component: () => import('./views/pd/PDFillChildlessSecondPage.vue')
    },
    {
      path: '/dayuepd/fill/female/childless/third',
      name: 'PDFillChildlessThirdPage',
      meta: {index: 207},
      component: () => import('./views/pd/PDFillChildlessThirdPage.vue')
    },
    {
      path: '/dayuepd/fill/female/continue/second',
      name: 'PDFillContinueSecondPage',
      meta: {index: 208},
      component: () => import('./views/pd/PDFillContinueSecondPage.vue')
    },
    {
      path: '/dayuepd/fill/female/continue/third',
      name: 'PDFillContinueThirdPage',
      meta: {index: 209},
      component: () => import('./views/pd/PDFillContinueThirdPage.vue')
    },
    {
      path: '/dayuepd/fill/female/continue/forth',
      name: 'PDFillContinueForthPage',
      meta: {index: 210},
      component: () => import('./views/pd/PDFillContinueForthPage.vue')
    },
    {
      path: '/dayuepd/fill/female/stop/second',
      name: 'PDFillStopSecondPage',
      meta: {index: 211},
      component: () => import('./views/pd/PDFillStopSecondPage.vue')
    },
    {
      path: '/dayuepd/fill/female/stop/third',
      name: 'PDFillStopThirdPage',
      meta: {index: 212},
      component: () => import('./views/pd/PDFillStopThirdPage.vue')
    },
    {
      path: '/dayuepd/fill/female/stop/forth',
      name: 'PDFillStopForthPage',
      meta: {index: 213},
      component: () => import('./views/pd/PDFillStopForthPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
