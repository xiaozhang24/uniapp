<template>
	<view class="cu-bar tabbar bg-white shadow foot">
		<view :class="pageCur=='home'?'text-green action':'text-gray action'" @click="navChange" data-cur="home">
			<view class="cuIcon-homefill"></view> 首页
		</view>
		<view :class="pageCur=='course'?'text-green action':'text-gray action'" @click="navChange" data-cur="course">
			<view class="cuIcon-similar"></view> 网课
		</view>
		<view :class="pageCur=='news'?'text-green action':'text-gray action'" @click="navChange" data-cur="news">
			<view class="cuIcon-cart">
				<!-- <view class="cu-tag badge">99</view> -->
			</view>
			新闻
		</view>
		<view :class="pageCur=='user'?'text-green action':'text-gray action'" @click="navChange" data-cur="user">
			<view class="cuIcon-my">
				<!-- <view class="cu-tag badge"></view> -->
			</view>
			我的
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageCur: 'home'
			}
		},
		methods:{
			navChange: function(e) {
				this.pageCur = e.currentTarget.dataset.cur
				this.$emit("navChange",this.pageCur)
			}
		}
	}
</script>

<style>
</style>
