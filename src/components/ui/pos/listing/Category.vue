<template>
    <div  class="wrappe-menu">
        <div v-for="cat in category" :key="cat.id" >
            <div class="cat" @click="passCatID(cat.id)">
                <p class="cat-name">{{cat.category_name | capitaLize}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Category',
    props: ['category'], //'category' is a prop name in parent component // we use prop(pass data from parent-compo to child-compo)
    methods:{
        passCatID(catID){
            this.$emit('PassCatID',catID); // $emit(pass data from child-compo to parent-compo)
        }
    },
}
</script>

<style>

</style>