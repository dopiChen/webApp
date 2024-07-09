const loginPage = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../pages/login/Login')
  }
]
const Thirdpage = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main3',
    name: 'main3',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    children: [
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
        path: 'third/third3A',
        name: 'third3A',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third3A.vue')
      },
      {
        path: 'third/third_submit',
        name: 'third_submit',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third_Submit.vue')
      },
      {
        path: 'third/third_submitrecord',
        name: 'third_submitrecord',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/Third_SubmitRecord.vue')
      },
      {
        path: 'third/third_test',
        name: 'third_test',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/third/test.vue')
      }
    ]
  }
]
const Secondpage = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main2',
    name: 'main2',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    children: [
      {
        path: 'second/second1',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second')
      },
      {
        path: 'second/second2',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second2')
      },
      {
        path: 'second/second3',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second3')
      },
      {
        path: 'second/second4',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second4')
      },
      {
        path: 'second/second5',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second5')
      },
      {
        path: 'second/second6',
        name: 'second',
        component: () =>
          import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second6')
      },
      {
        path: 'second/second_MemberList',
        name: 'second',
        component: () =>
            import(/* webpackChunkName: "First" */ '../pages/main/routes/second/Second_MemberList.vue')
      }
    ]
  }
]

const FirstPage = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main1',
    name: 'main1',
    component: () =>
      import(/* webpackChunkName: "Main" */ '../pages/main/Main'),
    children: [
      {
        path: 'first/first_approval',
        name: 'first_approval',
        component: () =>
          import(/* webpackChunkName: "Second" */ '../pages/main/routes/first/First_Approval.vue')
      },
      {
        path: 'first/first_namelist',
        name: 'first_namelist',
        component: () =>
          import(/* webpackChunkName: "Second" */ '../pages/main/routes/first/First_Namelist.vue')
      },
      {
        path: 'first/first_enroll',
        name: 'first_enroll',
        component: () =>
          import(/* webpackChunkName: "Second" */ '../pages/main/routes/first/First_Enroll.vue')
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
export default [...loginPage, ...FirstPage, ...errorPage, ...Thirdpage, ...Secondpage]
