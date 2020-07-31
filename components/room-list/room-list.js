// components/room-list/room-list.js
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
    rooms: [
      {
        roomId: 'asd123',
        thumbImg: '/assets/default_room.jpg',
        title: '水床',
        remarks: '1223',
        newPrice: 100,
        oldPrice: 200,
        lastCount: 2,
      },
      {
        roomId: 'asd127',
        thumbImg: '/assets/default_room.jpg',
        title: '大床房',
        remarks: '1223',
        newPrice: 100,
        oldPrice: 200,
        lastCount: 2,
      },
      {
        roomId: 'asd126',
        thumbImg: '/assets/default_room.jpg',
        title: '双人床',
        remarks: '1223',
        newPrice: 100,
        oldPrice: 200,
        lastCount: 0,
      },
      {
        roomId: 'asd125',
        thumbImg: '/assets/default_room.jpg',
        title: '三人房',
        remarks: '1223',
        newPrice: 100,
        oldPrice: 200,
        lastCount: 2,
      },
      {
        roomId: 'asd124',
        thumbImg: '/assets/default_room.jpg',
        title: '商务标间',
        remarks: '1223',
        newPrice: 100,
        oldPrice: 200,
        lastCount: 2,
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
