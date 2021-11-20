<template>
        <div>                
            <md-content class="md-elevation-4" style="padding:15px; border-radius:4px; width:70%; margin:auto;">
                <h5 class="title text-center">Add Product</h5>
                <div class="row d-flex justify-content-center">
                    <div class="col-12 col-sm-12">
                        <b-alert show variant="success" v-if="this.Success">{{this.Success}}</b-alert>
                        <b-form @submit.prevent="onSubmit">
                            <div class="row">
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="product_name" class="mb-2">Product Name</label>
                                    <b-form-input size="sm" id="product_name"  v-model="product.product_name" type="text" placeholder="Name"></b-form-input>
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.product_name">{{this.Allerrors.product_name[0]}}</small>
                                </div>
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="usertype" class="mb-2">Category</label>
                                    <select v-model="product.category_id" class="form-select form-select-sm">
                                        <option value="" :selected="true" :disabled="true">Select Category</option>
                                        <option v-for="category in this.Allcategoires.data" :key="category.id" :value="category.id">
											{{category.category_name}}
										</option>
                                    </select>
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.category_id">{{this.Allerrors.category_id[0]}}</small>
                                </div>
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="unitprice" class="mb-2">Unit Price ($)</label>
									<b-form-input id="unitprice" size="sm" v-model="product.unitprice" type="text" placeholder="0.00"></b-form-input>
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.unitprice">{{this.Allerrors.unitprice[0]}}</small>
                                </div>
                                <div class="mb-3 col-lg-6 col-sm-12">
                                    <label for="image" class="mb-2">Image</label>
                                    <input @change="processFile" id="image" class="form-control form-control-sm" type="file">
                                    <small class="text-danger" v-if="this.Allerrors && this.Allerrors.image">{{this.Allerrors.image[0]}}</small>
                                </div>
                                <div class="d-flex justify-content-start">
									<div id="previewImg">
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
import Spinner from '../../spinner/Spinner.vue'; //import this ixin for use spinner
import Mixin from '../../../../helper/mixin.js'; //import this ixin for use spinner
import {mapActions,mapGetters} from 'vuex'
export default {
    components: {Spinner},
    mixins: [Mixin],
    name: 'CreateProduct',
    data(){
        return{
            product:{
                product_name:"",
                category_id:"",
                unitprice:"",
                image:""
            },
			preview: "",
			error:"",
        }
	},
    computed:{
		...mapGetters('category',['Allcategoires']),
		...mapGetters('product',['Allerrors','Success']),
    },
    mounted(){
        this.getCategoies();
    },
    methods:{
		...mapActions('category',['getCategoies']),
		...mapActions('product',['addProduct']),
        onSubmit(e){
            e.preventDefault();
            //=================append data to FormData
            let formData = new FormData();
            formData.append('product_name',this.product.product_name);
            formData.append('category_id',this.product.category_id);
            formData.append('unitprice',this.product.unitprice);
            formData.append('image',this.product.image);
            let config = {
                headers:{
                    'Content-Type': 'multipart/form-data',         
                }        
            }
            this.addProduct(formData,config);
            this.showSpinner(); //to show spinnser we call showSpinner and hideSpinnser functions from mixin that we import above
        },
        processFile(event) {
            this.product.image = event.target.files[0];
            this.preview = URL.createObjectURL(this.product.image);
		},
    }

}
</script>

<style>
#previewImg{
    width: 80%;
}
#preview img{
    width: 100%;
}
.title{
    padding: 20px 0;
}
</style>