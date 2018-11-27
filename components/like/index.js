// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean, /* 必填 */
      // value: false, /* type选择Boolean时，value默认是false */
      // observer: function() {}
    },
    count: {
      type: Number,
      value: 123,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* 数据绑定 */
    yesSrc: "images/like.png",
    noSrc: "images/like@dis.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      let like = this.properties.like
      let count = this.properties.count
      
      count = like ? count -1 : count + 1
      this.setData({
        count: count,
        like: !like,
      })
      /* 自定义事件 */
      let behavior = this.properties.like ? 'like' : 'cancel'
      /* 激活 */
      this.triggerEvent('like', {
        behavior: behavior, 
      }, {})
    }
  }
})
