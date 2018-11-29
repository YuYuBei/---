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

  attached: function(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached: function(event) {
    
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
    },

    _recoverStatus: function(){
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        })
        return
      }
    },

    _monitorSwitch: function(){
      mMgr.onPlay(()=>this._recoverStatus())
      mMgr.onPause(()=>this._recoverStatus())
      mMgr.onStop(()=>this._recoverStatus())
      mMgr.onEnded(()=>this._recoverStatus())
    }
  }
})
