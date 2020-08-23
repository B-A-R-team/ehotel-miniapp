// pages/mine.js
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    intergal: -1,
    paid_balance: -1,
  },
  // 去充值
  toRecharge: function () {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    });
  },
  // 积分兑换
  toIntergal: function () {
    wx.showModal({
      title: '提示',
      content: '跳转积分兑换页 - 未完成',
    });
  },
  toLogin: function (e) {
    wx.showLoading({
      title: '正在登陆',
    });
    this.getUserInfo(e);
    const { nickName, avatarUrl } = this.data.userInfo;
    // 登录
    wx.login({
      success: (res) => {
        wx.hideLoading();
        console.log(res);
        const { code } = res;
        wx.request({
          url: `${app.globalData.root_url}users/loginforwx`,
          method: 'POST',
          data: {
            code,
            nickname: nickName,
            avatar_url: avatarUrl,
          },
          success: (res) => {
            const { user, token } = res.data;

            try {
              wx.setStorageSync('userId', user['_id']);
              wx.setStorageSync('nickname', user['nickname']);
              wx.setStorageSync('avatar_url', user['avatar_url']);
              wx.setStorageSync('intergal', user['integral']);
              wx.setStorageSync('paid_balance', user['paid_balance']);
              wx.setStorageSync('token', token);
            } catch (e) {
              console.log(e);
            }
            app.globalData['userInfo'] = {
              userId: user['_id'],
              nickName: user['nickname'],
              avatarUrl: user['avatar_url'],
            };
            app.globalData['intergal'] = user['integral'];
            app.globalData['paid_balance'] = user['paid_balance'];
            this.setData({
              intergal: user['integral'],
              paid_balance: user['paid_balance'],
            });
          },
        });
      },
    });
  },
  // 获取微信用户信息
  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  onLoad: function () {
    const { userInfo, intergal, paid_balance } = app.globalData;
    // 判断是否有登陆信息
    if (userInfo !== null && userInfo['nickName'] != null) {
      this.setData({
        userInfo,
        intergal,
        paid_balance,
        hasUserInfo: true,
      });
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
  },
});
