<template>
	<view class="leaveForm">
		<form>
			<view class="cu-list menu margin-top">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">申请类型</text>
					</view>
					<view class="action">
						<text class="text-gray">家长进校</text>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="studentsShow?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<radio-group class="block" @change="studentChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in students" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{item.studentName}}</view>
									<radio class="round" :class="studentIndex==index?'checked':''" :checked="studentIndex==index?true:false"
									 :value="item.value"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
			<view class="cu-list menu margin-top">
				<view class="cu-item" @click="chooseStudent">
					<view class="content">
						<text class="text-grey">选择学生</text>
					</view>
					<view class="action">
						<text class="padding-right-xs">{{studentName}}</text>
						<text class="cuIcon-right text-grey"></text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">所在班级</text>
					</view>
					<view class="action">
						<text class="padding-right-xs text-gray">{{students[studentIndex].className}}</text>
					</view>
				</view>
				<view class="cu-item" @click="showTime('startTime')">
					<view class="content">
						<text class="text-grey">开始时间</text>
					</view>
					<view class="action">
						<text class="padding-right-xs text-gray">{{formData.startTime==''?'请选择':formData.startTime}}</text>
						<text v-if="formData.startTime!=''" @click.stop.prevent="removeChoose('startTime')" class="cuIcon-roundclosefill text-gray"></text>
						<text v-else class="cuIcon-right text-grey"></text>
					</view>
				</view>
				<view class="cu-item" @click="showTime('endTime')">
					<view class="content">
						<text class="text-grey">结束时间</text>
					</view>
					<view class="action">
						<text class="padding-right-xs text-gray">{{formData.endTime==''?'请选择':formData.endTime}}</text>
						<text v-if="formData.endTime!=''" @click.stop.prevent="removeChoose('endTime')" class="cuIcon-roundclosefill text-gray"></text>
						<text v-else class="cuIcon-right text-grey"></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top bg-white">
				<textarea maxlength="100" @input="resonInput" placeholder="请输入进校理由"></textarea>
			</view>
			<view class="cu-list menu margin-top">
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">提交班主任</text>
					</view>
					<view class="action">
						<text class="text-gray">{{students[studentIndex].classLeaderName}}</text>
					</view>
				</view>
			</view>
		</form>
		<view class="cu-bar foot bg-white">
			<button @click="bindLeave" class="cu-btn bg-blue margin-sm lg " style="width: 100%;">
				<text class="cuIconfont-spin" :class="loading?'cuIcon-loading2':''"></text> 提交中
			</button>
		</view>
		<tui-datetime ref="timePicker" :type="1" :startYear="startYear" :endYear="endYear" :setDateTime="formData.startTime"
		 @confirm="changeTime"></tui-datetime>
	</view>
</template>

<script>
	import tuiDatetime from "@/components/thor-ui/dateTime/dateTime"
	import {
		getStudentInfo,parentEnterProcess
	} from "@/api/apps/parentEnter"
	import {
		startList,
		fetchTemplate
	} from "@/api/user/apps"
	export default {
		components: {
			tuiDatetime
		},
		data() {
			return {
				timeType: "",
				studentsShow: false,
				startYear: 1980,
				endYear: 2030,
				formData: {
					startTime: "",
					endTime: "",
					reason: "",
				},
				students: [],
				studentIndex: 0,
				studentInfo: {},
				processDefinitionId: "",
				loading: false,
				appId: "",
				templateNameId: ""
			}
		},
		computed: {
			studentName() {
				console.log(this.students[this.studentIndex].studentName)
				return this.students[this.studentIndex].studentName
			}
		},
		onLoad(options) {
			this.getStInfo()
			this.getStartList()
			this.appId = options.appId
			this.getTemplate()
		},
		methods: {
			bindLeave() {
				if (this.formData.startTime == "") {
					uni.showToast({
						title: "请选择开始时间",
						icon: 'none'
					})
					return
				}
				if (this.formData.endTime == "") {
					uni.showToast({
						title: "请选择结束时间",
						icon: 'none'
					})
					return
				}
				if (this.formData.reason == "") {
					uni.showToast({
						title: "请输入进校理由",
						icon: 'none'
					})
					return
				}
				this.loading = true;
				this.formData.startTime = this.formData.startTime + ":00"
				this.formData.endTime = this.formData.endTime + ":00"
				// this.fromData.taskUser = this.students[this.studentIndex].classLeaderId
				let params = Object.assign(this.formData, this.students[this.studentIndex])
				params.processDefinitionId = this.processDefinitionId
				parentEnterProcess(params, {
					templateNameId: this.templateNameId
				}).then(res => {
					this.loading = false
					uni.showToast({
						title: "提交成功",
						complete: function() {
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 1000)
						}
					})
				})
			},
			//获取事务信息
			getStartList() {
				startList({
					category: 3
				}).then(res => {
					let data = res.data.data.records;
					this.processDefinitionId = data[0].id
				})
			},
			//获取模板信息
			getTemplate() {
				fetchTemplate({
					appId: this.appId
				}).then(res => {
					let data = res.data.data
					this.templateNameId = data[0].templateNameId
				})
			},
			//获取学生信息
			getStInfo() {
				getStudentInfo().then(res => {
					let data = res.data.data;
					data.forEach(item=>{
						item.taskUser = item.classLeaderId
					})
					this.students = data
				})
			},
			//隐藏类型model
			hideModal() {
				this.studentsShow = false
			},
			//选择进校类型
			chooseStudent() {
				this.studentsShow = true;
			},
			//进校类型改变
			studentChange(e) {
				this.studentsShow = false;
				this.studentIndex = e.detail.value
			},
			//选择时间
			showTime(timeType) {
				this.timeType = timeType
				this.$refs.timePicker.show()
			},
			//改变时间
			changeTime(e) {
				let time = e.result;
				this.formData[this.timeType] = time
				//判断开始时间和结束时间大小
				if (this.timeType == 'startTime' && this.formData.endTime != '' && this.formData.startTime >= this.formData.endTime) {
					this.formData.endTime = ""
				}
				if (this.timeType == 'endTime' && this.formData.startTime != '' && this.formData.startTime >= this.formData.endTime) {
					this.formData.startTime = ""
				}
			},
			//进校理由输入
			resonInput(e) {
				this.formData.reason = e.detail.value;
			},

		}
	}
</script>

<style>
</style>
