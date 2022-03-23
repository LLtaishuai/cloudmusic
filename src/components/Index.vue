<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-row>
        <van-col span="24">
          <van-field
          v-model="phone"
          name="phone"
          label="手机号"
          autocomplete="off"
          :rules="[{ required: true, message: '请填写手机号' }]"
          />
        </van-col>
        <van-col span="24">
          <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-col>

      </van-row>
      <van-row>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-row>
      
    </van-form>
  </div>
</template>

<script>
import __Config from '@/api/config.js'
import Vue from 'vue'
import { Button, Toast } from 'vant'
import { Form, Field} from 'vant'
import { Col, Row } from 'vant';

Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
export default {
  name: 'Index',
  data () {
    return {
      phone: '15039947930',
      password: 'z15039947930'
    }
  },
  methods: {
    async onSubmit (values) {
      values.password = encodeURIComponent(values.password)
      const data = await this.$http.post(__Config.getLogo, values)
      if (data.code !== 200) {
        return Toast('用户名密码错误！')
      }
      // 登陆成功
      // 存储cookie
      document.cookie = 'Cookies=' + data.cookie
      const rightData = {
        id: data.account.id,
        cookie: data.cookie,
        token: data.token
      }
      // 通过store管理 权限信息rightData, 并存储到localstaroge
      this.$store.commit('saveUser', rightData)
      // 跳转到home
      this.$router.push('/home')
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 124px;
}
</style>