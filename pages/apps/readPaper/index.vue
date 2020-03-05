<template name="basics">
	<view>
		<scroll-view scroll-y class="page">
			<view class="nav-list margin-top">
				<navigator hover-class="none" :url="'/pages/apps/readPaper/' + item.aliasName+'/index'" class="nav-li" navigateTo
				 :class="'bg-'+item.color" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in tools"
				 :key="index">
					<view class="nav-title">{{item.name}}</view>
					<view class="nav-name">{{item.appDescription}}</view>
					<text class="iconfont tfeduicon-pc"></text>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	import commonData from "@/json.js"
	export default {
		name: "basics",
		data() {
			return {
				elements: [{
						title: '布局',
						name: 'layout',
						color: 'cyan',
						cuIcon: 'newsfill'
					},
					{
						title: '背景',
						name: 'background',
						color: 'blue',
						cuIcon: 'colorlens'
					},
					{
						title: '文本',
						name: 'text',
						color: 'purple',
						cuIcon: 'font'
					},
					{
						title: '图标 ',
						name: 'icon',
						color: 'mauve',
						cuIcon: 'cuIcon'
					},
					{
						title: '按钮',
						name: 'button',
						color: 'pink',
						cuIcon: 'btn'
					},
					{
						title: '标签',
						name: 'tag',
						color: 'brown',
						cuIcon: 'tagfill'
					},
					{
						title: '头像',
						name: 'avatar',
						color: 'red',
						cuIcon: 'myfill'
					},
					{
						title: '进度条',
						name: 'progress',
						color: 'orange',
						cuIcon: 'icloading'
					},
					{
						title: '边框阴影',
						name: 'shadow',
						color: 'olive',
						cuIcon: 'copy'
					},
					{
						title: '加载',
						name: 'loading',
						color: 'green',
						cuIcon: 'loading2'
					}
				],
				appId: "",
				tools: []
			};
		},
		onLoad(options) {
			this.appId = options.appId
			let children = JSON.parse(options.children)
			children.forEach((item, index) => {
				item.color = commonData.colorArr[index]
			})
			this.tools = children
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
