import { request1 } from './request'


export function getMenus() {
  return request1({
    url: 'menus'
  })
}

