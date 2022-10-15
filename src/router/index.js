import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Welcome from '../views/home/Welcome.vue'
import User from '../views/home/User.vue'
import Category from '../views/home/Category.vue'
import Resource from '../views/home/Resource.vue'
import Tag from '../views/home/Tag.vue'
import Article from '../views/home/Article.vue'
import Comment from '../views/home/Comment.vue'
import Menu from '../views/home/Menu.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/welcome',
        children: [
            {path: '/welcome', name: 'welcome', component: Welcome},
            {path: '/user', name: 'user', component: User},
            {path: '/category', name: 'category', component: Category},
            {path: '/resource', name: 'resource', component: Resource},
            {path: '/tag', name: 'tag', component: Tag},
            {path: '/article', name: 'article', component: Article},
            {path: '/comment', name: 'comment', component: Comment},
            {path: '/menu', name: 'menu', component: Menu},
        ]
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFound
    }


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    let tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router
