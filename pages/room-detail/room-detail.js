// pages/room-detail/room-detail.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    room: {},
    BASE_URL:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      roomid
    } = options;
    this.setData({ BASE_URL: app.globalData.root_url})
    this.getRoom(roomid);
  },

  getRoom: function(id) {
    wx.request({
      url: `${app.globalData.root_url}room/getByType`,
      header: {
        Authorization: `${wx.getStorageSync('token')}`,
      },
      data: {
        typeId: id
      },
      success: (res) => {
        const {
          code,
          data
        } = res.data;
        console.log(res)
        if (code === 0) {
          if (data.rooms.length>0 && data.rooms[0] ) {
            const computer_info = JSON.parse(data.rooms[0].computer_info || '{}')
            const room_info = JSON.parse(data.rooms[0].room_info || '{}')
            let img_url =  JSON.parse(data.rooms[0].img_url || '[]')
            img_url = img_url.map((item) => {
              return item.replace(/\\/g, '/')
            })
            const area = data.rooms[0].type.area
            const floor = data.rooms[0].type.floor[0]
            this.setData({
              room: {
                computer_info,
                room_info,
                img_url,
                area,
                floor
              }
            })
          } 
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
});