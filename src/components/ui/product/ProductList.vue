<template>
    <div>
        <!-- whenever we use child route we have to add router-view to wrappe all parent component -->
        <!-- and router-view plz see in layout/layout -->
        
        <h5 class="title">Product List <i class="fa fa-users"></i></h5>
        <md-table  md-card v-if="this.Allproducts.total > 0"> <!--//.data mean we use ->paginate() from api so we must use .data appent to response.data -->
            <md-table-toolbar>
                <h1 class="md-title">Product: {{this.Allproducts.total}}</h1> <!-- .total is getting from laravel pagination api-->
                <b-form-input v-model="search"  size="sm" style="width:200px;margin-right:5px;" class="" placeholder="Search product name..."></b-form-input >
                <router-link :to="{name:'CreateProduct'}"><button class="btn btn-secondary btn-sm text-right"><i class="fas fa-plus"></i> Add New Product</button></router-link>
            </md-table-toolbar>
            <md-table-row style="background-color:#ADD8E6;">
                <md-table-head md-numeric>NO_</md-table-head>
                <md-table-head>Product Img</md-table-head>
                <md-table-head>Product Name</md-table-head>
                <md-table-head>Unit Price</md-table-head>
                <md-table-head>Category</md-table-head>
                <md-table-head>Created</md-table-head>
                <md-table-head>Updated</md-table-head>
                <md-table-head>Action</md-table-head>
            </md-table-row>

            <md-table-row slot="md-table-row" v-for="(product, index) in searchProduct " :key="product.id">
                <md-table-cell md-numeric>{{index+1}}</md-table-cell>
                <md-table-cell><img class="img" :src="ImageURL+'/product/'+product.image" alt="photo"></md-table-cell>
                <md-table-cell>{{product.product_name | capitaLize}}</md-table-cell>
                <md-table-cell>{{product.unitprice | toCurrency}}</md-table-cell>
                <md-table-cell>
                    <div v-for="cat in Allcategories" :key="cat.id">
                        <div  v-if="cat.id == product.category_id">{{cat.category_name | capitaLize}}</div>
                    </div>
                </md-table-cell>
                <md-table-cell>{{ product.created_at | formatDate }}</md-table-cell> <!-- formatDate is a custom filter in main.js root -->
                <md-table-cell>{{ product.updated_at | formatDate }}</md-table-cell> <!-- formatDate is a custom filter in main.js root -->
                <md-table-cell>

                    <b-dropdown variant="outline-secondary" size="sm" :disabled="usertype === 'User'">
                        <template #button-content><b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings</template>
                        <b-dropdown-item-button variant="primary" @click="Edit(product.id)" v-b-modal.modal title="Edit">
                            <b-icon icon="file-earmark-medical"></b-icon> Edit
                        </b-dropdown-item-button>
                        <b-dropdown-item-button variant="danger" @click="Delete(product.id)" title="Delete" >
                            <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
                        </b-dropdown-item-button>
                    </b-dropdown>

                </md-table-cell>
            </md-table-row>
            <md-table-row v-if="this.searchProduct.length <=0">
                <h5 class="m-2 text-center">No Product.</h5>
            </md-table-row>
        </md-table>
    <!-- pagination -->
        <div v-if="this.Allproducts.total >0" class="m-5 d-flex justify-content-around align-items-center">
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
                <p style="margin: 0;font-size: 12px;color: #606060;">Page {{this.Allproducts.current_page}} of {{this.Allproducts.last_page}}</p>
            </div>
        </div>
    <!-- end pagination -->
        <md-table md-card v-if="this.Allproducts.total <=0"> <!--//.total mean we use ->paginate() from api -->
            <md-table-toolbar>
                <h1 class="md-title">No Product</h1><router-link :to="{name:'CreateProduct'}"><button class="btn btn-secondary btn-sm text-right">Add New Product</button></router-link>
            </md-table-toolbar>
        </md-table>

<!-- =====================showign modal vue bootstrap for update user================== -->
        <b-modal id="modal" hide-footer title="Update Product">
            <b-alert show variant="success" v-if="this.Success">{{this.Success}}</b-alert>
            <b-form  @submit.prevent="Update(editProduct.id)">
                <div class="row">
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="product_name" class="mb-2">New Product Name</label>
                        <b-form-input size="sm" id="product_name"  v-model="editProduct.new_product_name" type="text" placeholder="New Product Name"></b-form-input>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.new_product_name">{{this.Allerrors.new_product_name[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="usertype" class="mb-2">New Category</label>
                        <select v-model="editProduct.new_category_id" class="form-select form-select-sm">
                            <option v-for="category in this.Allcategories" :key="category.id" :value="category.id" :selected="category.id == editProduct.new_category_id">{{category.category_name}}</option>
                        </select>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.new_category_id">{{this.Allerrors.new_category_id[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="unitprice" class="mb-2">New Unit Price ($)</label>
                        <b-form-input id="unitprice" size="sm" type="text" v-model="editProduct.new_unitprice"></b-form-input>
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.new_unitprice">{{this.Allerrors.new_unitprice[0]}}</small>
                    </div>
                    <div class="mb-3 col-lg-6 col-sm-12">
                        <label for="image" class="mb-2">New Image</label>
                        <input @change="processFile" id="image" class="form-control form-control-sm" type="file">
                        <small class="text-danger" v-if="this.Allerrors && this.Allerrors.new_image">{{this.Allerrors.new_image[0]}}</small>
                    </div>
                    <div class="d-flex justify-content-start">
                        <div id="previewImg">
                            <img class="preview" v-if="preview" :src="preview" alt="">
                            <img class="preview" v-else :src="ImageURL+'/product/'+editProduct.new_image" alt="">
                        </div>
                    </div>
                    <b-button :disabled="usertype === 'User'" variant="primary" size="sm" type="submit" style="width:fit-content;margin:10px;">Update</b-button>
                </div>
            </b-form>
        </b-modal>
<!-- ======================showing spinner========================= -->
        <Spinner :active="spinnerActive" text="Loading..."></Spinner>
    </div>
</template>

<script>
import Spinner from '../../spinner/Spinner.vue'; //import this ixin for use spinner
import Mixin from '../../../../helper/mixin.js'; //import this ixin for use spinner
import {mapActions,mapGetters} from 'vuex';
export default {
    components: {Spinner},
    mixins: [Mixin],
    data(){
        return{
            page:1,
            editProduct:{
                id:"",
                new_product_name:"",
                new_unitprice:"",
                new_category_id:"",
                new_image:"",
            },
            preview: "",
            search:"",
        }
    },
    computed:{
        ...mapGetters('product',['Allproducts','Success','Allerrors']),
        ...mapGetters('dashboard',['Allcategories']),
        searchProduct(){
            return this.Allproducts.data.filter((item) => { //.data mean we use ->paginate() from api so we must use .data appent to response.data -->
                return item.product_name.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    methods:{
        ...mapActions('product',['getProduct','udpateProducts','deleteProducts']),
        ...mapActions('dashboard',['getAllCategory']),
        Edit(productID){
            const secificProduct = this.Allproducts.data.find(product=> product.id === productID); //to get old value of data to show when user click edit
            this.editProduct.id = secificProduct.id;
            this.editProduct.new_product_name = secificProduct.product_name;
            this.editProduct.new_unitprice= secificProduct.unitprice;
            this.editProduct.new_category_id = secificProduct.category_id;
            this.editProduct.new_image = secificProduct.image;
        },
        Update(productID){
            let formData = new FormData();
            formData.append('new_product_name',this.editProduct.new_product_name);
            formData.append('new_category_id',this.editProduct.new_category_id);
            formData.append('new_unitprice',this.editProduct.new_unitprice);
            formData.append('new_image',this.editProduct.new_image);
            formData.append('_method', 'PUT')  //in this route js can't understand put request so we have to use post request instead but make sure we append the formData with _'method':'PUT')
            let config = {
                headers:{
                    'Content-Type': 'multipart/form-data',         
                }        
            }
            this.udpateProducts({productID,formData,config});    // use this if we dont use mapAction this.$store.dispatch('auth/udpateUsers',{userID,formData,config})           
            this.showSpinner(); 
        },
        Delete(productID){
            if(confirm("Are your sure want to delete this product?")){
                this.deleteProducts(productID);
                this.showSpinner(); //to show spinnser we call showSpinner and hideSpinnser functions from mixin that we import above
            }
        },
        processFile(event) {
            this.editProduct.new_image = event.target.files[0];
            this.preview = URL.createObjectURL(this.editProduct.new_image);
        },
        nextPage(){
            if(this.page >= this.Allproducts.last_page ){
                // .last_page is getting from laravel api
                this.page = this.Allproducts.last_page;
                this.getProduct(this.page); // this.getProduct(this.page) getProduct function has payload pls see product.js in store
            }else{
                this.page+=1;
                this.getProduct(this.page); // this.getProduct(this.page) getProduct function has payload pls see product.js in store
            }
        },
        prePage(){
            if(this.page <=1){
                this.page = 1;
                this.getProduct(this.page);
            }else{
                this.page-=1;
                this.getProduct(this.page);
            }
        },
        pageNumber(num){
            if(num <=1){
                this.page = 1;
                this.getProduct(this.page);
            }else if(num >= this.Allproducts.last_page){
                this.page = this.Allproducts.last_page;
                this.getProduct(this.page);
            }else{
                this.page = num;
                this.getProduct(this.page);
            }
        }
    },
    mounted(){ 
        this.getProduct(this.page);
        this.getAllCategory();
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