<template>
<div class="box">
  <!-- 注册区 -->
  <div class="register" v-show="registerShow">
    <!-- 表单 -->
    <div class="form">
      <van-form @submit="register" validate-trigger="onBlur">
        <van-field
          v-model="phone"
          name="手机号"
          label="手机号"
          placeholder="手机号"
          autocomplete="off"
          :rules="[{pattern: tellPattern, required: true }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ pattern: pwPattern, required: true, message: '密码包含 数字,英文,字符中的两种以上，长度6-20' }]"
        />
      </van-form>
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <div class="backBtn" @click="back">
        <p>返回</p>
      </div>
      <div class="signBtn" @click="register">
        <p>注册</p>
      </div>
    </div>
  </div>
  <!-- 验证区 -->
  <div class="autharea" v-show="authareaShow">
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
  </div>
  <!-- 昵称区 -->
  <div class="nickarea" v-show="nicknameShow">
    <h3>取一个昵称，让大家记住你</h3>
    <div class="nick">
      <van-field
          v-model="nickname"
          label="昵称"
          left-icon="contact-o"
          placeholder="请输入昵称"
        />
    </div>
    <div class="submitBtn" @click="nickChangeHandle">
      完成注册，开启云音乐
    </div>
  </div>
</div>
  
</template>

<script>
import __Config from '@/api/config'
import Vue from 'vue'
import { Form } from 'vant'
import { Field } from 'vant'

Vue.use(Form);
Vue.use(Field);
export default {
  data () {
    return {
      phone: '',
      password: '',
      nickname: '',
      // 手机号正则
      tellPattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      // 密码正则
      pwPattern: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/,
      authareaShow: false,
      registerShow: true,
      nicknameShow: false,
      // 验证码
      authcode: '',
      iswrite: false
    }
  },

  methods: {
    back () {
      this.$router.go(-1)
    },
    async register () {
      // 表单校验
      if (!(this.tellPattern.test(this.phone) && this.pwPattern.test(this.password))) {
        return this.$toast('请合法输入')
      }
      // 校验是否已注册
      const res =  await this.checkIsRegister()
      if (res.exist === 1) {
        return this.$toast('手机号已注册')
      }
      // 校验通过，打开验证区, 关闭注册区
      this.registerShow = false
      this.authareaShow = true
      // 发送验证码
      this.sentCode()
    },
    // 验证码 input change事件回调函数
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
        this.nicknameShow = true
        this.authareaShow = false
      }
      
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
    // 检测是否已注册
    async checkIsRegister () {
      const res = await this.$http.post(__Config.checkIsRegister, { phone: this.phone })
      return res
    },
    // 检测昵称是否重复
    async nickChangeHandle () {
      const res = await this.$http.post(__Config.checkNickname, {
        nickname: this.nickname
      })
      if (res.code === 200 && res.duplicated) {
        return this.$toast('昵称已占用')
      }
      // console.log(res)
      // 如果重复， 提醒更改
      // 如果不重复，提交注册
      const res2 = await this.submitRegister()
      // console.log(res2)
      // 注册失败， 返回登录页
      if (res2.code !== 200) {
        this.$router.push('/index')
        return this.$toast('注册失败！')
      }
      // 注册成功， 去登录
      const rightData = {
        id: res2.account.id,
        cookie: '',
        token: res2.token
      }
      this.$store.commit('saveUser', rightData)
      // 跳转到home
      this.$router.push('/home')
    },
    // 提交注册
    async submitRegister () {
      const res = await this.$http.post(__Config.submitRegister, {
        phone: this.phone,
        captcha: this.authcode,
        nickname: this.nickname,
        password: this.password
      })
      return res
    }

  }
}
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .btn {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .backBtn {
      width: 30%;
      height: 45px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #db2c1f;
      text-align: center;
      line-height: 45px;
      color: #db2c1f;
      font-weight: bold;
    }
    .signBtn {
      background: #db2c1f;
      color: #fff;
      width: 30%;
      height: 45px;
      border-radius: 5px;
      border: 1px solid #fff;
      text-align: center;
      line-height: 45px;
      font-weight: bold;
    }
  }
}
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
}
.nickarea {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .submitBtn {
    width: 80%;
    height: 40px;
    background: #db2c1f;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
  }
  .van-field {
    margin: 15px 0;
  }
}
.box {
  width: 100%;
  height: 100%;
}
</style>