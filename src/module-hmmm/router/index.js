import Layout from '@/module-dashboard/pages/layout'
<<<<<<< HEAD
=======
import Login from '@/module-dashboard/pages/login'
import Label from '@/views/discipline/label/label.vue'
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
const _import = require('@/router/import_' + process.env.NODE_ENV)
/**
 *
 * 路由有部分地方，需要自己补全的喔~ O(∩_∩)O哈哈~
 */

export default [
  {
<<<<<<< HEAD
=======
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
    path: '/companys',
    component: Layout,
    redirect: 'noredirect',
    name: 'companys',
    meta: {
      title: '企业管理',
      icon: 'component'
    },
    children: [
      {
        path: 'list',
<<<<<<< HEAD
        component: _import('hmmm/pages/companys'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
        name: 'companys-list',
        meta: { title: '企业管理', noCache: true, icon: 'peoples' }
      }
    ]
  },
  {
    path: '/questions',
    component: Layout,
    redirect: 'noredirect',
    name: 'questions',
    meta: {
      title: '题库管理',
      icon: 'documentation'
    },
    children: [
      {
        path: 'list',
<<<<<<< HEAD
        component: _import('hmmm/pages/questions'),
=======
        component: _import('s'),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
        name: 'questions-list',
        meta: { title: '基础题库', noCache: true, icon: 'component' }
      },
      {
        path: 'choice',
<<<<<<< HEAD
        component: _import('hmmm/pages/questions-choice'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
        name: 'questions-choice',
        meta: { title: '精选题库', noCache: true, icon: 'component' }
      },
      {
        path: 'new',
<<<<<<< HEAD
        component: _import('hmmm/pages/questions-new'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
        name: 'questions-new',
        meta: { title: '试题录入', noCache: true, icon: 'component' }
      },
      {
        path: 'randoms',
<<<<<<< HEAD
        component: _import('hmmm/pages/questions-randoms'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
        name: 'questions-randoms',
        meta: { title: '组题列表', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/subjects',
    component: Layout,
    redirect: 'noredirect',
    name: 'subjects',
    meta: {
      title: '学科管理',
      icon: 'table'
    },
    children: [
      {
        path: 'list',
<<<<<<< HEAD
        component: _import('hmmm/pages/subjects'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
        name: 'subjects-list',
        meta: { title: '学科', noCache: true, icon: 'component' }
      },
      {
        path: 'directorys',
<<<<<<< HEAD
        component: _import('hmmm/pages/directorys'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
        name: 'subjects-directorys',
        meta: { title: '目录', noCache: true, icon: 'component' }
      },
      {
<<<<<<< HEAD
        path: 'tags',
        component: _import('hmmm/pages/tags'),
        name: 'subjects-tags',
=======
        path: 'label',
        component: Label,
        // _import('@/views/discipline/label'),
        name: 'subjects-laebl',
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
        meta: { title: '标签', noCache: true, icon: 'component' }
      }
    ]
  }
]
