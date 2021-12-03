<template>
	<div>
		<h1 class="md-title">Report POS</h1>
			<form @submit.prevent="Search" style="display:flex; width:20%;">
				<md-field>
					<label>Reciept Number</label>
					<md-input v-model="search.receipt_number"></md-input>
				</md-field>
				<md-button class="md-dense md-raised md-primary" type="submit">search</md-button>
			</form>
		<div v-if="this.Allreports.total > 0">
			<md-card md-with-hover class="report-card" v-for="report in this.Allreports.data" :key="report.id">
				<md-ripple>
					<md-card-header>
						<!-- <md-chip md-disabled>Disabled</md-chip> -->
						<div class="md-title">Reciept Number : {{ report.receipt_number }}</div>
						<div class="md-subhead">{{ report.created_at | formatDate}}</div>
						<div class="md-subhead">Table : {{ report.table}}</div>
					</md-card-header>

					<md-card-content>
						cashier : {{ report.cashier.name }}
						<hr>
						<h5>{{ report.amount_pay_price_khr |toCurrencyReil }}</h5>
						<h5>{{ report.amount_pay_price_usd |toCurrency }}</h5>
					</md-card-content>
					<md-card-actions>
						<md-chip v-if="report.cashier.userType === 'Admin'" md-disabled style="margin-right:30px;">{{report.cashier.userType}}</md-chip>
						<md-button class="md-dense md-raised md-primary" @click="View(report)">View</md-button>
						<md-button class="md-dense md-raised md-accent"  @click="Delete(report.id)">Delete</md-button>
					</md-card-actions>
				</md-ripple>
			</md-card>
		</div>
		<div v-if="this.Allreports.total <= 0">
			<h5 class="text-center">No Report.</h5>
		</div>
		<!-- ====================== view ================================== -->
		<md-dialog :md-active.sync="showDialogView">
			<md-dialog-title>Order Detail</md-dialog-title>
			<md-tabs md-dynamic-height>
				<md-tab md-label="General">
					<h5>Reciept Number : {{ detail.receipt_number }}</h5>
					<p>{{ detail.created_at | formatDate }}</p>
					<!-- <p>Table : {{ report.table}}</p> -->
					<b>Total : {{ detail.amount_pay_price_khr |toCurrencyReil }} | {{ detail.amount_pay_price_usd |toCurrency }}</b><br>
					<b>Recieve : {{ detail.total_received_khr |toCurrencyReil }} | {{ detail.total_received_usd |toCurrency }}</b>
					
				</md-tab>
				<md-tab md-label="Product">
					<md-table>
						<md-table-row>
							<md-table-head md-table-head>N0.</md-table-head>
							<md-table-head>Product Name</md-table-head>
							<md-table-head>Price</md-table-head>
							<md-table-head>Qty</md-table-head>
							<md-table-head>Dis</md-table-head>
						</md-table-row>

						<md-table-row v-for="(pro, index) in products" :key="pro.id">
							<md-table-cell md-numeric class="text-align-left">{{ index+1 }}</md-table-cell>
							<md-table-cell>
								<div v-for="p in Allproducts" :key="p.id">
									<div v-if="p.id == pro.product_id">{{ p.product_name }}</div>
								</div>
							</md-table-cell>
							<md-table-cell>{{pro.unit_price | toCurrency}}</md-table-cell> <!--toCurrency is a filter pls see /filter/main.js-->
							<md-table-cell>{{ pro.qty }}</md-table-cell>
							<md-table-cell>{{pro.discount}} %</md-table-cell>
						</md-table-row>
					</md-table>
				</md-tab>
				<md-tab md-label="Cashier">
					<md-card class="md-primary" md-theme="green-card" >
						<md-card-header>
							<md-card-header-text>
							<div class="md-title">Cashier</div>
							<div class="md-subhead">{{ cashier.name }}</div>
							<div class="md-subhead">{{ cashier.phone }}</div>
							<div class="md-subhead">{{ cashier.email }}</div>
							</md-card-header-text>
							<md-card-media>
							<img :src="ImageURL+'/users/'+cashier.image"  alt="Avatar">
							</md-card-media>
						</md-card-header>
					</md-card>
				</md-tab>
			</md-tabs>

			<md-dialog-actions>
				<md-button class="md-primary" @click="showDialogView = false">Close</md-button>
			</md-dialog-actions>
		</md-dialog>
		<!-- ====================== dialog================================= -->
		<md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false">
		<md-dialog-title>Message</md-dialog-title>
		<md-dialog-content v-if="this.Allerrors" class="text-danger">{{ this.Allerrors }}</md-dialog-content>
		<md-dialog-content v-if="this.Success" class="text-success">{{ this.Success }}</md-dialog-content>
		<md-dialog-actions>
			<md-button class="md-primary" v-if="this.Allerrors" @click="showDialog = false">Ok</md-button>
			<md-button class="md-primary" v-if="this.Success" @click="closeDialog">Ok</md-button>
		</md-dialog-actions>
		</md-dialog>
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
			search:{
				receipt_number:'',
				from:'',to:'',
			},
			showDialogView:false,
			showDialog:false,
			detail:[],
			cashier:[],
			products:[]
		}
    },
    computed:{
        ...mapGetters('report',['Allreports','Success','Allerrors']),
        ...mapGetters('dashboard',['Allproducts']),
    },
    methods:{
        ...mapActions('report',['getReport','deleteReport']),
		...mapActions('dashboard',['getAllProduct']),
		Delete(reportID){
			this.deleteReport(reportID);
			this.showSpinner(); 
			this.showDialog = true;
		},
		View(row){
			this.detail = row;
			this.cashier = row.cashier;
			this.products = row.details;
			this.showDialogView = true;
		},
		closeDialog(){
			this.showDialog = false;
            window.location.reload(); //to reload page
		},
		Search(){
			if(this.search.receipt_number != ""){
				this.getReport(this.search.receipt_number);
			}
		}
    },
    mounted(){
		this.getReport(this.search.receipt_number);
		this.getAllProduct(); 
    },
}
</script>

<style>
.report-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>