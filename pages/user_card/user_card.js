// pages/user_card/user_card.js
// pages/userCard/userCard.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toOpenid: "",
    userInfo: "",
    isfrend: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      toOpenid: options
    })
    var toOpenid = that.data.toOpenid;

    wx.request({
      url: app.globalData.host + '/users/' + toOpenid.toOpenid + '/show',
      header: {
        "content-type": 'application/json',
        "Authorization": "Bearer " + wx.getStorageSync('token')
      },
      method: "GET",
      complete: function (res) {
        if (res.data.status == 200) {
          console.log(res)
          console.log(toOpenid);
          that.setData({
            userInfo: res.data.data.user_info,
            isfrend: res.data.data.flag
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

  },

  delete: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '删除该好友',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定

          var toopenid = that.data.toOpenid.toOpenid;
          wx.request({
            url: app.globalData.host + '/users/' + toopenid + "/unfollow",
            header: {
              "content-type": 'application/json',
              "Authorization": "Bearer " + wx.getStorageSync('token')
            },
            method: "POST",
            complete: function (res) {
              if (res.statusCode == 200)
                wx.showModal({
                  title: '提示',
                  content: '删除好友成功',
                })
              else {
                wx.showModal({
                  title: '提示',
                  content: '请求发送失败',
                })
              }
            }
          })

        }
      },

    })
  },

  toRequest: function () {
    var that = this;
    var toopenid = that.data.toOpenid.toOpenid;
    wx.request({
      url: app.globalData.host + '/users/' + toopenid + "/follow",
      header: {
        "content-type": 'application/json',
        "Authorization": "Bearer " + wx.getStorageSync('token')
      },
      method: "POST",
      data: {
        openid: that.data.toOpenid
      },
      complete: function (res) {
        if (res.statusCode == 200)
          wx.showModal({
            title: '提示',
            content: '已发送请求',
          })
        else {
          wx.showModal({
            title: '提示',
            content: '请求发送失败',
          })
        }
      }
    })
  },
})