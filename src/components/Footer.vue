<template>
  <div class="footer_box">
    <!-- <div style="height: 50px"></div> 等高占位元素 -->
    <van-tabbar v-model="active" active-color="red" inactive-color="#000" placeholder route>
      <van-tabbar-item icon="like-o" to="/home">发现</van-tabbar-item>
      <van-tabbar-item icon="fire-o" to="/hot">热点</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
export default {
  name: 'Footer',
  data () {
    return {
      active: 0
    }
  }
}
</script>
