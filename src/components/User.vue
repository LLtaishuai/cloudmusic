<template>
  <div class="box">
    <!-- header -->
    <van-sticky>
      <div class="header">
        <van-icon name="apps-o" badge="99+" @click="userSet" />
        <van-icon name="search" />
      </div>
    </van-sticky>
    <div class="card">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="userProfile.avatarUrl" alt="">
      </div>
      <div style="height: 50px"></div>
      <!-- 用户名 -->
      <div class="username">
        <p>{{userProfile.nickname}}</p>
      </div>
      <!-- info -->
      <div class="info">
        <span>{{userProfile.follows}}关注</span>
        <span>{{userProfile.followeds}}粉丝</span>
        <span>{{level}}</span>
      </div>
    </div>
    <Footer />

  <!-- 弹出层 -->
  <van-popup 
    v-model="show" 
    position="left" 
    :style="{ width: '70%', height: '100%' }"
    closeable
    @open="open"
    >
    <van-button type="primary">主要按钮</van-button>
  </van-popup>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import __Config from '@/api/config'
import { mapState } from 'vuex'
import Vue from 'vue'
import { Sticky } from 'vant'
import { Popup } from 'vant'
import { Button } from 'vant'

Vue.use(Button)
Vue.use(Popup)

Vue.use(Sticky)
export default {
  components: { Footer },
  created () {
    this.getUserDetail()
  },
  data () {
    return {
      userProfile: {},
      level: 0,
      show: false
    }
  },
  methods: {
    async getUserDetail () {
      const res = await this.$http.post(__Config.getUserDetail, { uid: this.id, cache: true })
      if (res.code !== 200) {
        return this.$toast('获取用户信息失败')
      }
      this.userProfile = res.profile
      this.level = res.level
      console.log(res)
    },
    userSet () {
      this.show = true
    },
    open () {
      console.log('open')
    }

  },
  computed: {
    ...mapState({
      // 将state中userInfo.id 映射为计算属性id
      id: state => state.userInfo.id
    })
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #f7f8fa;
  .card {
    width: 94%;
    // height: 200px;
    margin: 0 auto;
    box-shadow: 1px 0 6px rgb(155, 147, 147);
    background: #fff;
    border-radius: 10px;
    padding-bottom: 10px;
    position: relative;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      transform: translateX(-50%);
      top: -30px;
      left: 50%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .username {
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      color: #2b333f;
    }
    .info {
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #969799;
      span {
        margin: 0 5px;
      }
    }
  }
  .header {
    width: 94%;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon {
      color: #2b333f;
      font-weight: bold;
      font-size: 20px;
    }

  }
}
</style>