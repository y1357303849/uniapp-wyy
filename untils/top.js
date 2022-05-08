// 导入request模块
import request from './request.js'

// 飙升榜
export const getSurgeTopAPI = (tracks) => {
  return request.get("/playlist/detail?id=19723756", {
    params: {
      tracks
    }
  })
}
// 新歌榜
export const getNewSingTopAPI = (tracks) => {
  return request.get("/playlist/detail?id=3779629", {
    params: {
      tracks
    }
  })
}
// 原创榜
export const getOriginalTopAPI = (tracks) => {
  return request.get("/playlist/detail?id=2884035", {
    params: {
      tracks
    }
  })
}
// 热歌榜
export const getHotSongTopAPI = (tracks) => {
  return request.get("/playlist/detail?id=3778678", {
    params: {
      tracks
    }
  })
}
// 全球榜
export const getGlobalTopAPI = (list) => {
  return request.get("/toplist/detail", {
    params: {
      list
    }
  })
}