<template>
	<q-page padding>
		
		<q-header class="bg-white text-darkl0 q-pa-sm">
			<q-toolbar>
				<q-btn flat round dense icon="menu" @click="leftDrawer = !leftDrawer" />
				<q-toolbar-title> Ubicador de Productos </q-toolbar-title>
			</q-toolbar>
			<q-form>
				<q-input
					flat color="dark"
					:type="iptsearch.type"
					v-model="iptsearch.value"
					ref="iptsearch" class="text-uppercase text-sz-lg"
					hint="Codigo, Codigo Corto"
				>
					<template v-slot:prepend>
						<q-btn type="button" dense flat rounded @click="toogleIptSearch" :icon="iptsearch.icon" color="grey-6"/>
					</template>
					<template v-slot:append>
						<q-btn dense flat rounded
							icon="fas fa-search" color="grey-6" 
							type="submit" :disabled="cansearch" :loading="iptsearch.processing"
							@click="locsOf"
						/>
					</template>
				</q-input>
			</q-form>
		</q-header>

		<div v-if="product">
			<q-card>
				<q-card-section horizontal>
					<q-card-section>
						<q-img src="../../assets/_defprod.png" style="height: 50px; width: 50px"/>
					</q-card-section>
					<q-separator vertical dark/>
					<q-card-section class="col">
						<div class="row justify-between">
							<span>{{ product.code }}</span>
							<span>{{ product.name }}</span>
						</div>
						<div> {{ product.description }} </div>
						<div> {{ product.stock }} </div>
					</q-card-section>
				</q-card-section>
			</q-card>

			<q-card class="q-mt-md">
				<q-card-section class="row items-center justify-between">
					<span>Ubicaciones</span>
					<q-btn rounded dense flat icon="add" @click="wndAddLoc.state=!wndAddLoc.state"/>
				</q-card-section>

				<q-list bordered>
					<q-item v-for="(loc,idx) in product.locations" :key="idx">
						<q-item-section>{{ loc.path }}</q-item-section>
						<q-item-section avatar>
							<q-btn flat icon="remove" color="negative"/>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card>
		</div>

		<q-footer class="bg-white text-dark exo-thin" bordered>
			<div flat v-if="product" class="row justify-between">
				<q-btn flat icon="more_vert" class="col" size="md"/>
				<q-btn flat icon="add" class="col" size="md"/>
			</div>
		</q-footer>

		<q-dialog v-model="wndAddLoc.state" position="bottom">
			<q-card>
				<q-toolbar class="row justify-between">
					<div></div>
					<div>{{ fullpath }}</div>
				</q-toolbar>
				<q-separator/>

				<q-select class="col q-px-md" label="Almacen" v-model="workIn" @input="setWarehouse" :options="warehousesOptions"/>
				<div class="row q-px-md justify-around">
					<q-select 
						v-for="(sect,idx) in sections" :key="idx" 
						v-model="sectModels[idx]"
						:options="sections[idx]"
						@input="loadSections(sectModels[idx],idx)"
					/>
				</div>

				<q-card-actions align="center">
					<q-btn flat label="Guardar" v-if="workIn.value" @click="setLoaction"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</q-page>
</template>

<script>
import vizapi from '../../API/warehouses'
export default {
	name: 'IndexLocator',
	data(){
		return {
			warehouses:[],
			iptsearch:{
				value:'',
				processing:false,
				type:"text",
				icon:'fas fa-hashtag'
			},
			product:undefined,
			create:{ state:false },
			wndAddLoc:{ state:false },
			workIn:{ label:"seleccione",value:null ,disabled:true},
			sections:[],
			sectModels:[],
			sendsection:undefined
		}
	},
	mounted(){ 
		this.$refs.iptsearch.focus();
		this.loadIndex();
	},
	methods:{
		setLoaction(){
			
		},
		toggle(){
			console.log();
		},
		loadSections(section,idx){
			console.log(this.sections);
			console.log(this.sectModels);

			this.sections.splice(idx+1);//elimina secciones
			this.sectModels.splice(idx+1);//elimina los modelos

			let data = { params:{"_section":section.value} }; // dato a enviar en peticion

			vizapi.loadSections(data).then(success=>{
				let children = success.data.sections;

				if(children.length>0){
					let resp = children.map(item=>{ return {label:item.alias,value:item.id}; });
					console.log(resp);
					this.sections.push(resp);
					this.sectModels.push({label:"Seleccione",value:null});
				}else{ console.log("Sin mas subsecciones por cargar!!"); }
			}).catch(fail=>{ console.log(fail); });
		},
		setWarehouse(){
			console.log(this.workIn);
			this.sections = [];// vaciamos las secciones
			let data = { params:{"_celler":this.workIn.value} }; // dato a enviar en peticion

			// lanzar peticion que trae secciones
			vizapi.loadSections(data).then(success=>{
				let resp = success.data.map(item=>{ return {label:item.alias,value:item.id}; });
				console.log(resp);
				this.sections.push(resp);
				this.sectModels.push({label:"Seleccione",value:null});
			}).catch(fail=>{ console.log(fail); });
		},
		locsOf(){
			this.iptsearch.processing=true;
			console.log(`ubicaciones para ${this.iptsearch.value}`);
			let codeart = this.iptsearch.value;
			let data = { params:{ code:codeart } }

			vizapi.product(data).then(success=>{
				console.log(success.data);
				let resp = success.data;

				if(resp.id){ 
					this.product = resp;
				}else{
					this.product = undefined;
					this.$q.notify({
						message:`Sin coincidencias para ${codeart}`,
						color:'negative',
						icon:"fas fa-exclamation-triangle"
					});
				}
				this.iptsearch.processing=false;

			}).catch(fail=>{
				console.log(fail);
			});
			
			console.log(data);
		},
		toogleIptSearch(){
			switch (this.iptsearch.type) {
				case "text": 
					this.iptsearch.type="number";
					this.iptsearch.icon="fas fa-font";
				break;
				case "number": 
					this.iptsearch.type ="text";
					this.iptsearch.icon="fas fa-hashtag";
				break;
			}

			this.$refs.iptsearch.focus();
		},
		async loadIndex(){
			this.warehouses = await vizapi.loadWarehouses();
			console.log(this.warehouses);
		}
	},
	computed:{
		cansearch(){ return this.iptsearch.value.length>2 ? false : true; },
		warehousesOptions(){ return this.warehouses.map(item=>{ return {label:item.name,value:item.id}; }); },
		fullpath(){ 
			let path = '';
			this.sectModels.forEach((item,idx,arr)=>{ if(item.value){ path += idx==0?`${item.label}`:`-${item.label}`; } });
			return path;
		}
	}
}
</script>

<style lang="scss">
	.text-sz-lg{
		font-size:1.3em;
	}
</style>