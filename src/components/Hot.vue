<template>
  <div>
    <van-tabs v-model="active" sticky swipeable @change="tabChange">
      <van-tab :title="item.name" :name="item.id" v-for="item in videoCate" :key="item.id">
        <ul class="videolist">
          <li v-for="(item, index) in videoGroup" :key="index" :style="{backgroundImage: `url(${item.data.coverUrl})`}">
            <van-icon name="play-circle-o" @click="playVideo(item)" />
            <p>{{item.data.title}}</p>
          </li>
        </ul>
      </van-tab>
    </van-tabs>    
    <Footer />
  </div>
</template>

<script>
import __Config from '@/api/config'
import Vue from 'vue'
import { Tab, Tabs } from 'vant'

Vue.use(Tab)
Vue.use(Tabs)
import Footer from '@/components/Footer.vue'
export default {
  components: { Footer },
  created () {
    this.getVideoCate()
  },
  data () {
    return {
      active: '',
      videoCate: [],
      videoGroup: []
    }
  },
  methods: {
    // 获取分类
    async getVideoCate () {
      const res = await this.$http.post(__Config.getVideoCate, { cache: true })
      if (res.code !== 200) {
        return this.$toast('获取分类失败')
      }
      this.videoCate = res.data
      // 渲染第一个tab
      const data = await this.getVideoGroup(res.data[0].id)
      this.videoGroup = data.datas
    },
    // 获取视频
    async getVideoGroup (id) {
      const res = await this.$http.post(__Config.getVideoGroup, {id: id})
      if (res.code !== 200) {
        return this.$toast('获取视频失败')
      }
      return res
    },
    // tab改变的回调
    async tabChange (name) {
      const res = await this.getVideoGroup(name)
      this.videoGroup = res.datas
      // console.log(res.datas)
    },
    // 视频播放
    playVideo (item) {
      this.$router.push({
        name: 'MvPlay',
        query: {
          id: item.data.vid,
          pic: item.data.coverUrl,
          type: item.type
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.videolist {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  li {
    width: 93%;
    border-radius: 5px;
    // height: 200px;
    background: no-repeat;
    background-size: 100% auto;
    position: relative;
    margin-bottom: 10px;
    p {
      position: absolute;
      left: 3px;
      bottom: 20px;
      color: #c8c9cc;
      font-size: 12px;
    }
    .van-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      color: #fff; 
    }
  }
  li::before {
    content: '';
    display: block;
    padding-top: 55%;
  }
}
</style>