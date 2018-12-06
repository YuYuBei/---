import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({
  data: {
    authorized: false,
    userInfo: {},
    bookCount: 0,
  },

  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
  },

  userAuthorized() {
    /* 查询用户是否授权 */
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo,
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if  (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },
})