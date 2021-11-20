
import Layout from '@/components/layout/Layout.vue';
// ========== user ===============
import UserList from '@/components/auth/UserList.vue'
import UserRegister from '@/components/auth/UserRegister.vue';
import UserLogin from '@/components/auth/UserLogin.vue';
// ========== dsahboard==========
import Dashboard from '@/components/auth/Dashboard.vue';

const routes = [
    { 
        path: '/', redirect: { name: 'Dashboard' }
    },  
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta:{
            title: 'Dashboard', 
            requiresAuth:true
        }
    },
    {   
        path: '/user',
        component: Layout, //this UserLayout compo must have router-view coz it's parent compo otherwise child compo won't be found
        children:[
            {
                path: '',
                name: 'UserList',
                component: UserList,
                meta:{
                    title: 'User List',
                    requiresAuth: true
                }
            },
            {
                path: 'register',
                name: 'UserRegister',
                component: UserRegister,
                meta:{
                    title: 'User Regitration',
                    requiresAuth: true
                }
            },
            {
                path: 'login',
                name: 'Login',
                component: UserLogin,
                meta:{
                    title :'User Login',
                    requiresAuth:false,
                    disableIfLoggedIn: true
                }
            }
        ]
    },
];


export default routes;