// pages/userInfo/userInfo.js
// pages/userinfo/userinfo.js
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
    disabled: "true",
    color: "black",
    currentTime: 61,
    text: "获取",
    userInfo: { number: "17011434", college: "网络空间安全学院", name: "姚遥", gender: "男" },
    phonehidden: true,
    writeDisabled: true
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

  write: function () {
    this.setData({
      writeDisabled: false,
      phonehidden: false,
      disabled: false,
      color: '#ccc',
      userInfo: "",
    })
  },
  send: function () {
    var that = this;
    var number = that.data.number;
    var college = that.data.college;
    var name = that.data.name;
    var gender = that.data.gender;
    var phone = that.data.phonenumber;

    if ((number === "") || (college === "") || (name === "") || (gender === "") || (phone === "")) {
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
      return;
    }
    wx.request({
      url: app.globalData.host + '/users/' + wx.getStorageSync('openid') + "/edit",
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
      },
      complete: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 500
          });
          //app.globalData.userInfo = res.userInfo;
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/personal_center/personal_center'
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

    wx.request({
      url: app.globalData.host + "/users/" + wx.getStorageSync('openid') + '/show',
      header: {
        "content-type": 'application/json',
        "Authorization": "Bearer " + wx.getStorageSync('token')
      },
      method: "GET",
      complete: function (res) {
        if (res.data.status == 200) {
          console.log(res)
          that.setData({
            userInfo: res.data.data.user_info
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '获取数据失败',
          })
        }
      }
    })
  }
})