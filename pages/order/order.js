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

    if (!token || !userId) {
      return;
    }

    wx.request({
      url: `${app.globalData.root_url}record/getByuserId`,
      header: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        userId,
      },
      success: (res) => {
        const { code, data } = res.data;
        let list = [];
        data.forEach((item) => {
          const { hotel, room, user, ...rest } = item;
          list.push({
            ...item,
            title: item['room']['title'],
            member: JSON.parse(item['member_message'])['name'],
            time: util.formatTime(new Date(item['create_at']), true),
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

    if (!userInfo || !userInfo['userId']) {
      isLogin = false;
      wx.hideLoading();
    }
    console.log(isLogin);
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
