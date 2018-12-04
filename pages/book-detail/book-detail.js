import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },
  /* 通过页面url传递参数时，参数都在options中存储 */
  onLoad: function (options) {
    wx.showLoading()
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    /* 三个请求按顺序发起，异步执行 */
    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums,
        })
        wx.hideLoading()
      })
    
    // detail.then(res => {
    //   this.setData({
    //     book: res
    //   })
    // })

    // comments.then(res => this.setData({
    //   comments: res.comments
    // }))

    // likeStatus.then(res => this.setData({
    //   likeStatus: res.like_status,
    //   likeCount: res.fav_nums,
    // }))
  },

  onLike(event) {
    const like_or_canel = event.detail.behavior;
    likeModel.like(like_or_canel, this.data.book.id, 400)
  },

  onFakePost(event) {
    this.setData({
      posting: !this.data.posting,
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value

    if (comment.length === 0) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+1',
          icon: "none",
        })
        
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })

        this.setData({
          comments: this.data.comments,
          posting: false,
        })
      })
  }
})