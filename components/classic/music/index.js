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
    console.log('music detached')
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
        console.log('mMgr为暂停状态')
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.properties.src) {
        console.log('mMgr.src 符合')
        this.setData({
          playing: true
        })
        return
      }
    },

    _monitorSwitch: function(){
      mMgr.onPlay(()=>{
        console.log('onPlay')
        this._recoverStatus()
      })
      mMgr.onPause(()=>this._recoverStatus())
      mMgr.onStop(()=>this._recoverStatus())
      mMgr.onEnded(()=>this._recoverStatus())
    }
  }
})
