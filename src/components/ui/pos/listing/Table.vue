<template>
  <div  class="wrappe-menu">
      <p v-for="tab in table" :key="tab.id" class="table-name" @click="passTable(tab)">{{tab.name}}</p>
  </div>
</template>

<script>
export default {
    props:['table'],
    name:'TableOrder',
    methods:{
        passTable(table){
            this.$emit('passTable',table);
        }
    }

}
</script>

<style>

</style>