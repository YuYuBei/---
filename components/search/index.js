import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore',
    }
  },

  data: {
    historyWords: [],
    hotwords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false,
  },

  attached() {
    this.setData({
      historyWords: keywordModel.getHistory(),
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  methods: {
    loadMore() {
      if (!this.data.q || this.isLocked()) {
        return
      }
      /* 当wxml中不需要绑定loading的；话，可以直接更新 */
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(
          res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          }
        )
      }
    },

    onCancel() {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },

    onDelete(event) {
      this._closeResult()
      this.initialize()
    },

    onConfirm(event) {
      /* 提前切换页面组件，提升用户体验 */
      const q = event.detail.value || event.detail.text
      this.initialize()
      this._showOrCloseLoadingCenter()
      if (!!q) {
        this._showResult()
        this.setData({ q })
        bookModel.search(0, q).then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(q)
          this._showOrCloseLoadingCenter()
        })
      } else {
        wx.showToast({
          'title': '请输入符合规范的搜索内容',
          'icon': 'none'
        })
      }
    },

    _showOrCloseLoadingCenter() {
      this.setData({
        loadingCenter: !this.data.loadingCenter
      })
    },

    _showResult() {
      this.setData({
        searching: true,
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: '',
      })
    },
  }
})