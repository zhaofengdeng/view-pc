const menus = [
  {
    index: "content",
    name: "系统管理",
    menus: [
      {
        index: "user",
        name: "用户管理",
        url: "/system/user/list"
      },
      {
        index: "role",
        name: "角色管理",
        url: "/role/list"
      }
    ]
  }, {
    index: "demo",
    name: "demo查看",
    url: "/demo"
  }
  , {
    index: "demo2",
    name: "demo管理",
    menus: [
      {
        index: "demoList",
        name: "列表Demo",
        url: "/demo/list"
      },
      {
        index: "demoEdit",
        name: "编辑demo",
        url: "/role/list"
      },
      {
        index: "demoDetail",
        name: "详细demo",
        url: "/role/list"
      }]
  }
];
export default {
  menus
};
