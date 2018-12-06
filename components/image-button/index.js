Component({

  options: {
    multipleSlots: true, /* 开启插槽 */
  },

  properties: {
    openType: {
      type: String
    },
  },

  data: {

  },

  methods: {
    onGetUserInfo(event) {
      this.triggerEvent('vgetuserinfo', event.detail, {})
    },
  }
})
