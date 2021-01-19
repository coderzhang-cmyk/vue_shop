import {request1} from './request'

export function getGoods(params) {
  return request1({
    url: 'goods',
    params
  })
}

export function deleteGoods(goodsId) {
  return request1({
    url: `goods/${goodsId}`,
    method: 'delete'
  })
}

export function addGoods(data) {
  return request1({
    url: 'goods',
    method: 'post',
    data
  })
}