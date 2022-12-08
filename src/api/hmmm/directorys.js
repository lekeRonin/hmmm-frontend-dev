/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:56:00
 *
 * 目录
 */

import { createAPI } from '@/utils/request'

// 目录列表
// export const list = data => createAPI('/direcotrys', 'get', data)
export const getDirectorys = data => createAPI('/directorys', 'get', data)

// 目录简单列表
export const getDirectorysById = id => createAPI(`/directorys/${id}`, 'get')
<<<<<<< HEAD
export const simple = data => createAPI('/direcotrys', 'post')
=======
export const simple = data => createAPI('/directorys/simple', 'get', data)
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a

// 目录详情
export const detail = data =>
  createAPI(`/direcotrys/${data.userId}`, 'get', data)

// 目录添加
// export const add = data => createAPI('/direcotrys', 'post', data)
export const addDirectorys = data => createAPI('/directorys', 'post', data)

// 目录修改
// export const update = data => createAPI(`/direcotrys/${data.id}`, 'put', data)
export const EditDirectorys = data => createAPI(`/directorys/${data.id}`, 'put', data)

// 目录删除
// export const remove = data =>
//   createAPI(`/directorys/${data.id}`, 'delete', data)
export const DelDirectorys = id => createAPI(`/directorys/${id}`, 'delete')

// 目录状态
// export const changeState = data => createAPI(`/directorys/${data.id}`, 'get')

// 修改启动和禁用
export const EditState = data => createAPI(`/directorys/${data.id}/${data.state}`, 'POST', data)
