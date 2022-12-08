/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:57:26
 *
 * 标签有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:57:26
 *
 * 标签有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
=======
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
import { request } from '@/utils/request'

=======
import { request } from '@/utils/request'
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
// 获取学科简单列表
export function getSubjectsList (params) {
  return request({
    url: '/subjects/simple',
    method: 'get',
    params
  })
}

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 759667730197835a878690b89b384df622d555d8
=======
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
=======
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
