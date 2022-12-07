/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:57:26
 *
 * 标签有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
import { request } from '@/utils/request'

export function getTagList (params) {
  return request({
    url: '/tags',
    method: 'get',
    params
  })
}
// 增加标签
export function addTag (data) {
  return request({
    url: '/tags',
    method: 'post',
    data
  })
}

// 获取标签祥情
export function getTagDetail (id) {
  return request({
    url: `/tags/${id}`,
    method: 'get'
  })
}

// 修改标签
export function editeTag (data) {
  return request({
    url: `/tags/${data.id}`,
    method: 'put',
    data
  })
}

// 删除标签
export function delTag (id) {
  return request({
    url: `/tags/${id}`,
    method: 'delete'
  })
}

// 上传标签状态
export function postTagState (data) {
  return request({
    url: `/tags/${data.id}/${data.state}`,
    method: 'post',
    data
  })
}
