<template>
  <div class="login">
    <!-- 手机号、邮箱登录 -->
    <van-form @submit="onSubmit" @failed="onFailed">
      <van-row>
        <van-col span="24">
          <van-field
          v-model="formInfo.username"
          name="username"
          label="账号"
          autocomplete="off"
          :rules="[{ required: true }]"
          clearable
          placeholder="请输入手机号或邮箱"
          />
        </van-col>
        <van-col span="24">
          <van-field
          v-model="formInfo.password"
          type="password"
          name="password"
          label="密码"
          :rules="[{ required: true }]"
          clearable
          placeholder="请输入密码"
          />
        </van-col>

      </van-row>
      <van-row>
        <div style="margin: 16px;">
          <van-button round block type="danger" native-type="submit">登录</van-button>
        </div>
      </van-row>
      
    </van-form>
    <!-- 其他登录 -->
    <div class="otherLogin">
      <div class="scan" @click="scanHandle">
        <span>扫码登录</span>
      </div>
      <div class="auth" @click="authHandle">
        <span>验证码登录</span>
      </div>
    </div>
    <!-- 二维码遮罩层 -->
    <van-overlay :show="overlayShow" @click="overlayClick">
      <div class="wrapper" >
        <div class="block">
          <img :src="qrimg" alt="">
        </div>
      </div>
    </van-overlay>    
  </div>
</template>

<script>
import __Config from '@/api/config.js'
import Vue from 'vue'
import { Button, Toast } from 'vant'
import { Form, Field} from 'vant'
import { Col, Row } from 'vant'
import md5 from 'md5'
import { Overlay } from 'vant'

Vue.use(Overlay)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
export default {
  name: 'Index',
  data () {
    return {
      formInfo: {
        username: '15039947930',
        password: 'z15039947930'
      },
      overlayShow: false,
      key: '',
      qrimg: '',
      timer: null 
    }
  },

  methods: {
    // 登录请求
    async onSubmit () {
      // 处理password
      const params = {}
      params.md5_password = md5(this.formInfo.password)
      // 判断是手机号还是邮箱
      if (!this.formInfo.username.includes('@')) {
        params.phone = this.formInfo.username
      } else {
        params.email = this.formInfo.username
      }
      const data = await this.$http.post(__Config.getLogo, params)
      if (data.code !== 200) {
        return this.$toast('用户名密码错误！')
      }
      // 登陆成功
      // 存储cookie
      document.cookie = 'Cookies=' + data.cookie
      // 保存登录信息
      const rightData = {
        id: data.account.id,
        cookie: data.cookie,
        token: data.token
      }
      // 提交一个mutation，通过store管理登录信息rightData, 并存储到localstaroge
      this.$store.commit('saveUser', rightData)
      // 跳转到home
      this.$router.push('/home')
    },
    // 表单验证失败
    onFailed () {
      this.$toast('请合法输入')
    },
    // 扫码登录
    async scanHandle () {
      this.overlayShow = true
      // key
      const res = await this.$http.post(__Config.getqrkey)
      if (res.code !== 200) {
        return this.$toast('二维码获取失败')
      }
      this.key = res.data.unikey
      // 成功得到key，根据key生成二维码
      const res1 = await this.$http.post(__Config.createqr, { key: this.key, qrimg: true })
      if (res1.code !== 200) {
        return this.$toast('二维码获取失败')
      }
      this.qrimg = res1.data.qrimg
      // 轮询验证扫码状态
      this.timer = setInterval(async () => {
        const res2 = await this.$http.post(__Config.checkstatus, { key: this.key })
        // document.cookie = res2.cookie
        if (res2.code === 800) {
          clearInterval(this.timer)
        }
        if (res2.code === 803) {
          clearInterval(this.timer)
          // alert('授权登录成功')
          const res = await this.getStatus()
          if (res.code !== 200) {
            return this.$toast('登陆失败！')
          }
          // 成功
          const rightData = {
            id: res.account.id,
            cookie: '',
            token: ''
          }
          // 提交一个mutation，通过store管理登录信息rightData, 并存储到localstaroge
          this.$store.commit('saveUser', rightData)
          // 跳转到home
          this.$router.push('/home')
        }
      }, 3000)
    },
    // 获取登录状态
    async getStatus () {
      const res = await this.$http.post(__Config.getStatus)
      return res.data
    },
    // 验证码登录
    authHandle () {
      this.$router.push('/auth')
    },
    // 点击遮罩层
    overlayClick () {
      this.overlayShow = false
    }
  },
  // watch: {
  //   code (newCode) {
  //     console.log(newCode)
  //     if (newCode === 800) {
  //       console.log('二维码已过期,请重新获取')
  //       clearInterval(this.timer)
  //     }
  //     if (newCode === 803) {
  //       console.log('授权成功')
  //       clearInterval(this.timer)
  //       this.getStatus()
  //     }
      
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 124px;
  .otherLogin {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    span {
      font-size: 14px;
      color: #73859f;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>