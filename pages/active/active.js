// pages/active/active.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeList: [],
  },

  getActive: function () {
    const { hotel_id } = app.globalData;

    wx.request({
      url: `${app.globalData.root_url}active/getbyhotel`,
      data: { hotelId: hotel_id },
      success: (res) => {
        const { code, data } = res.data;
        data.forEach((item) => {
          item['time'] = `${item['start_time']} - ${item['end_time']}`;
          item['img_url'] =
            app.globalData['root_url'] + item['img_url'].replace(/\\/g, '/');
          if (new Date(item['start_time']).getTime() > Date.now()) {
            item['status'] = '未开始';
          } else if (new Date(item['end_time']).getTime() < Date.now()) {
            item['status'] = '已结束';
          } else {
            item['status'] = '进行中';
          }
        });
        if (code === 0) {
          this.setData({
            activeList: data,
          });
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActive();
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
