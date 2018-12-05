import { HTTP } from '../utils/http-p.js'

class KeywordModel extends HTTP{
  key = 'q' // 缓存历史搜索记录
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword',
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
    } else {
      const location = words.indexOf(keyword)
      if (location !== 0) {
        words.splice(location, 1)
      } else {
        return
      }
    }
    words.unshift(keyword) 
    wx.setStorageSync(this.key, words)
  }
}

export {
  KeywordModel
}