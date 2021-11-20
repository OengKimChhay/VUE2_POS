
import http from '@/axiosAPI/axios.js';
import router from '@/route/index';

const auth = {
    namespaced: true,
    state:{
        Users: [],
        Errors: [],
        Success:"",
        Loginerror:"",
        Token: localStorage.getItem('access_token') || null, //false is for to check if user not login will redirect to login route
    },
    getters:{
        Allusers(state){
            return state.Users;
        },
        Allerrors(state){
            return state.Errors;
        },
        Success(state){
            return state.Success;
        },
        Loginerrors(state){
            return state.Loginerror;
        },
        loggedIn(state){
            return state.Token !== null;
        }
    },
    mutations:{
        ADD_USER(state,formData){
            state.Users = formData;
        },
        UPDATE_USERS(state,formData){
            state.Users = formData;
        },
        GET_USERS(state,payload){
            state.Users = payload;
        },
        GET_ERRORS(state,error){
            state.Errors = error;
        },
        SUCCESS(state,payload){
            state.Success = payload;
        },
        LOGIN_ERROR(state,erro){
            state.Loginerror = erro;
        },
        AUTH(state,token){
            state.Token = token;
        },
        UNAUTH(state){
            state.Token = null;
        }
    },
    actions:{
        addUsers({commit,state},formData,config){
            http.post("/register",formData,config).then((response)=>{
                if(response.data.status ==='success'){
                    commit("ADD_USER",formData); //we have to commit data otherwise formData won't be pass to route 
                    state.Errors="";
                    commit('SUCCESS',response.data.message);
                    setTimeout(function(){
                        window.location.reload();
                    },2000);
                }else{
                    commit("GET_ERRORS",response.data.message);
                }
            })
            .catch(error=>{
                if(error){
                    commit("GET_ERRORS",error.response.data.errors);
                }
            })
        },
        getUsers({commit},page){
            http.get("/auth/GetUserData??page="+ page).then((response)=>{
                console.log(response)
                commit("GET_USERS",response.data); //.data mean we use ->paginate() from api so we must use .data
            })
            .catch((error)=>{
                console.log(error.response);
            })
        },
        udpateUsers({commit,state}, {userID, formData, config}){
            http.post("/auth/update/"+userID, formData, config).then((response)=>{
                if(response.data.status ==='success'){
                    state.Errors="";
                    commit("UPDATE_USERS",formData);
                    commit('SUCCESS',response.data.message);
                    setTimeout(function(){
                        window.location.reload(); //to reload page
                    },2000);
                }else{
                    commit("GET_ERRORS",response.data.message);
                }
            })
            .catch((error)=>{
                if(error){
                    commit("GET_ERRORS",error.response.data.errors);
                }
            })
        },
        loginUser({state,commit}, formData){
            http.post("/login",formData).then((response)=>{
                if(response.data.status === 'success'){
                    //set token
                    
                    const token = response.data.token;
                    localStorage.setItem('access_token',token);
                    localStorage.setItem('username',response.data.user.name);
                    localStorage.setItem('userid',response.data.user.id);
                    localStorage.setItem('usertype',response.data.user.userType);
                    localStorage.setItem('userimage',response.data.user.image);

                    commit('AUTH',token); 
                    router.push({name:'Dashboard'});
                    setTimeout(function(){
                        window.location.reload();//reload page after go to another route;
                    },2000);
                }else{
                    state.Errors = "";
                    commit("LOGIN_ERROR",response.data.message);
                }
            })
            .catch((error)=>{
                if(error){
                    state.Loginerror = "";
                    commit('UNAUTH');
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('userid');
                    localStorage.removeItem('usertype');
                    localStorage.removeItem('userimage');
                    commit("GET_ERRORS",error.response.data.errors);
                    console.log(error.response);
                }
            });
        },
        logoutUser({state,commit}){
                http.post("/auth/logout").then((response)=>{
                    if(response.data.status === "success"){
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('username');
                        localStorage.removeItem('userid');
                        localStorage.removeItem('usertype');
                        localStorage.removeItem('userimage');
                        commit('UNAUTH');
                        router.push({name:'Login'});
                        window.location.reload();
                    }else{
                        state.Errors = "";
                        commit("LOGIN_ERROR",response.data.message);
                    }
                })
                .catch((error)=>{
                    if(error){
                        state.Loginerror = "";
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('username');
                        localStorage.removeItem('userid');
                        localStorage.removeItem('usertype');
                        localStorage.removeItem('userimage');
                        commit('UNAUTH');
                        commit("GET_ERRORS",error.response.data.errors);
                    }
                });
        },
        deleteUsers({commit,state},userID){
            http.delete("/auth/delete/"+userID).then((response)=>{
                if(response.data.status === 'success'){
                    state.Errors="";
                    commit("SUCCESS",response);
                    router.go(); //to reload page
                }
                else if(response.data.status ==='fail'){
                    commit("GET_ERRORS",response.data.message);
                }
            })
            .catch((error)=>{
                console.log(error.response);
            });
        }
    },
}


export default auth;