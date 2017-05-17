import Vue from 'vue'
import VueRouter from 'vue-router'

import util from '@/assets/js/util.js'
import store from '@/library/vuex'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: require('@/page/music/Index.vue')
        },
        {
            path: '/index',
            component: require('@/page/music/Index.vue')
        },
        {
            path: '/music',
            component: require('@/components/IndexPublic.vue'),
            children: [
                {
                    path: '/music',
                    component: require('@/page/music/Index.vue')
                },
                {
                    path: '/music/search',
                    component: require('@/page/music/Search.vue')
                },
                
                {
                    path: '/music/musiclist/:id',
                    name: 'musiclist',
                    component: require('@/page/music/Musiclist.vue')
                },
                {
                    path: '/music/detail/:id',
                    name: 'musicdetail',
                    component: require('@/page/music/Detail.vue')
                },
                 
            ]
        },
        {
            path: '/user',
            component: require('@/components/IndexPublic.vue'),
            children: [
                {
                    path: '/user' ,
                    component: require('@/page/user/Index.vue')
                },
                {
                    path: '/user/login',
                    component: require('@/page/user/Login.vue'),
                    beforeEnter: function(to, from, next){
                        if(sessionStorage.getItem("isLogin")){
                            /*sessionStorage.removeItem("isLogin");
                            sessionStorage.removeItem("user");
                            sessionStorage.clear("isLogin");*/
                            store.commit('logout',false);
                            util.showToast("已退出登录！");
                        }
                        next();
                    }
                },
                {
                    path: '/user/register', 
                    component: require('@/page/user/Register.vue')
                }
            ]
        },
        {
            path: '/test', 
            component: require('@/page/Test.vue')
        },
        {
            path:'/*',  //  404  
            redirect: '/test'
        }
        
    ],
    /*scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            console.log(1111);
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
            console.log(222);
        }
        console.log(333);
    }*/
})

/*  记录路由跳转总次数  */
router.beforeEach((to, from, next) => {
    let routerNum = 0;
    if(!util.isNull(localStorage.getItem('routerNum'))){
        routerNum = localStorage.getItem('routerNum');
    }
    localStorage.setItem("routerNum", ++routerNum); 
    console.log('路由跳转第：'+ routerNum + '次');
    next();
})


/*  判断是否需要登录权限 以及是否登录 还有拦截次数以及说明 */
router.beforeEach((to, from, next) => {
    if(to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        console.log(sessionStorage.getItem('isLogin'))
        if(sessionStorage.getItem('isLogin')) {// 判断是否登录
            next();
        }
        else{// 没登录则 提示   或者 跳转到登录界面 
            util.showToast("请登录后进入！");
            /*next({
                path: '/login',
                query: {redirect: to.fullPath}
            });*/
            let notlogin = 0;
            if(!util.isNull(localStorage.getItem('notlogin'))){
                notlogin = localStorage.getItem('notlogin');
            }
            localStorage.setItem("notlogin", ++notlogin); 
            console.log('拦截未登录第：'+ notlogin + '次');
        }
    }
    else{
        next();
    }
})

export default router;
