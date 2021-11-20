<template>
	<div class="wrappe-login"> <!--if="!isLoggedIn" this condition is hide login page if user is logged id -->
			<div v-if="step === 'login'">
				<h3 class="text-center text-primary">Login</h3>
				<b-alert show variant="danger" v-if="this.Loginerrors">{{this.Loginerrors}}</b-alert>
				<b-form  @submit.prevent="onLogin" class="login">
					<div class="mb-3 ">
						<label for="log" class="mb-2">Username</label>
						<b-form-input v-model="login.user" size="sm" id="log" placeholder="Email or Phone Number"></b-form-input>
						<small class="text-danger" v-if="this.Allerrors && this.Allerrors.user">{{this.Allerrors.user[0]}}</small>
					</div>
					<div class="mb-3">
						<label for="pass" class="mb-2">Password</label>
						<b-form-input v-model="login.pass" size="sm" id="pass"   type="text" placeholder="Password"></b-form-input>
						<small class="text-danger" v-if="this.Allerrors && this.Allerrors.pass">{{this.Allerrors.pass[0]}}</small><br>
						<a href="">Forget password</a>
					</div>
					<b-button variant="primary" size="sm" type="submit" style="width:fit-content;margin:10px;" >Login</b-button>
					<a href="#" @click.prevent="step= 'register'" variant="secondary" size="sm" style="width:fit-content;margin:10px;">Register</a>
				</b-form>
			</div>

			<div v-if="step==='register'">
				<h3 class="text-center text-primary">Register</h3>
				<b-alert show variant="success" v-if="this.Success">Register Success.</b-alert>
				<b-form @submit.prevent="onSubmit" class="register">
						<div class="mb-3">
							<label for="name" class="mb-2">Name</label>
							<b-form-input size="sm" id="name"  v-model="users.name" type="text" placeholder="Name"></b-form-input>
							<small class="text-danger" v-if="this.Allerrors && this.Allerrors.name">{{this.Allerrors.name[0]}}</small>
						</div>
						<div class="mb-3 ">
							<label for="email" class="mb-2">Email</label>
							<b-form-input size="sm" id="email"  v-model="users.email" type="email" placeholder="Example@gmail.com"></b-form-input>
							<small class="text-danger" v-if="this.Allerrors && this.Allerrors.email">{{this.Allerrors.email[0]}}</small>
						</div>
						<div class="mb-3 ">
							<label for="password" class="mb-2">Password</label>
							<b-form-input size="sm" id="password"  v-model="users.password" type="password" placeholder="Password"></b-form-input>
							<small class="text-danger" v-if="this.Allerrors && this.Allerrors.password">{{this.Allerrors.password[0]}}</small>
						</div>
						<div class="mb-3 ">
							<label for="re_password" class="mb-2">Re-Password</label>
							<b-form-input size="sm" id="re_password"  v-model="users.re_password" type="password" placeholder="Password"></b-form-input>
							<small class="text-danger" v-if="this.Allerrors && this.Allerrors.re_password">{{this.Allerrors.re_password[0]}}</small>
						</div>
						<div class="mb-3 ">
							<label for="phone" class="mb-2">Phone Number</label>
							<b-form-input size="sm" id="phone" @change="checkPhone(users.phone)"  v-model="users.phone" type="text" placeholder="Phone Number"></b-form-input>
							<small class="text-danger" v-if="this.Allerrors && this.Allerrors.phone">{{this.Allerrors.phone[0]}}</small>
							<small class="text-danger" v-if="this.error">{{this.error}}</small>
						</div>
						<div class="mb-3 ">
							<label for="usertype" class="mb-2">User Type</label>
							<select v-model="users.userType" class="form-select form-select-sm">
								<option value="" :selected="true" :disabled="true">Select User Type</option>
								<option :value="'User'">User</option>
								<option :value="'Admin'">Admin</option>
							</select>
							<small class="text-danger" v-if="this.Allerrors && this.Allerrors.userType">{{this.Allerrors.userType[0]}}</small>
						</div>
						<div class="mb-3 ">
							<label for="image" class="mb-2">Image</label>
							<input @change="processFile" id="image" class="form-control form-control-sm" type="file">
							<small class="text-danger" v-if="this.Allerrors && this.Allerrors.image">{{this.Allerrors.image[0]}}</small>
						</div>
						<div class="d-flex justify-content-start">
								<div id="preview">
									<img v-if="preview" :src="preview" >
								</div>
						</div>
						<b-button variant="primary" size="sm" type="submit" style="width:fit-content;margin:10px;">Create</b-button>
						<a href="#" @click.prevent="step= 'login'" variant="secondary" size="sm" style="width:fit-content;margin:10px;">Login</a>
				</b-form>
			</div>
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
    name: 'UserRegister',
    data(){
        return{
			step:'login',
			login:{
				user:"",
				pass:""
			},
            users:{
                name:"",
                email:"",
                password:"",
                re_password:"",
                phone:"",
                userType:"",
                image:"",
            },
            preview: "",
            error:"",
        }
	},
    computed:{
		...mapGetters('auth',['Success','Allerrors','Loginerrors','loggedIn']),
	},
	mounted(){ 
		if(this.loggedIn){ //check if user is loggedin it will condition to hide login route we also project in route guard (disableIfLoggedIn) to make secure
			this.$router.push({name:'Dashboard'});
		}
	},
    methods:{
        ...mapActions('auth',['addUsers','loginUser']),
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
		onLogin(e){
			e.preventDefault();
            //=================append data to FormData
            let formData = new FormData();
            formData.append('user',this.login.user);
			formData.append('pass',this.login.pass);
			this.loginUser(formData);
			this.showSpinner();
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
.wrappe-login{
	position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f7f7;
    width: 100%;
    z-index: 1000;
    height: 100vh;
	overflow: hidden;
	overflow-y: scroll;
}
.register{
	width: 400px;
    box-shadow: 0px 0px 6px #adadad;
    height: 484px;
    overflow: hidden;
    overflow-y: scroll;
    padding: 30px;
    background: white;
    border-radius: 5px;
}
.login{
	width: 400px;
    box-shadow: 0px 0px 6px #adadad;
    padding: 30px;
    background: white;
    border-radius: 5px;
}

#preview{
    width: 100%;
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