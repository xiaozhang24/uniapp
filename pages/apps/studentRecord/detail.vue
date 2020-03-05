<template>
	<view>
		<view class="text-left bg-white padding" style="margin-bottom:150rpx">
			<view class="text-lg text-bold solid-bottom padding-bottom">学生基本信息</view>
			<view class="padding-top">
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">姓名</view>
					<view class="flex-treble margin-xs ">{{studentInfo.name}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">学号</view>
					<view class="flex-treble margin-xs ">{{studentInfo.studentNumber}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">年级</view>
					<view class="flex-treble margin-xs ">{{studentInfo.gradeId}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">班级</view>
					<view class="flex-treble margin-xs ">{{studentInfo.studentClassId}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">身份证</view>
					<view class="flex-treble margin-xs ">{{studentInfo.identity}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">性别</view>
					<view class="flex-treble margin-xs ">{{studentInfo.sex==1?'男':'女'}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">年龄</view>
					<view class="flex-treble margin-xs ">{{studentInfo.age}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">出生日期</view>
					<view class="flex-treble margin-xs ">{{studentInfo.birthday}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">年龄</view>
					<view class="flex-treble margin-xs ">{{studentInfo.age}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">国籍</view>
					<view class="flex-treble margin-xs ">{{studentInfo.nationality}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">籍贯</view>
					<view class="flex-treble margin-xs ">{{studentInfo.nativePlace}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">学生编号</view>
					<view class="flex-treble margin-xs ">{{studentInfo.teacherNumber}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">现住址</view>
					<view class="flex-treble margin-xs ">{{studentInfo.address}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">户籍地</view>
					<view class="flex-treble margin-xs ">{{studentInfo.permanentResidenceAddress}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">学籍编号</view>
					<view class="flex-treble margin-xs ">{{studentInfo.schoolRollNumber}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">是否本地户口</view>
					<view class="flex-treble margin-xs ">{{studentInfo.registerStatus}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">学籍状态</view>
					<view class="flex-treble margin-xs ">{{studentInfo.schoolRollStatus}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">生源校</view>
					<view class="flex-treble margin-xs ">{{studentInfo.sutudentSource}}</view>
				</view>
			</view>

			<view class="margin-top-lg">
				<view class="text-lg text-bold solid-bottom padding-bottom">监护人信息</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">第一监护人</view>
					<view class="flex-treble margin-xs ">{{studentInfo.firstGuardian}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">第一监护人手机号</view>
					<view class="flex-treble margin-xs ">{{studentInfo.firstGuardianPhone}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">第一监护人身份证</view>
					<view class="flex-treble margin-xs ">{{studentInfo.firstGuardianIdentity}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">第一监护人关系</view>
					<view class="flex-treble margin-xs ">{{studentInfo.firstGuardianRelation}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">第二监护人</view>
					<view class="flex-treble margin-xs ">{{studentInfo.secondGuardian}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">第二监护人手机</view>
					<view class="flex-treble margin-xs ">{{studentInfo.secondGuardianPhone}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">第二监护人身份证</view>
					<view class="flex-treble margin-xs ">{{studentInfo.secondGuardianIdentity}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">第二监护人关系</view>
					<view class="flex-treble margin-xs ">{{studentInfo.seconndGuardianRelation}}</view>
				</view>
			</view>
			

		</view>
		<view v-if="permission.studentRecord_edit||permission.studentRecord_delete" class="cu-bar tabbar bg-gray shadow foot flex">
			<button v-if="permission.studentRecord_delete" @tap="removeTeacher" class="cu-btn bg-red flex-sub lg margin">删除</button>
			<button v-if="permission.studentRecord_edit" @tap="editTeacher" class="cu-btn bg-blue flex-sub lg margin">编辑</button>
		</view>
	</view>
</template>

<script>
	import {
		detail,
		remove
	} from '@/api/apps/studentRecord.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				id:"",
				studentInfo: []
			}
		},
		onShow() {
			this.$fire.on('studentRecord_edit',result=>{
				this.id = result
				this.getDetail()
			})
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		computed: {
			...mapGetters(['permission']),
		},
		methods: {
			//根据身份证计算出生日期和年龄
			formatData() {
				let res = this.$mUtils.CertificateNoParse(this.studentInfo.identity)
				this.studentInfo.age = res.age
				this.studentInfo.birthday = res.birthday
			},
			//获取学生信息详情
			getDetail(){
				detail({id:this.id}).then(res=>{
					let data = res.data.data
					this.studentInfo = data
				})
			},
			//删除学生
			removeTeacher() {
				uni.showModal({
					content: '确定要删除该学生吗？',
					success: (e) => {
						if (e.confirm) {
							remove(this.studentInfo.id).then(res => {
								uni.showToast({
									title: "删除成功"
								})
								this.$fire.fire('studentRecord_delete');
							})
							setTimeout(() => {
								uni.navigateBack();
							}, 1000)
						}
					}
				});
			},
			//编辑
			editTeacher() {
				uni.navigateTo({
					url: "/pages/apps/studentRecord/add?form=" + JSON.stringify(this.studentInfo)
				})
			}
		}
	}
</script>

<style>
</style>
