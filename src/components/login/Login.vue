<template>
  <div class="login">
    <div class="logo">
      <div class="logopic">
        <!-- 给div添加背景图片 -->
      </div>
    </div>
    <div class="btn">
      <div class="logobn" @click="tellogin">
        <p>立即登录</p>
      </div>
      <div class="logobn sign" @click="registerBtn">
        <p>注册</p>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    tellogin () {
      this.$router.push('/index')
    },
    registerBtn () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  // css3渐变函数gradient
  background-image: linear-gradient(#e66465, #000);
  // 触发BFC规范，解决.logo的margin传递
  // overflow: hidden;
  // 弹性布局
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .logo {
    width: 100px;
    height: 100px;
    // margin: 50px auto; // 水平居中
    .logopic {
      width: 100%;
      height: 100%;
      background: url('@/assets/img/wyy.png') no-repeat;
      background-size: 100% 100%; // 背景图片大小
      // animation配合transform: scale() 实现呼吸效果
      animation: logopic 2s infinite linear alternate;
    }
  }
  .btn {
    width: 100%;
    .logobn {
      width: 74%;
      height: 45px;
      background: #fff;
      border-radius: 37px;
      border: 1px solid #fff;
      margin: 50px auto 0 auto;
      text-align: center;
      line-height: 45px;
      color: #db2c1f;
      font-weight: bold;
    }
    .sign {
      background: #db2c1f;
      color: #fff;
    }
  }

}
@keyframes logopic {
  0%{ transform: scale(1, 1); }
  100%{ transform: scale(1.3, 1.3); }
}
</style>