/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:32:40
 *
 * 企业管理
 */

<<<<<<< HEAD
import { createAPI } from '@/utils/request'

export const list = data => createAPI('/companys', 'get', data)
export const add = data => createAPI('/companys', 'post', data)
export const update = data => createAPI(`/companys/${data.id}`, 'put', data)
export const remove = data => createAPI(`/companys/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/companys/${data.id}`, 'get', data)
export const disabled = data => createAPI(`/companys/${data.id}/${data.state}`, 'post', data)
=======
import createAPI from "@/utils/request";

export const list = data => createAPI("/comapnys", "post");
export const add = data => createAPI("/comapnys", "post", data);
export const update = data =>
  createAPI(`/comapnys/${data.userId}`, "get", data);
export const remove = data => createAPI(`/comapnys/${data.id}`, "get");
export const detail = data =>
  createAPI(`/comapnys/${data.userId}`, "post", data);
export const disabled = data => createAPI(`/comapnys/state`, "post", data);
>>>>>>> 759667730197835a878690b89b384df622d555d8
