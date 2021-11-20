<template>
    <div>
        <!-- whenever we use child route we have to add router-view to wrappe all parent component -->
        <!-- and router-view plz see in layout/layout -->
        <h5 class="title">Table List <i class="fa fa-dashboard"></i></h5>
        <md-table  md-card v-if="this.Alltables.total>0">
            <md-table-toolbar>
                <h1 class="md-title">Tables: {{this.Alltables.total}}</h1>
                <b-form-input v-model="search" size="sm" style="width:200px;margin-right:5px;" class="" placeholder="Search Table name..."></b-form-input >
                <router-link :to="{name:'CreateTable'}"><button class="btn btn-secondary btn-sm text-right"><i class="fas fa-plus"></i> Add New Table</button></router-link>
            </md-table-toolbar>

            <md-table-row style="background-color:#ADD8E6;">
                <md-table-head>NO_</md-table-head>
                <md-table-head>Table Name</md-table-head>
                <md-table-head>Created</md-table-head>
                <md-table-head>Updated</md-table-head>
                <md-table-head>Action</md-table-head>
            </md-table-row>

            <md-table-row slot="md-table-row" v-for="(table, index) in searchFilter" :key="table.id">
                <md-table-cell >{{index+1}}</md-table-cell>
                <md-table-cell >{{table.name}}</md-table-cell>
                <md-table-cell >{{table.created_at | formatDate}}</md-table-cell>
                <md-table-cell >{{table.updated_at | formatDate}}</md-table-cell>
                <md-table-cell>

                    <b-dropdown variant="outline-secondary" size="sm" :disabled="usertype === 'User'">
                        <template #button-content><b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings</template>
                        <b-dropdown-item-button variant="primary"  v-b-modal.modal @click="Edit(table)" title="Edit" >
                            <b-icon icon="file-earmark-medical"></b-icon> Edit
                        </b-dropdown-item-button>
                        <b-dropdown-item-button variant="danger" @click="Delete(table.id)" title="Delete" >
                            <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
                        </b-dropdown-item-button>
                    </b-dropdown>

                </md-table-cell>
            </md-table-row>
        </md-table>

        <md-table md-card v-if="this.Alltables.total <= 0">
            <md-table-toolbar>
                <h1 class="md-title">No Table</h1><router-link :to="{name:'CreateTable'}"><button class="btn btn-secondary btn-sm text-right"><i class="fas fa-plus"></i> Add New Table</button></router-link>
            </md-table-toolbar>
        </md-table>
        
        <!------------------------------------ pagination -------------------------------------->
        <div v-if="this.Alltables.total > 0" class="m-5 d-flex justify-content-around align-items-center">
            <div> 
                <!-- .total and .per_page are getting from laravel api -->
                <b-button style="margin-right:10px;" pill variant="outline-primary" size="sm" @click="prePage"><b-icon icon="chevron-double-left"></b-icon>Previouse</b-button>
                <b-button pill variant="outline-primary" size="sm" @click="nextPage">Next<b-icon icon="chevron-double-right"></b-icon></b-button>
            </div>
            <!-- inter page num go to specify page -->
            <div>
                <b-form-input @input="pageNumber" type="number" min="1" size="sm" placeholder="Enter Page Num" title="Enter page number you prefer to"></b-form-input>
            </div>
            <div>
                <p style="margin: 0;font-size: 12px;color: #606060;">Page {{this.Alltables.current_page}} of {{this.Alltables.last_page}}</p>
            </div>
        </div>
    <!-------------------------------------- end pagination ---------------------------------------->
        <!-- =====================showign modal vue bootstrap for update user================== -->
        <b-modal id="modal" hide-footer title="Update Table">
            <b-alert show variant="success" v-if="this.Success">{{this.Success}}</b-alert>
            <b-form @submit.prevent="Update(tableID)">
                <div>
                    <label for="name" class="mb-2">Table Name</label>
                    <b-form-input size="sm" id="name"  v-model="name" type="text" placeholder="New Table Name"></b-form-input>
                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.name">{{this.Allerrors.name[0]}}</small>  
                </div>   
                <b-button variant="primary" size="sm" type="submit" style="width:fit-content;margin:10px;">Update</b-button>
            </b-form>
        </b-modal>
        <!-- ======================showing spinner========================= -->
        <Spinner :active="spinnerActive" text="Loading..."></Spinner>
    </div>
</template>

<script>
import Spinner from '../../spinner/Spinner'; //import this ixin for use spinner
import Mixin from '../../../../helper/mixin.js'; //import this ixin for use spinner
import {mapActions,mapGetters} from 'vuex';
export default {
    components: {Spinner},
    mixins: [Mixin],
    name:'TableList',
    data(){
        return{
            tableID: '',
            name:'',
            search:'',
            page:1
        }
    },
    computed:{
        ...mapGetters('table',['Alltables','Allerrors','Success']),
        searchFilter(){
            return this.Alltables.data.filter((item) => {
                return item.name.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    methods:{
        ...mapActions('table',['getTables','updateTables','deleteTables']),
        Edit(table){
            this.tableID = table.id;
            this.name = table.name;
        },
        Update(tableID){
            let formData = new FormData();
            formData.append('name',this.name);
            formData.append('_method', 'PUT')  //in this route js can't understand put request so we have to use post request instead but make sure we append the formData with _'method':'PUT')
            this.updateTables({tableID,formData})
            this.showSpinner(); //to show spinnser we call showSpinner and hideSpinnser functions from mixin that we import above
    
        },
        Delete(tableID){
            if(confirm("Are your sure want to delete this category?")){
                this.deleteTables(tableID);
                this.showSpinner(); //to show spinnser we call showSpinner and hideSpinnser functions from mixin that we import above
            }
            
        },
        nextPage(){
            if(this.page >= this.Alltables.last_page ){
                // .last_page is getting from laravel api
                this.page = this.Alltables.last_page;
                this.getTables(this.page); // this.getTables(this.page) getTables function has payload pls see product.js in store
            }else{
                this.page+=1;
                this.getTables(this.page); // this.getTables(this.page) getTables function has payload pls see product.js in store
            }
        },
        prePage(){
            if(this.page <=1){
                this.page = 1;
                this.getTables(this.page);
            }else{
                this.page-=1;
                this.getTables(this.page);
            }
        },
        pageNumber(num){
            if(num <=1){
                this.page = 1;
                this.getTables(this.page);
            }else if(num >= this.Alltables.last_page){
                this.page = this.Alltables.last_page;
                this.getTables(this.page);
            }else{
                this.page = num;
                this.getTables(this.page);
            }
        }
    },
    mounted(){
       this.getTables(this.page);   //call this mehtod from ...mapActions if  we not mouted users will not found
    },
        //     mounted(){
        //        this.$store.dispatch( 'auth/getTables'); // use this we dont use mapActions
        //    }
}
</script>


<style>

</style>