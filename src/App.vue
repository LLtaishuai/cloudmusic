<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
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
</style>

