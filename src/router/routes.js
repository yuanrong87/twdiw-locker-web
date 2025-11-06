const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/lockerSelection',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LockerSelection.vue') }],
  },
  {
    path: '/storeItemInfo',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StoreItemInfo.vue') }],
  },
  {
    path: '/qrcode',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ShowVPQrcode.vue') }],
  },
  {
    path: '/packagePayment',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PackagePayment.vue') }],
  },
  {
    path: '/packageInfo',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PackageInfo.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
