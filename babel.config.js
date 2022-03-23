module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 按需引入vant组件。 tip：修改配置文件后需要重启serve才能生效
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
