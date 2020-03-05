<template>
	<view class="content">
		<home v-if="pageCur=='home'"></home>
		<course v-if="pageCur=='course'"></course>
		<news v-if="pageCur=='news'"></news>
		<user v-if="pageCur=='user'"></user>
		<foot-nav @navChange="navChange"></foot-nav>
	</view>
</template>

<script>
	import footNav from '../../components/footer/foot_nav.vue'
	import home from '../home/index.vue'
	import course from '../course/index.vue'
	import news from '../news/index.vue'
	import user from '../user/index.vue'
	export default {
		data() {
			return {
				pageCur:"home"
			}
		},
		components:{
			footNav,
			home,
			course,
			news,
			user
		},
		methods: {
			navChange: function(pageCur) {
				this.pageCur = pageCur
			}
		}
	}
</script>

<style>

</style>
