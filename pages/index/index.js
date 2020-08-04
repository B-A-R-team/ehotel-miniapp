//index.js
const util = require('../../utils/util');
//获取应用实例
const app = getApp();

Page({
  data: {
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 日历配置
    calendarConfig: {
      multi: true, // 是否开启多选
      disableMode: {
        // 禁用今天天之前的所有日期
        type: 'before',
      },
    },
    swiperList: [],
    inTime: util.formatTime(new Date(), true),
    outTime: util.formatTime(new Date(), true),
    diffDay: 0,
    openCale: false,
    selectedDates: [],
    hotel_location_info: {
      name: '棕榈树酒店',
      // 113.610225,34.738107
      latitude: 34.738107,
      longitude: 113.610225,
    },
    phone: '123456',
  },
  /**
   * 获取轮播图数据
   */
  getSwiperList() {
    wx.request({
      url:
        'https://mockapi.eolinker.com/7b7NMB9c75d613bc39c8f16e4e03a3d4a8f951750079dc5/swiper',
      success: (res) => {
        const { data } = res;
        if (data.code === 0) {
          this.setData({
            swiperList: data.data.swiperList,
          });
        }
      },
    });
  },
  // 选择日期后
  afterTapDay(e) {
    let { selectedDates } = e.detail;
    if (selectedDates.length <= 0) {
      return;
    }
    // 开始时间
    const start = selectedDates[0];
    // 结束时间
    const end = selectedDates[selectedDates.length - 1];

    let toSet = this.createToSet(start, end);

    if (selectedDates.length < 2) {
      toSet = [...selectedDates];
    }
    console.log(toSet);
    // 设置自动选中中间日期
    this.calendar.setSelectedDays(toSet);
    // 获得已选择的日期
    const options = {
      lunar: false, // 在配置showLunar为false, 但需返回农历信息时使用该选项
    };
    const selectedDay = this.calendar.getSelectedDay(options);

    // 重设入住、离店时间和总共入住时间
    const inTime = start.year + '-' + start.month + '-' + start.day;
    const outTime = end.year + '-' + end.month + '-' + end.day;
    this.setData({
      selectedDates: selectedDay,
      inTime,
      outTime,
      diffDay: selectedDay.length - 1,
    });
  },
  // 改变日历状态
  changeCalendarStatus() {
    this.setData({
      openCale: !this.data.openCale,
    });
  },
  // 生成toSet - 用来范围选择日期
  createToSet(start, end) {
    const startYear = start.year;
    const endYear = end.year;

    const startMonth = start.month;
    const endMonth = end.month;

    const startDay = start.day;
    const endDay = end.day;

    // return 数组
    let toSet = [];

    // 如果在同年同月
    if (startMonth === endMonth && startYear === endYear) {
      for (let i = startDay; i <= endDay; i++) {
        toSet.push({ year: startYear, month: startMonth, day: i });
      }
      return toSet;
    }
    // 如果在同年
    if (startYear === endYear) {
      for (let m = startMonth; m <= endMonth; m++) {
        for (let d = 1; d < 32; d++) {
          // 2月  闰年
          if (
            m === 2 &&
            util.isLeapYear(startYear) &&
            (d === 30 || d + startDay - 1 === 30)
          ) {
            break;
          }
          // 2月  平年
          if (
            m === 2 &&
            !util.isLeapYear(startYear) &&
            (d === 29 || d + startDay - 1 === 29)
          ) {
            break;
          }
          if ((d === 31 || d + startDay - 1 === 31) && !util.is31(m)) {
            // 一个月 30 天
            break;
          }
          if (m === startMonth) {
            // 判断计算后的日期是否超过31
            if (d + startDay - 1 >= 32) {
              break;
            }
            // 和起始日期同月
            toSet.push({ year: startYear, month: m, day: d + startDay - 1 });
          } else if (m === endMonth && d > endDay) {
            // 超过结束日期
            return toSet;
          } else {
            toSet.push({ year: startYear, month: m, day: d });
          }
        }
      }
    }

    /**
     * @todo 不同年
     */
  },
  goHotel() {
    let plugin = requirePlugin('routePlan');
    let key = 'VGDBZ-M7Z35-D2TIR-QPCW4-MVOMH-FDBTA'; //使用在腾讯位置服务申请的key
    let referer = 'BAR电竞酒店平台'; //调用插件的app的名称
    const { name, latitude, longitude } = this.data.hotel_location_info;
    // 终点
    let endPoint = JSON.stringify({ name, latitude, longitude });
    wx.navigateTo({
      url:
        'plugin://routePlan/index?key=' +
        key +
        '&referer=' +
        referer +
        '&endPoint=' +
        endPoint,
    });
  },
  // 打电话
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    });
  },
  onLoad: function () {
    this.getSwiperList();
    const time = util.formatTime(new Date(), true);
    this.setData({ time });
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true,
    //   });
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = (res) => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true,
    //     });
    //   };
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: (res) => {
    //       app.globalData.userInfo = res.userInfo;
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true,
    //       });
    //     },
    //   });
    // }
  },
  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }
  },
});
