<template>
    <div class="wrappe-menu">
        <div v-for="product in this.filterProduct" :key="product.id" >
            <div class="product" @click="passProduct(product)">
                <div class="pro-img">
                    <img class="img" :src="ImageURL+'/product/'+product.image" alt=" image">
                    <!-- <img   alt="photo"> -->
                    <span>{{product.unitprice}} $</span>
                </div>
                <div class="pro-name">
                    <p>{{ product.product_name | capitaLize }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Mixin from '../../../../../helper/mixin.js'; //for use of ImageURL
export default {
    mixins: [Mixin],
    name:"Product",
    props: ['product','category_id'], //'product and category_id' is a prop name in parent component
    computed:{
        filterProduct(){ // to filter product by category
            return this.product.filter((product) => product.category_id == this.category_id);
        }
    },
    methods:{
        passProduct(product){
            this.$emit('PassProduct',product);
        }
    }
}
</script>

<style>

</style>