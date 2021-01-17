import {request1} from './request'

export function getCategories(params) {
 return request1({
  url: 'categories',
  params
 })
}

export function addCategorie(data) {
  return request1({
    url: 'categories',
    method: 'post',
    data
  })
}

export function editCategorie(id,data) {
  return request1({
    url: `categories/${id}`,
    method: 'put',
    data
  })
}

export function deleteCategorie(id) {
  return request1({
    url: `categories/${id}`,
    method: 'delete'
  })
}