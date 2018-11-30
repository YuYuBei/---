import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  data: {
    books: []
  },

  onLoad: function (options) {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res,
        })
      })
    /* Promise 基础示例代码 */
    // const promise = new Promise((resolve, reject) => {
    //   wx.getSystemInfo({
    //     success: res => resolve(res),
    //     fail: error => reject(error)
    //   })
    // })
    // promise.then(
    //   res => console.log(res),
    //   error => console.log(error)
    // )

    /* Promise 错误示范 */
    // const hotList = bookModel.getHotList()
    // hotList.then(
    //   res => {
    //     console.log(res)
    //     bookModel.getMyBookCount()
    //       .then(res => {
    //         console.log(res)
    //         bookModel.getMyBookCount()
    //           .then(res => {
    //             console.log(res)
    //           })
    //       })
    //   }
    // )

    /* Promise 正确示范（return 一个Promise 用平行关系.then逐步取值） */
    // bookModel.getHotList()
    //   .then(res => {
    //     console.log(res)
    //     return bookModel.getMyBookCount()
    //   })
    //   .then(res => {
    //     console.log(res)
    //     return bookModel.getMyBookCount()
    //   })
    console.log(this.data.books)
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
  onUnload: function () {

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
  onShareAppMessage: function () {

  }
})