// module.exports = file => require('@/module-' + file + '.vue').default // vue-loader at least v13.0.0+
module.exports = file => () => import('@/module-' + file + '.vue')
