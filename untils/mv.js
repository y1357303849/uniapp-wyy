// 导入request模块
import request from './request.js'

// 最新MV
export const getNewMvAPI = (data) => {
  return request.get("/mv/first", {
    params: {
      data
    }
  })
}
// 推荐MV
export const getRecommendMvAPI = (result) => {
  return request.get("/personalized/mv", {
    params: {
      result
    }
  })
}
// MV排行榜
export const getMvTopAPI = (data) => {
  return request.get("/top/mv", {
    params: {
      data
    }
  })
}