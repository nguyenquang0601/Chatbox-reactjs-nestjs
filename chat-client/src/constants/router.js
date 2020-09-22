export const RoutersAuth = [
  {
    exact: true,
    path: '/room/:id',
    component: 'Chat'
  },
  {
    exact: true,
    path: '/room',
    component: 'Join'
  },
  {
    exact: true,
    path: '/',
    component: 'Join'
  }
]
export const NoAuth = [
  {
    exact: true,
    path: '/login',
    component: 'Login'
  }
]