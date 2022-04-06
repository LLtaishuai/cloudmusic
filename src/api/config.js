/* 
所有API接口
*/
const apiConfig = {
  getLogo: '/login/cellphone', // 登录
  getqrkey: '/login/qr/key', // 获取二维码key
  createqr: '/login/qr/create', // 生成二维码，参数key
  checkstatus: '/login/qr/check', // 检测扫码状态，参数key
  getStatus: '/login/status', // 获取登录状态
  sentAuthCode: '/captcha/sent', // 发送验证码 参数phone
  checkAuthCode: '/captcha/verify', // 验证验证码 参数phone captcha
  checkIsRegister: '/cellphone/existence/check', // 参数phone 检测是否已注册
  checkNickname: '/nickname/check', // 检测昵称是否可用 参数nickname
  submitRegister: '/register/cellphone', // 提交注册 参数captcha: 验证码 phone : 手机号码 password: 密码 nickname: 昵称
  getBannerImg: '/banner', // banner图片 参数type=1:android,type=2:ios,type=3:ipad
  getNewMV: '/mv/first', // 最新MV 参数limit：取出数量
  getNewSong: '/personalized/newsong',// 最新歌曲 参数limit：取出数量 默认10
  isPlaySong: '/check/music', // 查看歌曲是否有效， 参数 id：歌曲id   br：码率
  search: '/cloudsearch', //  传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 
  getSongUrl: '/song/url', // 获取音乐url 参数： id：歌曲id
  getSongLyric: '/lyric', // 获取歌词 参数： id：歌曲id
  getMvUrl: '/mv/url', // 获取mv的url地址
  getMvInfo: '/mv/detail/info', // 可获取对应 MV 点赞转发评论数数据
  getUserDetail: '/user/detail', // 参数：id
  loginout: '/logout', // 退出登录
  getVideoCate: '/video/category/list', // 获取视频分类
  getVideoGroup: '/video/group', // 参数id：标签或分类id，获取分类下的视频
  getVideoUrl: '/video/url', // 参数id
  getVideoInfo: '/video/detail/info', // 参数vid
  uploadAvatar: '/avatar/upload' // 更新头像 参数 imgSize 尺寸默认300 imgX imgY
}

export default apiConfig