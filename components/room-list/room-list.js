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
    getRooms: function() {
      const {
        hotel_id
      } = app.globalData;
      wx.request({
        url: `${app.globalData.root_url}room/type/list`,
        data: {
          id: hotel_id
        },
        success: (res) => {
          const {
            code,
            data
          } = res.data;
          if (code === 0) {
            this.setData({
              rooms: data,
            });
            data.forEach((item,index) => {
              wx.request({
                url: `${app.globalData.root_url}room/getByType`,
                data: {
                  typeId: item.id
                },
                success: (res) => {
                  const {
                    data,
                    code
                  } = res.data
                  if (code === 0 && data.rooms.length > 0) {
                    let rooms = this.data.rooms
                    let lastCount = data.rooms.filter((item) => item.is_used === false).length
                    rooms[index].new_price = data.rooms[0].new_price
                    rooms[index].old_price = data.rooms[0].old_price
                    rooms[index].lastCount = lastCount
                    console.log(JSON.parse(data.rooms[0]['img_url'] || '[]') )
                    rooms[index].img_url = app.globalData['root_url'] + JSON.parse(data.rooms[0]['img_url'] || '[]')[0]
                    this.setData({
                      rooms
                    })
                  }
                }
              })
            })

          }
        },
      });
    },
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.getRooms();
    },
    detached: () => {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});