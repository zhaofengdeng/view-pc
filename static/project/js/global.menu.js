const menus = [
  {
    index: "content",
    name: "系统管理",
    menus: [
      {
        index: "user",
        name: "用户管理",
        url: "/user/list"
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
];
export default {
  menus
};
