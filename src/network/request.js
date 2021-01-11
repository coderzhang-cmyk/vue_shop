import axios from 'axios'

export function request1(config) {
  const example = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api',
    timeout: 5000
  })
  example.interceptors.request.use(config => {
    return config
  },error => {
    console.log(error);
  })
  example.interceptors.response.use(res => {
    return res.data
  },error => {
    console.log(error);
  })

  return example(config)
}