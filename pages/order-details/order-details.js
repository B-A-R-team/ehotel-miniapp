// pages/order-details/order-details.js
const app = getApp();

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
    member: {
      name: '',
      phone: '',
    },
    couponIdx: -1,
    explain_html: `
      <p>订房说明</p>
      <p class="white"></p>
      <p>入住政策</p>
      <p>如需发票，请向前台索要</p>
      <p>最晚退房时间为最后一天中午12:00</p>
    `,
    remarks: '',
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
    if (e.detail.value < 0) return;
    this.setData({
      couponIdx: e.detail.value,
    });
    this.getTotlePrice();
  },
  // 更改消费方式
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

  // 发送订单数据
  sendRecord: function (record) {
    console.log(record);
    const {
      roomId,
      total_price,
      room_count,
      member,
      time,
      coupon,
      remarks,
      hotel_id,
      userId,
    } = record;
    const token = wx.getStorageSync('token') || null;

    wx.request({
      url: `${app.globalData.root_url}records/create`,
      method: 'POST',
      header: {
        Authorization: token.replace('Bear ', ''),
      },
      data: {
        hotel_id,
        room_id: roomId,
        guest_id: userId,
        member_message: member,
        remarks: `预计${time}到达 ${remarks}`,
        status: '待入住',
        coupon,
        price: total_price,
        room_count,
      },
      success: (res) => {
        const { code, data } = res.data;
        if (code === 0) {
          wx.switchTab({
            url: '/pages/order/order',
          });
        }
      },
    });
  },

  // 支付
  doSell: function () {
    const {
      roomId,
      total_price,
      room_count,
      member,
      time,
      coupons,
      couponIdx,
      remarks,
    } = this.data;

    const { hotel_id, userInfo } = app.globalData;

    if (!this.data.useIntergal) {
      const recordInfo = {
        roomId,
        total_price,
        room_count,
        member,
        time,
        coupon: coupons[couponIdx],
        remarks,
        hotel_id,
        userId: userInfo['userId'],
      };
      wx.showModal({
        title: '微信支付',
        content: `${recordInfo.total_price}`,
        success: () => {
          this.sendRecord(recordInfo);
        },
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

  // 输入入住人姓名
  inputName: function (e) {
    let { member } = this.data;
    member['name'] = e.detail.value;

    this.setData({
      member,
    });
  },

  // 输入手机号
  inputPhone: function (e) {
    let { member } = this.data;
    member['phone'] = e.detail.value;

    this.setData({
      member,
    });
  },

  // 输入备注
  inputRemarks: function (e) {
    this.setData({
      remarks: e.detail.value,
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
