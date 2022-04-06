<template>
  <div class="auth">
    <!-- 验证区 -->
    <div class="autharea">
      <h3>手机号验证</h3>
      <div class="main">
        <p>为了安全，我们会向你的手机发送短信验证码</p>
        <div class="write">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <input type="text" v-model="authcode" @change="changeHandle" :disabled="iswrite">
        </div>
      </div>
      <div class="resend">
        <span :class="[isClick ? 'clicktext' : 'text']"  @click="resendHandle">重新发送</span>
        <span class="count" ref="count">60</span>
      </div>
    </div>    
  </div>
</template>

<script>
import __Config from '@/api/config'
export default {
  data () {
    return {
      // 手机号
      phone: this.$route.query.phone,
      // 验证码
      authcode: '',
      iswrite: false,
      isClick: false,
    }
  },
  methods: {
    // 验证
    async changeHandle () {
       // 填写不完整错误
      if (this.authcode.length !== 4) {
        return this.$toast('验证码错误')
      } else if (this.authcode.length === 4) {
        // 填写完整，发请求验证
        this.iswrite = true
        const res = await this.checkCode()
        if (res.code !== 200) {
          this.iswrite = false
          return this.$toast('验证码错误')
        }
        // 验证成功
        this.$toast('验证成功, 暂不支持，请用手机号或扫描二维码登录！')
        // 查询登录状态
        // const res1 = await this.getStatus()
        // console.log(res1)
        this.$router.push('/index')
      }
    },
    // 倒计时
    countDown (node, num) {
      return new Promise((resolve, reject) => {
        const timer = setInterval(function () {
          node.innerHTML = num
          num--
          if (num < 0) {
            clearInterval(timer)
            resolve(true)
          }
        }, 1000)
      })
    },
    // 发送验证码
    async sentCode () {
      const res = await this.$http.post(__Config.sentAuthCode, { phone: this.phone})
      if (res.code === 200) {
        this.$toast('验证码已发送')
      }
    },
    // 验证验证码
    async checkCode () {
      const res = await this.$http.post(__Config.checkAuthCode, { phone: this.phone, captcha: this.authcode})
      return res
    },
    // 重新发送
    async resendHandle () {
      this.sentCode()
      this.isClick = false
      this.isClick = await this.countDown(this.$refs.count, 30)
    },
    // 获取登录状态
    async getStatus () {
      const res = await this.$http.post(__Config.getStatus)
      return res.data
    }
  },
  mounted () {
    // 发送验证码
    this.sentCode()
    // 开始计时
    this.$nextTick(async function () {
      this.isClick = await this.countDown(this.$refs.count, 30)
    })
    
  }
  
}
</script>

<style lang="scss" scoped>
.autharea {
  display: flex;
  flex-direction: column;
  padding: 150px 0;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 30%;
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    p {
      font-size: 14px;
      color: #c8c9cc;
      margin-bottom: 24px;
    }
    .write {
      position: relative;
      display: flex;
      justify-content: space-around;
      width: 80%;
      input {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 40px;
        background: rgba($color: #000, $alpha: 0);
        letter-spacing: 50px;
        padding-left: 53px;
      }
      span {
        font-size: 40px;
        width: 48px;
        height: 60px;
        color: #c8c9cc;
        border-bottom: 1px solid #ccc;
      }
    }
  }
  .resend {
    padding-top: 15px;
    font-size: 14px;
    .text {
      color: #c8c9cc;
      pointer-events: none;
    }
    .clicktext {
      color: rgb(121, 119, 235);
    }
    
    .count {
      color: #000;
      margin-left: 5px;
    }
  }
}
</style>