import router from './router'

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('USER_TOKEN')) {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})
