// pages/recharge/recharge.js
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
    wx.showModal({
      title: '支付',
      content: `￥${this.data.select_money[this.data.selected]['value']}`,
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
