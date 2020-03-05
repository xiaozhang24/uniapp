<template>
	<view>
		<view class="cu-list menu">
			<view v-for="item in paperList" class="cu-item arrow" @click="startRead(item)">
				<view class="content  padding-top padding-bottom">
					<text>{{item.groupName}}<text class="padding-left-lg text-xs text-gray">{{item.exam.title}}</text></text>
					<view class="text-gray text-xs">
						<text>试题总量：<text class="text-orange">{{item.questionList.length}}</text></text>
						<text class="padding-left">待阅数量：<text class="text-green">{{item.questionList.length}}</text></text>
						<text class="padding-left">已阅数量：<text class="text-red">{{item.overCount}}</text></text>
					</view>
				</view>
			</view>
		</view>
		<tf-loading text="加载中.." mask="true" click="true" ref="loading"></tf-loading>
		<view class="padding-top-lg" v-if="noData">
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">任务列表为空</tui-tips>
		</view>
	</view>
</template>

<script>
	import {
		getList
	} from '@/api/apps/teacherRead'
	import tuiTips from "@/components/thor-ui/extend/tips/tips"
	export default {
		components: {
			tuiTips
		},
		data() {
			return {
				paperList: [],
				noData: false,
			}
		},
		onReady() {
			this.$refs.loading.open()
		},
		onLoad() {
			this.fetchPaper()
		},
		methods: {
			fetchPaper() {
				getList().then(res => {
					let data = res.data.data
					if (data.length > 0) {
						this.paperList = data;
					} else {
						this.noData = true;
					}
					this.$refs.loading.close()
				}).catch(err => {
					this.$refs.loading.close()
				})
			},
			//开始阅卷
			startRead(item) {
				/*  #ifdef  APP-PLUS || H5  */
				uni.navigateTo({
					url: "./read?groupId=" + item.id
				})
				/*  #endif  */
				
				/*  #ifdef  MP || H5  */
				uni.navigateTo({
					url: "./read-mp?groupId=" + item.id
				})
				/*  #endif  */
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
