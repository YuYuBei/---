import { classicBeh } from "../classic-beh.js";

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function() {
      // 图片切换
      if (!this.data.playing) {
        mMgr.title = this.properties.title
        mMgr.src = this.properties.src
      } else {
        mMgr.pause()
      }
      this.setData({
        playing: !this.data.playing,
      })
    }
  }
})
