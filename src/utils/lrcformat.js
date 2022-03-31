/**
 * lrc格式歌词格式化 
 */
function lrcformat (lrc) {
  const lyric = []
  let lrcArr = lrc.split('\n')
  // 记录行数
  let row = lrcArr.length - 1
  // 循环遍历lrcArr
  for (let i = 0; i < row; i++) {
    let itemArr = lrcArr[i].split(']')
    // 取出文字部分
    let text = itemArr.pop()
    // 取出时间部分
    itemArr.forEach(ele => {
      let obj = {}
      let timeArr = ele.slice(1, ele.length - 1).split(':')
      let s = parseInt(timeArr[0]) * 60 + Math.ceil(timeArr[1])
      obj.time = s
      obj.text = text
      // 存储到状态
      lyric.push(obj)
    })
  }  
  return lyric
}

export default lrcformat