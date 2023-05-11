import request from '@/utils/request'

export function producttypelist(params) {
  return request({
    url: '/producttypelist',
    method: 'get',
    params
  })
}

export function addProductType(data) {
  return request({
    url: '/addProductType',
    method: 'post',
    data
  })
}

export function producttypedel(data) {
  return request({
    url: '/producttypedel',
    method: 'post',
    data
  })
}

export function producttypeedit(data) {
  return request({
    url: '/producttypeedit',
    method: 'post',
    data
  })
}
