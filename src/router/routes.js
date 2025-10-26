const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/pickupPhone',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PickupPhone.vue') }],
  },
  {
    path: '/optCheck',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/OptCheck.vue') }],
  },
  {
    path: '/verifyNotice',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/VerifyNotice.vue') }],
  },
  {
    path: '/qrcode',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ShowVPQrcode.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
