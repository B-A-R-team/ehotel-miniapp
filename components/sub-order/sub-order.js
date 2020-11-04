// components/sub-order/sub-order.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
    },
    isLogin: {
      type: Boolean,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderList: [],
    activeItem: 0,
    userId: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 重新获取活动项，并刷新列表
    reloadAll: function (activeItem) {
      const { list } = this.properties;
      this.setData({
        activeItem,
      });

      let tempArr = [];
      switch (activeItem) {
        case 0:
          tempArr = list;
          break;
        case 1:
          tempArr = list.filter((item) => {
            return item['status'] === '待付款';
          });
          break;
        case 2:
          tempArr = list.filter((item) => {
            return item['status'] === '待入住';
          });
          break;
        case 3:
          tempArr = list.filter((item) => {
            return item['status'] === '已完成';
          });
          break;
      }

      this.setData({
        orderList: tempArr,
      });
    },
  },
  ready() {
  },
  attached() {
    this.setData({
      userId: app.globalData['hotel_id'],
    });
  },
});
