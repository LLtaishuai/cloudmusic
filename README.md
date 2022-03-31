# 网易云音乐
## pages
- login
  *  logo呼吸效果：animation
- index
  * 登录请求






## router
## store
  - 管理用户登录信息状态
## utils
- http
  * 封装axios、拦截axios
- lrcformat
  * 封装一个处理lrc格式的函数
## api
- config
  * 所有请求的API接口








# 开发问题
  1. 由于接口做了缓存，所以登录后立即退出在登录会出现问题，使用缓存。解决：在url上添加时间戳
  2. 处理lrc歌词，同步播放展示
