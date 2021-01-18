import { request1 } from './request'

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

export function editCategorie(id, data) {
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

export function getAttribute(cateId, params) {
  return request1({
    url: `categories/${cateId}/attributes`,
    params
  })
}

export function addParams(cateId, data) {
  return request1({
    url: `categories/${cateId}/attributes`,
    method: 'post',
    data
  })
}

export function editParams(cateId, attrId, data) {
  return request1({
    url: `categories/${cateId}/attributes/${attrId}`,
    method: 'put',
    data
  })
}

export function deleteParams(cateId, attrId) {
  return request1({
    url: `categories/${cateId}/attributes/${attrId}`,
    method: 'delete'
  })
}
