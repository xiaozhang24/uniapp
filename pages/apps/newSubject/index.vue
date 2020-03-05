<template>
	<view>
		<view class="padding" v-if="userTaskShow">
			<view class="margin-bottom text-gray">请选择你需要关联的选科任务:</view>
			<view @tap="chooseTask(item)" v-for="item in userTask" class="bg-white radius padding solid margin-bottom tui-flex justify-between align-center">
				<view class="tui-col-12">
					<view class="text-bold">{{item.title}}</view>
					<view class="text-gray  padding-top-sm">{{item.endDate}}</view>
				</view>
				<view class="tui-col-1">
					<view class="cuIcon-right"></view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="padding">
				<view v-for="item in types" class="bg-white radius padding solid margin-bottom tui-flex justify-between align-center">
					<view class="tui-col-3">
						<image style="width: 100rpx;" mode="widthFix" src="../../../static/vip2.png"></image>
					</view>
					<view class="tui-col-8">
						<view class="text-bold">{{item.label}}</view>
						<view class="text-gray  padding-top-sm">{{item.desc}}</view>
					</view>
					<view class="tui-col-5">
						<button @tap="toTest" class="cu-btn bg-green">立即测试</button>
					</view>
				</view>
			</view>
			<view class="cu-bar tabbar bg-white shadow foot">
				<view style="width: 100%;" class="tui-flex text-center align-center justify-between">
					<view class="tui-col-12">
						<button class="cu-btn round bg-green">查看综合测评报告</button>
					</view>
					<view class="tui-col-12">
						<button @tap="chooseSubject" class="cu-btn round line-gray">跳过测评，开始选课</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserScheme
	} from '@/api/apps/newSubject'
	export default {
		data() {
			return {
				types: [{
					label: "智能测试",
					desc: "智能测评推荐更精准",
					value: 1
				}, {
					label: "学科调查问卷",
					desc: "智能测评推荐更精准",
					value: 2
				}, {
					label: "添加备选院校及专业",
					desc: "智能测评推荐更精准",
					value: 3
				}],
				userTask: [], //当前学生关联的学科任务
				userTaskShow: true,
				currTask: {} //当前用户选择的学科任务
			}
		},
		onLoad() {
			this.getScheme()
		},
		methods: {
			//获取当前登录学生的任务
			getScheme() {
				
				getUserScheme().then(res => {
					let userTask = res.data.data
					if (userTask.length > 0) {
						this.userTaskShow = true
					} else {
						this.userTaskShow = false
					}
					this.userTask = userTask
				})
			},
			//选择选科任务
			chooseTask(item) {
				this.currTask = item
				this.userTaskShow = false
			},
			//前往智能测试页面
			toTest() {
				uni.navigateTo({
					url: "/pages/apps/newSubject/form"
				})
			},
			//前往选科页面
			chooseSubject() {
				uni.navigateTo({
					url: "/pages/apps/newSubject/chooseSubject?schemeId="+this.currTask.id
				})
			}
		}
	}
</script>

<style>
</style>
