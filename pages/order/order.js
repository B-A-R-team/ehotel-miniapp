// pages/order/order.js
Page({
  data: {
    navItems: ['全部', '待付款', '待入住', '已完成'],
    activeItem: 0,
  },
  changeActive: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      activeItem: index,
    });
    this.selectComponent('#sub').reloadAll(index);
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },
});
