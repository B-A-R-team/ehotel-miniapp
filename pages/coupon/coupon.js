// pages/coupon/coupon.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      couponList: [
        {
          title: '新人专享优惠券',
          time: '2021/07/01',
          num: 8,
          unit: '折',
        },
        {
          title: '中秋优惠券',
          time: '2021/07/01',
          num: 20,
          unit: '元',
        },
        {
          title: '周年庆优惠券',
          time: '2021/07/01',
          num: 5,
          unit: '折',
        },
      ],
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
