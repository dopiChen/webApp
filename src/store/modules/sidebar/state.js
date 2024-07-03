export default {
  sidebarMap: {
    1: {
      main: [
        {
          groupTitle: '分组1'
        },
        {
          path: '/main/first',
          icon: 'suncaper-menu-unfold',
          title: '一级菜单1'
        },
        {
          path: '/main/second',
          icon: 'suncaper-menu-unfold',
          title: '一级菜单2',
          group: 'second',
          children: [
            {
              path: '/main/second/second',
              icon: 'suncaper-menu-unfold',
              title: '二级菜单'
            }
          ]
        }
      ]
    },
    3: {
      main: [
        {
          path: '/main/third/third1',
          icon: 'suncaper-menu-unfold',
          title: '监考报名'
        },
        {
          path: '/main/third/third2',
          icon: 'suncaper-menu-unfold',
          title: '监考记录'
        },
        {
          path: '/main/third/third_submit',
          icon: 'suncaper-menu-unfold',
          title: '报名提交'
        }
      ]
    }
  },
  2: {
    main: [
      {
        path: '/main/second',
        icon: 'suncaper-menu-unfold',
        title: '一级菜单2',
        group: 'second',
        children: [
          {
            path: '/main/second/second',
            icon: 'suncaper-menu-unfold',
            title: '二级菜单'
          }
        ]
      }
    ]
  },
  sidebarTheme: {
    dark: {
      background: '#1f2c35',
      text: '#ffffff',
      activeText: '#ffffff'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      activeText: '#1890ff'
    }
  }
}
