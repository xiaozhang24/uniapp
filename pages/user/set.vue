<template>
	<view class="container">
		<view class="cu-list menu">
			<view class="cu-item arrow" @click="navTo('/pages/user/userInfo')">
				<view class="content">
					<text>通用设置</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item arrow">
				<view class="content">
					<text>账号与安全</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item arrow" @click="navTo('/pages/user/aboutus')">
				<view class="content">
					<text>关于我们</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text>意见反馈</text>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="cu-item arrow" @tap="clearCache">
				<view class="content">
					<text>清除缓存</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{fileSizeString}}</text>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<view class="cu-item arrow">
				<view class="content">
					<text>检查更新</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">当前版本 {{version}}</text>
				</view>
			</view>
			<!-- #endif -->
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				version: "",
				fileSizeString: ""
			};
		},
		onLoad() {
			let systemInfo = uni.getSystemInfoSync()
			console.log(systemInfo)
			this.version = systemInfo.version
			/*  #ifdef  APP-PLUS */
			this.formatSize()
			/*  #endif  */
		},
		methods: {
			...mapMutations(['SET_LOGOUT']),

			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			//退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录吗',
					success: (e) => {
						if (e.confirm) {
							this.SET_LOGOUT();
							setTimeout(() => {
								uni.navigateBack();
							}, 200)
						}
					}
				});
			},
			//switch
			switchChange(e) {
				let statusTip = e.detail.value ? '打开' : '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},
			//计算缓存大小
			formatSize() {
				let that = this;
				plus.cache.calculate(function(size) {
					let sizeCache = parseInt(size);
					console.log(size)
					if (sizeCache == 0) {
						that.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						that.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
				});
			},
			//清除缓存
			clearCache(){
				uni.showModal({
					content: '确定要清除本地缓存吗',
					success: (e) => {
						if (e.confirm) {
							this.clearCacheFn()
						}
					}
				});
			},
			clearCacheFn() {
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000
									});
									that.formatSize(); // 重新计算缓存  
								}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							console.log('文件路径读取失败')
						});
					}
				} else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
					plus.cache.clear(function() {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000
						});
						that.formatSize();
					});
				}
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
