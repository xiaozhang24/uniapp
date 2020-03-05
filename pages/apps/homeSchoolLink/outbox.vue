<template>
	<view>
		<view class="cu-list menu">
			<view @tap="toDetail(item)" class="cu-item arrow" v-for="(item,index) in records">
				<view class="content padding-top padding-bottom">
					<view class="text-lg">{{item.messageTitle}}</view>
					<view class="text-sm text-gray">{{item.createTime}}</view>
				</view>
			</view>
		</view>
		<view class="padding-top-lg" v-if="noData">
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">您的收件箱为空</tui-tips>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" bgcolor="#f2f2f2"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import {
		getNotice
	} from '@/api/apps/homeSchoolLink.js'
	import tuiTips from "@/components/thor-ui/extend/tips/tips"
	import tuiLoadmore from "@/components/thor-ui/loadmore/loadmore"
	import tuiNomore from "@/components/thor-ui/nomore/nomore"
	export default {
		components: {
			tuiLoadmore,
			tuiNomore,
			tuiTips
		},
		data() {
			return {
				records: [],
				noData: false,
				currentPage: 1,
				pageSize: 10,
				totalPage: 0,
				loadding: false,
				pullUpOn: true
			}
		},
		onLoad() {
			this.fetchNotice()
		},
		methods: {
			fetchNotice() {
				getNotice({
					current: this.currentPage,
					size: this.pageSize
				}).then(res => {
					let data = res.data.data;
					if (data.records.length > 0) {
						this.records = data.records
						this.totalPage = data.pages
					} else {
						this.noData = true;
					}
				})
			},
			//页面相关事件处理函数--监听用户下拉动作
			onPullDownRefresh: function() {
				this.currentPage = 1;
				this.fetchNotice();
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
					let res = await getNotice({
						current: this.currentPage,
						size: this.pageSize
					})
					let arr = res.data.data.records
					this.records = this.records.concat(arr)
					this.loadding = false;
				}
			},
			//前往消息详情
			toDetail(item) {
				uni.navigateTo({
					url: "/pages/apps/homeSchoolLink/mailDetail?item=" + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style>
</style>
