//app.js
App({
  /*onLaunch: function () {
    wx.login({
    success: function (res) {
      console.log("login")
      wx.getUserInfo({
        withCredentials: true,
        success: function (res_user) {
          console.log(res_user.userInfo)
          //调用后端
          wx.request({
            url: 'http://fengfan.easy.echosite.cn:80/auth/getCode',
            data: {
              code: res.code,                             // code  必须给
              encryptedData: res_user.encryptedData,      //密文串  必须给
              iv: res_user.iv                             //加密初始量 必给
            },
            method: "POST",
            success: function (result) {
              console.log("login2")
              try {
                wx.setStorageSync('token', result.data.data.token)
                wx.setStorageSync('openid', result.data.data.openid)
              } catch (e) {
                console.log(e)
              }
            }
          })
        },
        fail:function(){
          console.log("fail")
        }
      })
    }
  })
  },*/
  globalData: {
    userInfo: null,
    host:'http://fengfan.easy.echosite.cn/'
  },
})