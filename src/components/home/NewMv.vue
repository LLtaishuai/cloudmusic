<template>
  <div class="newmv">
    <div class="top_title">
      <p> 〓 最新Mv</p>
    </div>
    <div class="mvbox">
      <ul>
        <li v-for="item in newMvList" :key="item.id" @click="playMv(item)">
          <img :src="item.cover" alt="">
          <p class="name">{{item.artistName}}</p>
          <p class="playcount">
            <van-icon name="play" />
            {{item.playCount}}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import __Config from '@/api/config.js'
import { Icon } from 'vant'

Vue.use(Icon)
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
    // 得到MV数据
    async getNewMv () {
      const data = await this.$http.post(__Config.getNewMV, { limit: 6, cache: true } )
      if (data.code !== 200) {
        return this.$toast('newMV加载错误！')
      }
      this.newMvList = data.data
      // console.log(data)
    },
    // 点击跳转播放MV
    playMv (mvInfo) {
      this.$router.push({
        name: 'MvPlay',
        query: {
          id: mvInfo.id,
          pic: mvInfo.cover
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mvbox {
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  li {
    flex: 0 1 30%;
    height: 100px;
    margin-bottom: 18px;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .name {
      color: #666;
      font-size: 13px;
    }
    .playcount {
      color: #fff;
      font-size: 13px;
      position: absolute;
      top: 0;
      right: 0;
      text-align: left;
      padding: 2px;
    }
  }
}
</style>