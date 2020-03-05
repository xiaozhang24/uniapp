<template>
	<view class="detail">
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content flex padding-top solid-bottom padding-bottom">
					<view class="basis-xs" style="flex-basis: 12%;">
						<image class="cu-avatar round" :src="userInfo.avatar"></image>
					</view>
					<view class="basis-xl text-left">
						<view>{{detailInfo.applyUser}}</view>
						<text v-if="detailInfo.status==1" class="text-sm text-gray">审批中</text>
						<text v-if="detailInfo.status==2" class="text-sm text-gray">审批通过</text>
						<text v-if="detailInfo.status==3" class="text-sm text-gray">未通过</text>
					</view>
				</view>
			</view>
		</view>
		<view class="padding bg-white">
			<view class="flex">
				<view class="flex-sub margin-xs text-gray">请假类型</view>
				<view class="flex-treble margin-xs ">病假</view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-xs text-gray">开始时间</view>
				<view class="flex-treble margin-xs ">{{detailInfo.startTime}}</view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-xs text-gray">结束时间</view>
				<view class="flex-treble margin-xs ">{{detailInfo.endTime}}</view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-xs text-gray">请假事由</view>
				<view class="flex-treble margin-xs ">{{detailInfo.reason}}</view>
			</view>
		</view>
		<view class="margin-top bg-white padding-bottom">
			<view class="cu-timeline">
				<view v-for="item in flowData">
					<view class="cu-time">{{item.createTime}}</view>
					<view class="cu-item">
						<view class="content">
							<text>{{item.assigneeName}}在 {{item.createTime}} 执行【{{item.historyActivityName}}】环节</text>
							<text v-if="item.endTime!=''">， 结束时间:{{item.endTime}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot text-center">
			<view @click="deleteRecord" style="margin: 0 auto;" class="text-red">
				<view class="cuIcon-deletefill"></view> 删除	
			</view>
		</view>
	</view>
</template>

<script>
	import {
		detail,
		remove,
		flowList
	} from "@/api/apps/stuAskLeave"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				leaveId: "",
				detailInfo: {},
				flowData: []
			}
		},
		onLoad(option) {
			this.leaveId = option.id
			this.getDetail()
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			getDetail() {
				detail({
					id: this.leaveId
				}).then(res => {
					let data = res.data.data;
					this.detailInfo = data
					this.getflowList(data.processInstanceId)
				})
			},
			//获取流程详情
			getflowList(flowId) {
				flowList({
					processInstanceId: flowId
				}).then(res => {
					let data = res.data.data;
					data.forEach(item=>{
						item.createTime= item.createTime.slice(5,16)
						item.endTime= item.endTime.slice(5,16)
					})
					this.flowData = data;
				})
			},
			//删除记录
			deleteRecord(){
				uni.showModal({
					content: '确定要删除该条申请吗',
					success: (e) => {
						if (e.confirm) {
							remove({ids:this.detailInfo.id}).then(res=>{
								uni.showToast({
									title:"删除成功"
								})
							})
							setTimeout(() => {
								uni.navigateBack();
							}, 1000)
						}
					}
				});
				
			}
		}
	}
</script>

<style>
</style>
