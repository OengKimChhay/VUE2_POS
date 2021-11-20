import Vue from 'vue';
import VueRouter from 'vue-router';   //VueRouter is optionall we can defind whatever we want
// child routes
import RouteUi from '@/route/ui/main.js';
import RouteAuth from '@/route/auth/main.js';
import NotFound from '@/route/404/404.js';
Vue.use(VueRouter);

var allRoutes = [];
    allRoutes = allRoutes.concat(  //to combine multi route files
        RouteUi,
        RouteAuth,
        NotFound,
    );
const routes = allRoutes;
const ROUTE = new VueRouter({
    routes, 
    mode: 'history'   //remove hashtage from URL
});
//this is how to change page title base on router we have to add meta object to each route pls see child routes
ROUTE.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    next();
});

export default ROUTE;