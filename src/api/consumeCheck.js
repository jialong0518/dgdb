import request from '@/utils/request'

export function customerlist(params) {
  return request({
    url: '/customerlist',
    method: 'get',
    params
  })
}

export function productlist(params) {
    return request({
      url: '/productlist',
      method: 'get',
      params
    })
}

export function consumeRecord(data) {
    return request({
      url: '/consumeRecord',
      method: 'post',
      data
    })
}

export function plainConsumeRecord(data) {
    return request({
      url: '/plainConsumeRecord',
      method: 'post',
      data
    })
}

export function consumeRecordList(params) {
    return request({
      url: '/consumeRecordList',
      method: 'get',
      params
    })
}