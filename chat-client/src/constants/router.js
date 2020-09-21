export const RoutersAuth = [
  {
    exact: true,
    path: '/join',
    component: 'Join'
  },
  {
    exact: true,
    path: '/room',
    component: 'Join'
  },
  {
    exact: true,
    path: '/room/:room',
    component: 'Chat'
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