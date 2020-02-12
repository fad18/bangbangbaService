// pages/check/check.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function () {
    var that = this
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     getApp().globalData.latitude = res.latitude,
    //       getApp().globalData.longitude = res.longitude
    //   }
    // })
    // wx.getSetting({
    //   success: (res) => {
    //     if (!res.authSetting['scope.userLocation'])
    //       that.openConfirm()
    //   }
    // })
    if (wx.getStorageSync('token') == '') {
      wx.reLaunch({
        url: '../logs/logs',
      })
    } else {
      wx.getUserInfo({
        success: function (res) {
          app.globalData.userInfo = res.userInfo,
            wx.request({
              url: app.globalData.host + '/auth/check',
              header: {
                "content-type": 'application/json',
                "Authorization": "Bearer " + wx.getStorageSync('token')
              },
              method: "GET",
              success: function (res) {
                console.log(res);
                if (res.statusCode == 200) {

                  if (res.data.data.empty) {
                    wx.reLaunch({
                      url: '../check_id/check_id',
                    })
                  } else {
                    wx.switchTab({
                      url: '../discovery/discovery',
                    })
                  }
                } else {
                  wx.reLaunch({
                    url: '../logs/logs',
                  })
                }
              }
            })
        }

      })


    }

  },
  // openConfirm: function () {
  //   wx.showModal({
  //     content: '检测到您没打开帮帮吧的定位权限，是否去设置打开？',
  //     confirmText: "确认",
  //     cancelText: "取消",
  //     success: function (res) {
  //       //点击“确认”时打开设置页面
  //       if (res.confirm) {
  //         wx.openSetting({
  //           success: (res) => { }
  //         })
  //       }
  //     }
  //   });
  // },

})