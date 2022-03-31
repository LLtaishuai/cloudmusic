<template>
  <div>
    <!--  -->
    <back-nav left="返回"></back-nav>
    <!-- list -->
    <div class="list">
      <ul>
        <li v-for="item in searchList" :key="item.id" @click="musicPlay(item)">
          <van-icon name="search" />
          {{item.name}}
          <span>{{item.al.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BackNav from '@/components/BackNav.vue'
import __Config from '@/api/config.js'
export default {
  components: { BackNav },
  created () {
    this.getSearchList()
  },

  data () {
    return {
      searchList: []
    }
  },
  
  methods: {
    async getSearchList () {
      const res = await this.$http.get(__Config.search, { keywords: this.$route.query.keywords, limit: 20 })
      console.log(res)

      this.searchList = res.result.songs
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
          pic: musicInfo.al.picUrl,
          name: musicInfo.name
        }
      })
    }    
  }
  
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  ul {
    width: 100%;
    li {
      width: 95%;
      margin: 0 auto;
      height: 40px;
      border-bottom: 1px solid #3333330d;
      line-height: 40px;
      font-size: 14px;
      color: rgba(43, 51, 63, 0.75);
      /* 文字不换行 */
      white-space: nowrap;
      /* 在overflow: hidden; 的情况下 文字溢出显示省略号 */
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        margin-left: 10px;
        color: #ccc;
      }
    }
  }
}
</style>