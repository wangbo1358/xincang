

import {Routelist} from './router'
import Info from './detail'
import Login from './List_replace'
import Content1 from './Contetn_one'
import Homelogin from "./Homelogin"
import ErrorPage from "./Errorpage"

var routes =[
    {
        path:'/',
        component:Content1,
        auth:true,
    },
    {
        path:'/home',
        component:Content1,
        auth:true,
    },
    {
        path:'/homelogin',
        component:Homelogin,
    },{
        path:'/404',
        component:ErrorPage,
    },{
        path:'/login',
        component:Login,
        auth:true
    },{
        path:'/info',
        component:Info,
        auth:true
    }
];

// auth 是否需要登录
export default routes