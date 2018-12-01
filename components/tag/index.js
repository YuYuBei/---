// components/tag/index.js
Component({
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
