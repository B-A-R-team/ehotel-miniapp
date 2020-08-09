// components/sub-order/sub-order.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // activeItem: {
    //   type: Number,
    // },
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderList: [
      {
        title: '超级大床房',
        status: '已完成',
        time: '2020-01-01 12:00',
        member: '小明',
        discount: '￥12.5',
      },
      {
        title: '商务标间',
        status: '待付款',
        time: '2020-01-02 12:00',
        member: '小明',
        discount: '无',
      },
      {
        title: '家庭套房',
        status: '待入住',
        time: '2020-01-03 12:00',
        member: '小明',
        discount: '￥20',
      },
      {
        title: '大床房',
        status: '已完成',
        time: '2020-01-01 13:00',
        member: '小明',
        discount: '￥5',
      },
    ],
    activeItem: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 重新获取活动项，并刷新列表
    reloadAll: function (activeItem) {
      this.setData({
        activeItem,
      });

      let tempArr = [];
      switch (activeItem) {
        case 0:
          tempArr = [
            {
              title: '超级大床房',
              status: '已完成',
              time: '2020-01-01 12:00',
              member: '小明',
              discount: '￥12.5',
            },
            {
              title: '商务标间',
              status: '待付款',
              time: '2020-01-02 12:00',
              member: '小明',
              discount: '无',
            },
            {
              title: '家庭套房',
              status: '待入住',
              time: '2020-01-03 12:00',
              member: '小明',
              discount: '￥20',
            },
            {
              title: '大床房',
              status: '已完成',
              time: '2020-01-01 13:00',
              member: '小明',
              discount: '￥5',
            },
          ];
          break;
        case 1:
          tempArr = [
            {
              title: '商务标间',
              status: '待付款',
              time: '2020-01-02 12:00',
              member: '小明',
            },
          ];
          break;
        case 2:
          tempArr = [
            {
              title: '家庭套房',
              status: '待入住',
              time: '2020-01-03 12:00',
              member: '小明',
              discount: '￥20',
            },
          ];
          break;
        case 3:
          tempArr = [
            {
              title: '超级大床房',
              status: '已完成',
              time: '2020-01-01 12:00',
              member: '小明',
              discount: '￥12.5',
            },
            {
              title: '大床房',
              status: '已完成',
              time: '2020-01-01 13:00',
              member: '小明',
              discount: '￥5',
            },
          ];
          break;
      }

      this.setData({
        orderList: tempArr,
      });
    },
  },
});
