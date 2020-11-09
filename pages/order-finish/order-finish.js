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
      url: `${app.globalData.root_url}record/getByRecordId`,
      header: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        recordId: id,
      },
      success: (res) => {
        const { code, data } = res.data;
        if (code === 0) {
          console.log(data);
          this.setData({
            orderInfo: {
              status: data['status'],
              order_id: id.toString().padStart(12, 0),
              time: util.formatTime(new Date(data['create_at'])),
              room_title: data['room']['title'],
              room_count: 1,
              memeber: JSON.parse(data['member_message'])['name'], phone: JSON.parse(data['member_message'])['phone'],
              payment_style: '微信支付',
              price: data['room']['new_price'],
              coupon: data['coupon'],
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
