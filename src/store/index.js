import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import auth from './modules/auth.js';
import category from './modules/category.js';
import product from './modules/product.js';
import table from './modules/table.js';
import dashboard from './modules/dashboard.js';
import pos from './modules/pos.js';
import report from './modules/report.js';

const store = new Vuex.Store({
    modules:{
        auth,
        category,
        product,
        table,
        dashboard,
        pos,
        report,
    },
});

export default store;
