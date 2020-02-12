// pages/order_info/order_info.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    kind: ['跑腿', '提问', '学习辅导', '生活服务', '其他', '所有种类'],
    status: ['未发布', '已发布', '正在进行', '已完成', '已评论', '订单取消'],
    img: ['icon/海报.jpg'],
    button: 0,
    id:0,
    myopenid:'',
    providerId:'',
    item: []
  },
  getData: function () {
    var that = this
    wx.request({
      url: app.globalData.host + 'orders/' + that.data.id + '/show',
      data: {},
      header: {
        'Accept': 'application/jsosn',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode == '200') {
          that.setData({
            item: res.data.data,
            providerId:res.data.data[0].provider
          })
          console.log(res.data.data)
          if (res.data.data[0].status == 1 && res.data.data[0].provider != that.data.myopenid) {
            that.setData({
              button: 1
            })
          }
          else if (res.data.data[0].status == 1 && res.data.data[0].provider == that.data.myopenid) {
            that.setData({
              button: 2
            })
          }
          else if (res.data.data[0].status == 2 && (res.data.data[0].provider == that.data.myopenid || res.data.data[0].receiver == that.data.myopenid)) {
            that.setData({
              button: 3
            })
          }
        }
      }
    })
  },

  /*对订单进行操作*/
  setOrder: function (string) {
    var that=this
    wx.request({
      url: app.globalData.host + 'orders/' + that.data.id + '/' + string,
      data: {},
      header: {
        'Accept': 'application/jsosn',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      method: 'GET',
      success: function (res) {
        if(res.statusCode==200){
          wx.showToast({
            title: '操作成功！',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '../my_order/my_order',
            })
          },500)
        }
        else{
          wx.showToast({
            title: '操作失败！',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },

  /*跳转 */
  jump:function(){
    wx.navigateTo({
      url: '../user_card/user_card?toOpenid='+this.data.providerId,
    })
  },

  /*接单*/
  takeOrder: function () {
    this.setOrder('receive')
  },

  /*删除订单*/
  destoryOrder: function () {
    this.setOrder('destroy')
  },

  /*确认订单*/
  confirmOrder: function () {
    this.setOrder('confirm')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var idTemp = options.id
    var that = this
    that.setData({
      id:idTemp,
      myopenid: wx.getStorageSync('openid')
    })
    that.getData()
  },
})