// components/tag/index.js
Component({
  options: {
    multipleSlots: true, /* 开启插槽 */
  },

  externalClasses: ['tag-class'],

  properties: {
    text: String
  },

  data: {
    
  },
  
  attached() {
    // console.log(this.properties.text)
  },

  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      }, {})
    }
  }
})
