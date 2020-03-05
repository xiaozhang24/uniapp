<template>
	<view class="padding">
		<view class="text-gray">
			当前已选择：{{combinationName}}
		</view>
		<view class="margin-top-lg text-center">
			<view class="text-left margin-bottom">请选择科目组合:</view>
			<view @tap="chooseSubject(index)" :class="chooseIndex==index?'active text-green':'solid'" v-for="(item,index) in subjectTypes"
			 class="padding  margin-right margin-bottom text-sm" style="display: inline-block;">{{item.name}}</view>
		</view>
		<view class="margin-top text-center">
			<view class="text-grey">当前选择：{{combinationName}} <text class="padding-left">已提交人数:{{subjectNum}}</text></text></view>
			<button class="cu-btn bg-blue margin-top" @tap="submitSubChoose">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		getUserSelection,
		getStudentInfo,
		getDetail,
		saveStudentSelectionList,
		getList
	} from '@/api/apps/newSubject'
	export default {
		data() {
			return {
				schemeId: "",
				userCombinationInfo: {}, //用户的选科信息
				subjectTypes: [], //当前选科任务的选科类型
				chooseIndex: 0, //当前选科的索引
				studentInfo: {},
				subjectNum: 0, //某个组合已选人数
			}
		},
		onLoad(options) {
			this.schemeId = options.schemeId
			this.getUserSelectionInfo()
			this.getStudent()
			this.fetchType()
		},
		computed: {
			chooseName() {
				if (this.subjectTypes.length) {
					return this.subjectTypes[this.chooseIndex].name
				}
			},
			combinationName() {
				if (this.userCombinationInfo) {
					return this.userCombinationInfo.combinationName
				}
			}
		},
		methods: {
			//获取当前学生的选科
			getUserSelectionInfo() {
				getUserSelection({
					schemeId: this.schemeId
				}).then(res => {
					let data = res.data.data
					this.userCombinationInfo = data
					this.subjectTypes.forEach((item, index) => {
						if (item.id == this.userCombinationInfo.combinationId) {
							this.chooseIndex = index
						}
					})
					this.getTaskDetail()
				})
			},
			//获取学生信息
			getStudent() {
				getStudentInfo().then(res => {
					let data = res.data.data
					this.studentInfo = data
				})
			},
			//获取选科组合
			fetchType() {
				getList({
					size: 500,
					enable: true,
					schemeId: this.schemeId
				}).then(
					res => {
						let data = res.data.data.records
						this.subjectTypes = data
					}
				)
			},
			//获取选科组合人数
			getTaskDetail() {
				getDetail({
					id: this.subjectTypes[this.chooseIndex].id
				}).then(res => {
					let num = res.data.data
					this.subjectNum = num
				})
			},
			//选择科目组合
			chooseSubject(index) {
				this.chooseIndex = index
				this.getTaskDetail()
			},
			//提交选择组合
			submitSubChoose() {
				let params = {
					classId: this.studentInfo.classId,
					studentId: this.studentInfo.studentId,
					studentName: this.studentInfo.studentName,
					combinationId: this.subjectTypes[this.chooseIndex].id,
					shcemeId: this.schemeId
				}
				saveStudentSelectionList(params).then(res => {
					this.getTaskDetail()
					uni.showToast({
						title:"操作成功",
						icon:"success"
					})
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
					},1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		border: 1px solid #17B948
	}
</style>
