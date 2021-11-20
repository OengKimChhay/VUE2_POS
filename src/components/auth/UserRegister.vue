<template>
        <div>                
            <md-content class="md-elevation-4" style="padding:15px; border-radius:4px; width:70%; margin:auto;">
                <div class="logo-user">
                    <img src="../../assets/user.jpg" alt="img" >
                </div>
                <h5 class="title text-center">User Regitration</h5>
                <div class="row d-flex justify-content-center">
                    <div class="col-12 col-sm-12">
                        <b-alert show variant="success" v-if="this.Success">{{this.Success}}</b-alert>
                        <b-form @submit.prevent="onSubmit">
                            <div class="row">
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="name" class="mb-2">Name</label>
                                    <b-form-input size="sm" id="name"  v-model="users.name" type="text" placeholder="Name"></b-form-input>
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.name">{{this.Allerrors.name[0]}}</small>
                                </div>
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="email" class="mb-2">Email</label>
                                    <b-form-input size="sm" id="email"  v-model="users.email" type="email" placeholder="Example@gmail.com"></b-form-input>
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.email">{{this.Allerrors.email[0]}}</small>
                                </div>
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="password" class="mb-2">Password</label>
                                    <b-form-input size="sm" id="password"  v-model="users.password" type="password" placeholder="Password"></b-form-input>
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.password">{{this.Allerrors.password[0]}}</small>
                                </div>
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="re_password" class="mb-2">Re-Password</label>
                                    <b-form-input size="sm" id="re_password"  v-model="users.re_password" type="password" placeholder="Password"></b-form-input>
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.re_password">{{this.Allerrors.re_password[0]}}</small>
                                </div>
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="phone" class="mb-2">Phone Number</label>
                                    <b-form-input size="sm" id="phone" @change="checkPhone(users.phone)"  v-model="users.phone" type="text" placeholder="Phone Number"></b-form-input>
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.phone">{{this.Allerrors.phone[0]}}</small>
                                    <small class="text-danger" v-if="this.error">{{this.error}}</small>
                                </div>
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="usertype" class="mb-2">User Type</label>
                                    <select v-model="users.userType" class="form-select form-select-sm">
                                        <option value="" :selected="true" :disabled="true">Select User Type</option>
                                        <option :value="'User'">User</option>
                                        <option :value="'Admin'">Admin</option>
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
                                            <img v-if="preview" :src="preview" >
                                        </div>
                                </div>
                                <b-button :disabled="usertype === 'User'" variant="primary" size="sm" type="submit" style="width:fit-content;margin:10px;">Create</b-button>
                            </div>
                        </b-form>
                    </div>
                </div>
            </md-content>
            <!-- ======================showing spinner========================= -->
            <Spinner :active="spinnerActive" text="Loading..."></Spinner>
        </div>
</template>

<script>
import Spinner from '../spinner/Spinner'; //import this ixin for use spinner
import Mixin from '../../../helper/mixin.js'; //import this ixin for use spinner
import {mapActions,mapGetters} from 'vuex'
export default {
    components: {Spinner},
    mixins: [Mixin],
    name: 'UserRegister',
    data(){
        return{
            users:{
                name:"",
                email:"",
                password:"",
                re_password:"",
                phone:"",
                userType:"",
                image:""
            },
            preview: "",
            error:"",
        }
    },
    computed:{
        ...mapGetters('auth',['Allerrors','Success'])
    },
    methods:{
        ...mapActions('auth',['addUsers']),
        onSubmit(e){

            e.preventDefault();
            //=================append data to FormData
            let formData = new FormData();
            formData.append('name',this.users.name);
            formData.append('email',this.users.email);
            formData.append('password',this.users.password);
            formData.append('re_password',this.users.re_password);
            formData.append('phone',this.users.phone);
            formData.append('userType',this.users.userType);
            formData.append('image',this.users.image);
            let config = {
                headers:{
                    'Content-Type': 'multipart/form-data',         
                }        
            }
            
            this.addUsers(formData,config);
            this.showSpinner(); //to show spinnser we call showSpinner and hideSpinnser functions from mixin that we import above
        
        },
        processFile(event) {
            this.users.image = event.target.files[0];
            this.preview = URL.createObjectURL(this.users.image);
        },
        // check if first number 0 or not
        checkPhone(phone){
            let check = String(phone).charAt(0); //get first number
            if(check != 0){
                this.error = 'Phone number invalid';
                this.users.phone = "";
                return this.error;
            }else{
                this.error = "";
                return this.users.phone.replace(/^\s+|\s+$/gm,'');
            }
        }
    }

}
</script>

<style>
#preview{
    width: 70%;
}
#preview img{
    width: 100%;
}
.title{
    padding: 20px 0;
}
.logo-user{
    display: flex;
    justify-content: center;
}
.logo-user img{
    width:100px;
}

</style>