<template>
	<view class="bg-white">
		<view class="tui-searchbox bg-gray">
			<view class="tui-search-input margin-left margin-right">
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="search" :size='13' color='#333'></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view><tui-icon name="search" :size='16' color='#333'></tui-icon></view>
				<!-- #endif -->
				<input confirm-type="search" placeholder="请输入学生姓名"  placeholder-class="tui-input-plholder"
				 class="tui-input" v-model.trim="keyWord" />
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="keyWord"></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view @tap="cleanKey" v-show="keyWord"><tui-icon name="close-fill" :size='16' color='#bcbcbc'></tui-icon></view>
				<!-- #endif -->
			</view>
		</view>
		<view class="cu-list menu" style="margin-top: 100rpx;">
			<view @tap="toDetail(item)" class="cu-item arrow" v-for="(item,index) in teacherList" :key="index">
				<view class="content padding-top-xs padding-bottom-xs">
					<view class="text-grey">{{item.name}}</view>
					<view class="text-gray text-sm">
						<text class="padding-right">{{item.address}}</text>
						<text class="padding-right">{{item.sex==1?'男':'女'}}</text>
						<text>{{item.politicalAppearanceName}}</text>
					</view>
				</view>
				<view class="action">
				</view>
			</view>
			<view class="padding-top-lg" v-if="noData">
				<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">暂无数据</tui-tips>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" bgcolor="#f2f2f2"></tui-nomore>
		<!--加载loadding-->
		<tui-fab v-if="permission.studentRecord_add" :left="0" :right="80" :bottom="100" :bgColor="bgColor"  @click="addTeacher"></tui-fab>
	</view>
</template>

<script>
	import tuiIcon from "@/components/thor-ui/icon/icon"
	import tuiTips from "@/components/thor-ui/extend/tips/tips"
	import tuiLoadmore from "@/components/thor-ui/loadmore/loadmore"
	import tuiNomore from "@/components/thor-ui/nomore/nomore"
	import tuiFab from "@/components/thor-ui/tui-fab/tui-fab"
	import {
		getList
	} from '@/api/apps/studentRecord.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		components: {
			tuiIcon,
			tuiTips,
			tuiLoadmore,
			tuiNomore,
			tuiFab
		},
		data() {
			return {
				bgColor:"#5677fc",
				noData: false,
				teacherList: [],
				currentPage: 1,
				pageSize: 20,
				totalPage: 0,
				loadding: false,
				pullUpOn: true,
				keyWord:"",
				noData: false,
			}
		},
		onShow() {
			this.$fire.on('teacherRecord_add',result=>{
				this.fetchStudent()
			})
			this.$fire.on('teacherRecord_delete',result=>{
				this.fetchStudent()
			})
		},
		computed: {
			...mapGetters(['permission']),
		},
		onLoad(){
			this.fetchStudent()
		},
		created(){
			this.$watch('keyWord', this.$mUtils.debounce(() => {
				this.currentPage = 1
			    this.fetchStudent()
			},1200))
		},
		methods: {
			cleanKey(){
				this.keyWord = ''
			},
			fetchStudent() {
				uni.showLoading({
					title:"加载中"
				})
				getList({
					name:this.keyWord,
					current: this.currentPage,
					size: this.pageSize
				}).then(res => {
					let data = res.data.data.records
					data = this.$mUtils.formatDataArr(data)
					this.teacherList = data
					if(data.length==0){
						this.noData = true
					}
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: "/pages/apps/studentRecord/detail?id=" + item.id
				})
			},
			
			//页面相关事件处理函数--监听用户下拉动作
			onPullDownRefresh: function() {
				this.currentPage = 1;
				this.fetchStudent();
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
					let res = await getList({
						current: this.currentPage,
						size: this.pageSize
					})
					let arr = res.data.data.records
					this.teacherList = this.teacherList.concat(arr)
					this.loadding = false;
				}
			},
			//添加教师
			addTeacher(){
				uni.navigateTo({
					url:"/pages/apps/studentRecord/add"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tui-searchbox{
		width: 100%;
		height: 100upx;
		position: fixed;
		top: 100upx;
		/*  #ifdef  APP-PLUS  */
		top: 0;
		/*  #endif  */
		z-index: 996;
	}
</style>
