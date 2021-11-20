<template>
    <div>
		<h5 class="title">Dashboard</h5>
		<div class="row">
            <div class="col-lg-2 col-6">
                <md-content class="md-elevation-4" style="padding:15px; border-radius:4px;">
                    <h4 class="dash-count" v-if="Allusers.length >1 ">Users <i style="margin-left:5px;" class="fas fa-users"></i></h4>
                    <h4 class="dash-count" v-else>User<i style="margin-left:5px;" class="fas fa-users"></i></h4>
                    <div class="d-flex">
                        <h5>{{Allusers.length}}</h5>
                    </div>
                    <router-link :to="{name: 'UserList'}">More info</router-link>
                </md-content>
            </div>
            <div class="col-lg-2 col-6">
                <md-content class="md-elevation-4" style="padding:15px; border-radius:4px;">
                    <h4 class="dash-count" v-if="Allcategories.length >1 ">Categories<i style="margin-left:5px;" class="fas fa-list"></i></h4>
                    <h4 class="dash-count" v-else>Category<i style="margin-left:5px;" class="fas fa-list"></i></h4>
                    <div class="d-flex">
                        <h5 >{{Allcategories.length}}</h5>
                    </div>
                    <router-link :to="{name: 'CategoryList'}">More info</router-link>
                </md-content>
            </div>
            <div class="col-lg-2 col-6">
                <md-content class="md-elevation-4" style="padding:15px; border-radius:4px;">
                    <h4 class="dash-count" v-if="Allproducts.length >1 ">Products<i style="margin-left:5px;" class="fas fa-sitemap"></i></h4>
                    <h4 class="dash-count" v-else>Product<i style="margin-left:5px;" class="fas fa-sitemap"></i></h4>
                    <div class="d-flex">
                        <h5>{{Allproducts.length}}</h5>
                    </div>
                    <router-link :to="{name: 'ProductList'}">More info</router-link>
                </md-content>
            </div>
        </div>
	</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
    name: 'Dashboard',
    computed:{
        ...mapGetters('dashboard',['Allproducts','Allusers','Allcategories','Alltables']),
    },
    methods:{
        ...mapActions('dashboard',['getAllProduct','getAllUser','getAllCategory','getAllTable']),
    },
    mounted(){
        this.getAllProduct();   //call this mehtod from ...mapActions if  we not mouted users will not found
        this.getAllUser();
        this.getAllCategory();
        this.getAllTable();
    },
}
</script>

<style>
.title{
	padding: 30px 0;
}
.dash-count{
    color:steelblue;
}
</style>