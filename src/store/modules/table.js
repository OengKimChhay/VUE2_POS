
import http from '@/axiosAPI/axios.js';
const category = {
    namespaced: true,
    state:{
        Tables:[],
        Errors: [],
        Success:"",
    },
    mutations:{
        ADD_TABLE:(state,data)=>{
            state.Tables = data;
        },
        GET_TABLE:(state,data)=>{
            state.Tables = data;
        },
        UPDATE_TABLE:(state,data)=>{
            state.Tables = data;
        },
        GET_ERRORS:(state,error)=>{
            state.Errors = error;
        },
        SUCCESS:(state,success)=>{
            state.Success = success;
        }
    },
    actions:{
        addTables: ({commit,state},formData) =>{
            http.post("/ui/table",formData)
            .then((response)=>{
                if(response.data.status ==='success'){
                    state.Errors = "";
                    commit("ADD_TABLE",formData); //we have to commit data otherwise formData won't be pass to route 
                    commit("SUCCESS",response.data.message);
                    setTimeout(function(){
                        window.location.reload();//reload page after go to another route;
                    },2000);
                }else if(response.data.status ==='fail'){
                    commit("GET_ERRORS",response.data.message);
                }
            })
            .catch(error=>{
                if(error){
                    commit("GET_ERRORS",error.response.data.errors);
                    console.log(error.response.data);
                }
            })
        },
        deleteTables: ({commit,state},tableID) =>{
            http.delete("/ui/table/"+tableID)
            .then((response)=>{
                state.Errors = "";
                commit("SUCCESS",response.data.message);
                setTimeout(function(){
                    window.location.reload();//reload page after go to another route;
                },2000);
                
            })
            .catch((error)=>{
                console.log(error.response)
            })
        },
        updateTables: ({commit,state}, {tableID, formData}) => {
            http.post("/ui/table/"+tableID, formData) //we use post req instead of put coz vue dont understand put but if we want to update we have to add 'method':'_PUT'in form data when edit
            .then((response)=>{
                state.Errors = "";
                commit("UDATE_TABLE",formData);
                commit("SUCCESS",response.data.message);
                setTimeout(function(){
                    window.location.reload();//reload page after go to another route;
                },2000);
            })
            .catch((error)=>{
                if(error){
                    commit("GET_ERRORS",error.response.data.errors);
                    console.log(error.response);
                }
            })
        },
        getTables: ({commit},page) =>{
            http.get("/ui/table?page="+ page)
            .then((response)=>{
                commit("GET_TABLE",response.data);
            })
            .catch((error)=>{
                console.log(error.response)
            })
        },
    },
    getters:{
        Alltables: (state) => {
            return state.Tables;
        },
        Allerrors: (state) => {
            return state.Errors;
        },
        Success: (state) =>{
            return state.Success;
        }
    }
}
export default category