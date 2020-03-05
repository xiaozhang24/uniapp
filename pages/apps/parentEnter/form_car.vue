<template>
	<view class="fromCar">
		<tki-float-keyboard ref="keyb" :mode="'car'" :type="0" ></tki-float-keyboard>
	</view>
</template>

<script>
	import tkiFloatKeyboard from '@/components/tki-float-keyboard/tki-float-keyboard.vue'
	export default{
		components:{
			tkiFloatKeyboard
		},
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		showCarKey(){
			this.$refs.keyb._keyShow()
		}
	}
</script>

<style>
</style>
