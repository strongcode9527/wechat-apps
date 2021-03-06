// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meta: {},
    topics: [],
    name: 'strong',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this
    wx.request({
      url: 'http://www.mifanxing.com/api/article/topics/search?agg[size]=-1',
      data: {},
      method: 'get',
      success: function (res) {
        that.setData({
          meta: res.data.meta,
          topics: res.data.data,
        })
      },
      fail: function (res) {
        wx.hideLoading()
        fail()
      },
      complete: function (res) {

      },
    })
  },

  handleClick: function(e) {
    const id = e.currentTarget.id
    id && wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
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
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('refresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this
    wx.request({
      url: `http://www.mifanxing.com/api/article/topics/search?agg[size]=-1&page[number]=${that.data.meta.number + 1}`,
      data: {},
      method: 'get',
      success: function (res) {
        that.setData({
          meta: res.data.meta,
          topics: that.data.topics.concat(res.data.data),
        })
      },
      fail: function (res) {
        wx.hideLoading()
        fail()
      },
      complete: function (res) {

      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})