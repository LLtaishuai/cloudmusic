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
      <div class="avatar" @click="overlayShow = true">
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
      v-model="popupShow" 
      position="left" 
      :style="{ width: '70%', height: '100%' }"
      closeable
      @open="open"
      >
      <div class="card loginoutBtn" @click="sheetShow = !sheetShow">
        退出登录
      </div>
      
    </van-popup>
    <!-- 动作面板 -->
    <van-action-sheet
      v-model="sheetShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="loginout"
    />
    <!-- 遮罩层 -->
    <van-overlay :show="overlayShow" @click="overlayShow = false">
      <div class="wrapper">
        <div class="block">
          <img :src="userProfile.avatarUrl" alt="">
        </div>
        <div class="btns">
          <div class="save" @click.stop="saveAvatar">保存图片</div>
          <div class="change" @click.stop="changeAvatar">更换图像</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import __Config from '@/api/config'
import { mapState } from 'vuex'
import Vue from 'vue'
import { Sticky } from 'vant'
import { Popup } from 'vant'
import { ActionSheet } from 'vant'
import { Overlay } from 'vant'

Vue.use(Overlay)

Vue.use(ActionSheet)
Vue.use(Popup)

Vue.use(Sticky)
export default {
  components: { Footer },
  created () {
    this.getUserDetail()
  },
  data () {
    return {
      overlayShow: false,
      userProfile: {},
      level: 0,
      popupShow: false,
      sheetShow: false,
      actions: [{ name: '退出' }, { name: '切换用户' }]
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
    },
    // 点击set, 打开弹出层
    userSet () {
      this.popupShow = true
    },
    // 弹出层打开回调
    open () {},
    // 退出登录
    async loginout (action) {
      if (action.name === '退出') {
        const res = await this.$http.get(__Config.loginout)
        if (res.code !== 200) {
          return this.$toast('退出失败')
        }
        // 删除登录信息
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      }
      if (action.name === '切换用户') {
        const res = await this.$http.get(__Config.loginout)
        if (res.code !== 200) {
          return this.$toast('切换用户失败')
        }
        localStorage.removeItem('userInfo')
        this.$router.push('/index')
      }
    },
    // 更换头像
    changeAvatar () { console.log('change') },
    // 保存头像
    saveAvatar () { console.log('save') }

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
.van-popup {
  background: #f7f8fa;
  .loginoutBtn {
    position: fixed;
    bottom: 0;
    text-align: center;
    color: red;
    font-weight: bold;
  }
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  background-color: #fff;
  img {
    display: block;
    width: 100%;
  }
}
.btns {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  div {
    width: 20%;
    height: 20px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    padding: 5px 10px;
  }
  .change {
    background: rgb(250, 10, 10);
  }
  .save {
    background: rgba(0,0,0,.7);
  }
}
</style>