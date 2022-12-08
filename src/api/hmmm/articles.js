/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 15:16:53
 *
 * 文章
 */

import { createAPI } from '@/utils/request'

class Article {
  // 文章列表
  list = data => createAPI('/articles', 'get', data)

  // 文章简单列表
  simple = data => createAPI('/articles/simple', 'get', data)

  // 文章详情
  detail = data => createAPI(`/articles/${data.id}`, 'get', data)

  // 文章添加
  add = data => createAPI('/articles', 'post', data)

  // 文章修改
  update = data => createAPI(`/articles/${data.id}`, 'put', data)

  // 文章删除
  remove = data => createAPI(`/articles/${data.id}`, 'delete', data)

  // 文章状态
  changeState = data => createAPI(`/articles/${data.id}/${data.state}`, 'post', data)
}

export default new Article()
