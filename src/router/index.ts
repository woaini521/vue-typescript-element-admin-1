import Vue from 'vue';
import Router from 'vue-router';


import Layout from '@/layout/index.vue';
import RouteConfigImpl from '@/router/RouteRecordImpl';
import VueRouter from 'vue-router';

Vue.use(Router);


export const dashboard: RouteConfigImpl = {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
        {
            path: 'dashboard',
            component: () => import('@/views/dashboard/index.vue'),
            name: 'Dashboard',
            meta: {title: '首页', icon: 'dashboard', affix: true},
        },
    ],
};

export const asyncRoutes: RouteConfigImpl[] = [
    dashboard,
    {
        path: '/system',
        component: Layout,
        name: 'system',
        permissions: ['system', 'system-menu', 'system-role', 'system-user'],
        meta: {
            title: '系统管理',
            icon: 'system',
        },
        children: [
            {
                path: 'user',
                component: () => import('@/views/system/user/index.vue'),
                name: 'User',
                permissions: ['system-user'],
                meta: {title: '用户管理', icon: 'user'},
            },
            {
                path: 'role',
                component: () => import('@/views/system/role/index.vue'),
                name: 'Role',
                permissions: ['system-role'],
                meta: {title: '角色管理', icon: 'role'},
            },
            {
                path: 'menu',
                component: () => import('@/views/system/menu/index.vue'),
                name: 'Menu',
                permissions: ['system-menu'],
                meta: {title: '菜单管理', icon: 'menu'},
            },
        ],
    },
    {
        path: '/bulletin',
        component: Layout,
        name: 'Bulletin',
        permissions: ['bulletin'],
        redirect: '/bulletin/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/bulletin/index.vue'),
                name: 'BulletinIndex',
                permissions: ['bulletin'],
                meta: {
                    title: '公告',
                    icon: 'bulletin',
                },
            },
        ],
    },
    {
        path: '/log',
        component: Layout,
        name: 'Log',
        permissions: ['log'],
        redirect: '/log/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/log/index.vue'),
                name: 'LogIndex',
                permissions: ['log'],
                meta: {
                    title: '日志',
                    icon: 'log',
                },
            },
        ],
    },
];

const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes,
});

export const constantRoutes: RouteConfigImpl[] = [
    {
        path: '/login',
        hidden: true,
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/auth-redirect',
        hidden: true,
        component: () => import('@/views/login/auth-redirect.vue'),
    },
];

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes,
});
