<template>
	<view class="container  bg-white">
		<view class="padding-top">
			<view class="userBox radius margin">
				<view class="cu-list menu-avatar">
					<view @tap="toUserInfo" class="cu-item arrow">
						<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);">
							<view class="cu-tag badge cuIcon-male bg-blue"></view>
						</view>
						<view class="content">
							<view class="text-black text-bold">{{userInfo.nick_name}}</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									184****4732
								</view>
							</view>
						</view>
						<view class="action">
							<text class="cuIcon-right"></text>
						</view>
					</view>
				</view>
				<view class="padding">
					<text>四川省都江堰中学</text>
					<text class="bg-pink margin-left padding-xs text-sm">高一年级组</text>
				</view>
				<view class="padding text-gray solid-top">
					工作状态-未设置
				</view>
			</view>
		</view>

		<view class="bg-gray">
			<view class="cu-list menu">
				<view @tap="login" class="cu-item arrow">
					<view class="content">
						<image src="/static/img/user/tag1.svg" class="png" mode="aspectFit"></image>
						<text class="text-black">教师认证</text>
					</view>
				</view>

				<view class="cu-item arrow" @tap="toNotice">
					<view class="content">
						<image src="/static/img/user/tag2.svg" class="png" mode="aspectFit"></image>
						<text class="text-black">收件箱</text>
					</view>
					<view class="action">
						<text class="text-gray text-sm"><text class="text-red padding-right-xs">3</text>条未读消息</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<image src="/static/img/user/tag3.svg" class="png" mode="aspectFit"></image>
						<text class="text-black">我的关注</text>
					</view>
					<view class="action">
						<text class="text-gray text-sm">课程、书籍、新闻</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu margin-top">
				<view @tap="toSet" class="cu-item arrow">
					<view class="content">
						<image src="/static/img/user/tag4.svg" class="png" mode="aspectFit"></image>
						<text class="text-black">设置</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {}
		},
		onLoad() {},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			login() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			toNotice() {
				uni.navigateTo({
					url: '/pages/user/notice'
				})
			},
			toSet() {
				uni.navigateTo({
					url: '/pages/user/set'
				})
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/user/userInfo'
				})
			}
		}
	}
</script>
<style lang='scss'>
	.userBox {
		box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

		.cu-list .cu-item {
			&:after {
				border-bottom: none
			}
		}
	}
</style>
