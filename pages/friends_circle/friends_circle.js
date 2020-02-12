// pages/friends_circle/friends_circle.js
const app = getApp();
var utils = require('../../utils/util.js');
var indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var FF = [];
var y = 0;
var letter = "";
var person = "";
//获取touchstart字母数组角标

function getArrIndex(english) {
  // console.log(Page)
  for (var x = 0; x < indexArr.length; x++) {
    if (english == indexArr[x]) {
      return x;
    }
  }
}

//num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母

function getArrEnglish(num, index) {
  var english = indexArr[index + num];
  if (!(1 > num + index > 26)) {
    return english;
  } else {
    return AAA;
  }
}

//修改时间
function time(arr) {
  var t1, nt;
  for (var i = 0; i < arr.length; i++) {
    t1 = arr[i].created_at.substring(0, 10)
    nt = utils.formatDate(new Date())
    if (t1 == nt)
      arr[i].created_at = arr[i].created_at.substring(11, 16)
    else
      arr[i].created_at = arr[i].created_at.substring(5, 10)

  }
  return arr;

}
//合并数组
function hebin(arr1, arr2) {
  FF=[];
  for (var i = 0; i < arr2.length; i++) {
    FF[i] = { "letter": arr2[i], "person": arr1[i] }
  }
  console.log(FF);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: "e",
    scrollTop: 1000,
    indexId: "",
    indexy: "",
    indexEnglish: "",
    navbar: ["消息", "通讯录"],
    currentTab: 0,
    itemDisable: false,
    friends: "",
    letter: indexArr,
    scrollHeight: "",
    message: ""
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      itemDisable: true,
    })
  },
  touchstart: function (e) {
    this.setData({
      indexId: e.target.id,
      toView: e.target.id,
      indexy: e.touches[0].pageY,
      indexEnglish: e.target.id
    })
  },
  touchmove: function (e) {
    y = getArrIndex(e.target.id);
    var indexY = e.touches[0].pageY;
    if (getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)) {
      this.setData({
        toView: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y),
        indexEnglish: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)
      })
    }
  },

  touchend: function (e) {
    this.setData({
      indexShow: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight * (750 / res.windowWidth),
        });
      }
    })

    //请求消息列表数据
    wx.request({
      url: app.globalData.host + '/users/messages',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + wx.getStorageSync('token')
      },
      method: "GET",
      success: function (res) {
        console.log(res.data.data)
        //  that.setData({
        //    message:res.data.data
        //  })
        var message = res.data.data;
        if (message) {
          time(message);
          that.setData({
            message: message
          })
        }

      }
    })


    //请求好友列表数据
    wx.request({
      url: app.globalData.host + '/users/friends',
      header: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer " + wx.getStorageSync('token')
      },
      method: "GET",
      success: function (res) {
        console.log(res.data),
          that.setData({
            friends: res.data,
          })
        var fri = that.data.friends[0];
        letter = Object.keys(fri);
        console.log(letter);
        person = Object.values(fri);
        console.log(person);
        var letter_s = that.data.letter_s
        hebin(person, letter);
        that.setData({
          friends: FF
        })
      }
    })


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
  },
})