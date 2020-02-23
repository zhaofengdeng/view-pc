const menus = [
  {
    index: "content",
    name: "高校食堂点餐系统",
    menus: [
      {
        index: "user",
        name: "用户管理",
        url: "/system/user/list"
      }
    ]
  }
];
const menus2 = [
  {
    index: "content",
    name: "三味书屋管理系统",
    menus: [
      {
        index: "home",
        name: "首页",
        url: "/customer/home"
      },
      {
        index: "book",
        name: "书籍购买",
        url: "/customer/book"
      },
      {
        index: "buyCar",
        name: "购物车",
        url: "/customer/buy_car"
      },
      {
        index: "order",
        name: "我的订单",
        url: "/customer/order"
      }
    ]
  }
];
const menus3 = [
  {
    index: "content",
    name: "三味书屋管理系统",
    menus: [
      {
        index: "user",
        name: "顾客管理",
        url: "/system/user/list"
      },
      {
        index: "book",
        name: "书籍管理",
        url: "/system/book/list"
      },
      {
        index: "order",
        name: "订单管理",
        url: "/system/order/list"
      },
      {
        index: "orderAnalysis",
        name: "盘点核算",
        url: "/system/order/analysis"
      }
    ]
  }
];
export default {
  menus, menus2, menus3
};
