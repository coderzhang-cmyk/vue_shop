import { request1 } from './request'


export function getRoles() {
  return request1({
    url: 'roles'
  })
}

export function addRole(data) {
  return request1({
    url: '/roles',
    method: 'post',
    data
  })
}

export function editRole(role_id, data) {
  return request1({
    url: `roles/${role_id}`,
    method: 'put',
    data
  })
}

export function deleteRole(role_id) {
  return request1({
    url: `roles/${role_id}`,
    method: 'delete'
  })
}

export function deleteTag(roleId,rightId) {
  return request1({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

export function getTag() {
  return request1({
    url: 'rights/tree'
  })
}

export function addTag(roleId,data) {
  return request1({
    url : `roles/${roleId}/rights`,
    method: 'post',
    data
  })
}