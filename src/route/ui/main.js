
import Layout from '@/components/layout/Layout.vue';
// product====================================
import ProductList from '@/components/ui/product/ProductList.vue';
import CreateProduct from '@/components/ui/product/CreateProduct.vue';
// cateogry====================================
import CategoryList from '@/components/ui/cetegory/CategoryList.vue';
import CreateCategory from '@/components/ui/cetegory/CreateCategory.vue';
// pos=========================================
import Pos from '@/components/ui/pos/Pos.vue';
// table======================================
import TableList from '@/components/ui/table/TableList.vue';
import CreateTable from '@/components/ui/table/CreateTable.vue';
// report=====================================
import Report from '@/components/ui/report/Report.vue';

const routes =  [  
    { 
        path: '/', redirect: { name: 'Dashboard' },
    }, 
    {
        path: '/product',
        component: Layout,
        children:[
            {
                path: '',
                name: 'ProductList',
                component: ProductList,
                meta:{
                    title: 'Product List',
                    requiresAuth: true
                }
            },{
                path: 'create',
                name: 'CreateProduct',
                component: CreateProduct,
                meta:{
                    title: 'Create Product',
                    requiresAuth: true
                }
            },
        ]
    },
    {
        path: '/category',
        component: Layout,
        children:[
            {
                path: '',
                name: 'CategoryList',
                component: CategoryList,
                meta:{
                    title: 'Category List',
                    requiresAuth: true
                }
            },{
                path: 'create',
                name: 'CreateCategory',
                component: CreateCategory,
                meta:{
                    title: 'Create Category',
                    requiresAuth: true
                }
            },
        ]
    }, 
    {
        path: '/table',
        component: Layout,
        children:[
            {
                path: '',
                name: 'TableList',
                component: TableList,
                meta:{
                    title: 'Table',
                    requiresAuth: true
                }
            },{
                path: 'create',
                name: 'CreateTable',
                component: CreateTable,
                meta:{
                    title: 'Create Table',
                    requiresAuth: true
                }
            },
        ]
    },
    {
        path: '/pos',
        component: Layout,
        children:[
            {
                path: '',
                name: 'Pos',
                component: Pos,
                meta:{
                    title: 'POS',
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/report',
        component: Layout,
        children:[
            {
                path: '',
                name: 'Report',
                component: Report,
                meta:{
                    title: 'Report',
                    requiresAuth: true
                }
            }
        ]
    },
]; 
export default routes;