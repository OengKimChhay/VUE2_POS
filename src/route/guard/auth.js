import route from '@/route/index.js';
import store from '@/store/index.js';

export default route.beforeEach((to, from, next) => {
    // console.log(store.getters['auth/loggedIn']);
    var requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    var disableIfLoggedIn = to.matched.some(record => record.meta.disableIfLoggedIn);
    var checkAuth = store.getters['auth/loggedIn'];
    if(requiresAuth){ //check if each route has requiresAuth:true; and if toke is empty or null 
        if(!checkAuth){
            next({name: 'Login'}); 
        }else{
            next();
        }
    }else if(checkAuth && disableIfLoggedIn){  //check if user is loggedin it will condition to hide login route
        next({name:'Dashboard'}); 
    }else{
        next();
    }
});

