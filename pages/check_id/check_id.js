// pages/check_id/check_id.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: "",
    college: "",
    name: "",
    gender: "",
    phonenumber: "",
    code: "",
    disabled: "",
    color: '#238679',
    currentTime: 61,
    text: "获取"
  },
  setNumber: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  setCollege: function (e) {
    this.setData({
      college: e.detail.value
    })
  },
  setName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  setGender: function (e) {
    this.setData({
      gender: e.detail.value
    })
  },
  setPhone: function (e) {
    this.setData({
      phonenumber: e.detail.value
    })
  },
  setCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindButtonTap: function (e) {
    var that = this;
    that.setData({
      disabled: true,  //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    });

    var phone = that.data.phonenumber;
    var currentTime = this.data.currentTime;  //把手机号跟倒计时值变例成js值
    if (phone == '' || phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确，请重试'
      });
      that.setData({
        disabled: false,
        color: '#238679'
      });
      return;
    }

    wx.request({
      url: app.globalData.host + "/users/getCode",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + wx.getStorageSync('token')
      },
      method: "POST",
      data: {

        phone: that.data.phonenumber,

      },
      complete: function (res) {
        if (res.data.status == 200) {
          that.setData({
            'disabled': true
          })
          wx.showToast({
            title: '验证码已发送',
            icon: 'success',
            duration: 500
          })
        } else if (res.data.status == 402) {
          wx.showToast({
            title: '您的发送频率过于频繁，请稍后重试',
            icon: 'loading',
            duration: 500
          })
        }
      }
    });

    var interval = setInterval(function () {
      currentTime--; //每执行一次让倒计时秒数减一
      that.setData({
        text: currentTime + 's', //按钮文字变成倒计时对应秒数
      });
      //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
      if (currentTime <= 0) {
        clearInterval(interval);
        that.setData({
          text: '重发',
          currentTime: 61,
          disabled: false,
          color: '#238679'
        })
      }
    }, 1000);
  },

  send: function () {
    var that = this;
    var number = that.data.number;
    var college = that.data.college;
    var name = that.data.name;
    var gender = that.data.gender;
    var phone = that.data.phonenumber;
    var code = that.data.code;
    if ((number === "") || (college === "") || (name === "") || (gender === "") || (phone === "") || (code === "")) {
      if (number === "") {
        wx.showModal({
          title: '提示',
          content: '学号不能为空，请重试'
        });
      }
      if (college === "") {
        wx.showModal({
          title: '提示',
          content: '学院不能为空，请重试'
        });
      }
      if (name === "") {
        wx.showModal({
          title: '提示',
          content: '姓名不能为空，请重试'
        });
      }
      if (gender === "") {
        wx.showModal({
          title: '提示',
          content: '性别不能为空，请重试'
        });
      }
      if (phone === "") {
        wx.showModal({
          title: '提示',
          content: '手机号不能为空，请重试'
        });
      }
      if (code === "") {
        wx.showModal({
          title: '提示',
          content: '验证码不能为空，请重试'
        });
      }
      return;
    }
    wx.request({
      url: app.globalData.host + '/users/verify',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + wx.getStorageSync('token')
      },
      method: "POST",
      data: {
        number: that.data.number,
        college: that.data.college,
        name: that.data.name,
        gender: that.data.gender,
        phone: that.data.phonenumber,
        code: that.data.code,
      },
      complete: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '验证成功',
            icon: 'success',
            duration: 500
          });

          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/discovery/discovery'
            })

          }, 1000)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            confirmText: "知道了",
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight * (750 / res.windowWidth),
        });

      }

    })
  }
})