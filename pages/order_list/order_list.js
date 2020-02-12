// pages/order_list/order_list.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    kind: ['跑腿', '提问', '学习辅导', '生活服务', '其他','所有种类'],
    index:5,             //kind数组下标（参数），初始默认值为5
    selectArea:false,    //点击排序箭头反转
    sortIndex:0,         //排序参数，0：（默认）最近，1：从低到高，2：从高到低
    topStatus:false,     //悬浮按钮是否出现
    page:0,              //页数
    pageTotal:0,         //总页数
    search:'',           //搜索内容
    data_list:[]         //数据列表
  },

  /**搜索功能 */
  search:function(e){
    var that=this
    that.setData({
      search:e.detail.value,
      data_list:[],
      page:0
    })
    that.getData()
  },

  /*封装请求函数*/ 
  getData: function () {
    var that = this
    that.setData({
      page:that.data.page+1
    })
    /**
     * console.log(that.data.search)
    var search_temp = []
    for(var i=0;i<that.data.search.length;i++){
      search_temp.push(that.data.search[i].charCodeAt())
    }
    console.log('temp'+search_temp)
    var search_array=new Uint8Array(search_temp)
    console.log('array'+search_array)
    const search_base = wx.arrayBufferToBase64(search_array)
    console.log('base'+search_base)*/
    wx.request({
      url: app.globalData.host + 'orders/list/' + that.data.index+'/'+that.data.sortIndex+'?page='+that.data.page,
      data: {
        search:that.data.search
      },
      header: {
        'Accept': 'application/jsosn',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == '404' || res.statusCode == '402' || res.statusCode == '400' || res.statusCode == '500') {
          wx.showToast({
            title: '页面连接好像出了点问题Orz',
            icon: 'none',
            duration: 2000
          })
        }
        else if (res.statusCode == '401' || res.statusCode == '403') {
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
        else {
          console.log(res.data)
          if (res.data != '') {
            that.setData({
              data_list: that.data.data_list.concat(res.data.data),
              pageTotal:res.data.last_page
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
      }
    })
  },

  //picker组件选择kind下标，刷新
  kindChange:function(e){
    var that=this
    that.setData({
      index:e.detail.value,
      page:0,
      data_list:[]
    })
    that.getData()
  },

  //价格排序，刷新
  moneySort:function(e){
    var that=this
    that.setData({
      selectArea:!that.data.selectArea,
      data_list: [],
      page:0
    })
    if(that.data.selectArea==true){
      that.setData({
        sortIndex:2
      })
      that.getData()
    }
    else{
      that.setData({
        sortIndex: 1
      })
      that.getData()
    }
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
  jump:function(e){
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../order_info/order_info?id='+id,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: '订单大厅'
    })
    var that = this
    if(e.search){
      that.setData({
        search:e.search
      })
    }
    that.setData({
      index: e.index,
    })
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

  onReachBottom:function(){
    var that=this
    if(that.data.page>=that.data.pageTotal){
      wx.showToast({
        title: '没有更多订单了！',
        icon:'none',
        duration:2000
      })
    }
    else{
      that.getData()
    }
  },

  onPullDownRefresh:function(){
    var that=this
    that.setData({
      page:0,
      data_list:[]
    })
    that.getData()
  }
})