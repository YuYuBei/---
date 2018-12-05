import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  properties: {

  },

  data: {
    historyWords: [],
    hotwords: [],
    dataArray: [],
    searching: false,
    q: '',
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
    onCancel() {
      this.triggerEvent('cancel', {}, {})
    },

    onDelete() {
      this.setData({
        searching: false
      })
    },

    onConfirm(event) {
      /* 提前切换页面组件，提升用户体验 */
      const q = event.detail.value || event.detail.text
      this.setData({
        searching: true,
        q,
      })
      bookModel.search(0, q).then(res => {
        this.setData({
          dataArray: res.books,
        })
        keywordModel.addToHistory(q)
      })
    }
  }
})