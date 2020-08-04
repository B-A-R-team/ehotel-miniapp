// pages/mine.js
Page({
  // 去充值
  toRecharge: function () {
    wx.showModal({
      title: '提示',
      content: '跳转充值页 - 未完成',
    });
  },
  // 积分兑换
  toIntergal: function () {
    wx.showModal({
      title: '提示',
      content: '跳转积分兑换页 - 未完成',
    });
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
  },
});
