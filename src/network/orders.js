import { request1 } from './request'

export function getOrders(params) {
  return request1({
    url: 'orders',
    params
  })
}

export function getKuaiDi(id) {
  return request1({
    url: `/kuaidi/:${id}`
  })
}