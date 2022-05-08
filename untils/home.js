// 导入request模块
import request from './request.js'

// 轮播图
export const getSwiperAPI = (imageUrl) => {
  return request.get("/banner", {
    params: {
      imageUrl
    }
  })
}
// 推荐歌单
export const getPlayListAPI = (name, picUrl) => {
  return request.get("/personalized", {
    params: {
      name,
      picUrl
    }
  })
}
// 独家放送
export const getExclusiveAPI = (sPicUrl, copywriter) => {
  return request.get("/personalized/privatecontent", {
    parmas: {
      sPicUrl,
      copywriter
    }
  })
}
// 最新专辑
export const getNewAlbumAPI = (name, blurPicUrl, artist) => {
  return request.get("/album/newest", {
    parmas: {
      name,
      blurPicUrl,
      artist
    }
  })
}