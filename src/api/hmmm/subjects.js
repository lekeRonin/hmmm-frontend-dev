/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:53:23
 *
 * 学科有关的接口：自己写吧~~  已经被张老师删了 ^_^
 *
 */

import { createAPI } from '@/utils/request'

// export const list = data => createAPI('/logs/', 'get', data)

export const getSubjects = data => createAPI('/subjects', 'get', data)

export const getSubjectsList = () => createAPI('/subjects/simple', 'get') // 学科简单列表

export const AddSubjects = data => createAPI('/subjects', 'post', data) // 新增
export const DelSubjects = id => createAPI(`/subjects/${id}`, 'DELETE') // 删除
export const EditSubjects = data => createAPI(`/subjects/${data.id}`, 'put', data) // 修改
export const SubjectsById = id => createAPI(`/subjects/${id}`, 'get') // 学科详情
