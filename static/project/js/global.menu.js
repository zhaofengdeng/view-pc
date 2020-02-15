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
        index: "student",
        name: "学生管理",
        url: "/system/student/list"
      },
      {
        index: "vacation",
        name: "请假管理",
        url: "/system/vacation/list"
      },
      {
        index: "notice",
        name: "公告管理",
        url: "/system/notice/list"
      },
      {
        index: "room",
        name: "寝室管理",
        url: "/system/room/list"
      }
    ]
  }
];

export default {
  menus
};
