const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login2')
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
        path: 'first_approval',
        name: 'first',
        component: () =>
          import(/* webpackChunkName: "Second" */ '../pages/main/routes/first/First_Approval.vue')
      },
      {
        path: 'first_namelist',
        name: 'first',
        component: () =>
          import(/* webpackChunkName: "Second" */ '../pages/main/routes/first/First_Namelist.vue')
      },
      {
        path: 'first_enroll',
        name: 'first_enroll',
        component: () =>
          import('../pages/main/routes/first/First_Enroll.vue')
      },
      {
        path: 'personnelPage',
        name: 'personnelPage',
        component: () =>
          import('../pages/main/routes/first/personnelPage.vue')
      },
      {
        path: 'second1',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second')
      },
      {
        path: 'second2',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second2')
      },
      {
        path: 'second3',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second3')
      },
      {
        path: 'second4',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second4')
      },
      {
        path: 'second6',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second6')
      },
      {
        path: 'second_MemberList',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second_MemberList.vue')
      },
      {
        path: 'third1',
        name: 'third',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third')
      },
      {
        path: 'third2',
        name: 'third2',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third2')
      },
      {
        path: 'third3A',
        name: 'third3A',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third3A.vue')
      },
      {
        path: 'third_submit',
        name: 'third_submit',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third_Submit.vue')
      },
      {
        path: 'third_submitrecord',
        name: 'third_submitrecord',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third_SubmitRecord.vue')
      },
      {
        path: 'third_test',
        name: 'third_test',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/test.vue')
      },
      {
        path: 'third_signUpGoOn',
        name: 'third_signUpGoOn',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third_signUpGoOn.vue')
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
