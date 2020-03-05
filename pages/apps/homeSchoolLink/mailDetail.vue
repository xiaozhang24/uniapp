<template>
	<view class="text-left text-gray">
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content flex padding-top solid-bottom padding-bottom">
					<view class="basis-xl text-left">
						<view class="text-lg text-black">{{msgInfo.messageTitle}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="padding bg-white">
			<view class="flex">
				<view class="flex-sub margin-xs text-gray">消息类型</view>
				<view class="flex-treble margin-xs ">{{msgInfo.messageType }}</view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-xs text-gray">开始时间</view>
				<view class="flex-treble margin-xs ">{{msgInfo.createTime}}</view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-xs text-gray">已读</view>
				<view class="flex-treble margin-xs ">{{msgInfo.served}}</view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-xs text-gray">内容</view>
				<view class="flex-treble margin-xs ">{{msgInfo.messageContent}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		msgDetail
	} from '@/api/apps/homeSchoolLink.js'
	export default {
		data() {
			return {
				messageId: "",
				msgInfo: {}
			}
		},
		onLoad(options) {
			this.msgInfo = JSON.parse(options.item)
		},
		methods: {
			getDetail() {
				msgDetail({
					messageId: this.messageId
				}).then(res => {
					let data = res.data.data.records[0]
					this.msgInfo = data
				})
			}
		}
	}
</script>

<style>
</style>
