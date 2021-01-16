import { request1 } from './request'

export function getUsers(pagenum, pagesize, query = '') {
  return request1({
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function modifyUsersState(user_id, type) {
  return request1({
    url: `users/${user_id}/state/${type}`,
    method: 'put'
  })
}

export function addUser(data) {
  return request1({
    url: 'users',
    method: 'post',
    data
  })
}

export function editUser(user_id, data) {
  return request1({
    url: `users/${user_id}`,
    method: 'put',
    data
  })
}

export function deleteUser(user_id) {
  return request1({
    url: `users/${user_id}`,
    method: 'delete'
  })
}

export function getRoles() {
  return request1({
    url: 'roles'
  })
}

export function assignRoles(user_id,data) {
  return request1({
    url: `users/${user_id}/role`,
    method: 'put',
    data
  })
}