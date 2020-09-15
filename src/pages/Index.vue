<template>
	<q-page padding>
		<q-header class="bg-darkl1 text-grey-7 exo">
			<q-toolbar>
				Helpers
			</q-toolbar>
		</q-header>

		<div class="row">
			<div
				v-for="(module,idx) in modulesapp" :key="`mapp_${idx}`" 
				class="col-6 q-pa-sm" @click="$router.push(module.path)"
			>
				<q-card flat class="bg-darkl1 text-grey-6 col-6 text-center">
					<q-card-section>
						<div> <q-icon :name="module.icon" size="50px"/> </div>
						<div class="q-pt-md titlebtn"> {{ module.alias }} </div>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</q-page>
</template>

<script>
export default {
	name: 'PageIndex',
	data(){
		return {
			modulesapp:[
				{path:'counter',icon:'fas fa-clipboard-list',name:'',alias:'contador'},
				{path:'ubicador',icon:'far fa-compass',name:'',alias:'ubicador'}
			]
		}
	}
}
</script>

<style lang="scss">

	.titlebtn{
		text-transform: uppercase;
		font-size: .8em;
	}

</style>
