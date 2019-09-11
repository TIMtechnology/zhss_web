import api from './index'
import { axios } from '@/utils/request'


export function getuserlist (parameter) {
  return axios({
    url: '/v1/admin/UserList',
    method: 'post',
    data: parameter
  })
}