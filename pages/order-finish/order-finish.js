const util = require('../../utils/util');

// pages/order-finish/order-finish.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中' });
    const { orderId } = options;

    this.getOrderInfo(orderId);
  },

  // 获取订单信息
  getOrderInfo: function (id) {
    const token = wx.getStorageSync('token') || null;
    wx.request({
      url: `${app.globalData.root_url}records/getbyId`,
      header: {
        Authorization: token.replace('Bear ', ''),
      },
      data: {
        id,
      },
      success: (res) => {
        const { code, data } = res.data;
        if (code === 0) {
          this.setData({
            orderInfo: {
              status: data['status'],
              order_id: id,
              time: util.formatTime(new Date(data['time'])),
              room_title: data['title'],
              room_count: 1,
              memeber: JSON.parse(data['member'])['name'],
              phone: JSON.parse(data['member'])['phone'],
              payment_style: '微信支付',
              price: data['price'] + data['discount'],
              coupon: data['discount'],
              totel_price: data['price'],
            },
          });
          wx.hideLoading();
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
