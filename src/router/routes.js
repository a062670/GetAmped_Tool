const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/Index.vue'),
      },
      {
        name: 'fishing',
        path: 'fishing',
        component: () => import('pages/Fishing.vue'),
      },
      {
        name: 'capture',
        path: 'capture',
        component: () => import('pages/Capture.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
