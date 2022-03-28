<template>
  <div>
    newMV
  </div>
</template>

<script>
import __Config from '@/api/config.js'
export default {
  created () {
    this.getNewMv()
  },
  data () {
    return {
      newMvList: []
    }
  },
  methods: {
    async getNewMv () {
      const data = await this.$http.get(__Config.getNewMV, { limit: 6 } )
      if (data.code !== 200) {
        return Toast('newMV加载错误！')
      }
      console.log(data)
    }
  }
}
</script>