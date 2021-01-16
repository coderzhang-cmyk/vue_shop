import {request1} from './request'


export function getRights() {
  return request1({
    url:'rights/list'
  })
}