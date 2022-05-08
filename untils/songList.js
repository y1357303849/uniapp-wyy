// 导入request模块
import request from './request.js'

// 歌单列表
export const getSongListAPI = (name, coverImgUrl) => {
  return request.get("/top/playlist", {
    params: {
      name,
      coverImgUrl
    }
  })
}