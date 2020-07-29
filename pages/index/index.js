//index.js
const util = require('../../utils/util');
//获取应用实例
const app = getApp();

Page({
  data: {
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperList: [],
    inTime: util.formatTime(new Date(), true),
    outTime: util.formatTime(new Date(), true),
    diffDay: 0,
  },
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
        selected: -1,
      });
    }
  },
});
