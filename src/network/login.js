import {request1} from './request'

export function getLogin(data) {
  return request1({
    url: '/private/v1/login',
    method: 'post',
    data
  })
}