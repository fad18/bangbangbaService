// pages/my_order/my_order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: ['跑腿', '提问', '学习辅导', '生活服务', '其他', '所有种类'],
    index: 5,             //kind数组下标（参数），初始默认值为5
    type:['所有订单','我发布的','我接过的'],
    index1:0,             //
    topStatus: false,     //悬浮按钮是否出现
    page: 0,              //页数
    pageTotal: 0,         //总页数
    data_list:[]
  },

  /**搜索功能
  search: function (e) {
    var that = this
    that.setData({
      search: e.detail.value,
      data_list: [],
      page: 0
    })
    that.getData()
  },*/

  /*封装请求函数*/
  getData: function () {
    var that = this
    that.setData({
      page: that.data.page + 1
    })
    wx.request({
      url: app.globalData.host + 'orders/mylist/' + that.data.index1 + '/6/' + that.data.index + '?page=' + that.data.page,
      data: {},
      header: {
        'Accept': 'application/jsosn',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == '404'||res.statusCode=='402'||res.statusCode=='400'||res.statusCode=='500') {
          wx.showToast({
            title: '页面连接好像出了点问题Orz',
            icon: 'none',
            duration: 2000
          })
        }
        else if(res.statusCode=='401'||res.statusCode=='403'){
          wx.showModal({
            title: '未登录！',
            content: '请先登录',
            showCancel: false,
            success: function () {
              wx.navigateTo({
                url: '../logs/logs',
              })
            }
          })
        }
        else{
          if (res.data.data.length != 0) {
            that.setData({
              data_list: that.data.data_list.concat(res.data.data)
            })
          }
          else {
            wx.showToast({
              title: '这里好像什么也没有',
              icon: 'none',
              duration: 2000
            })
          }
        }
      },
      fail:function(res){
        console.log('fail')
      }
    })
  },

  //picker组件选择kind下标，刷新
  kindChange: function (e) {
    var that = this
    that.setData({
      index: e.detail.value,
      page: 0,
      data_list: []
    })
    that.getData()
  },

  //picker组件选择type下标，刷新
  typeChange: function (e) {
    var that = this
    that.setData({
      index1: e.detail.value,
      page: 0,
      data_list: []
    })
    that.getData()
  },

  //返回顶部函数
  goTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },

  //查看详情，跳转函数
  jump: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../order_info/order_info?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
    var that=this
    if(options.index1){
      that.setData({
        index1: options.index1
      })
    }
    that.getData()
  },

  //页面监听函数，距离顶部一定距离便设置topStatus变量值为true
  onPageScroll: function (obj) {
    if (obj.scrollTop > 200) {
      this.setData({
        topStatus: true
      })
    }
    else {
      this.setData({
        topStatus: false
      })
    }
  },

  onReachBottom: function () {
    var that = this
    if (that.data.page >= that.data.pageTotal) {
      wx.showToast({
        title: '没有更多订单了！',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      that.getData()
    }
  },

  onPullDownRefresh: function () {
    var that = this
    that.setData({
      page: 0,
      data_list: []
    })
    that.getData()
  }
})