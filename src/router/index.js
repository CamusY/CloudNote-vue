import {createRouter,createWebHistory} from 'vue-router'
import NProgress from "nprogress"
import "nprogress/nprogress"

const getComponent=(component)=>()=>import(`./views/${component}.vue`)

const routes=[
    {
        path:'/write',
        name:'write',
        component:getComponent("write")
    },
    {
        path:'/detail/:id',
        name:'note',
        component:getComponent("detail")
    },
    {
        path:'/',
        name:'login',
        component:getComponent("login")
    },
    {
        path:'/group/:groupId',
        name:'group',
        props:true,
        component:getComponent("home")
    }
]
const router =createRouter({
    history:createWebHistory(),
    routes
    
})

router.beforeEach((to,from,next)=>{
    NProgress.start()
    if(to.path !== "/login" && !store.state.login){
        next("/login")
        NProgress.done()
    }
    next()
})
router.afterEach(()=>{
    NProgress.done()
})


export default router