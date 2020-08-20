// pages/order-finish/order-finish.js
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
    console.log(options);
    this.setData({
      orderInfo: {
        status: '已完成',
        order_id: '123456999999',
        time: '2020-01-01 09:09:09',
        room_title: '标准间',
        room_count: 1,
        memeber: '小明',
        phone: '12312312331',
        payment_style: '微信支付',
        price: 200,
        coupon: '无',
        totel_price: 200,
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
