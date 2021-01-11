import {request1} from './request'

export function getLogin(data) {
  return request1({
    url: '/login',
    method: 'post',
    data
  })
}