// import Layout from '@/layout'
// export default {
//   path: '/discipline',
//   component: Layout,
//   redirect: '/discipline/subject',
//   name: 'discipline',
//   meta: { title: '学科管理', icon: 'el-icon-film' },
//   children: [
//     {
//       path: 'subject',
//       name: 'subject',
//       component: () => import('@/views/discipline/subject'),
//       meta: { title: '学科', icon: 'el-icon-notebook-1' }
//     },
//     {
//       path: 'catalogue',
//       name: 'catalogue',
//       component: () => import('@/views/discipline/catalogue'),
//       meta: { title: '目录', icon: 'el-icon-notebook-2' }
//     },
//     {
//       path: 'label',
//       name: 'label',
//       component: () => import('@/views/discipline/label'),
//       meta: { title: '标签', icon: 'el-icon-toilet-paper' }
//     }
//   ]
// }
import Layout from '@/module-dashboard/pages/layout'
export default {
  path: '/discipline',
  component: Layout,
  redirect: '/discipline/subject',
  name: 'discipline',
  meta: { title: '学科管理', icon: 'el-icon-film' },
  children: [
    {
      path: 'label',
      name: 'label',
      component: () => import('@/views/discipline/label'),
      meta: { title: '标签', icon: 'el-icon-toilet-paper' }
    }
  ]

}
