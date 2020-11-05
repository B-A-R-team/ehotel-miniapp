const { formatTime } = require('../../utils/util');

// pages/coupon/coupon.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
  },

  getCoupon: function () {
    wx.showLoading({ title: '加载中' });
    const userId = wx.getStorageSync('userId');
    wx.request({
      url: `${app.globalData.root_url}coupon/getby/user/${userId}`,
      method: 'GET',
      success: (res) => {
        wx.hideLoading();
        const { code, data } = res.data;

        if (data.length <= 0) {
          return;
        }

        if (code === 0) {
          // console.log(formatTime(new Date(data[0]['start_time']), true));
          console.log(new Date(Number(data[0]['start_time'])));
          this.setData({
            couponList: data.map(
              (item) =>
                !item['is_used'] && {
                  label: item['label'],
                  is_full_down: item['is_full_down'],
                  limit_price: item['limit_price'],
                  reduce_price: item['reduce_price'],
                  start_time: formatTime(
                    new Date(Number(item['start_time'])),
                    true
                  ),
                  end_time: formatTime(
                    new Date(Number(item['end_time'])),
                    true
                  ),
                  remarks: item['remarks'],
                }
            ),
          });
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCoupon();
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
