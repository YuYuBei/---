import { ClassicModel } from "../../models/classic"
import { LikeModel } from "../../models/like"

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    latest: true,
    first: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      this.setData({
        classic: res,
      })  
    })
  },

  onNext: function(event){

  },

  onPrevious: function(event) {
    let index = this.data.classic.index;
    classicModel.getPrevious(index, (res)=>{
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.idnex),
        first: classicModel.isFirst(res.index),
      })
    })
  },

  onLike: function(event) {
    let behavior = event.detail.behavior
    let { id, type } = this.data.classic
    likeModel.like(behavior, id, type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})