const routes = [
    {
      path: "/sandwiches",
      component: Sandwiches
    },
    {
      path: "/tacos",
      component: Tacos,
      routes: [
        {
          path: "/tacos/bus",
          component: Bus
        },
        {
          path: "/tacos/cart",
          component: Cart
        }
      ]
    }
  ];

  export default routes;