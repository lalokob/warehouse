<template>
	<q-layout view="hHh Lpr fFf" class="exo"> <!-- Be sure to play with the Layout demo on docs -->

		<!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
		<q-drawer v-model="leftDrawer" side="left" bordered content-class="bg-grey-2" >
			<!-- QScrollArea is optional -->
			<q-scroll-area class="fit q-pa-sm">
				<!-- Content here -->
			</q-scroll-area>
		</q-drawer>

		<q-page-container>
			<!-- This is where pages get injected -->
			<router-view />
		</q-page-container>

	</q-layout>
</template>

<script>
export default {
	name: 'Locator',
	data () {
		return {
			leftDrawer: false
		}
	}
}
</script>
