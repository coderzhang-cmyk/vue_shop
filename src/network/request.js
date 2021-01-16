import axios from 'axios'



export function request1(config) {
  const example = axios.create({
    baseURL: 'http://www.ysqorz.top:8888/api/private/v1',
    timeout: 5000
  })
  example.interceptors.request.use(config => {
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  }, error => {
    console.log(error);
  })
  example.interceptors.response.use(res => {
    return res.data
  }, error => {
    console.log(error);
  })

  return example(config)
}