import { ClassicModel } from "../../models/classic"
import { LikeModel } from "../../models/like"

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  data: {
    classic: {},
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false,
  },

  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status,
      })  
    })
  },

  onNext: function(event){
    this._updataClassic('next')
  },

  onPrevious: function(event) {
    this._updataClassic('previous')
  },
  
  onLike: function(event) {
    const behavior = event.detail.behavior
    const { id, type } = this.data.classic
    likeModel.like(behavior, id, type)
  },
  
  _updataClassic: function(nextOrPrevious){
    const index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res)=>{
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index),
      })
    })
  },

  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res)=>{
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums,
      })
    })
  }
})