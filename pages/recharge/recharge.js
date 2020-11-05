// pages/recharge/recharge.js
const app = getApp();

Page({
  data: {
    select_money: [],
    selected: 0,
    balance: 357,
    isAgree: true,
  },

  changeAgree: function () {
    this.setData({
      isAgree: !this.data.isAgree,
    });
  },

  changeMoney: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.idx,
    });
  },

  getBalance: function () {
    const balance = wx.getStorageSync('paid_balance') || 0;
    this.setData({
      balance,
    });
  },

  showPayment: function () {
    const userId = wx.getStorageSync('userId') || null;
    const token = wx.getStorageSync('token') || null;
    const integral = wx.getStorageSync('intergal') || null;

    if (!token || !userId) {
      return;
    }

    wx.showModal({
      title: '支付',
      content: `￥${this.data.select_money[this.data.selected]['value']}`,
      success: () => {
        console.log(`￥${this.data.select_money[this.data.selected]['value']}`);
        wx.request({
          url: `${app.globalData['root_url']}user/increase`,
          header: {
            Authorization: 'Bearer ' + token,
          },
          method: 'PUT',
          data: {
            id: userId,
            money: this.data.select_money[this.data.selected]['value'],
          },
          success: (res) => {
            const { code, message } = res.data;
            if (code === 0) {
              // 添加积分
              wx.request({
                url: `${app.globalData['root_url']}user/changeIntegral`,
                header: {
                  Authorization: 'Bearer ' + token,
                },
                method: 'PUT',
                data: {
                  id: userId,
                  integral:
                    this.data.select_money[this.data.selected]['intergal'] +
                    integral,
                },
                success: (res) => {
                  const { code, message: integralMessage } = res.data;
                  if (code === 0) {
                    wx.navigateBack();
                  } else {
                    wx.showModal({
                      title: '积分添加失败',
                      content: integralMessage,
                      success: () => {
                        wx.navigateBack();
                      },
                      fail: () => {
                        wx.navigateBack();
                      },
                    });
                  }
                },
              });
            } else {
              wx.showModal({
                title: '充值失败',
                content: message,
                success: () => {
                  wx.navigateBack();
                },
                fail: () => {
                  wx.navigateBack();
                },
              });
            }
          },
        });
      },
    });
  },

  onLoad() {
    this.getBalance();
    this.setData({
      select_money: [
        {
          idx: 0,
          value: 300,
          intergal: 50,
        },
        {
          idx: 1,
          value: 500,
          intergal: 100,
        },
        {
          idx: 2,
          value: 1000,
          intergal: 300,
        },
        {
          idx: 3,
          value: 1500,
          intergal: 500,
        },
        {
          idx: 4,
          value: 2000,
          intergal: 750,
        },
        {
          idx: 5,
          value: 3000,
          intergal: 1000,
        },
      ],
    });
  },
});
