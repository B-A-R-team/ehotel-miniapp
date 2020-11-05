// components/vip-card/vip-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
    },
    hotelName: {
      type: String,
    },
    isVip: {
      type: Boolean,
    },
    vipId: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    toVip: function () {
      wx.navigateTo({
        url: '/pages/recharge/recharge?becamevip=true',
      });
    },
  },
});
