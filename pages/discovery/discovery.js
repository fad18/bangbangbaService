// pages/discovery/discovery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   imgURL:[
     'icon/海报.jpg',
     'icon/帮友在线.png',
     'icon/我的订单.png',
     'icon/最新订单.png',
     'icon/规则帮助.png'
   ],
  },
  search:function(e){
    wx.navigateTo({
      url: '../order_list/order_list?search='+e.detail.value+'&index=5',
    })
  },
  jump:function(option){
    var index=option.currentTarget.dataset.kind;
    var url=option.currentTarget.dataset.url;
    wx.navigateTo({
      url: url+index+'&index1=0'
    })
  },
})