const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/send',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SendStepper.vue') }],
  },
  {
    path: '/pickup',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PickupStepper.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
