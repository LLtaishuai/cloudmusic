<template>
  <div class="playbox">
    <!-- back -->
    <div class="back">
      <div class="icon" @click="back"></div>
    </div>
    <!-- mains -->
    <div class="mains">
      <!-- 唱片 -->
      <div class="rota">
        <img src="@/assets/img/banji.png" :class="{'activeplay': isPlay, 'endplay': isPause}" alt="">
        <!-- 封面 -->
        <div class="cover">
          <img :src="this.$route.query.pic" :class="{rotatePlay: isPlay}" alt="">
          <!-- 歌名 -->
          <div class="name">{{this.$route.query.name}}</div>
          <!-- 歌词 -->
          <div class="lyricbox">
            <ul id="lrclist">
              <!-- 动态style 给当前播放行加样式 -->
              <li v-for="(item, index) in lyric" :key="index" :style="{color: currentRow == index ? 'red' : ''}">
                {{item.text}}
              </li>
            </ul>
            <p class="nolrc" v-show="this.lyric.length === 0">暂无歌词</p>
          </div>
        </div>
      </div>
      <!-- audio -->
      <div class="play">
        <audio :src="songInfo.url" controls controlsList="nodownload">
          <source :src="songInfo.url" type="audio/mpeg">
          你的浏览器不支持audio
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
import __Config from '@/api/config'
import lrcformat from '@/utils/lrcformat'
export default {
  created () {
    this.getSongUrl()
    this.getSongLyric()
  },
  data () {
    return {
      songInfo: {},
      lyric: [],
      // 实时播放秒数
      lyricCurrent: '',
      // 当前播放行
      currentRow: -1,
      isPlay: false,
      isPause: false
    }
  },
  methods: {
    // 获取音乐info
    async getSongUrl () {
      const res = await this.$http.get(__Config.getSongUrl, { id: this.$route.query.id })
      if (res.code != 200) {
        return Toast('获取音乐失败')
      }
      this.songInfo = res.data[0]
    },
    // 获取歌词
    async getSongLyric () {
      const res = await this.$http.get(__Config.getSongLyric, { id: this.$route.query.id })
      if (res.code != 200) {
        return this.$toast('获取歌词失败')
      }
      // 使用封装的lrc格式化函数
      this.lyric = lrcformat(res.lrc.lyric)
    },
    // back
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    const then = this
    // 获取audio结点，用户绑定监听事件
    const audio = document.querySelector('.play audio')
    
    // 监听timeupdate事件
    audio.addEventListener('timeupdate', function () {
      // 实时获取播放的秒数
      then.lyricCurrent = Math.floor(audio.currentTime)
      // this 指向audio
    })
    // 监听播放结束
    audio.addEventListener('ended', function () {
      // 歌词复位
      document.getElementById('lrclist').style.top = 0 + 'px'
    })
    // 监听开始播放
    audio.addEventListener('play', function () {
      // 加动画
      then.isPlay = true
      then.isPause = false
    })
    // 监听暂停播放
    audio.addEventListener('pause', function () {
      // 去动画
      then.isPlay = false
      then.isPause = true
    })
    
  },
  watch: {
    // 监控实时获取的播放秒数，来移动歌词，获取行数
    lyricCurrent () {
      this.lyric.forEach((item, index) => {
        if (this.lyricCurrent == item.time) {
          document.getElementById('lrclist').style.top = -24 * index + 'px'
          this.currentRow = index
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.playbox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: radial-gradient(#322920, #18181a, #382d29);
  .back {
    position: relative;
    width: 30px;
    height: 30px;
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      margin: 10px 0 0 10px;
      background: url('@/assets/img/back.png');
      background-size: 100%;
      z-index: 1;
    }
  }
  .mains {
    width: 100%;
    .rota {
      position: absolute;
      top: 0;
      width: 100%;
      img {
        display: block;
        width: 33%;
        margin: 0 auto;
      }
      .cover {
        position: absolute;
        bottom: -100%;
        width: 100%;
        img {
          display: block;
          width: 34%;
          border: 1px solid #18181a;
          border-radius: 50%;
          margin: 0 auto;
        }
        .name {
          width: 100%;
          position: absolute;
          bottom: -20%;
          font-size: 16px;
          line-height: 16px;
          color: #ccc;
          text-align: center;
        }
        .lyricbox {
          position: absolute;
          width: 100%;
          margin-top: 30px;
          overflow: hidden;
          // height: 400px;
          ul {
            position: relative;
            top: 0;
            transition: top 3s linear;
            width: 100%;
            li {
              width: 80%;
              margin: 0 auto;
              text-align: center;
              color: #cc8;
              font-size: 14px;
              line-height: 24px;
              transition: color 3s linear;
            }
          }
        }
      }      
    }

  }
  .play {
    position: fixed;
    bottom: 0;
    width: 100%;
    audio {
      display: block;
      margin: 0 auto;
      width: 80%;
    }
  }
}
.activeplay {
  animation: aplay 300ms forwards ;
}
.endplay {
  animation: eplay 300ms forwards;
}
.rotatePlay {
  animation: rplay 5s infinite linear;
}
@keyframes aplay {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(5deg);}
}
@keyframes eplay {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(-5deg);}
}
@keyframes rplay {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
.nolrc {
  width: 100%;
  text-align: center;
  color: #cc8;
}
</style>