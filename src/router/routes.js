const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  }
]

const mainPage = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    children: [
      {
        path: 'first',
        name: 'first',
        component: () =>
          import(/* webpackChunkName: "Second" */ '../pages/main/routes/first/First')
      },
      {
        path: 'second/second',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second')
      },
      {
        path: 'third/third1',
        name: 'third',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third')
      },
      {
        path: 'third/third2',
        name: 'third',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third2')
      },
      {
        path: 'third/third3',
        name: 'third',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third3')
      }
    ]
  }
]

const errorPage = [
  {
    path: '/notFound',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../pages/error/NotFound')
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () =>
      import(/* webpackChunkName: "Forbidden" */ '../pages/error/Forbidden')
  },
  {
    path: '/badGateway',
    name: 'badGateway',
    component: () =>
      import(/* webpackChunkName: "BadGateway" */ '../pages/error/BadGateway')
  },
  {
    path: '*',
    redirect: '/notFound'
  }
]
export default [...loginPage, ...mainPage, ...errorPage]
