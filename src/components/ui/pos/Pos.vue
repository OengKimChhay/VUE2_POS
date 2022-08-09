<template>
    <div class="wrappe-order">
        <md-content class="md-elevation-2" style="padding:8px">
            <md-button class="md-raised md-accent"> <router-link :to="{ name: 'Dashboard' }" style="text-decoration:none;padding:7px;color: white;" ><b-icon icon="arrow-bar-left"></b-icon>Exit</router-link></md-button>
            <md-button class="md-raised md-primary" @click="refreshPage" >Refresh</md-button>
        </md-content>
        <div class="wrapper">
            <section>
                <p class="title">Order</p>
                <!-- ------------------take order-------------------->
                <div class="order">
                    <div class="header-order">
                        <div class="cahier">
                            <p>Cashier Name: {{username | capitaLize}}</p>
                            <p>Order Number: 0012</p>
                            <p>Table:{{table}}</p>
                        </div>
                        <div class="date">
                            <Clock></Clock>
                        </div>
                    </div>
                    <div class="body-order">
                        <table class="table-order">
                            <thead>
                                <tr>
                                    <th style="width:60px">N0.</th>
                                    <th>Pro_Name</th>
                                    <th style="width:130px">Price</th>
                                    <th style="width:130px">Qty</th>
                                    <th style="width:130px">Dis</th>
                                    <th style="width:130px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in orderItems" :key="index">
                                    <td class="text-center">{{index+1}}</td>
                                    <td>{{item.product_name}}</td>
                                    <td class="text-center">{{item.unitprice | toCurrency}}</td> <!--toCurrency is a filter pls see /filter/main.js-->
                                    <td class="text-center"><div class="qty-btn"><input v-model="item.qty" type="number" min="1" title="Quantity"></div></td>
                                    <td class="text-center">{{discount}} %</td>
                                    <td class="text-center"><button @click="deleteOrder(index)" title="Delete" class="delete-order"><b-icon icon="trash" ></b-icon></button></td>
                                </tr>
                                <tr v-if="orderItems.length <= 0">
                                    <td style="text-align:center;padding:20px;" colspan="6">No item yet.</td>
                                </tr>
                            </tbody>
                        </table>
                        <div  class="order-detail">
                            <div>
                                <p>Total: <span>{{TOTAL | toCurrency}}</span></p>
                                <p>Rate: {{rate}}៛</p>
                                <p>Dis: <span>{{discount}} %</span></p>
                                <p>Amount to pay: <span>{{AMOUNTTOPAY | toCurrency}}</span> </p>
                            </div>
                            <div>
                                <md-button v-if="orderItems.length > 0" class="md-primary md-raised" @click="showDialogOrder = true">Order</md-button>
                            </div>
        <!---------------------------------- show order detail alert -------------------------------------->
                            <md-dialog :md-active.sync="showDialogOrder" :md-fullscreen="false" :md-click-outside-to-close="false">
                                <md-dialog-title style="background: #dedede; padding: 16px;">Order Detail</md-dialog-title>
                                <md-dialog-content>
                                    <div>
                                        <div class="body-order-detail">
                                            <md-table>
                                                 <md-table-row>
                                                    <md-table-head style=" color: #0361ff; font-size: 20px;">Items</md-table-head>
                                                    <md-table-head style=" color: #0361ff; font-size: 20px;">Rate</md-table-head>
                                                    <md-table-head style=" color: #0361ff; font-size: 20px;">Total</md-table-head>
                                                    <md-table-head style=" color: #0361ff; font-size: 20px;">Discount</md-table-head>
                                                    <md-table-head style=" color: #0361ff; font-size: 20px;">Amount To Pay</md-table-head>
                                                </md-table-row>
                                                <md-table-row>
                                                    <md-table-cell style="font-size: 16px;">{{ITEM}}</md-table-cell>
                                                    <md-table-cell  style="font-size: 16px;">{{rate}}</md-table-cell>
                                                    <md-table-cell  style="font-size: 16px;">{{TOTAL | toCurrency}}</md-table-cell>
                                                    <md-table-cell  style="font-size: 16px;">{{discount}}%</md-table-cell>
                                                    <md-table-cell style="font-size:17px;background:#deeaff;"> 
                                                        <p>{{AMOUNTTOPAY*rate | toCurrencyReil}}</p> 
                                                        <p>{{AMOUNTTOPAY | toCurrency}}</p>
                                                    </md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                            <md-table>
                                                 <md-table-row >
                                                    <md-table-head style=" color: #0361ff; font-size: 20px;">Check Payment</md-table-head>
                                                </md-table-row>
                                                <md-table-row>
                                                    <md-table-cell><p style="font-size: 18px;color: #b70202;">Reil (៛)    </p><input v-model="reil" class="checkbillinput" type="number"></md-table-cell>
                                                    <md-table-cell><p style="font-size: 18px;color: #b70202;">Dollar ($)  </p><input v-model="dollar" class="checkbillinput" type="number"></md-table-cell>
                                                </md-table-row>
                                                <md-table-row>
                                                    <md-button @click="Changes" class="md-dense md-raised" style="background:#e1e1e1;margin-left:25px">Check</md-button>
                                                </md-table-row>
                                            </md-table>
                                            <md-table>
                                                 <md-table-row>
                                                    <md-table-head style=" color: #0361ff; font-size: 20px;">Changes</md-table-head>
                                                </md-table-row>
                                                <md-table-row>
                                                    <md-table-cell style="font-size: 16px;">{{changes*rate | toCurrencyReil}}</md-table-cell>
                                                    <md-table-cell style="font-size: 16px;">{{changes | toCurrency}}</md-table-cell>
                                                </md-table-row>
                                            </md-table>
                                        </div>
                                    </div>
                                </md-dialog-content>
                                <md-dialog-actions>
                                    <md-button class="md-raised md-accent" @click="showDialogOrder = false">Close</md-button>
                                    <md-button class="md-raised md-primary" @click="TakeOrderToBackEnd">Order</md-button>
                                </md-dialog-actions>
                            </md-dialog>
        <!---------------------------------show error order dialog------------------------------------>
                            <md-dialog :md-active.sync="alert_order" :md-fullscreen="true" :md-click-outside-to-close="false">
                                <md-dialog-title>Order Message</md-dialog-title>
                                <md-dialog-content>
                                    <p class="text-danger m-0" v-if="!table"><b-icon icon="exclamation-circle" aria-hidden="true"></b-icon> Please select a Table!.</p>
                                    <p class="text-success m-0" v-if="this.Success"><b-icon icon="check-circle" aria-hidden="true"></b-icon> Order success.</p>
                                </md-dialog-content>
                                <md-dialog-actions>
                                    <md-button v-if="!table" class=" md-dense md-primary" @click="alert_order = false">Ok</md-button>
                                    <md-button v-if="this.Success" class=" md-dense md-primary" @click="close_alert_order">Ok</md-button>
                                </md-dialog-actions>
                            </md-dialog>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <p class="title">Menu</p>
                <div class="menu-option">
                    <md-button class="md-raised" style="background: tomato; color: white;"  v-on:click="orderItems=[]">Clear Order</md-button>
                    <md-button class="md-raised" style="background: tomato; color: white;"  v-on:click="Table">Table</md-button>
                    <md-button class="md-raised" style="background: tomato; color: white;"  v-on:click="promoTion">Setting (%,rate)</md-button>
                    <md-button class="md-raised" style="background: tomato; color: white;"  v-if="showProList || showTable || showPromoTable" @click="Back" size="sm"><b-icon icon="chevron-double-left"></b-icon> Back</md-button>
                </div>

                <!-- we use prop(pass data from parent-compo to child-compo) and $emit(pass data from child-compo to parent-compo) -->
                <TableOrder v-if="showTable" :table="this.Alltables" @passTable="selectTab"></TableOrder>
                <!-- ------------------show category list--------------- -->
                <Category v-if="showCatList" :category="this.Allcategories" @PassCatID="selectCat"></Category> 
                <!-- ------------------product show base on category -->
                <Product  v-if="showProList" :product="this.Allproducts" :category_id="this.category_id" @PassProduct="TakeOrder"></Product>
                <Promotion v-if="showPromoTable" @passDiscount="TakeDiscount"></Promotion>
            </section>
        </div>
    </div>
</template>

<script>
import Mixin from '../../../../helper/mixin'; //for use of username
import {mapActions,mapGetters} from 'vuex';
import Clock from '../../../../helper/clock';
// -------components-------
import TableOrder from "./listing/Table";
import Category from './listing/Category';
import Product from './listing/Product';
import Promotion from './listing/Promotion';
export default {
    mixins: [Mixin],
    name:'Pos',
    components:{
        Clock, 
        TableOrder,
        Category, 
        Product,
        Promotion,
    },
    data(){
        return{
            alert_order:false, //show alert order for order message
            showDialogOrder:false, //show dialog table for order detail and check bill

            table:'', //for table number
            category_id: '',
            showCatList: true,
            showProList: false,
            showTable: false,
            showPromoTable: false,

            orderItems:[],
            discount:0,
            rate:4100,
            reil:0,
            dollar:0,
            changes:0,

        }
    },
    computed:{
        ...mapGetters('dashboard',['Allproducts','Allcategories','Alltables']),
        ...mapGetters('pos',['Allerrors','Success']),
        
        TOTAL(){ //to get amoute total of order
            return this.orderItems.reduce((acc, item) => acc + parseFloat(item.unitprice*item.qty), 0);
        }, 
        AMOUNTTOPAY(){
            return this.TOTAL - (this.TOTAL * (this.discount/100));
        },
        ITEM(){
            return this.orderItems.reduce((acc, item) => acc + parseInt(item.qty), 0);
        }
    },
    methods:{
        ...mapActions('dashboard',['getAllProduct','getAllCategory','getAllTable']),
        ...mapActions('pos',['takeOrder']),
        refreshPage(){
            window.location.reload();
        },
        selectCat(catID){
            this.category_id = catID;
            this.showCatList = false;
            this.showProList = true;
        },
        Back(){
            this.showCatList= true;
            this.showProList= false;
            this.showTable= false;
            this.showPromoTable= false;
        },
        Table(){
            this.showTable= true;
            this.showCatList= false;
            this.showProList= false;
            this.showPromoTable= false;
        },
        promoTion(){
            this.showPromoTable= true;
            this.showTable= false;
            this.showCatList= false;
            this.showProList= false;
        },
        TakeDiscount(dis,rat){
            // dis and rat are take from prop
            this.discount = dis;
            this.rate = rat;
        },
        selectTab(table){
            this.table = table.name;
        },
        TakeOrder(product){
            let index = this.orderItems.findIndex((item) => item.product_id === product.id); 
            if(index != -1){ //check if item inorderItems array is the same with item that user just add (=-1 mean same item)
                this.orderItems[index].qty ++; //if same increase only qty and price in that index of item
            }else{
                let order = {
                    product_id       : product.id,
                    product_name     : product.product_name,
                    unitprice        : product.unitprice,
                    qty              :1,
                }
                this.orderItems.push(order);
            }
        },
        TakeOrderToBackEnd(){
            let formData = new FormData();
            formData.append('cashier_id',this.userid); //userid is in mixin that we save from localstorage
            formData.append('cart',JSON.stringify(this.orderItems)); //we have to convert orderItems to string then append in formData otherwise Ui don't know it's obj or array
            formData.append('discount',this.discount);
            formData.append('table',this.table);
            formData.append('total_received_khr',this.reil);
            formData.append('total_received_usd',this.dollar);
            formData.append('amount_pay_price_khr',this.AMOUNTTOPAY * this.rate);
            formData.append('amount_pay_price_usd',this.AMOUNTTOPAY);
            this.takeOrder(formData);
            this.showDialogOrder =false;
            this.alert_order = true;
        },
        deleteOrder(index){
            this.orderItems.splice(index, 1); //1 mean that remove 1 item
        },
        close_alert_order(){ //this method is when order is successfully and refresh everything 
            this.alert_order = false;
            window.location.reload();
        },
        Changes(){
            if(this.dollar === "" || !this.dollar || this.dollar === 0){
                this.changes = (this.reil/this.rate) - this.AMOUNTTOPAY;   //all changes is convert to dollar
            }else if(this.reil === "" || !this.reil || this.reil === 0){
                this.changes = this.dollar - this.AMOUNTTOPAY;             //all changes is convert to dollar
            }else{
                this.changes = parseFloat(this.reil/this.rate) + parseFloat(this.dollar) - this.AMOUNTTOPAY;
            }
        }
    },
    mounted(){
        this.getAllProduct();   //call this mehtod from ...mapActions if  we not mouted data will not found
        this.getAllCategory();
        this.getAllTable(); 
    },
}
</script>

<style>
.checkbillinput{
    border: 2px solid #9a9a9a;
    background: #fafafa;
    padding: 10px;
    text-align: center;
    outline: none;
    margin-bottom: 7px;
    width: 100%;
    font-size: 16px;
}
.promotion-form{
    background: #dedede;
    border-radius: 3px;
    width: fit-content;
    padding: 23px;
}
.promotion-form .group-input{
    margin: 10px 5px;
}
.promotion-form .group-input p{
    font-size: 16px;
    margin: 4px 0;
}
.promotion-form .group-input input{
    outline: none;
    font-size: 16px;
    padding: 5px 12px;
    border: 1px solid #f98666;
}
.promotion-form .group-input button:nth-child(1){
    border: none;
    font-size: 16px;
    padding: 6px 14px;
    border-radius: 2px;
    box-shadow: 0px 1px 3px #090909;
    background: #28a745;
}
.promotion-form .group-input button:nth-child(2){
    border: none;
    margin-left: 13px;
    font-size: 16px;
    padding: 6px 14px;
    border-radius: 2px;
    box-shadow: 0px 1px 3px #090909;
    background: #d54343;
}
.wrapper{
    display: flex;
    margin: 20px;
    height: 88%;
}
.order-button{
    margin-right: 6px;
    border: none;
    background: #93b4ff;
    font-size: 18px;
    border-radius: 3px;
    font-weight: 500;
    box-shadow: 0px 1px 4px 0px #000000;
    padding: 9px 22px;
}
.order-button:hover{
    outline: 2px solid #a1a1a1;
}
.order-detail{
    margin-top: 10px;
    position: sticky;
    bottom: 0;
    background: lightgoldenrodyellow;
    display: flex;
    justify-content: space-between;
    padding: 12px 0px 0px;
}
.order-detail > div p{
    font-size: 17px;
    margin: 4px 0px;
    font-weight: 500;
}
button.delete-order{
    border: 2px solid #ff6d6d;
    background: white;
    border-radius: 3px;
    padding: 2px 4px;
    color: red;
}
.qty-btn{
    display: flex;
    justify-content: center;
}
.qty-btn input{
    width: 100%;
    outline: none;
    padding: 3px;
    text-align: center;
    border: none;
}
.order{
    height: 90%;
    padding: 15px;
}
.menu-option{
    display: -webkit-inline-box;
    width: 100%;
    padding: 10px 3px 5px;
    overflow: hidden;
    border-bottom: 1px solid #a19996;
    overflow-x: scroll;
}
.wrappe-order{
    position: fixed;
    top: 0px;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: white;
}
/* order */
.header-order{
    display: flex;
    justify-content: space-between;
}
.header-order .cahier p,.date p{
    margin-bottom: 8px;
    font-size: 17px;
    font-weight: 500;
}
/* end order */
section{
    box-shadow: 0px 0px 5px 0px #5e5e5e;
    background: lightgoldenrodyellow;
    width: 50%;
}
section:nth-child(1){
margin-right: 20px;
}
p.title{
    background: #55b0ff;
    margin: 0;
    text-transform: uppercase;
    padding: 15px;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
}

.body-order{
    position: relative;
    height: 90%;
    overflow: hidden;
    overflow-y: scroll;
}
.table-order{
    width: 100%;
    background: #dfe9fe;
}
.table-order > thead tr,thead th{
    padding: 10px;
    text-align: center;
	border: 1px solid #0000005e;
}
.table-order > thead{
    position: sticky;
    top: -1px;
    background: #FFDEAD;
}
.table-order td, th { 
	padding: 6px; 
	border: 1px solid #0000005e;
	text-align: left; 
	font-size: 16px;
}
.wrappe-menu{
    display: flex;
    flex-wrap: wrap;
    height: 85%;
    overflow: hidden;
    overflow-y: scroll;
    align-content: flex-start;
    justify-content: flex-start;
    padding: 20px;
}
.cat{
    width: 118px;
    height: 118px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 36%);
    border-radius: 3px;
    margin: 4px;
    cursor: pointer;
    background: white;
    overflow: hidden;
}
.cat:hover{
    
    outline: 2px solid #a1a1a1;
}
.cat p.cat-name{
    margin: 0;
    word-break: break-all;
    font-size: 17px;
}
.wrappe-menu p.table-name{
    width: 80px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 36%);
    border-radius: 3px;
    margin: 2px;
    cursor: pointer;
    background: #f6f9ff;
    overflow: hidden;
    font-size: 17px;
}
p.table-name:hover{
    outline: 2px solid #a1a1a1;
}

/* product */
.product{
    width: 135px;
    height: 186px;
    margin: 5px;
    background: white;
    box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 36%);
    border-radius: 3px;
    cursor: pointer;
}
.product:hover{
    outline: 2px solid #a1a1a1;
}
.pro-img{
    position: relative;
    height: 70%;
}
.pro-img .img{
    width: 145px;
    height: 130px;
}
.pro-img span{
    position: absolute;
    top: 5px;
    left: 5px;
    color: #000000;
    font-size: 18px;
    background: rgb(255 255 255 / 72%);
    font-weight: 700;
    padding: 2px;
}
.pro-name{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 2px;
    height: 30%;
}
.pro-name p{
    margin: 0;
    color: black;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>