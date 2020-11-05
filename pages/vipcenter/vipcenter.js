// pages/vipcenter/vipcenter.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    vip_info: {},
    powerList: [],
    hotelName: '',
  },

  getUser() {
    const userId = wx.getStorageSync('userId') || null;
    const token = wx.getStorageSync('token') || null;

    wx.request({
      url: `${app.globalData['root_url']}user/list/${userId}`,
      header: {
        Authorization: 'Bearer ' + token,
      },
      success: (res) => {
        const { code, data } = res.data;
        if (code === 0) {
          this.setData({
            vip_info: {
              name: data['nickname'],
              time: '2020.09.09',
              isVip: data['is_vip'],
              vipId: data['id'].toString().padStart(12, 0),
            },
          });
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hotelName: app.globalData.hotelName,
    });
    this.setData({
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
  onShow: function () {
    this.getUser();
  },

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
