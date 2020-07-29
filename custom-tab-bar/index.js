Component({
  data: {
    selected: -1,
    color: '#7A7E83',
    selectedColor: '#FFC000',
    list: [
      {
        pagePath: '/pages/recharge/recharge',
        text: '充值',
      },
      {
        pagePath: '/pages/order/order',
        text: '订单',
      },
      {
        pagePath: '/pages/mine/mine',
        text: '我的',
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index,
      });
    },
  },
});
