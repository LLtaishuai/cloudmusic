/* 
所有API接口
*/
const apiConfig = {
  getLogo: '/login/cellphone', // 登录
  getBannerImg: '/banner', // banner图片 参数type=1:android,type=2:ios,type=3:ipad
  getNewMV: '/mv/first', // 最新MV 参数limit：取出数量
  getNewSong: '/personalized/newsong'// 最新歌曲 参数limit：取出数量 默认10
}

export default apiConfig