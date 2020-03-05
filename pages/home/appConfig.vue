<template>
	<view class="config">
		<cu-custom @edit="saveApp" bgColor="bg-gradual-red" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">管理我的应用</block>
			<block slot="right">保存</block>
		</cu-custom>
		<view class="padding bg-white">
			<view class="text-center">
				<view class="text-lg">常用应用</view>
				<view class="text-xs text-gray padding-top-xs">以下常用功能展示在首页（最多显示7个）</view>
			</view>
		</view>

		<drag-sorts  :list="dragList" :props="props" @remove="removeApp" @change="onDragSortChange"></drag-sorts>
		<view class="padding bg-white margin-top">
			<view class="text-center">
				<view class="text-lg">我的云应用</view>
				<view class="text-xs text-gray padding-top-xs">共{{allApps.length}}个应用特权</view>
			</view>
		</view>

		<view class="cu-list grid col-4 solid-top">
			<view class="cu-item" v-for="(item,index) in allApps" :key="index">
				<view :class="['iconfont tfeduicon-pc','appicon']"></view>
				<text>{{item.appName}}</text>
				<view @click="addApp(index)" class="text-blue cuIcon-roundaddfill closeIcon"></view>
			</view>
		</view>
		<tui-tips position="center" ref="toast"></tui-tips>
	</view>
</template>

<script>
	import dragSorts from '@/components/drag-sorts/index'
	import tuiTips from '@/components/thor-ui/tips/tips'
	import {
		allApps,
		saveApp
	} from '@/api/user/apps.js'
	export default {
		components: {
			dragSorts,
			tuiTips
		},
		computed:{
			dragList(){
				if(this.apps){
					return this.apps.selectedList
				}else{
					return []
				}
			},
			allApps(){
				if(this.apps){
					return this.apps.selectableList
				}else{
					return []
				}
			}
		},
		data() {
			return {
				apps: null,
				props: {
					label: 'appName'
				},
				appSaveData: null
			}
		},
		created() {
			this.fetchApps()
		},
		methods: {
			//获取全部应用列表
			async fetchApps() {
				let res = await allApps({productCode:this.$mConfig.productCode})
				let data = res.data.data;
				if (data.selectedList.length > 0) {
					data.selectedList = data.selectedList.splice(0, 7)
				}
				this.appSaveData = data.selectedList;
				this.apps = data;
			},
			//调整应用顺序
			async onDragSortChange(e) {
				this.appSaveData = e
			},
			//移除应用
			async removeApp(index) {
				let app = this.apps.selectedList[index]
				this.apps.selectedList.splice(index, 1)
				this.apps.selectableList.unshift(app)
			},
			//增加应用
			async addApp(index) {
				if (this.apps.selectedList.length >= 7) {
					this.showTips()
					return;
				}
				let app = this.apps.selectableList[index];
				this.apps.selectableList.splice(index, 1)
				this.apps.selectedList.push(app)
			},
			//保存应用配置
			async saveApp() {
				let params = []
				this.appSaveData.forEach((item, index) => {
					params.push({
						sort: index + 1,
						appId: item.id
					})
				})
				
				saveApp({
					batchList: params,
					productCode:this.$mConfig.productCode
				}).then(res => {
					uni.showToast({
						title: "保存成功",
						icon: "success",
						duration: 1000,
						complete:function(){
							uni.navigateBack({
								delta: 1
							});
						}
					});
					this.$fire.fire('appConfig_change');
					
				}).catch((err) => {
					
				})
			},
			//提示
			showTips: function(e) {
				let options = {
					msg: "最多添加7个应用",
					duration: 2000,
					type: "warning"
				};
				this.$refs.toast.showTips(options);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.config {
		.cu-item {
			position: relative;

			.closeIcon {
				font-size: 32upx !important;
				position: absolute;
				top: -15upx;
				right: 10upx;
				width: auto;
			}
		}
	}
</style>
