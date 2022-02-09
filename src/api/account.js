import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function userlist(params) {
  return request({
    url: '/userlist',
    method: 'get',
    params
  })
}

export function userAdd(params) {
  console.log(params)
  return request({
    url: '/addUser',
    method: 'get',
    params
  })
}

export function passwordreset(data) {
    return request({
      url: '/passwordreset',
      method: 'post',
      // data: JSON.parse(data)
      data: JSON.stringify(data)
    })
  }

  export function userdel(data) {
    return request({
      url: '/userdel',
      method: 'post',
      // data: JSON.parse(data)
      data
    })
  }

  export function useredit(data) {
    return request({
      url: '/useredit',
      method: 'post',
      data
    })
  }

  export function userbind(data) {
    return request({
      url: '/userInfor',
      method: 'post',
      data
    })
  }


  


  


