const util = require('../../utils/util');

// pages/order/order.js
const app = getApp();

Page({
  data: {
    navItems: ['全部', '待付款', '待入住', '已完成'],
    activeItem: 0,
    list: [],
    isLogin: false,
  },
  changeActive: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      activeItem: index,
    });
    this.selectComponent('#sub').reloadAll(index);
  },
  getOrderList: function () {
    const userId = wx.getStorageSync('userId') || null;
    const token = wx.getStorageSync('token') || null;
    wx.request({
      url: `${app.globalData.root_url}records/getby`,
      header: {
        Authorization: token.replace('Bear ', ''),
      },
      data: {
        guestId: userId,
      },
      success: (res) => {
        const { code, data } = res.data;
        let list = [];
        data.forEach((item) => {
          list.push({
            ...item,
            member: JSON.parse(item['member'])['name'],
            time: util.formatTime(new Date(item['time']), true),
          });
        });
        if (code === 0) {
          this.setData({
            list,
          });
          this.selectComponent('#sub').reloadAll(0);
          wx.hideLoading();
        }
      },
    });
  },
  // 判断登陆状态
  inspectLogin: function () {
    const userInfo = app.globalData['userInfo'] || null;
    let isLogin = true;

    if (!userInfo['userId']) {
      isLogin = false;
    }

    this.setData({
      isLogin,
    });
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    this.inspectLogin();
    this.getOrderList();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },
});
