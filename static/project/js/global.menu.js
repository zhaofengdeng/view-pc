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
    name: "高校食堂点餐系统",
    menus: [

      {
        index: "product",
        name: "点餐",
        url: "/customer/product"
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
    name: "高校食堂点餐系统",
    menus: [
      {
        index: "product",
        name: "菜品管理",
        url: "/shop/product/list"
      },

      {
        index: "order",
        name: "订单管理",
        url: "/shop/order/list"
      }
    ]
  }
];
export default {
  menus, menus2, menus3
};
