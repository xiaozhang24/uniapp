<template>
	<view class="course bg-white">
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
		<!-- 漂浮头部 -->
		<view class="header" :style="{position:headerPosition}">
			<view class="input">
				<view class="icon cuIcon-search"></view>
				<input disabled="disabled" placeholder="请输入搜索内容 "/>
			</view>
			<view class="menu">
				<view class="collect"><text class="cuIcon-like padding-right-xs"></text>我的收藏</view>
			</view>
		</view>
		<!-- 标题栏和状态栏占位符 -->
		<view class="titleNview-placing"></view>
		<view>
			<view class="bar text-grey padding">
				<view class="fl text-black text-bold">最新</view>
				<view class="fl margin-left">最热</view>
				<view @tap="toClassIfy" class="fr">全部<text class="cuIcon-apps padding-left-xs"></text></view>
			</view>
			<view class="container">
				<view class="product-list">
					<!--商品列表-->
					<view class="pro-item" @tap="detail" v-for="(item,index) in productList" :key="index">
						<image :src="'../../static/img/product/'+item.img+'.jpg'" class="pro-img" mode="widthFix" />
						<view class="pro-content">
							<view class="pro-tit">{{item.name}}</view>
							<view>
								<view class="pro-price">
									<text class="sale-price">￥{{item.sale}}</text>
									<text class="factory-price">￥{{item.factory}}</text>
								</view>
								<view class="pro-pay">{{item.payNum}}人付款</view>
							</view>
						</view>
					</view>
					<!--商品列表-->
				</view>
				<!--加载loadding-->
				<tui-loadmore :visible="loadding" :index="3" type="primary"></tui-loadmore>
				<tui-nomore :visible="!pullUpOn"></tui-nomore>
				<!--加载loadding-->
			</view>
		</view>
	</view>
</template>

<script>
	import tuiLoadmore from "@/components/thor-ui/loadmore/loadmore"
	import tuiNomore from "@/components/thor-ui/nomore/nomore"
	export default{
		components: {
			tuiLoadmore,
			tuiNomore
		},
		data(){
			return {
				headerPosition:"fixed",
				pageIndex: 1,
				productList: [{
						img: 1,
						name: "利物浦官方 独家出品纪念版沙发",
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: "好看好养活的绿色养眼小盆栽，超级实惠",
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: "利物浦官方 独家出品大红床上用品三件套",
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: "利物浦官方 独家出品花花碎花床上用品三件套",
						sale: 1599,
						factory: 2899,
						payNum: 236
					},
					{
						img: 5,
						name: "利物浦官方 独家出品纪念版书柜，便宜又省空间，超级划算",
						sale: 599,
						factory: 899,
						payNum: 2399
					}, {
						img: 1,
						name: "独家出品纪念版沙发",
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: "好看好养活的绿色养眼小盆栽，超级实惠",
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: "利物浦官方 独家出品大红床上用品三件套",
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: "利物浦官方 独家出品花花碎花床上用品三件套",
						sale: 1599,
						factory: 2899,
						payNum: 236
					},
					{
						img: 5,
						name: "利物浦官方 独家出品纪念版书柜，便宜又省空间，超级划算",
						sale: 599,
						factory: 899,
						payNum: 2399
					}
				],
				loadData: [{
						img: 1,
						name: "利物浦官方 独家出品纪念版沙发",
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: "好看好养活的绿色养眼小盆栽，超级实惠",
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: "利物浦官方 独家出品大红床上用品三件套",
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: "利物浦官方 独家出品花花碎花床上用品三件套",
						sale: 1599,
						factory: 2899,
						payNum: 236
					},
					{
						img: 5,
						name: "利物浦官方 独家出品纪念版书柜，便宜又省空间，超级划算",
						sale: 599,
						factory: 899,
						payNum: 2399
					}, {
						img: 1,
						name: "利物浦官方 独家出品纪念版沙发",
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: "好看好养活的绿色养眼小盆栽，超级实惠",
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: "大红床上用品三件套",
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: "利物浦官方 独家出品花花碎花床上用品三件套",
						sale: 1599,
						factory: 2899,
						payNum: 236
					},
					{
						img: 5,
						name: "利物浦官方 独家出品纪念版书柜，便宜又省空间，超级划算",
						sale: 599,
						factory: 899,
						payNum: 2399
					}
				],
				loadding: false,
				pullUpOn: true
			}
		},
		methods:{
			onPageScroll(e){
				//兼容iOS端下拉时顶部漂移
				if(e.scrollTop>=0){
					this.headerPosition = "fixed";
				}else{
					this.headerPosition = "absolute";
				}
			},
			//前往分类
			toClassIfy(){
				this.$mRouter.push({route:this.$mRoutesConfig.course_classify})
			},
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function() {
				//延时为了看效果
				setTimeout(() => {
					this.productList = this.loadData;
					this.pageIndex = 1;
					this.pullUpOn = true;
					this.loadding = false;
					uni.stopPullDownRefresh();
					this.tui.toast("刷新成功")
				}, 200)
			},
			
			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom: function() {
				if (!this.pullUpOn) return;
				this.loadding = true;
				if (this.pageIndex == 3) {
					this.loadding = false;
					this.pullUpOn = false
				} else {
					this.productList = this.productList.concat(this.loadData);
					this.pageIndex = this.pageIndex + 1;
					this.loadding = false
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: $uni-bg-pink;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
	}
	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 100upx;
		box-sizing: content-box;
	}
	.header {
		width: 100%;
		height: 100upx;
		background-color:$uni-bg-pink;
		display: flex;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		z-index: 996;
		.icon {
			font-size: 60upx;
			font-style: normal;
			color: #ffffff;
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
			width: 200upx;
			height: 100upx;
			color: #fff;
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
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.product-list {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 30upx 30upx 0 30upx;
		background: #fff;
		width: 100%;
	}
	
	.pro-item {
		background: #fff;
		box-sizing: border-box;
		width: 49%;
		position: relative;
		margin-bottom: 2%;
	}
	
	.pro-item::after {
		content: '';
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1upx solid #eaeef1;
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		left: 0;
		top: 0;
	}
	
	.pro-img {
		width: 100%;
		display: block;
	}
	
	.pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20upx;
		height: 230upx;
	}
	
	.pro-tit {
		/* font-size:  */
		color: #2e2e2e;
		font-size: 26upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	
	.pro-price {
		padding-top: 18upx;
	}
	
	.sale-price {
		font-size: 34upx;
		font-weight: 500;
		color: #ea1500;
	}
	
	.factory-price {
		font-size: 24upx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12upx;
	}
	
	.pro-pay {
		padding-top: 10upx;
		font-size: 24upx;
		color: #656565;
	}
</style>
