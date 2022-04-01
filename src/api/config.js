/* 
所有API接口
*/
const apiConfig = {
  getLogo: '/login/cellphone', // 登录
  getBannerImg: '/banner', // banner图片 参数type=1:android,type=2:ios,type=3:ipad
  getNewMV: '/mv/first', // 最新MV 参数limit：取出数量
  getNewSong: '/personalized/newsong',// 最新歌曲 参数limit：取出数量 默认10
  isPlaySong: '/check/music', // 查看歌曲是否有效， 参数 id：歌曲id   br：码率
  search: '/cloudsearch', //  传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 
  getSongUrl: '/song/url', // 获取音乐url 参数： id：歌曲id
  getSongLyric: '/lyric', // 获取歌词 参数： id：歌曲id
  getMvUrl: '/mv/url', // 获取mv的url地址
  getMvInfo: '/mv/detail/info', // 可获取对应 MV 点赞转发评论数数据
  getUserDetail: '/user/detail' // 参数：id
}

export default apiConfig