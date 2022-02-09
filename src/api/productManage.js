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

export function productlist(params) {
  return request({
    url: '/productlist',
    method: 'get',
    params
  })
}

export function addProduct(data) {
  return request({
    url: '/addProduct',
    method: 'post',
    data
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

  export function productdel(data) {
    return request({
      url: '/productdel',
      method: 'post',
      // data: JSON.parse(data)
      data
    })
  }

  export function productedit(data) {
    return request({
      url: '/productedit',
      method: 'post',
      data
    })
  }

  export function productbind(data) {
    return request({
      url: '/productInfor',
      method: 'post',
      data
    })
  }

  export function productTop(data) {
    return request({
      url: '/productTop',
      method: 'post',
      data
    })
  }
  

  


  


