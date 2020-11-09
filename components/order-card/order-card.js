// components/order-card/order-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderId: {
      type: String,
    },
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
    imgUrl: {
      type: String,
      default: '/assets/default_room.jpg',
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
      const { orderId } = this.properties;
      wx.navigateTo({
        url: `/pages/order-finish/order-finish?orderId=${orderId}`,
      });
    },
  },
});
