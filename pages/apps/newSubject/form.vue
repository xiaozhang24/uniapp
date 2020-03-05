<template>
	<view>
		<view v-if="testStep==1" class="padding">
			<view class="text-blue text-center text-lg">智能评测小贴士</view>
			<view class="solid padding margin-top-lg bg-white">
				<view class="">
					<view class="text-blue">Q1:这个评测怎么进行的</view>
					<view class="text-grey padding-top-xs">能通过.......................</view>
				</view>
				<view class="margin-top-lg">
					<view class="text-blue">Q2:这个评测怎么进行的</view>
					<view class="text-grey padding-top-xs">能通过.......................</view>
				</view>
				<view class="margin-top-lg">
					<view class="text-blue">Q1:这个评测怎么进行的</view>
					<view class="text-grey padding-top-xs">能通过.......................</view>
				</view>
			</view>
			<view class="text-center margin-top-lg">
				<button @tap="start" class="cu-btn bg-blue">立即测试</button>
			</view>
		</view>
		<view v-if="testStep===2" class="padding">
			<button class="cu-btn round line-blue">{{char[testIndex]}}模块-{{testType[testIndex].dictValue}}</button>
			<view class="padding-top">
				<view class="cu-progress round striped active">
					<view class="bg-blue" :style="[{ width:quesPercent+'%'}]">{{quesPercent}}%</view>
				</view>
			</view>
			<view class="margin-top-lg">
				<view style="min-height: 300rpx;">
					<text class="text-lg text-blue text-bold">{{quesIndex+1}}</text>
					<text class="text-gray">/{{quesList.length}}</text>
					<text class="text-xxl padding-left">{{currQues.issue}}</text>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn line-grey lg margin-bottom" @tap="next(item.score)" v-for="item in currQues.optionList">{{item.option}}</button>
				</view>
			</view>
		</view>
		<view v-if="testStep===3" class="text-center margin-top-lg">
			<view>您已完成{{char[testIndex]}}模块-{{testType[testIndex].dictValue}}</view>
			<view class="tList margin-top-lg bg-white">
				<view class="item" v-for="(item,index) in testType" :key="item.dictKey">
					<text v-if="item.finished" class="cuIcon-check text-green"></text>
					<text class="margin-left margin-right">{{item.dictValue}}</text>
					<button @click="againTest(index)"  v-if="item.finished" class="cu-btn">重新测试</button>
				</view>
			</view>
			<view class="text-center margin-top">
				<button @click="finishTest" v-if="testIndex==testType.length-1" class="cu-btn bg-blue">完成测试</button>
				<button @click="goNext" v-else class="cu-btn bg-blue">进入{{char[testIndex+1]}}模块测试</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		testType,
		evaluationList,
		getResultList,
		evaluationSubmit
	} from '@/api/apps/newSubject'
	export default {
		data() {
			return {
				char: ['A', 'B', 'C', 'D'],
				testStep: 1,
				showFinish: false, //显示完成页面
				testType: [], //全部测试类型
				testIndex: 0, //当前测试的类型索引
				quesList: [], //问题列表
				quesIndex: 0, //题号索引
				scoreArr: [],
				loading: true
			}
		},
		computed: {
			currQues: function() {
				return this.quesList[this.quesIndex]
			},
			quesPercent: function() {
				return Number(((this.quesIndex / this.quesList.length) * 100).toFixed(1))
			}
		},
		methods: {
			goNext() {
				this.testStep = 2
				this.testIndex += 1
				this.quesIndex = 0
				this.scoreArr = []
				this.fecthType()
			},
			start() {
				this.testStep = 2
				this.fecthType()
			},
			getResultList() {
				getResultList().then(res => {
					let data = res.data.data.records
					data.forEach(item => {
						this.testType.forEach(test => {
							if (item.testType == test.dictKey) {
								test.id = item.id
								test.finished = true
							}
						})
					})
				})
			},
			fecthType() {
				testType().then(res => {
					let data = res.data.data
					data.forEach(item => {
						item.finished = false
					})
					this.testType = data
					this.getResultList()
					this.fetchList()
				})
			},
			fetchList() {
				this.quesList = []
				evaluationList(this.testType[this.testIndex].dictKey).then(res => {
					let data = res.data.data
					this.quesList = data
				})
			},
			//下一题
			next(score) {
				if (this.quesIndex <= this.quesList.length) {
					this.scoreArr.push(score)
					this.quesIndex++
				}
				if (this.quesIndex + 1 == this.quesList.length) {
					let remark = this.testType[this.testIndex].remark.split(',')
					let scoreJson = remark.reduce(function(prev, next) {
						prev[next] = 0
						return prev
					}, {})
					let score = this.scoreArr.reduce(function(prev, next) {
						if (next != '') {
							scoreJson[next] = scoreJson[next] + 1 || 1
						}
						return scoreJson
					}, {})
					let params = {
						testType: this.testType[this.testIndex].dictKey,
						id: this.testType[this.testIndex].id,
						testScore: JSON.stringify(score)
					}

					evaluationSubmit(params).then(res => {
						this.testStep = 3
					})
				}
			},
			//完成测试
			finishTest() {
				uni.navigateTo({
					url:"/pages/apps/newsSubject/index"
				})
			},
			//重新测试
			againTest(type){
				this.testIndex = type
				this.testStep = 2
				this.quesIndex = 0
				this.scoreArr = []
				this.fetchList()
			}
		},
	}
</script>

<style lang="scss">
	.tList {
		padding: 15px;
		border-radius: 5px;
		display: inline-block;
		color: rgb(167, 167, 167);
		.item {
			margin-bottom: 10px;
			i {
				color: rgb(5, 146, 16);
			}
		}
	}
</style>
