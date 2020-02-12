// pages/create_order/create_order.js
var util=require('../../utils/util.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind: ['跑腿', '提问', '学习辅导', '生活服务', '其他', '所有种类'],
    index:0, //kind数组下标
    currentTime:'', //当前时间
    time:'', //用户设置时间
    currentDate:'', //当前日期
    date:'', //用户设置日期
    price:0, //酬劳
    totalPrice:0, //酬劳+服务费
    servicePrice:0, //服务费
    imgPath:[] //用户上传图片路径
  },

  /**
   * 种类选择函数
   */
  kindChange:function(obj){
    var that=this
    that.setData({
      index:obj.detail.value
    })
  },

  /**
   * 截止日期选择函数
   */
  dateChange:function(obj){
    var that=this
    that.setData({
      date:obj.detail.value
    })
  },

  /**
   * 截止时间选择函数
   */
  timeChange: function (obj) {
    var that = this
    that.setData({
      time: obj.detail.value
    })
  },

  /**
   * 服务费计算函数
   */
  inputPrice:function(e){
    var that=this
    var temp = parseFloat(e.detail.value)
    var temp1 = parseFloat((e.detail.value * 0.1).toFixed(2))
    var temp2 = parseFloat((temp + temp1).toFixed(2))
    if (!isNaN(temp1) && !isNaN(temp2)){
      that.setData({
        price: temp,
        servicePrice: temp1,
        totalPrice: temp2
      })
    }
  },

  /**
   * 上传图片函数
   */
  chooseImage:function(){
    var that = this
    var source='';
    if (that.data.imgPath.length >= 3) {
      that.tipShow('上传图片过多！','none')
    }
    else {
      wx.showModal({
        title: '请选择图片来源',
        content: '来自相机还是相册？',
        cancelText: '相册',
        confirmText: '相机',
        success: function (res) {
          if (res.confirm == true) {
            source = 'camera'
          }
          else {
            source = 'album'
          }
        }
      })
      wx.chooseImage({
        count: 3,
        sourceType: source,
        success: function (res) {
          that.setData({
            imgPath: that.data.imgPath.concat(res.tempFilePaths),
          })
        },
      })
    }
  },

  /**
   * 删除图片函数
   */
  cancel:function(e){
    var that=this
    wx.showModal({
      title: '删除图片',
      content: '是否删除图片？',
      success:function(res){
        if(res.confirm==true){
          var img = that.data.imgPath
          img.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            imgPath: img
          })
        }
      }
    })
  },
 /**
  * 封装的弹窗提示函数
  */
  tipShow:function(string,icon){
    wx.showToast({
      title: string,
      icon: icon,
      duration: 1500
    })
  },

  /**
   * 表单提交函数
   * 提交之前先check一下各个数据是否不为空
   * 提交后根据返回的不同状态提示不同的信息，跳转不同的页面
   */
  formSubmit: function (e) {
    var that=this
    if (e.detail.value.date == '' || e.detail.value.time == '') {
      that.tipShow('截止日期或时间未选！','none')
    }
    else if (e.detail.value.price == '') {
      that.tipShow('酬劳不可为空！', 'none')
    }
    else if (e.detail.value.phone == '') {
      that.tipShow('联系电话不可为空！', 'none')
    }
    else if (e.detail.value.title == '') {
      that.tipShow('标题不可为空！', 'none')
    }
    else if (e.detail.value.content == '') {
      that.tipShow('内容不可为空！', 'none')
    }
    else {
      /*if (that.data.imgPath.length != 0) {
        for (var i = 0; i < that.data.imgPath.length; i++) {
          wx.uploadFile({
            url: '',
            filePath: that.data.imgPath[i],
            name: 'img',
            formatDate: {},
            success: function (res) { 
              console.log("success")
            },
            fail: function () {
              console.log("fail")
              that.tipShow('图片上传失败！','none')
            }
          })
        }
      }*/
      wx.request({
        url: app.globalData.host + 'orders/create',
        data: {
          kind: e.detail.value.kind,
          ddl: e.detail.value.date + ' ' + e.detail.value.time,
          price: e.detail.value.price,
          phone: e.detail.value.phone,
          title: e.detail.value.title,
          content: e.detail.value.content
        },
        header: {
          'Accept': 'application/jsosn',
          'Authorization': 'Bearer ' + wx.getStorageSync('token')
        },
        method: 'POST',
        success: function (res) {
          if (res.statusCode == '404' || res.statusCode == '402'||res.statusCode=='400') {
            that.tipShow('页面连接好像出了点问题Orz', 'none')
          }
          else if (res.statusCode == '403'||res.statusCode=='401') {
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
            that.tipShow('提交成功！', 'success')
            setTimeout(function () {
              wx.redirectTo({
                url: '../my_order/my_order',
              })
            }, 500)
          }
        }
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   * 获取初始种类选择、当前日期、当前时间
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '创建订单'
    })
    // var index=options.index
    // var time=util.formatTime(new Date())
    // var date=util.formatDate(new Date())
    this.setData({
      index: options.index,
      currentTime: util.formatTime(new Date()),
      currentDate: util.formatDate(new Date())
    })
  },
})