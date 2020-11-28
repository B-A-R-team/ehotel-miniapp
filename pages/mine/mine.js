// pages/mine.js
const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    intergal: 0,
    paid_balance: 0,
    hotelPhone: '',
  },
  // 去充值
  toRecharge: function () {
    this.isLogin()
      ? wx.navigateTo({
          url: '/pages/recharge/recharge',
        })
      : wx.showModal({
          title: '提示',
          content: '请先登录',
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
        const { code } = res;
        wx.request({
          // url: `http://localhost:1239/user/loginforwx`,
          url: `${app.globalData.root_url}user/loginforwx`,
          method: 'POST',
          data: {
            code,
            nickname: nickName,
            avatar_url: avatarUrl,
          },
          success: (res) => {
            const { user, token } = res.data.data;

            try {
              wx.setStorageSync('userId', user['id']);
              wx.setStorageSync('nickname', user['nickname']);
              wx.setStorageSync('avatar_url', user['avatar_url']);
              wx.setStorageSync('intergal', user['integral']);
              wx.setStorageSync('paid_balance', user['paid_balance']);
              wx.setStorageSync('token', token);
            } catch (e) {
              console.log(e);
            }
            app.globalData['userInfo'] = {
              userId: user['id'],
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
  updateLogin: function () {
    const userId = wx.getStorageSync('userId') || null;
    const token = wx.getStorageSync('token') || null;

    if (!userId) {
      return;
    }
    wx.request({
      url: `${app.globalData['root_url']}user/list/${userId}`,
      header: {
        Authorization: 'Bearer ' + token,
      },
      success: (res) => {
        const { code, data: user } = res.data;
        if (code === 0) {
          wx.setStorageSync('intergal', user['integral']);
          wx.setStorageSync('paid_balance', user['paid_balance']);
          this.setData({
            intergal: user['integral'],
            paid_balance: user['paid_balance'],
          });
        }
      },
    });
  },
  // 获取微信用户信息
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  isLogin: function () {
    const userId = wx.getStorageSync('userId') || '';
    return userId !== '';
  },
  unLogin: function (event) {
    !this.isLogin()
      ? wx.showModal({
          title: '提示',
          content: '请先登录',
        })
      : wx.navigateTo({ url: event.currentTarget.dataset.url });
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
    this.setData({
      hotelPhone: app.globalData['hotelPhone'],
    });
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
    this.updateLogin();
  },
});
