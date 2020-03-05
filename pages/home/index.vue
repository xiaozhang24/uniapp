<template>
	<view class="home">
		<!-- 状态栏 -->
		<view class="status" :style="{ position: headerPosition }"></view>
		<!-- 漂浮头部 -->
		<view class="header" :style="{ position: headerPosition }">
			<view class="scan">
				<view class="icon cuIcon-scan" @tap="scan"></view>
			</view>
			<view class="input">
				<view class="icon cuIcon-search"></view>
				<input disabled="disabled" placeholder="请输入搜索内容 " @tap="toSearch()" />
			</view>
			<view class="menu">
				<view class="icon cuIcon-calendar" @tap="toCalendar()"></view>
			</view>
		</view>
		<!-- 标题栏和状态栏占位符 -->
		<view class="titleNview-placing"></view>
		<!--轮播-->
		<swiper class="card-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff">
			<swiper-item v-for="(item, index) in swiperList" :key="index" :class="cardCur == index ? 'cur' : ''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
				</view>
			</swiper-item>
		</swiper>
		<!--应用列表-->
		<view class="cu-list grid col-4">
			<view @tap="goApp(item)" class="cu-item" v-for="(item, index) in appList" :key="index">
				<view :class="['iconfont tfeduicon-pc', 'appicon']"></view>
				<text>{{ item.name }}</text>
			</view>
			<view class="cu-item" @tap="toConfig">
				<view class="appicon iconfont iconicon_add"></view>
				<text>更多</text>
			</view>
		</view>
		<!--列表-->
		<view class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index == TabCur ? 'text-orange cur' : ''" v-for="(item, index) in tabList"
				 :key="index" @tap="tabSelect" :data-id="index">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="tui-product-box padding" v-if="TabCur === 0">
			<view class="tui-new-box">
				<view class="tui-new-item" :class="[index != 0 && index != 1 ? 'tui-new-mtop' : '']" v-for="(item, index) in recApp"
				 :key="index" @tap="detail">
					<!-- <image :src="'/static/images/mall/new/'+(item.type==1?'new':'discount')+'.png'" class="tui-new-label" v-if="item.isLabel"></image> -->
					<view class="tui-title-box">
						<view class="tui-new-title">{{ item.name }}</view>
						<view class="tui-new-desc">
							<text class="tui-new-original">{{ item.appDescription }}</text>
						</view>
					</view>
					<view class="iconfont tfeduicon-pc text-red padding-left-lg" style="font-size: 120upx;"></view>
				</view>
			</view>
		</view>
		<view class="cu-card article" v-if="TabCur === 1">
			<view class="cu-item shadow">
				<view class="title" @tap="fetchApp">
					<view class="text-cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view>
				</view>
				<view class="content">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content">折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！真正的恩典因不完整而美丽，因情感而真诚，因脆弱而自由！</view>
						<view>
							<view class="cu-tag bg-red light sm round">正义天使</view>
							<view class="cu-tag bg-green light sm round">史诗</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="TabCur === 2">222234343</view>
	</view>
</template>

<script>
	import {
		appList,
		recApp
	} from '@/api/user/apps.js';
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				headerPosition: 'fixed',
				cardCur: 0,
				swiperList: [{
						id: 0,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					},
					{
						id: 1,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg'
					},
					{
						id: 2,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
					},
					{
						id: 3,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					},
					{
						id: 4,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					},
					{
						id: 5,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					},
					{
						id: 6,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					}
				],
				tabList: ['推荐应用', '新闻动态', '精选课程'],
				TabCur: 1,
				scrollLeft: 0,
				appList: [], //应用列表
				recApp: [], //推荐应用列表
				key: ""
			};
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = 'fixed';
			} else {
				this.headerPosition = 'absolute';
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onShow() {
			this.$fire.on('appConfig_change', result => {
				this.fetchApp();
				this.fetchRecApp();
			})
		},
		onLoad() {
			this.fetchApp();
			this.fetchRecApp();
		},
		methods: {
			cleanKey: function() {
				this.key = ''
			},
			//扫一扫
			async scan() {
				uni.scanCode({
					success: res => {
						uni.showToast({
							title: '条码内容：' + res.result
						});
					}
				});
			},
			//应用配置跳转
			async toConfig() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.appConfig
				});
			},
			//应用跳转
			async goApp(item) {
				let paramsList = this.getParamsList();
				if (item.aliasName === "courseTable") {
					if (paramsList.length === 0) {
						uni.showToast({
							title: '暂无您的课表',
							icon: 'none'
						});
					} else if (paramsList.length === 1) {
						let params = paramsList[0];
						if (params.role !== 'administrator') {
							uni.navigateTo({
								url: '/pages/apps/' + item.aliasName + '/table?params=' + encodeURIComponent(JSON.stringify(params))
							});
						} else {
							uni.navigateTo({
								url: '/pages/apps/' + item.aliasName + '/schoolTable?params=' + encodeURIComponent(JSON.stringify(params))
							});
						}
					} else {
						uni.navigateTo({
							url: '/pages/apps/' + item.aliasName + '/index?params=' + encodeURIComponent(JSON.stringify(paramsList))
						});
					}
				} else {
					uni.navigateTo({
						url: '/pages/apps/' + item.aliasName + '/index?appId=' + item.code + '&children=' + JSON.stringify(item.children)
					});
				}
			},
			//搜索跳转
			async toSearch() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.search
				});
			},
			//校历跳转
			async toCalendar() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.calendar
				});
			},
			//tab跳转
			async tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
			//获取应用
			async fetchApp() {
				appList({
					productCode: this.$mConfig.productCode
				}).then(res => {
					let data = res.data.data;
					this.appList = data.displayList;
				});
			},
			//获取推荐应用
			async fetchRecApp() {
				recApp({
					productCode: this.$mConfig.productCode
				}).then(res => {
					let data = res.data.data;
					this.recApp = data.displayList;
				});
			},
			getParamsList() {
				let params = [];
				let userRoleList = this.userInfo['role_name'].split(',');
				// 该用户是学生
				if (userRoleList.includes('student')) {
					params.push({
						type: 3,
						searchId: this.userInfo['user_id'],
						role: 'student'
					});
				}
				// 该用户是教师
				if (userRoleList.includes('teacher')) {
					params.push({
						type: 2,
						searchId: this.userInfo['user_id'],
						role: 'teacher'
					});
				}
				// 该用户是admin
				if (userRoleList.includes('administrator')) {
					params.push({
						type: 2,
						searchId: this.userInfo['user_id'],
						role: 'administrator'
					});
				}
				return params;
			}
		}
	};
</script>

<style lang="scss">
	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 100upx;
		box-sizing: content-box;
	}

	.home {
		margin-bottom: 100upx;

		.status {
			width: 100%;
			height: 0;
			/*  #ifdef  APP-PLUS  */
			height: var(--status-bar-height);
			/*  #endif  */
			background-color: $uni-bg-pink;
			position: fixed;
			top: 0;
			z-index: 999;
		}

		.header {
			width: 100%;
			height: 100upx;
			background-color: $uni-bg-pink;
			display: flex;
			position: fixed;
			top: 0upx;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */

			z-index: 996;

			.icon {
				font-size: 60upx;
				font-style: normal;
				color: #ffffff;
			}

			.scan {
				width: 100upx;
				height: 100upx;
				flex-shrink: 1;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.input {
				width: calc(100% - 200upx);
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				input {
					width: calc(100% - 60upx);
					height: 60upx;
					background-color: #ffffff;
					border-radius: 60upx;
					padding-left: 60upx;
					font-size: 30upx;
				}

				.icon {
					width: 60upx;
					height: 60upx;
					position: absolute;
					color: #a18090;
					z-index: 996;
					top: 20upx;
					left: 36upx;
					font-size: 40upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.menu {
				width: 100upx;
				height: 100upx;
				flex-shrink: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 60upx;
					height: 60upx;
					border-radius: 60upx;
				}
			}
		}
	}

	.cu-item {
		.appicon {
			font-size: 40upx;
			color: #39b54a;
		}
	}

	.tui-new-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.tui-new-item {
		width: 49%;
		height: 200rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #fff;
		position: relative;
		border-radius: 12rpx;
	}

	.tui-new-mtop {
		margin-top: 2%;
	}

	.tui-title-box {
		font-size: 24rpx;
	}

	.tui-new-title {
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-new-desc {
		padding-top: 18rpx;
	}

	.tui-new-present {
		color: #ff201f;
		font-weight: bold;
	}

	.tui-new-original {
		display: inline-block;
		color: #a0a0a0;
	}

	.tui-new-img {
		width: 160rpx;
		height: 160rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-new-label {
		width: 56rpx;
		height: 56rpx;
		border-top-left-radius: 12rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
</style>
