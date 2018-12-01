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
  },
})