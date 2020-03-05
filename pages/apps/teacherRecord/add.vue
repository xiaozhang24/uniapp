<template>
	<view>
		<view style="margin-bottom: 200rpx;">
			<form @submit="formSubmit">
				<view class="bg-white padding text-blue solid-bottom text-lg text-bold">基本信息</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>姓名</view>
					<input v-model="form.name" name="name" placeholder="请输入姓名" maxlength="5" type="text" />
					<text @tap="removeForm('name')" v-if="form.name" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>性别</view>
					<switch name="sex" class='switch-sex' @change="switchSex" :class="form.sex==1?'checked':''" :checked="form.sex==1?true:false"></switch>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>年龄</view>
					<input v-model="form.age" name="age" placeholder="请输入年龄" maxlength="3" type="number" />
					<text @tap="removeForm('age')" v-if="form.age" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>手机号</view>
					<input v-model="form.phone" name="phone" placeholder="请输入手机号" maxlength="11" type="number" />
					<text @tap="removeForm('phone')" v-if="form.phone" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>身份证号码</view>
					<input v-model="form.identity" name="identity" placeholder="请输入身份证号码" maxlength="18" type="text" />
					<text @tap="removeForm('identity')" v-if="form.identity" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">籍贯</view>
					<input v-model="form.nativePlace" name="nativePlace" placeholder="请输入籍贯" maxlength="10" type="text" />
					<text @tap="removeForm('nativePlace')" v-if="form.nativePlace" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">国籍</view>
					<input v-model="form.nationality" name="nationality" placeholder="请输入国籍" maxlength="10" type="text" />
					<text @tap="removeForm('nationality')" v-if="form.nationality" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group" @tap="showDatePicker('birthday')">
					<view class="title">出生日期</view>
					<view class="cuIcon-right-right">{{form.birthday}}</view>
				</view>
				
				<view class="cu-form-group">
					<view class="title">详细地址</view>
					<input v-model="form.address" name="address" placeholder="请输入详细地址" maxlength="30" type="text" />
					<text @tap="removeForm('address')" v-if="form.address" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				
				<view class="cu-form-group" @tap="showRadioModal('politics','political_status')">
					<view class="title">政治面貌</view>
					<text class="cuIcon-right-right">{{formatTypeName('politics')}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">教师编号</view>
					<input v-model="form.teacherNumber" name="teacherNumber" placeholder="请输入教师编号" maxlength="10" type="text" />
					<text @tap="removeForm('teacherNumber')" v-if="form.teacherNumber" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('topEducation','edu_background_type')">
					<view class="title">最高学历</view>
					<text class="cuIcon-right-right">{{formatTypeName('topEducation')}}</text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('topDegree','degree_type')">
					<view class="title">最高学位</view>
					<text class="cuIcon-right-right">{{formatTypeName('topDegree')}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">邮箱</view>
					<input v-model="form.email" name="email" placeholder="请输入邮箱" maxlength="20" type="text" />
					<text @tap="removeForm('email')" v-if="form.email" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="bg-white padding text-blue solid-top solid-bottom text-lg text-bold">教师证书信息</view>
				<view class="cu-form-group" @tap="showRadioModal('teacherQualificationType','teacher_card_type')">
					<view class="title">证书类型</view>
					<text class="cuIcon-right-right">{{formatTypeName('teacherQualificationType')}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">教师编号</view>
					<input v-model="form.teacherQualificationNumber" name="teacherQualificationNumber" placeholder="请输入教师资格证号"
					 maxlength="20" type="text" />
					<text @tap="removeForm('teacherQualificationNumber')" v-if="form.teacherQualificationNumber" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group" @tap="showDatePicker('teacherQualificationDate')">
					<view class="title">取得教师资格时间</view>
					<text class="cuIcon-right-right">{{form.teacherQualificationDate}}</text>
				</view>
				<view class="bg-white padding text-blue solid-top solid-bottom text-lg text-bold">教师职业信息</view>
				<view class="cu-form-group" @tap="showRadioModal('schoolDuty','teacher_job')">
					<view class="title">学校职务</view>
					<text class="cuIcon-right-right">{{formatTypeName('schoolDuty')}}</text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('category','person_type')">
					<view class="title">人员类别</view>
					<text class="cuIcon-right-right">{{formatTypeName('category')}}</text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('workSituation','work_status')">
					<view class="title">在职情况</view>
					<text class="cuIcon-right-right">{{formatTypeName('workSituation')}}</text>
				</view>
				<view class="cu-form-group" @tap="showDatePicker('teachingDate')">
					<view class="title">从教日期</view>
					<view class="cuIcon-right-right">{{form.teachingDate}}</view>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('topDuty','teacher_job')">
					<view class="title">获聘最高职务</view>
					<text class="cuIcon-right-right">{{formatTypeName('topDuty')}}</text>
				</view>
				<view class="cu-form-group" @tap="showDatePicker('enterEmploymentDate')">
					<view class="title">参加工作日期</view>
					<view class="cuIcon-right-right">{{form.enterEmploymentDate}}</view>
				</view>
				<view class="cu-form-group" @tap="showDatePicker('topDutyDate')">
					<view class="title">获聘日期</view>
					<view class="cuIcon-right-right">{{form.topDutyDate}}</view>
				</view>
				<view class="cu-form-group" @tap="showDatePicker('topStationDate')">
					<view class="title">起聘日期</view>
					<view class="cuIcon-right-right">{{form.topStationDate}}</view>
				</view>
				<view class="cu-form-group" @tap="showDatePicker('entryDate')">
					<view class="title">进本单位时间</view>
					<view class="cuIcon-right-right">{{form.entryDate}}</view>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('topStation','rank')">
					<view class="title">现聘最高岗位等级</view>
					<text class="cuIcon-right-right">{{formatTypeName('topStation')}}</text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('backboneTeacher','rank')">
					<view class="title">何级别骨干教师</view>
					<text class="cuIcon-right-right">{{formatTypeName('backboneTeacher')}}</text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('academicLeader','rank')">
					<view class="title">何级别学科带头人</view>
					<text class="cuIcon-right-right">{{formatTypeName('academicLeader')}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">外籍人士身份证号</view>
					<input v-model="form.nationalityIdentity" placeholder="请输入身份证号码" maxlength="18" type="text" />
				</view>
				<view class="cu-form-group" @tap="showDatePicker('schoolDutyStartDate')">
					<view class="title">学校职务任职起始时间</view>
					<view class="cuIcon-right-right">{{form.schoolDutyStartDate}}</view>
				</view>
				<view class="cu-form-group">
					<textarea v-model="form.remark" maxlength="150" placeholder="请输入备注"></textarea>
				</view>
				<view class="bg-white padding text-blue solid-top solid-bottom text-lg text-bold">教师职称信息</view>
				<view class="cu-form-group" @tap="showDatePicker('topPositionalDate')">
					<view class="title">获评日期</view>
					<view class="cuIcon-right-right">{{form.topPositionalDate}}</view>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('topPositionalTitle','title_type')">
					<view class="title">获评最高职称</view>
					<text class="cuIcon-right-right">{{formatTypeName('topPositionalTitle')}}</text>
				</view>
				<view class="cu-bar tabbar bg-white shadow foot flex">
					<button @tap="removeAll" class="cu-btn bg-grey flex-sub lg margin">清空</button>
					<button formType="submit" class="cu-btn bg-blue flex-sub lg margin">确定</button>
				</view>
			</form>
		</view>
		
		<!-- 时间选择模态框 -->
		<tui-datetime ref="dateTime" :type="2" :startYear="1960" :endYear="2030" :setDateTime="setDateTime" @confirm="DateChange"></tui-datetime>
		<!-- 单选模态框 -->
		<view class="cu-modal" :class="RadioModal?'show':''" @tap="hideRadioModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in currPickData" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.dictValue}}</view>
								<radio class="round" :class="radioIndex==item.dictKey?'checked':''" :checked="radioIndex==item.dictKey?true:false"
								 :value="item.dictKey"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	const form = require("components/thor-ui/utils/formValidation.js")
	import tuiDatetime from "@/components/thor-ui/dateTime/dateTime"
	import {
		getDict
	} from '@/api/basic/system.js'
	import { submit } from '@/api/apps/teacherRecord.js'
	export default {
		components: {
			tuiDatetime
		},
		onLoad(options){
			this.getDictData(options.form)
		},
		data() {
			return {
				setDateTime: "",
				RadioModal: false, //单选模态框
				pickerData: {
					politics: [],
					topEducation:[],
					topDegree:[],
					teacherQualificationType: [],
					schoolDuty: [],
					category: [],
					workSituation: [],
					topDuty: [],
					topStation: [],
					backboneTeacher: [],
					academicLeader: [],
					topPositionalTitle:[]
				},
				currPickData: [],
				radioIndex: null,
				currParam: "", //当前正在设置的日期参数
				form: {
					name: "",
					age: "",
					sex: 1,
					email: "",
					identity:"",
					phone:"",
					birthday: "",
					nationality:"",
					nativePlace: "",
					teacherNumber: "",
					address: "",
					politics: "",
					topEducation:"",
					topDegree:"",
					teacherQualificationType: "",
					teacherQualificationNumber: "",
					teacherQualificationDate: "",
					schoolDuty: "",
					category: "",
					workSituation: "",
					teachingDate: "",
					topDuty: "",
					enterEmploymentDate: "",
					topDutyDate: "",
					topStationDate: "",
					entryDate: "",
					topStation: "",
					backboneTeacher: "",
					academicLeader: "",
					nationalityIdentity: "",
					schoolDutyStartDate: "",
					remark: "",
					topPositionalDate:"",
					topPositionalTitle:""
				},

			}
		},
		computed: {
			formatTypeName() {
				return function(param) {
					if (this.form[param] != ""&&this.form[param]!=-1) {
						let a = this.pickerData[param].filter(item => {
							return item.dictKey == this.form[param]
						})
						return a[0].dictValue
					} else {
						return ""
					}
				}
			}
		},
		methods: {
			//获取字典数据
			async getDictData(form){
				uni.showLoading({
					title:"加载中..."
				})
				let data1 = await getDict({code:"political_status"})
				let data2 = await getDict({code:"edu_background_type"})
				let data3 = await getDict({code:"degree_type"})
				let data4 = await getDict({code:"teacher_card_type"})
				let data5 = await getDict({code:"teacher_job"})
				let data6 = await getDict({code:"person_type"})
				let data7 = await getDict({code:"work_status"})
				let data8 = await getDict({code:"rank"})
				let data9 = await getDict({code:"title_type"})
				this.pickerData.politics = data1.data.data
				this.pickerData.topEducation = data2.data.data
				this.pickerData.topDegree = data3.data.data
				this.pickerData.teacherQualificationType = data4.data.data
				this.pickerData.schoolDuty = data5.data.data
				this.pickerData.topDuty = data5.data.data
				this.pickerData.category = data6.data.data
				this.pickerData.workSituation = data7.data.data
				this.pickerData.topStation = data8.data.data
				this.pickerData.backboneTeacher = data8.data.data
				this.pickerData.academicLeader = data8.data.data
				this.pickerData.topPositionalTitle = data8.data.data
				if(form){
					this.form = JSON.parse(form)
				}
				uni.hideLoading()
			},
			//删除某个表单值
			removeForm(param){
				this.form[param]=""
			},
			//清除
			removeAll(){
				for(let i in this.form){
					this.form[i] = ""
				}
			},
			//隐藏单选模态框
			hideRadioModal() {
				this.RadioModal = false
			},
			//显示单选模态框
			async showRadioModal(param, code) {
				this.currParam = param
				this.pickerData[param].forEach(item=>{
					item.dictKey = String(item.dictKey)
				})
				this.radioIndex = this.form[param]
				this.currPickData = this.pickerData[param]
				this.RadioModal = true
			},
			RadioChange(e) {
				this.radioIndex = e.detail.value
				this.form[this.currParam] = e.detail.value
				this.RadioModal = false
			},
			//显示日期选择下拉框
			showDatePicker(param) {
				this.currParam = param
				this.$refs.dateTime.show()
			},
			DateChange(e) {
				this.form[this.currParam] = e.result
			},
			switchSex(e) {
				this.form.sex = e.detail.value
			},

			politicsChange(e) {
				this.politicsIndex = e.detail.value
			},
			teacherCardChange(e) {
				this.teacherQualificationTypeIndex = e.detail.value
			},
			formSubmit: function(e) {
				//表单规则
				let rules = [{
					name: "name",
					rule: ["required", "isChinese", "minLength:2", "maxLength:6"], //可使用区间，此处主要测试功能
					msg: ["请输入姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过6个字符"]
				}, {
					name: "age",
					rule: ["required", "isNum", "range:[0,150]"],
					msg: ["请输入年龄", "请输入正确的年龄", "请输入正确的年龄范围：0-150"]
				}, {
					name: "phone",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}, {
					name: "identity",
					rule: ["required", "isIdCard"],
					msg: ["请输入身份证号码", "请输入正确的身份证号码"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					uni.showLoading({
						title:"提交中..."
					})
					this.form.sex = this.form.sex?1:2
					submit(this.form).then(res=>{
						uni.showToast({
							title: "操作成功",
							icon: "success"
						});
						uni.hideLoading()
						let that = this
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
							if(that.id!=""){
								that.$fire.fire('teacherRecord_edit',that.id);
							}else{
								that.$fire.fire('teacherRecord_add');
							}
						},1000)
					})
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
