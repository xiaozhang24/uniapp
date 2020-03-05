<template>
	<view class="tui-userinfo-box">
		<view class="cu-list menu">
			<view @tap="toRecord" class="cu-item arrow margin-top">
				<view class="content">
					<text class="text-black">个人档案</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">资料完成度<text class="text-pink padding-left-xs">85%</text></text>
				</view>
			</view>
			<view class="cu-item arrow margin-top">
				<view class="content">
					<text  class="text-black">头像</text>
				</view>
				<view @tap="chooseAvatar" class="cu-avatar radius lg margin-top margin-bottom">
					<image style="height: 100%;"  :src="userInfo.avatar"></image>
				</view>
			</view>

			<view class="cu-item arrow">
				<view class="content">
					<text class="text-black">姓名</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">吴志豪</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="text-black">电话</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">184****7719</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="text-black">性别</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">男</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="text-black">生日</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">1991-12-29</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="text-black">地区</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">四川省 成都市</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiListCell from "@/components/thor-ui/list-cell/list-cell"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			tuiListCell
		},
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad() {

		},
		methods: {
			chooseAvatar() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res)
						this.userInfo.avatar = res.tempFilePaths[0]
					}
				});
			},
			//个人档案
			toRecord(){
				uni.navigateTo({
					url:"/pages/user/userRecord"
				})
			}
		}
	}
</script>

<style>
	.tui-userinfo-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-pr30 {
		padding-right: 30rpx;
	}

	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}

	.tui-content {
		font-size: 26rpx;
		color: #666;
	}
</style>
