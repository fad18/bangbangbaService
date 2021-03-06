// pages/myhome/myhome.js
const app = getApp()

Page({


  data: {
    motto: '点击头像登陆',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  toIdentity: function () {
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },

  jump:function(options){
    var temp =options.currentTarget.dataset.index1
    wx.navigateTo({
      url: '../my_order/my_order?index1='+temp,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  toSet: function () {
    wx.navigateTo({
      url: '/pages/set/set',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})