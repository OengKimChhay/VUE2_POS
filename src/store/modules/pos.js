
import http from '@/axiosAPI/axios.js';

const pos = {
    namespaced: true,
    state:{
        Orders: [],
        Errors: [],
        Success:"",
    },
    getters:{
        Allerrors: (state) => {
            return state.Errors;
        },
        Success: (state) =>{
            return state.Success;
        }
    },
    mutations:{
        ORDER:(state,order) =>{
            state.Orders = order;
        },
        GET_ERRORS:(state,error)=>{
            state.Errors = error;
        },
        SUCCESS:(state,success)=>{
            state.Success = success;
        }
    },
    actions:{
        takeOrder({state,commit},formData){
            http.post("/ui/pos",formData)
            .then((response)=>{
                if(response.status == "success"){
                    state.Errors = "";
                    commit('ORDER',formData); //we have to commit data otherwise formData won't be pass to route 
                    commit("SUCCESS","Order Success.");
                }else{
                    state.Errors = "";
                    commit("SUCCESS","Something went wrong.");
                }
            })
            .catch((error)=>{
                if(error){
                    state.Errors = "";
                    commit("GET_ERRORS",error.response.data.errors);
                    console.log(error.response);
                }
            })
        }
    },
}


export default pos;