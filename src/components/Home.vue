<template>
  <div class="home">
    <!-- 搜索区 -->
    <van-sticky :offset-top="0">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索内容"
        background="#ff000017"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>  
    <!-- banner轮播图 -->  
    <van-swipe :autoplay="3000" height="140">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swipeImg" v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 格子导航 -->
    <van-grid clickable :column-num="4">
      <van-grid-item icon="http://pay.91yunshi.com/share/html/userTextImg/home1.png" text="每日推荐" to="/" />
      <van-grid-item icon="http://pay.91yunshi.com/share/html/userTextImg/home2.png" text="电台" to="/" />
      <van-grid-item icon="http://pay.91yunshi.com/share/html/userTextImg/home3.png" text="视频" to="/" />
      <van-grid-item icon="http://pay.91yunshi.com/share/html/userTextImg/home4.png" text="歌手" to="/" />
    </van-grid>
    <!-- 新MV -->
    <new-mv></new-mv>
    <!-- 新歌 -->
    <new-music></new-music>
    <!-- 底部 -->
  </div>
</template>

<script>
import __Config from '@/api/config.js'
import Vue from 'vue'
import { Sticky, Toast } from 'vant'
import { Search } from 'vant'
import { Lazyload } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Grid, GridItem } from 'vant'
import NewMv from '@/components/home/NewMv.vue'
import NewMusic from '@/components/home/NewMusic.vue'

Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Search)
Vue.use(Sticky)
export default {
  components: { NewMv, NewMusic },
  name: 'Home',
  created () {
    this.getBannerImg()
  },
  data () {
    return {
      keywords: '',
      images: []
    }
  },
  methods: {
    // 根据keywords搜索
    onSearch () {
      if (this.keywords === '') {
        Toast('请输入歌名、歌手名搜索')
      } else {
        this.$router.push({
          name: 'searchMusic',
          query: {
            keywords: this.keywords
          }
        })
      }
    },
    async getBannerImg () {
      // type=1:android,type=2:ios,type=3:ipad
      const data = await this.$http.get(__Config.getBannerImg, { type: 2 } )
      if (data.code !== 200) {
        return Toast('banner加载错误！')
      }
      this.images = data.banners.map(item => item = item.pic)
    }
  }
  
}
</script>

<style lang="scss" scoped>
.swipeImg {
  width: 100%;
  height: 100%;
}
</style>