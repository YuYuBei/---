// components/tag/index.js
Component({
  options: {
    multipleSlots: true, /* 开启插槽 */
  },

  properties: {
    text: String
  },

  data: {
    
  },
  
  attached() {
    console.log(this.properties.text)
  },

  methods: {
  }
})
