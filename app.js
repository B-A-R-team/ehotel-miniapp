//app.js
const HOTELID = '5f15898e9e625204e0c20b29';
const ROOTURL = 'https://www.barteam.cn:1239/';

App({
  onLaunch: function () {
    wx.checkSession({
      success: () => {
        console.log('登陆未过期');
        // 登陆未过期，取出数据
        const userId = wx.getStorageSync('userId') || null;
        const nickName = wx.getStorageSync('nickname') || null;
        const avatarUrl = wx.getStorageSync('avatar_url') || null;
        const intergal = wx.getStorageSync('intergal') || 0;
        const paid_balance = wx.getStorageSync('paid_balance') || 0;

        this.globalData.userInfo = { userId, nickName, avatarUrl };
        this.globalData['intergal'] = intergal;
        this.globalData['paid_balance'] = paid_balance;
      },
      fail() {
        console.log('登陆已过期');
        wx.clearStorageSync();
      },
    });
  },
  globalData: {
    userInfo: null,
    intergal: 0,
    paid_balance: 0,
    hotel_id: HOTELID,
    root_url: ROOTURL,
  },
  onHide: function () {},
});
