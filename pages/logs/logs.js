//logs.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '点击头像登陆',
    userInfo: "",
    hasUserInfo: false,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../discovery/discovery',
    })
  },

  getinfo: function (e) {
    var that = this;
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)

    wx.login({
      success: function (res) {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res_user) {
            that.setData({
              hasUserInfo: true,
              userInfo: res_user.userInfo
            })
            app.globalData.userInfo = res_user.userInfo;
            console.log(res_user.userInfo)
            //调用后端
            wx.request({
              url: 'http://fengfan.easy.echosite.cn:80/auth/getCode',
              data: {
                code: res.code,                             // code  必须给  
                encryptedData: res_user.encryptedData,      //密文串  必须给
                iv: res_user.iv     //加密初始量 必给

              },
              method: "POST",
              success: function (result) {
                console.log(result)
                if(result.data.status==200){
                  wx.setStorageSync('token', result.data.data.token)
                  wx.setStorageSync('openid', result.data.data.openid)
                    if (result.data.data.empty) {
                     wx.reLaunch({
                      url: '../check_id/check_id',
                   })
                   } else {
                    wx.switchTab({
                    url: '../discovery/discovery',
                   })
                  }
              }else{
                  wx.showModal({
                    title: '提示',
                    content: '登录失败',
                  })
              }

            }
            })

          }
        })
      }
    })

  }
})
