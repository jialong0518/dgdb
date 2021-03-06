import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/byd/web/index.php?r=reg/login',
//     method: 'post',
//     // data: JSON.parse(data)
//     data: JSON.stringify(data)
//   })
// }

export function login(params) {
    return request({
      url: '/login',
      method: 'get',
      params
    })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function passwordreset(data) {
    return request({
      url: '/byd/web/index.php?r=reg/passwordreset',
      method: 'post',
      // data: JSON.parse(data)
      data: JSON.stringify(data)
    })
  }
