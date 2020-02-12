// pages/new_chat/new_chat.js
const app = getApp()
var websocket = require('../../utils/websocket.js');
var utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView:"",
     newsList:[
       {
         nickName: "摇摇机", "from_id":"obBMm1jCUYaD2HPUhWxUzjA--oM0", "to_id": "afjasjfklas", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好","date":"2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好", "date": "2019/6/28"
       },
       {
         nickName: "摇摇机", "from_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "to_id": "afjasjfklas", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你个sb", "date": "2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好", "date": "2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好", "date": "2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好", "date": "2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好", "date": "2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好", "date": "2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好", "date": "2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好", "date": "2019/6/28"
       },
       {
         nickName: "温埃德加", "from_id": "afjasjfklas", "to_id": "obBMm1jCUYaD2HPUhWxUzjA--oM0", "avatar": "https://wx.qlogo.cn/mmopen/vi_32/v0hSjLrQHCsclBDj3yk07o4M5wt0VfTvFeKkLG7aUY4cchThdYHbMVZibVaWzd7X4rwib2J9lU5C4XJia4IRSNCRw/132", "content": "你好呀呀", "date": "2019/6/28"
       }
     ],
    text: "",
    openId:"",
    toOpenid:"",
    userInfo:"",
    all:""
  },
   
 setText:function(e){
   this.setData({
     text:e.detail.value
   });
 },

 sendMessage:function(e){
   var that=this;
   var message=that.data.text;
   if(message==""){
     wx.showToast({
       title: '消息不能为空',
       icon: 'none',
       duration: 500
     })
   }else{
     websocket.send('{ "from_id":"' + that.data.openId + '","to_id":"' + that.data.toOpenid + '","content": "' + that.data.text + '", "date": "' + utils.formatDate(new Date())+" "+utils.formatTime(new Date) + '","type":"text", "nickName": "' + that.data.userInfo.nickName + '", "avatar": "' + that.data.userInfo.avatarUrl + '" }')
     that.setData({
       text:""
     
     })
  
     
   }

 },
 cleanInput:function(){
  
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     that.setData({
       toOpenid:options.toOpenid,
       all: [options.toOpenid, wx.getStorageSync('openid')]
     })
     wx.setNavigationBarTitle({
       title: options.name
     })

    
    //设置openid
    that.setData({
      openId: wx.getStorageSync('openid'),
    })
   
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo
      })
    }
    //调通接口
    websocket.connect(that.data.user, function (res) {

      console.log(JSON.parse(res.data))

      var list = []

      list = that.data.newsList

      list.push(JSON.parse(res.data))

      that.setData({

        newsList: list

      })
      var len = that.data.newsList.length
      //console.log(len)
      that.setData({
        toView: len * 330
      })

    })
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight * (750 / res.windowWidth),
        });
      }
    })
    var len=that.data.newsList.length;
   // console.log(len)
    that.setData({
      toView:len*330
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  // 页面卸载

  onUnload() {

    wx.closeSocket();

    wx.showToast({

      title: '连接已断开~',

      icon: "none",

      duration: 2000

    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
 
})

