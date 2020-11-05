// components/active-card/active-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageUrl: {
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
    activeId: {
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
    toDetail: function (e) {
      console.log(e.currentTarget.dataset.id);
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: () => {
      // 在组件实例被从页面节点树移除时执行
    },
  },
});
