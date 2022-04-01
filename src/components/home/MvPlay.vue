<template>
  <div>
    <back-nav left="返回"></back-nav>
    <!-- 播放器 -->
    <video
        id="my-player"
        class="video-js"
        controls
        preload="auto"
        :width="viewportWidth"
        :poster="this.$route.query.pic"
        data-setup='{}'>
      <source :src="url" type="video/mp4">
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
    </video>
    <!-- info -->
    <div class="info">
      <div class="like">
        <span>like</span>
        <van-icon name="like" :style="{color: !info.liked ? 'red': '#fff'}" />
        <strong>{{info.likedCount}}</strong>
      </div>
      <div class="share">
        <span>share</span>
        <van-icon name="share" />
        <strong>{{info.shareCount}}</strong>
      </div>
      
    </div>
    <!-- 评论 -->
    <div class="comment">
      <van-icon name="comment" />
      {{info.commentCount}}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
import __Config from '@/api/config'
import BackNav from '@/components/BackNav.vue'
export default {
  components: {
    BackNav
  },
  mounted () {
    // 防止移动端:active失效
    document.body.addEventListener('touchstart', function(){})
    this.getMvUrl()
    this.getMvInfo()
  },
  data () {
    return {
      url: '',
      info: '',
      player: null
    }
  },
  methods: {
    // 获取视频url
    async getMvUrl () {
      const res = await this.$http.get(__Config.getMvUrl, { id: this.$route.query.id})
      if (res.code !== 200) {
        return this.$toast('MV请求失败')
      }
      this.url = res.data.url
      // 在状态更新后初始化播放器
      this.initVideo()
      // console.log(res)
    },
    // 获取MV信息
    async getMvInfo () {
      const res = await this.$http.get(__Config.getMvInfo, { mvid: this.$route.query.id})
      if (res.code !== 200) {
        return this.$toast('MVInfo请求失败')
      }
      this.info = res
      // console.log(res)
    },
    // 初始化播放器
    initVideo () {
      this.$nextTick(() => {
      this.player = this.$video('my-player')
      })
    }
  },
  computed: {
    // 返回视口宽度
    viewportWidth () {
      return document.documentElement.clientWidth || window.innerWidth
    }
  },
  // 组件销毁，清除播放器
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
  
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: space-between;
  background: #CCC;
  color: white;
  font-size: 18px;
  line-height: 28px;
  height: 28px;
  padding: 0 15px;
  strong {
    // display: none;
    visibility: hidden;
  }
  .like:active strong{
    // display: inline;
    visibility: visible;
  }
  .share:active strong{
    // display: inline;
    visibility: visible;
  }
}
</style>