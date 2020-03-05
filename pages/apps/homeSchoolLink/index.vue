<template>
	<view>
		<view class="cu-list menu">
			<view v-if="permissionList.inbox" class="cu-item arrow" @tap="toInBox">
				<view class="content">
					<text class="cuIcon-title text-blue"></text>
					<text>收件箱</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
			<view v-if="permissionList.outbox" class="cu-item arrow" @tap="toOutBox">
				<view class="content">
					<text class="cuIcon-title text-orange"></text>
					<text>发件箱</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
			<view v-if="permissionList.sendMail" class="cu-item arrow" @tap="toEmail">
				<view class="content">
					<text class="cuIcon-title text-green"></text>
					<text>发邮件</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				appId: ""
			}
		},
		computed: {
			...mapGetters(['permission']),
			permissionList() {
				return {
					inbox: this.permission.homeSchoolLink_inbox,
					outbox: this.permission.homeSchoolLink_outbox,
					sendMail: this.permission.homeSchoolLink_sendMail,
				}
			},
		},
		onLoad(options) {
			this.appId = options.appId
		},
		methods: {
			toInBox() {
				uni.navigateTo({
					url: "/pages/apps/homeSchoolLink/inbox"
				})
			},
			toOutBox() {
				uni.navigateTo({
					url: "/pages/apps/homeSchoolLink/outbox"
				})
			},
			toEmail() {
				uni.navigateTo({
					url: "/pages/apps/homeSchoolLink/email?appId=" + this.appId
				})
			}
		}
	}
</script>

<style>
</style>
