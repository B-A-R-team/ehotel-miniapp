// components/order-card/order-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
    },
    status: {
      type: String,
    },
    time: {
      type: String,
    },
    member: {
      type: String,
    },
    discount: {
      type: String,
      default: '无',
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
    toMore: function () {
      wx.showModal({
        title: '提示',
        content: '跳转详情页 - 未完成',
      });
    },
  },
});
