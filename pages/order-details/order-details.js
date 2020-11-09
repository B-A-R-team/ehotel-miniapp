// pages/order-details/order-details.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    roomId: 0,
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
    balance: 0,
    useBalance: false,
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
    const { balance, total_price, useBalance } = this.data;
    if (balance < total_price) {
      this.setData({
        useBalance,
      });
      return wx.showModal({
        title: '提示',
        content: '积分余额不足！',
        showCancel: false,
      });
    }
    this.setData({
      useBalance: !useBalance,
    });
  },

  // 发送订单数据
  sendRecord: function (record) {
    console.log(record);
    const { roomId, member, time, coupon, remarks, hotel_id, userId } = record;
    const token = wx.getStorageSync('token') || null;

    wx.request({
      url: `${app.globalData.root_url}record/create`,
      method: 'POST',
      header: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        hotel_id,
        room_id: Number(roomId),
        user_id: userId,
        member_message: JSON.stringify(member),
        remarks: `预计${time}到达 ${remarks}`,
        status: 'waiting',
        coupon: coupon ? coupon : 0,
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
    const token = wx.getStorageSync('token') || null;
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

    if (!member['name'] || !member['phone']) {
      return wx.showModal({
        title: '提示',
        content: '请输入姓名和电话号',
      });
    }

    const { hotel_id, userInfo } = app.globalData;

    this.rollRoom(roomId, () => {
      if (!this.data.useBalance) {
        const recordInfo = {
          roomId: this.data.roomId,
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
            this.useRoom(recordInfo['roomId'], () => {
              wx.request({
                url: `${app.globalData.root_url}user/decrease`,
                method: 'PUT',
                header: {
                  Authorization: 'Bearer ' + token,
                },
                data: {
                  id: userInfo['userId'],
                  money: Number(total_price),
                },
                success: (res) => {
                  const { code } = res.data;
                  if (code === 0) {
                    this.sendRecord(recordInfo);
                  }
                },
              });
            });
          },
        });
      }
    });
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

  // 获取优惠券
  getCoupons: function () {
    const { userId } = app.globalData.userInfo;
    wx.request({
      url: `${app.globalData.root_url}coupon/getby/user/${userId}`,
      method: 'GET',
      success: (res) => {
        const { code, data } = res.data;
        if (code === 0) {
          this.setData({
            coupons: data,
          });
        }
      },
    });
  },

  // 获取房间
  rollRoom: function (typeId, callback) {
    wx.request({
      url: `${app.globalData.root_url}room/getByType`,
      method: 'GET',
      data: {
        typeId,
      },
      success: (res) => {
        const { code, data } = res.data;
        console.log(data);
        if (code === 0) {
          const room = data['rooms'].filter(
            (item) => item['is_used'] === false
          )[0];
          this.setData({
            roomId: room['id'],
          });
          callback();
        }
      },
    });
  },

  useRoom: function (roomId, callback) {
    const token = wx.getStorageSync('token') || null;
    wx.request({
      url: `${app.globalData.root_url}room/update/${roomId}`,
      method: 'PUT',
      header: {
        Authorization: 'Bearer ' + token,
      },
      data: { is_used: true },
      success: (res) => {
        const { code } = res.data;
        if (code !== 0) {
          return wx.showModal({
            title: '下单失败',
            content: '房间获取出错',
          });
        } else {
          callback();
        }
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCoupons();

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
      balance: wx.getStorageSync('paid_balance'),
    });
    this.getTotlePrice();
  },
});
