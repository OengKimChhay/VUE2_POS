import Notfound from '@/components/404/Notfound.vue'

const routes = [   
    {
        path: '*',
        name: '404',
        component: Notfound,
        meta:{
            title: 'Page Not Found',
            requiresAuth: true
        }
    }
];
export default routes;