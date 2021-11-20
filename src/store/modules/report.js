
import http from '@/axiosAPI/axios.js';

const report = {
    namespaced: true,
    state:{
        Reports: [],
        Errors: [],
        Success:"",
    },
    getters:{
        Allreports(state){
            return state.Reports;
        },
        Allerrors(state){
            return state.Errors;
        },
        Success(state){
            return state.Success;
        },
    },
    mutations:{
        GET_REPORT(state,report){
            state.Reports = report;
        },
        GET_ERRORS(state,error){
            state.Errors = error;
        },
        SUCCESS(state,payload){
            state.Success = payload;
        },
    },
    actions:{
        getReport({state,commit},receipt_number,from,to){ 
            if(receipt_number != ""){
                http.get("ui/pos/listing?receipt_number="+receipt_number).then((response)=>{
                    state.Errors = "";
                    commit("GET_REPORT",response.data); 
                })
                .catch((error)=>{ 
                    console.log(error.response);
                })
            }else if(from !="" && to !=""){
                http.get("ui/pos/listing?from="+from+"&to="+to).then((response)=>{
                    state.Errors = "";
                    commit("GET_REPORT",response.data); 
                })
                .catch((error)=>{ 
                    console.log(error.response);
                })
            }else{
                http.get("/ui/pos/listing").then((response)=>{
                    state.Errors = "";
                    commit("GET_REPORT",response.data); 
                })
                .catch((error)=>{ 
                    console.log(error.response);
                })
            }
            
        },
        deleteReport({commit},reportID){
            http.delete("/ui/pos/delete/"+reportID).then((response)=>{
                if(response.data.status === 'success'){
                    commit("SUCCESS",response.data.message);
                }
                else if(response.data.status ==='fail'){
                    commit("GET_ERRORS",response.data.message);
                }
            })
            .catch((error)=>{
                console.log(error.response);
            });
        },
    },
}
export default report;