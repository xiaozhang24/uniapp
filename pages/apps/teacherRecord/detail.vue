<template>
	<view>
		<view class="text-left bg-white padding" style="margin-bottom:150rpx">
			<view class="text-lg text-bold solid-bottom padding-bottom">教师基本信息</view>
			<view class="padding-top">
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">姓名</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.name}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">民族</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.nation}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">国籍</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.nationality}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">籍贯</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.nativePlace}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">电话</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.phone}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">性别</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.sex==1?'男':'女'}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">年龄</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.age}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">出生日期</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.birthday}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">身份证</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.identity}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">详细地址</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.address}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">政治面貌</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.politics==1?'党员':'团员'}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">教师编号</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.teacherNumber}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">最高学历</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topEducation}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">最高学位</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topDegree}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">邮箱</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.email}}</view>
				</view>
			</view>

			<view class="margin-top-lg">
				<view class="text-lg text-bold solid-bottom padding-bottom">教师证书信息</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">类型</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.teacherQualificationType}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">资格证号</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.teacherQualificationNumber}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">取得时间</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.teacherQualificationDate}}</view>
				</view>
			</view>
			<view class="margin-top-lg">
				<view class="text-lg text-bold solid-bottom padding-bottom">教师职业信息</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">学校职务</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.schoolDuty}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">人员类别</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.category}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">在职情况</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.workSituation}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">参加工作日期</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.enterEmploymentDate}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">从教日期</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.teachingDate}}</view>
				</view>

				<view class="flex">
					<view class="flex-sub margin-xs text-gray">获评日期</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topPositionalDate}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">获评最高职称</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topPositionalTitle}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">获聘最高职务</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topDutyDate}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">现聘最高岗位等级</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topStation}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">起聘日期</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topStationDate}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">进本单位时间</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.entryDate}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">何级别学科带头人</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.academicLeader}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">何级别骨干教师</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.backboneTeacher}}</view>
				</view>

				<view class="flex">
					<view class="flex-sub margin-xs text-gray">学校职务</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.schoolDuty}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">学校职务任职起始时间</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.schoolDutyStartDate}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">外籍人士身份证号</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.nationalityIdentity}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">备注</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.remark}}</view>
				</view>
			</view>
			<view class="margin-top-lg">
				<view class="text-lg text-bold solid-bottom padding-bottom">教师职称信息</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">获评日期</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topPositionalDate}}</view>
				</view>
				<view class="flex">
					<view class="flex-sub margin-xs text-gray">获评最高职称</view>
					<view class="flex-treble margin-xs ">{{teacherInfo.topPositionalTitle}}</view>
				</view>
			</view>
		</view>
		<view v-if="permission.teacherRecord_edit||permission.teacherRecord_delete" class="cu-bar tabbar bg-gray shadow foot flex">
			<button v-if="permission.teacherRecord_delete" @tap="removeTeacher" class="cu-btn bg-red flex-sub lg margin">删除</button>
			<button v-if="permission.teacherRecord_edit" @tap="editTeacher" class="cu-btn bg-blue flex-sub lg margin">编辑</button>
		</view>
	</view>
</template>

<script>
	import {
		remove,
		detail
	} from '@/api/apps/teacherRecord.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				id: "",
				teacherInfo: []
			}
		},

		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		onShow() {
			this.$fire.on('teacherRecord_edit',result=>{
				this.id = result
				this.getDetail()
			})
		},
		computed: {
			...mapGetters(['permission']),
		},
		methods: {
			//根据身份证计算出生日期和年龄
			formatData() {
				let res = this.$mUtils.CertificateNoParse(this.teacherInfo.identity)
				this.teacherInfo.age = res.age
				this.teacherInfo.birthday = res.birthday
			},
			//获取学生信息详情
			getDetail(){
				detail({id:this.id}).then(res=>{
					let data = res.data.data
					this.teacherInfo = this.$mUtils.formatData(data)
				})
			},
			//删除教师
			removeTeacher() {
				uni.showModal({
					content: '确定要删除该教师吗？',
					success: (e) => {
						if (e.confirm) {
							remove(this.teacherInfo.id).then(res => {
								uni.showToast({
									title: "删除成功"
								})
								this.$fire.fire('teacherRecord_delete');
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
					url: "/pages/apps/teacherRecord/add?form=" + JSON.stringify(this.teacherInfo)
				})
			}
		}
	}
</script>

<style>
</style>
