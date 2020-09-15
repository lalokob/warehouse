<template>
	<q-page padding>
		<q-header class="bg-darkl1 exo">
			<q-toolbar class="text-grey-5 row justify-between">
				<div>
					<q-icon name="fas fa-clipboard-list" size="sm"/> <span class="titlebtn">counter</span>
				</div>

				<q-select dark color="pink-6" borderless label-color="pink-6"
					:label="!listWarehouses?'Cargando...':'Almacen'"
					v-model="workWarehouse"
					:options="listWarehouses"
					:loading="!listWarehouses"
					:disable="!listWarehouses"
					style="min-width:100px;"
					@input="loadSections(0)"
				/>
			</q-toolbar>

			<q-toolbar class="row justify-between" v-if="workWarehouse.value">
				<div v-for="(section,idx) in listSections" :key="`${idx}`">
					<q-select
						dark color="pink-6" borderless label-color="pink-6"
						v-model="workSections[idx]" :options="listSections[idx]"
						@input="loadSections(idx)"
					>
						<template v-slot:prepend>
							<q-icon name="fas fa-filter" size="15px"/>
						</template>
					</q-select>
				</div>
			</q-toolbar>
		</q-header>

		<!-- <div>
			<q-card flat class="bg-darkl1">
				<q-card-section v-if="!products">
					Filtre opcones para ver articulos
				</q-card-section>
				<q-card-section v-else>
					<div v-for="(prod,idx) in products" :key="`art_${idx}`">
						{{ prod.code }} {{ prod.loc }}
					</div>
				</q-card-section>
			</q-card>
		</div> -->

		<q-footer class="bg-darkl1 exo">
			<q-toolbar>
				
			</q-toolbar>
		</q-footer>

		<q-dialog>

		</q-dialog>
	</q-page>
</template>

<script>
import vizapi from '../../API/warehouses'
// import SectionsTree from '../../components/Warehouse/SectionsTree.vue'
export default {
	name: 'PageIndex',
	components:{ SectionsTree },
	data(){
		return {
			listWarehouses:null,
			listSections:[],
			workWarehouse:null,
			workSections:[{ label:"...", value:null, disable:true }],
			products:null
		}
	},
	beforeMount(){
		this.workWarehouse = { label:"Seleccione", value:null, disable:true };
		this.listWarehouses = vizapi.loadWarehouses();
	},
	methods:{
		loadSections(idx){
			console.log("%cSecciones Actuales...","font-size:2em;font-color:purple;");
			console.log(this.workSections);
			console.log(this.workSections[idx]);
			let root = this.workSections[idx].value ? this.workSections[idx].value:0;
			console.log("%cCargando secciones para almacen "+this.workWarehouse.value+" con raiz "+root,"font-size:2em;font-color:purple;");
			let sections = api.loadSections(this.workWarehouse.value,root);

			this.listSections.push(sections.sects);
			this.workSections.push({ label:"...", value:null, disable:true });
			this.products = sections.prods;

			console.log(this.listSections);
			console.log(this.workSections);
		}
	}
}
</script>

<style lang="scss">

	.titlebtn{
		text-transform: uppercase;
		font-size: .8em!important;
	}

</style>
