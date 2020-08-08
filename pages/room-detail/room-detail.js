// pages/room-detail/room-detail.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    room: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { roomid } = options;
    this.getRoom(roomid);
  },

  getRoom: function (id) {
    wx.request({
      url: `${app.globalData.root_url}rooms/${id}`,
      header: {
        Authorization: `${wx.getStorageSync('token')}`,
      },
      success: (res) => {
        const { code, data } = res.data;
        if (code === 0) {
          data['img_url'].forEach((item, index) => {
            data['img_url'][index] = app.globalData['root_url'] + item;
            data['room_info'] = JSON.parse(data['room_info']);
            data['computer_info'] = JSON.parse(data['computer_info']);
          });

          this.setData({
            room: data,
          });
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
