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

export function customerlist(params) {
  return request({
    url: '/customerlist',
    method: 'get',
    params
  })
}

export function customerAdd(data) {
  return request({
    url: '/addCustomer',
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

  export function customerdel(data) {
    return request({
      url: '/userdel',
      method: 'post',
      // data: JSON.parse(data)
      data
    })
  }

  export function customeredit(data) {
    return request({
      url: '/customerEdit',
      method: 'post',
      data
    })
  }
  
  export function customerbind(data) {
    return request({
      url: '/customerInfor',
      method: 'post',
      data
    })
  }

  export function customerRecharge(data) {
    return request({
      url: '/customerRecharge',
      method: 'post',
      data
    })
  }

  export function rechargeRecordList(params) {
    return request({
      url: '/rechargeRecordList',
      method: 'get',
      params
    })
  }
  


  


