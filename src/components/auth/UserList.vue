<template>
    <div>
        <!-- whenever we use child route we have to add router-view to wrappe all parent component -->
        <!-- and router-view plz see in layout/layout -->
        
        <h5 class="title">User List <i class="fa fa-users"></i></h5>
        <md-table  md-card v-if="this.Allusers.total >0">
            <md-table-toolbar>
                <h1 class="md-title">Users {{this.Allusers.total}}</h1>
                <b-form-input v-model="search" size="sm" style="width:200px;margin-right:5px;" class="" placeholder="Search name..."></b-form-input >
                <router-link :to="{name:'UserRegister'}"><button class="btn btn-secondary btn-sm text-right"><i class="fas fa-plus"></i> Add New User</button></router-link>
            </md-table-toolbar>
            <md-table-row style="background-color:#ADD8E6;">
                <md-table-head md-numeric>NO_</md-table-head>
                <md-table-head>Photo</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head>Phone</md-table-head>
                <md-table-head>Role</md-table-head>
                <md-table-head>Status</md-table-head>
                <md-table-head>Created</md-table-head>
                <md-table-head>Updated</md-table-head>
                <md-table-head>Action</md-table-head>
            </md-table-row>

            <md-table-row slot="md-table-row" v-for="(user, index) in searchFilter" :key="user.id">
                <md-table-cell md-numeric>{{ index+1 }}</md-table-cell>
                <md-table-cell><img class="img" :src="ImageURL+'/users/'+user.image" alt="photo"></md-table-cell>
                <md-table-cell>{{ user.name }}</md-table-cell>
                <md-table-cell>{{ user.email }}</md-table-cell>
                <md-table-cell>{{ user.phone }}</md-table-cell>
                <md-table-cell>{{ user.userType }}</md-table-cell>
                <md-table-cell>
                    <span v-if="userid == user.id" class="text-success"><span>Online</span></span>
                    <span v-if="userid != user.id" class="text-danger"><span>Offline</span></span>
                </md-table-cell>
                <md-table-cell>{{ user.created_at | formatDate }}</md-table-cell> <!-- formatDate is a custom filter in main.js root -->
                <md-table-cell>{{ user.updated_at | formatDate }}</md-table-cell> <!-- formatDate is a custom filter in main.js root -->
                <md-table-cell>
                    <b-dropdown variant="outline-secondary" size="sm" :disabled="usertype === 'User'">
                        <template #button-content><b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings</template>
                        <b-dropdown-item-button variant="primary" v-b-modal.modal @click="Edit(user.id)"  title="Edit" >
                            <b-icon icon="file-earmark-medical"></b-icon> Edit
                        </b-dropdown-item-button>
                        <b-dropdown-item-button variant="danger" @click="Delete(user.id)" title="Delete" >
                            <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
                        </b-dropdown-item-button>
                    </b-dropdown>
                </md-table-cell>
            </md-table-row>
        </md-table>

        <md-table md-card v-if="this.Allusers.total <= 0">
            <md-table-toolbar>
                <h1 class="md-title">No User</h1><router-link :to="{name:'UserRegister'}"><button class="btn btn-secondary btn-sm text-right">Add New User</button></router-link>
            </md-table-toolbar>
        </md-table>
        <!------------------------------------ pagination -------------------------------------->
        <div v-if="this.Allusers.total > 0" class="m-5 d-flex justify-content-around align-items-center">
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
                <p style="margin: 0;font-size: 12px;color: #606060;">Page {{this.Allusers.current_page}} of {{this.Allusers.last_page}}</p>
            </div>
        </div>
    <!-------------------------------------- end pagination ---------------------------------------->

<!-- =====================showign modal vue bootstrap for update user================== -->
        <b-modal id="modal" hide-footer title="Update User">
            <b-alert show variant="success" v-if="this.Success">{{this.Success}}</b-alert>
            <b-form  @submit.prevent="Update(editUser.id)">
                <div class="row">
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="name" class="mb-2">New Name</label>
                        <b-form-input size="sm" id="name"  v-model="editUser.new_name" type="text" placeholder="New Name"></b-form-input>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.new_name">{{this.Allerrors.new_name[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="email" class="mb-2">New Email</label>
                        <b-form-input size="sm" id="email"  v-model="editUser.new_email" type="email" placeholder="Example@gmail.com"></b-form-input>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.new_email">{{this.Allerrors.new_email[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="password" class="mb-2">Old Password</label>
                        <b-form-input size="sm" id="password"  v-model="editUser.old_password" type="password" placeholder="Old Password"></b-form-input>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.old_password">{{this.Allerrors.old_password[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="re_password" class="mb-2">New Password</label>
                        <b-form-input size="sm" id="re_password"  v-model="editUser.new_password" type="password" placeholder="New Password"></b-form-input>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.new_password">{{this.Allerrors.new_password[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="phone" class="mb-2">New Phone</label>
                        <b-form-input size="sm" id="phone"  v-model="editUser.new_phone" type="text" placeholder="New Phone"></b-form-input>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.new_phone">{{this.Allerrors.new_phone[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="usertype" class="mb-2">User Type</label>
                        <select v-model="editUser.new_userType" class="form-select form-select-sm">
                            <option :value="'User'"  :selected="editUser.new_userType === 'User'">User</option>
                            <option :value="'Admin'" :selected="editUser.new_userType === 'Admin'">Admin</option>
                        </select>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.userType">{{this.Allerrors.userType[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="image" class="mb-2">Image</label>
                        <input @change="processFile" id="image" class="form-control form-control-sm" type="file">
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.image">{{this.Allerrors.image[0]}}</small>
                    </div>
                    <div class="d-flex justify-content-start">
                        <div id="preview">
                            <img class="preview" v-if="preview" :src="preview" alt="">
                            <img class="preview" v-else :src="ImageURL+'/users/'+editUser.new_image" alt="">
                        </div>
                    </div>
                    <b-button variant="info" size="sm" type="submit" style="width:fit-content;margin:10px;">Update</b-button>
                </div>
            </b-form>
        </b-modal>
<!-- ======================showing spinner========================= -->
        <Spinner :active="spinnerActive" text="Loading..."></Spinner>
    </div>
</template>

<script>
import Spinner from '../spinner/Spinner'; //import this ixin for use spinner
import Mixin from '../../../helper/mixin.js'; //import this ixin for use spinner
import {mapActions,mapGetters} from 'vuex';
export default {
    components: {Spinner},
    mixins: [Mixin],
    data(){
        return{
            editUser:{
                id:"",
                new_name:"",
                new_email:"",
                old_password:"",
                new_password:"",
                new_image:"",
                new_phone:"",
                new_userType:"",
            },
            preview: "",
            search:"",
            page:1,
        }
    },
    computed:{
        ...mapGetters('auth',['Allusers','Allerrors','Success']),
        searchFilter(){
            return this.Allusers.data.filter((item) => { //.data mean we use pagination from api
                return item.name.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    methods:{
        ...mapActions('auth',['getUsers','deleteUsers','udpateUsers']),
        Edit(userID){
            const secificUser = this.Allusers.data.find(user=> user.id === userID); //to get old value of data to show when user click edit
            this.editUser.id = userID;
            this.editUser.new_name = secificUser.name;
            this.editUser.new_email = secificUser.email;
            this.editUser.new_image = secificUser.image;
            this.editUser.new_phone = secificUser.phone;
            this.editUser.new_userType = secificUser.userType;
        },
        Update(userID){
            let formData = new FormData();
            formData.append('new_name',this.editUser.new_name);
            formData.append('new_email',this.editUser.new_email);
            formData.append('new_password',this.editUser.new_password);
            formData.append('old_password',this.editUser.old_password);
            formData.append('new_userType',this.editUser.new_userType);
            formData.append('new_phone',this.editUser.new_phone);
            formData.append('new_image',this.editUser.new_image);
            formData.append('_method', 'PUT')  //in this route js can't understand put request so we have to use post request instead but make sure we append the formData with _'method':'PUT')
            
            let config = {
                headers:{
                    'Content-Type':'multipart/form-data',         
                }        
            }
            
            this.udpateUsers({userID,formData,config});    // use this if we dont use mapAction this.$store.dispatch('auth/udpateUsers',{userID,formData,config})           
            this.showSpinner();                            //to show spinnser we call showSpinner functions from mixin that we import above
        },
        Delete(userID){
            if(confirm("Are your sure want to delete this user?")){
                this.deleteUsers(userID);
                this.showSpinner();                         //to show spinnser we call showSpinner functions from mixin that we import above
            }
            
        },
        processFile(event) {
            this.editUser.new_image = event.target.files[0];
            this.preview = URL.createObjectURL(this.editUser.new_image);
        },
        nextPage(){
            if(this.page >= this.Allusers.last_page ){
                // .last_page is getting from laravel api
                this.page = this.Allusers.last_page;
                this.getUsers(this.page); // this.getUsers(this.page) getUsers function has payload pls see product.js in store
            }else{
                this.page+=1;
                this.getUsers(this.page); // this.getUsers(this.page) getUsers function has payload pls see product.js in store
            }
        },
        prePage(){
            if(this.page <=1){
                this.page = 1;
                this.getUsers(this.page);
            }else{
                this.page-=1;
                this.getUsers(this.page);
            }
        },
        pageNumber(num){
            if(num <=1){
                this.page = 1;
                this.getUsers(this.page);
            }else if(num >= this.Allusers.last_page){
                this.page = this.Allusers.last_page;
                this.getUsers(this.page);
            }else{
                this.page = num;
                this.getUsers(this.page);
            }
        }
    },
    mounted(){
       this.getUsers();   //call this mehtod from ...mapActions if  we not mouted users will not found
    },

    //mounted(){this.$store.dispatch( 'auth/getUsers'); // use this we dont use mapActions}
}
</script>

<style>
#preview{
    width: 70%;
}
.preview{
    width: 100%;
}
.img{
    width: 60px;
}
.title{
    padding: 20px 0;
}
</style>