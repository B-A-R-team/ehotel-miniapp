// components/room-list/room-list.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inTime: {
      type: String,
    },
    outTime: {
      type: String,
    },
    diffDay: {
      type: Number,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    rooms: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getRooms: function () {
      const { hotel_id } = app.globalData;
      wx.request({
        url: `${app.globalData.root_url}room/list`,
        data: { id: hotel_id },
        success: (res) => {
          const { code, data } = res.data;
          data.forEach((item) => {
            item['img_url'] =
              app.globalData['root_url'] + JSON.parse(item['img_url'])[0];
          });
          if (code === 0) {
            this.setData({
              rooms: data,
            });
          }
        },
      });
    },
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.getRooms();
    },
    detached: () => {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
