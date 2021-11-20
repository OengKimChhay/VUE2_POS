
import http from '@/axiosAPI/axios.js';

const dashboard = {
    namespaced: true,
    state:{
        Allproducts: [],
        Allusers:[],
        Allcategories:[],
        Alltables:[],
    },
    getters:{
        Allproducts(state){
            return state.Allproducts;
        },
        Allusers(state){
            return state.Allusers;
        },
        Allcategories(state){
            return state.Allcategories;
        },
        Alltables(state){
            return state.Alltables;
        },
    },
    mutations:{
        ALL_PRODUCTS(state,product){
            state.Allproducts = product;
        },
        ALL_USERS(state,user){
            state.Allusers = user;
        },
        ALL_CATEGORIES(state,category){
            state.Allcategories = category;
        },
        ALL_TABLES(state,table){
            state.Alltables = table;
        },
    },
    actions:{
        getAllProduct({commit}){ //this method is get all product for display in pos
            http.get("/ui/allproduct").then((response)=>{
                commit("ALL_PRODUCTS",response.data); 
            })
            .catch((error)=>{ 
                console.log(error.response);
            })
        },
        getAllUser({commit}){ //this method is get all product for display in pos
            http.get("/ui/alluser").then((response)=>{
                commit("ALL_USERS",response.data); 
            })
            .catch((error)=>{ 
                console.log(error.response);
            })
        },
        getAllCategory({commit}){ //this method is get all product for display in pos
            http.get("/ui/allcategory").then((response)=>{
                commit("ALL_CATEGORIES",response.data); 
            })
            .catch((error)=>{ 
                console.log(error.response);
            })
        },
        getAllTable({commit}){ //this method is get all product for display in pos
            http.get("/ui/alltable").then((response)=>{
                commit("ALL_TABLES",response.data); 
            })
            .catch((error)=>{ 
                console.log(error.response);
            })
        },
    },
}


export default dashboard;