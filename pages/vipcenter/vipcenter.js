// pages/vipcenter/vipcenter.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vip_info: {},
    powerList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vip_info: {
        name: '200OK',
        time: '2020.09.09',
        isVip: true,
        vipId: '0001 0001 1234',
      },
      powerList: [
        {
          label: '优惠券',
          thumb: '/assets/power_coupon.png',
        },
        {
          label: '积分奖励',
          thumb: '/assets/power_intergal.png',
        },
        {
          label: '延时退房',
          thumb: '/assets/power_time.png',
        },
        {
          label: '用品折扣',
          thumb: '/assets/power_precent.png',
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
