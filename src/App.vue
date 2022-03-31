<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
/* 初始化默认样式 */
* {
  padding: 0;
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  min-width: 350px;
  min-height: 650px;
  margin: 0 auto;
}
#app {
  width: 100%;
  height: 100%;
  font-family:"微软雅黑";
	margin: 0px auto;
}
a {
	text-decoration:none;
}
ul li {
	list-style:none;
}
/* 小标题样式 */
.top_title {
  width: 98%;
  margin: 0 auto;
  p {
    margin: 5px;
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
}
/* nav-bar */
.van-nav-bar__title {
	font-size:13px !important;
}
.van-nav-bar .van-icon {
	color:#b72020 !important;
	font-size:14px !important;
	font-weight:bold !important;
}
.van-nav-bar__left .van-nav-bar__text {
	color:#b72020;
	font-size:14px;
	font-weight:bold;
}
</style>

