// pages/my/my.js
Page({
  data: {
    authorized: false,
    userInfo: {},
  },

  onLoad: function (options) {
    this.userAuthorized()
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
  }
})