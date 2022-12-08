<<<<<<< HEAD
import Layout from '@/module-dashboard/pages/layout'
<<<<<<< HEAD
=======
import Login from '@/module-dashboard/pages/login'
import Label from '@/views/discipline/label/label.vue'
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
const _import = require('@/router/import_' + process.env.NODE_ENV)
=======
import Layout from "@/module-dashboard/pages/layout";
const _import = require("@/router/import_" + process.env.NODE_ENV);
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
/**
 *
 * 路由有部分地方，需要自己补全的喔~ O(∩_∩)O哈哈~
 */

<<<<<<< HEAD
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
=======
 export default [
  {
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
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
<<<<<<< HEAD
        component: _import('hmmm/pages/companys'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
=======
        component: _import('hmmm/pages/companys'),
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
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
<<<<<<< HEAD
        component: _import('hmmm/pages/questions'),
=======
        component: _import('s'),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
=======
        component: _import('hmmm/pages/questions'),
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
        name: 'questions-list',
        meta: { title: '基础题库', noCache: true, icon: 'component' }
      },
      {
        path: 'choice',
<<<<<<< HEAD
<<<<<<< HEAD
        component: _import('hmmm/pages/questions-choice'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
=======
        component: _import('hmmm/pages/questions-choice'),
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
        name: 'questions-choice',
        meta: { title: '精选题库', noCache: true, icon: 'component' }
      },
      {
        path: 'new',
<<<<<<< HEAD
<<<<<<< HEAD
        component: _import('hmmm/pages/questions-new'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
=======
        component: _import('hmmm/pages/questions-new'),
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
        name: 'questions-new',
        meta: { title: '试题录入', noCache: true, icon: 'component' }
      },
      {
        path: 'randoms',
<<<<<<< HEAD
<<<<<<< HEAD
        component: _import('hmmm/pages/questions-randoms'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
=======
        component: _import('hmmm/pages/questions-randoms'),
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
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
<<<<<<< HEAD
        component: _import('hmmm/pages/subjects'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
=======
        component: _import('hmmm/pages/subjects'),
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
        name: 'subjects-list',
        meta: { title: '学科', noCache: true, icon: 'component' }
      },
      {
        path: 'directorys',
<<<<<<< HEAD
<<<<<<< HEAD
        component: _import('hmmm/pages/directorys'),
=======
        component: _import(''),
>>>>>>> 474300f603c3d6e3c024bb2d1b53631aa9d7e263
=======
        component: _import('hmmm/pages/directorys'),
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
        name: 'subjects-directorys',
        meta: { title: '目录', noCache: true, icon: 'component' }
      },
      {
<<<<<<< HEAD
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
=======
        path: 'tags',
        component: _import('hmmm/pages/tags'),
        name: 'subjects-tags',
        meta: { title: '标签', noCache: true, icon: 'component' }
      }
    ]
  },
  {
    path: '/articles',
    component: Layout,
    redirect: 'noredirect',
    name: 'articles',
    meta: {
      title: '面试技巧',
      icon: 'form'
    },
    children: [
      {
        path: 'list',
        component: _import('hmmm/pages/articles'),
        name: 'articles-list',
        meta: { title: '面试技巧', noCache: true, icon: 'component' }
      }
    ]
  }
]
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
