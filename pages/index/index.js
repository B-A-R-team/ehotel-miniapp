//index.js
const util = require('../../utils/util');
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperList: [],
    inTime: util.formatTime(new Date(), true),
    outTime: util.formatTime(new Date(), true),
    picker_start: util.formatTime(new Date(), true),
    picker_end: util.yearAdd1(new Date()),
    diffDay: 0,
    openCale: false,
    selectedDates: [],
    hotel_location_info: {
      name: '',
      // 113.610225,34.738107
      latitude: 0,
      longitude: 0,
    },
    phone: '001',
  },

  // 选择入住时间
  bindInTimeChange(e) {
    let { outTime } = this.data;

    let diffDay =
      (new Date(this.data.outTime) - new Date(e.detail.value)) /
      (1000 * 60 * 60 * 24);

    if (diffDay < 0) {
      outTime = e.detail.value;
      diffDay = 0;
    }

    this.setData({
      inTime: e.detail.value,
      diffDay,
      outTime,
    });
  },

  // 选择离店时间
  bindOutTimeChange(e) {
    this.setData({
      outTime: e.detail.value,
      diffDay:
        (new Date(e.detail.value) - new Date(this.data.inTime)) /
        (1000 * 60 * 60 * 24),
    });
  },

  getHotelInfo() {
    const { hotel_id } = app.globalData;
    console.log(hotel_id);
    wx.request({
      url: `${app.globalData.root_url}hotel/list/${hotel_id}`,
      success: (res) => {
        const { code, data } = res.data;
        // 设置酒店电话号
        app.globalData.hotelPhone = data.phone;
        app.globalData.hotelName = data.title;
        const localtion = {
          name: data.address + data.title,
          title: data.title,
          latitude: data.latitude,
          longitude: data.longitude,
        };
        if (code === 0) {
          let swiperList = [];
          data.swiperList.forEach((item) => {
            const url = app.globalData['root_url'] + item.replace(/\\/g, '/');
            swiperList.push(url);
          });

          this.setData({
            phone: data.phone,
            hotel_location_info: localtion,
            swiperList: swiperList,
          });
        }
      },
    });
  },

  // 改变日历状态
  changeCalendarStatus() {
    this.setData({
      openCale: !this.data.openCale,
    });
  },

  goHotel() {
    let plugin = requirePlugin('routePlan');
    let key = 'JRKBZ-R3AK5-UQDIL-QNJIP-CA6MO-ALF2N'; //使用在腾讯位置服务申请的key
    let referer = 'BAR电竞酒店平台'; //调用插件的app的名称
    const { name, latitude, longitude } = this.data.hotel_location_info;
    // 终点
    let endPoint = JSON.stringify({
      name,
      latitude,
      longitude,
    });
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
    this.getHotelInfo();

    if (app.globalData.userInfo) {
      console.log('app.globalData.userInfo');
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      console.log('this.data.canIUse');
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    } else {
      console.log('else');
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    }

    const time = util.formatTime(new Date(), true);
    this.setData({
      time,
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
