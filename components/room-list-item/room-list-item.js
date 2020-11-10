// components/room-list-item/room-list-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    roomId: {
      type: String,
    },
    thumbImg: {
      type: String,
      value: '/assets/default_room.jpg',
    },
    title: {
      type: String,
      value: '未设定',
    },

    newPrice: {
      type: Number,
      value: 50,
    },
    oldPrice: {
      type: Number,
      value: 100,
    },
    lastCount: {
      type: Number,
      value: 0,
    },
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
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    toOrder() {
      if (this.data.newPrice <= 0) {
        return wx.showModal({
          title: '提示',
          content: '该房型中暂无房间',
        });
      }
      if (this.data.lastCount <= 0) {
        return wx.showModal({
          title: '提示',
          content: '该类房间已无空房',
        });
      }
      const {
        roomId,
        inTime,
        outTime,
        diffDay,
        title,
        newPrice,
        lastCount,
      } = this.properties;
      wx.redirectTo({
        url: `/pages/order-details/order-details?roomId=${roomId}&inTime=${inTime}&outTime=${outTime}&diffDay=${diffDay}&title=${title}&price=${newPrice}&empty_count=${lastCount}`,
      });


    },
    toDetail() {
      if (this.properties.newPrice) {
        const {
          roomId
        } = this.properties;
        console.log(roomId)
        wx.redirectTo({
          url: `/pages/room-detail/room-detail?roomid=${roomId}`,
        });
      } else {
        wx.showToast({
          title: '该房型暂无房间',
          icon:'none'
        })
      }

    },
  },
});