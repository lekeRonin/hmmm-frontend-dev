<<<<<<< HEAD
// module.exports = file => require('@/module-' + file + '.vue').default // vue-loader at least v13.0.0+
module.exports = file => () => import('@/module-' + file + '.vue')
=======
module.exports = file => require('@/module-' + file + '.vue').default // vue-loader at least v13.0.0+
>>>>>>> 36537a48b7a3ccab02313c5f839c43c7e50dcf2a
