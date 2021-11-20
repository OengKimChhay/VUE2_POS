<template>
        <div>
            <h5 class="title text-center">Create Category</h5>
            <md-content class="md-elevation-4" style="padding:15px; border-radius:4px; width:50%; margin:auto;">
                <div class="row d-flex justify-content-center">
                    <div class="col-12 col-sm-12">
                        <b-alert show variant="success" v-if="this.Success">A category has been added!</b-alert>
                        <b-form @submit.prevent="onSubmit">
                            <div>
                                <label for="name" class="mb-2">Category Name</label>
                                <b-form-input size="sm" id="name"  v-model="category_name" type="text" placeholder="Category Name"></b-form-input>
                                <small class="text-danger" v-if="this.Allerrors && this.Allerrors.category_name">{{this.Allerrors.category_name[0]}}</small>
                            </div>   
                            <b-button :disabled="usertype === 'User'" variant="primary" size="sm" type="submit" style="width:fit-content;margin:10px;">Create</b-button>
                        </b-form>
                    </div>
                </div>
            </md-content>

            <!-- ======================showing spinner========================= -->
            <Spinner :active="spinnerActive" text='Loading...'></Spinner>
        </div>
</template>

<script>
import Spinner from '../../spinner/Spinner'; //import this ixin for use spinner
import Mixin from '../../../../helper/mixin.js'; //import this ixin for use spinner
import {mapActions,mapGetters} from 'vuex';
export default {
    components: {Spinner},
    mixins: [Mixin],
    name: 'CreateCategory',
    data(){
        return{
            category_name:'',
        }
    },
    computed:{
        ...mapGetters('category',['Allerrors','Success']),
    },
    methods:{
        ...mapActions('category',['addCategoies']),
        onSubmit(e){
            e.preventDefault();
            let formData = new FormData();
            formData.append('category_name',this.category_name);
            this.addCategoies(formData);
            this.showSpinner(); //to show spinnser we call showSpinner and hideSpinnser functions from mixin that we import above
        },
    },
}
</script>

<style>
</style>