<template>
<!-- 自定义组件：title 标题 ，icon 图标 ，left 左侧文字-->
  <div class="back">
    <van-nav-bar :title="title" :left-text="left" left-arrow @click-left="back">
      <template #right>
        <van-icon :name="icon" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar } from 'vant'

Vue.use(NavBar)
export default {
  props: ['title', 'icon', 'left'],
  data () {
    return {}
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>