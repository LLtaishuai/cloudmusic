<template>
  <div class="newsong">
    <div class="top_title">
      <p> 〓 最新音乐</p>
    </div>
    <div class="musicbox">
      <ul>
        <li v-for="item in musicList" :key="item.id" @click="musicPlay(item)" >
          <div class="pic">
            <van-image
              width="100%"
              height="100%"
              lazy-load
              fit="cover"
               round
              :src="item.picUrl"
            />
          </div>
          <div class="text">
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import __Config from '@/api/config.js'
import { Image as VanImage, Toast } from 'vant'
import { Lazyload } from 'vant'

Vue.use(Lazyload)
Vue.use(VanImage)
export default {
  created () {
    this.getMusicList()
  },
  data () {
    return {
      musicList: []
    }
  },
  methods: {
    async getMusicList () {
      const res = await this.$http.get(__Config.getNewSong)
      if (res.code !== 200) {
        return this.$toast('newSong加载错误！')
      }
      this.musicList = res.result
      console.log(res)
    },
    async musicPlay (musicInfo) {
      // 判断歌曲是否能播放
      const res = await this.$http.get(__Config.isPlaySong, { id: musicInfo.id})
      if (!res.success) {
        return this.$toast(res.message)
      }
      // 跳转到'/musicplay'
      this.$router.push({
        path: '/musicplay',
        query: {
          id: musicInfo.id,
          pic: musicInfo.picUrl,
          name: musicInfo.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.musicbox {
  ul {
    width: 100%;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #fb4d3f1a;
      .pic {
        width: 25px;
        height: 25px;
        margin: 0 10px;
      }
      .text {
        font-size: 13px;
        line-height: 40px;
        color: #666;
      }
    }
  }
}
</style>