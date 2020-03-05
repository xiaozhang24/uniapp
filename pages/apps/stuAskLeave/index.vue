<template>
	<view class="leave">
		<view style="margin-bottom: 100rpx;">
			<view v-if="tabIndex==0">
				<view class="padding text-gray">请选择请假类型</view>
				<view class="cu-list menu">
					<view class="cu-item arrow" @tap="toForm">
						<view class="content">
							<text class="cuIcon-title text-orange"></text>
							<text>年假</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">按半天请假</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="cuIcon-title text-green"></text>
							<text>事假</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">按小时请假</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="cuIcon-title text-blue"></text>
							<text>病假</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">按小时请假</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tabIndex==1">
				<view class="records bg-white">
					<block v-for="(item,index) in records" :key="index">
						<tui-list-cell @click="toLeaveDetail(item)" padding="0">
							<view class="tui-goods-item solid-bottom">
								<image :src="userInfo.avatar" class="tui-goods-img margin-top-xs"></image>
								<view class="tui-goods-center margin-left-xs">
									<view class="tui-goods-name text-lg text-bold">{{item.applyUser}}提交的请假</view>
									<view class="tui-goods-attr">请假类型：病假</view>
									<view class="tui-goods-attr">开始时间：{{item.startTime}}</view>
									<view class="tui-goods-attr">结束时间：{{item.endTime}}</view>
									<view v-if="item.status==1" class="margin-top-xs text-sm text-blue">审批中</view>
									<view v-if="item.status==2" class="margin-top-xs text-sm text-green">审批通过</view>
									<view v-if="item.status==3" class="margin-top-xs text-sm text-red">未通过</view>
								</view>
								<view class="tui-price-right">
									<view>{{item.applyTime}}</view>
								</view>
							</view>
						</tui-list-cell>
					</block>
				</view>
				<view class="padding-top-lg" v-if="noData">
					<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">您还没有请假记录</tui-tips>
				</view>
			</view>
			<tf-loading text="加载中.." mask="true" click="true" ref="loading"></tf-loading>

			<!--加载loadding-->
			<tui-loadmore :visible="loadding" :index="3" type="primary"></tui-loadmore>
			<tui-nomore :visible="!pullUpOn" bgcolor="#f2f2f2"></tui-nomore>
			<!--加载loadding-->
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view v-for="(item,index) in tabs" :class="tabIndex==index?'text-green action':'text-gray action'" @click="navChange(index)">
				<view :class="item.icon"></view> {{item.label}}
			</view>
		</view>

	</view>
</template>

<script>
	import tuiTips from "@/components/thor-ui/extend/tips/tips"
	import tuiListCell from "@/components/thor-ui/list-cell/list-cell"
	import tuiLoadmore from "@/components/thor-ui/loadmore/loadmore"
	import tuiNomore from "@/components/thor-ui/nomore/nomore"

	import {
		records
	} from "@/api/apps/stuAskLeave"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			tuiTips,
			tuiListCell,
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				tabIndex: 0,
				noData: false,
				tabs: [{
					label: "我要请假",
					icon: "cuIcon-form"
				}, {
					label: "请假记录",
					icon: "cuIcon-timefill"
				}],
				records: [],
				states: [{
						label: "审批中",
						value: 1
					},
					{
						label: "已通过",
						value: 2
					},
					{
						label: "已关闭",
						value: 3
					}
				],
				appId: "",
				currentPage: 1,
				pageSize: 10,
				totalPage: 0,
				loadding: false,
				pullUpOn: true
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad(options) {
			this.appId = options.appId
		},
		methods: {
			navChange(index) {
				this.tabIndex = index
				if (index == 1) {
					this.getRecords()
				}
			},
			toForm() {
				uni.navigateTo({
					url: '/pages/apps/stuAskLeave/form?appId=' + this.appId
				})
			},
			//获取请假记录
			getRecords() {
				this.$refs.loading.open()
				records(this.currentPage, this.pageSize).then(res => {
					let data = res.data.data;
					if (data.records.length > 0) {
						data.records.forEach(item => {
							item.applyTime = item.applyTime.split(" ")[0]
						})
						this.records = data.records
						this.totalPage = data.pages
					} else {
						this.noData = true;
					}
					this.$refs.loading.close()
				}).catch(err => {
					this.$refs.loading.close()
				})
			},
			//请假详情页
			toLeaveDetail(item) {
				uni.navigateTo({
					url: "/pages/apps/stuAskLeave/detail?id=" + item.id,
				})
			},
			//页面相关事件处理函数--监听用户下拉动作
			onPullDownRefresh: function() {
				this.currentPage = 1;
				this.getRecords();
				this.pullUpOn = true;
				this.loadding = false;
				uni.stopPullDownRefresh();
			},

			// 页面上拉触底事件的处理函数
			async onReachBottom() {
				if (!this.pullUpOn) return;
				this.loadding = true;
				if (this.currentPage == this.totalPage) {
					this.loadding = false;
					this.pullUpOn = false
				} else {
					this.currentPage = this.currentPage + 1
					let res = await records(this.currentPage, this.pageSize)
					let arr = res.data.data.records
					this.records = this.records.concat(arr)
					this.loadding = false;
				}
			}
		}
	}
</script>

<style lang="scss" scope>
	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 100rpx;
		height: 100rpx;
		display: block;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 40rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 10rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}
</style>
