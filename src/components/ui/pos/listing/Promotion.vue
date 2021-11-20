<template>
  <div class="wrappe-menu">
    <div class="promotion-form">
      <div class="group-input">
        <p>Discount(%)</p>
        <input v-model="discount" type="number" placeholder="%" id="dis" min="1">
      </div>
      <div class="group-input">
        <p>Rate ៛</p>
        <input v-model="rate" type="number" placeholder="rate" id="rate" min="1">
      </div>
      <div class="group-input">
        <button @click="onSubmit">Submit</button>
        <button @click="onReset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Promotion",
  data(){
    return{
      discount:0,
      rate:4100
    }
  },
  methods:{
    onSubmit(){
      this.$emit('passDiscount',this.discount,this.rate);
    },
    onReset() {
        this.rate = 0;
        this.discount = 0;
      }
  }
}
</script>

<style>

</style>