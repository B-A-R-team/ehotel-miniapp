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
      url: `${app.globalData.root_url}actives/getby`,
      data: { id: hotel_id },
      success: (res) => {
        console.log(res);

        const { code, data } = res.data;
        // data.forEach((item) => {
        //   item['img_url'] = app.globalData['root_url'] + item['img_url'][0];
        // });
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
    // this.setData({
    //   activeList: [
    //     {
    //       imageUrl: '/assets/active02.jpg',
    //       title: '超级马里奥赛车8 - 线下友谊赛',
    //       status: '未开始',
    //       time: '2020/09/01 - 2020/09/15',
    //     },
    //     {
    //       imageUrl: '/assets/active01.jpg',
    //       title: '英雄联盟酒店巡回赛 - 个人SOLO赛',
    //       status: '进行中',
    //       time: '2020/08/15 - 2020/09/15',
    //     },
    //     {
    //       imageUrl: '/assets/active03.png',
    //       title: '英雄联盟酒店巡回赛 - 团队赛',
    //       status: '已结束',
    //       time: '2020/07/15 - 2020/08/15',
    //     },
    //   ],
    // });
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
