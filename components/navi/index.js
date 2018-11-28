// components/navi/index.js
Component({
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean,
    toward: String,
  },

  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  methods: {
    onLeft: function() {
      if (!this.properties.latest) {
        this.triggerEvent('left', {}, {})
      }
    },
    
    onRight: function() {
      if (!this.properties.first) {
        this.triggerEvent('right', {}, {})
      }
    }
  }
})
