// pages/order-details/order-details.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    roomId: '',
    inTime: '',
    outTime: '',
    diffDay: 0,
    room: {
      title: '测试房间',
      empty_count: 2,
      price: 100,
    },
    room_count: 1,
    time: '08:00',
    total_price: 0,
    intergal: 1024,
    useIntergal: false,
    coupons: [12.5, 2, 6, 30.4],
    couponIdx: -1,
    explain_html: `
      <p>订房说明</p>
      <p class="white"></p>
      <p>入住政策</p>
      <p>如需发票，请向前台索要</p>
      <p>最晚退房时间为最后一天中午12:00</p>
    `,
  },
  // 选择到达时间
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value,
    });
  },
  // 添加房间数
  increaseRoomCount: function () {
    this.setData({
      room_count: this.data.room_count + 1,
    });
    this.getTotlePrice();
  },
  // 减少房间数
  decreaseRoomCount: function () {
    const { room_count } = this.data;
    if (room_count <= 1) {
      return;
    }
    this.setData({
      room_count: room_count - 1,
    });
    this.getTotlePrice();
  },
  // 选择优惠券
  bindCouponChange: function (e) {
    this.setData({
      couponIdx: e.detail.value,
    });
    this.getTotlePrice();
  },
  // 更是消费方式
  useVipChange: function () {
    const { intergal, total_price, useIntergal } = this.data;
    if (intergal < total_price) {
      this.setData({
        useIntergal,
      });
      return wx.showModal({
        title: '提示',
        content: '积分余额不足！',
        showCancel: false,
      });
    }
    this.setData({
      useIntergal: !useIntergal,
    });
  },
  // 支付
  doSell: function () {
    if (!this.data.useIntergal) {
      wx.showModal({
        title: '微信支付',
        content: `支付金额: ${this.data.total_price}`,
      });
    }
  },
  // 计算总价
  getTotlePrice: function () {
    const { price } = this.data.room;
    const { diffDay, room_count, couponIdx, coupons } = this.data;

    const total_price =
      price * room_count * (diffDay !== 0 ? diffDay : 1) -
      (couponIdx !== -1 ? coupons[couponIdx] : 0);

    this.setData({
      total_price,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      roomId,
      inTime,
      outTime,
      diffDay,
      title,
      price,
      empty_count,
    } = options;

    const room = {
      title,
      price,
      empty_count,
    };

    this.setData({
      roomId,
      inTime,
      outTime,
      diffDay: parseInt(diffDay),
      room,
    });
    this.getTotlePrice();
  },
});
