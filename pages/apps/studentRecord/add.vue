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
					<view class="title">学号</view>
					<input v-model="form.studentNumber" name="studentNumber" placeholder="请输入学号" maxlength="18" type="text" />
					<text @tap="removeForm('studentNumber')" v-if="form.studentNumber" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('gradeId')">
					<view class="title">年级</view>
					<text class="cuIcon-right-right">{{formatTypeName('gradeId')}}</text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('studentClassId')">
					<view class="title">班级</view>
					<text class="cuIcon-right-right">{{formatTypeName('studentClassId')}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>身份证号码</view>
					<input v-model="form.identity" name="identity" placeholder="请输入身份证号码" maxlength="18" type="text" />
					<text @tap="removeForm('identity')" v-if="form.identity" class="cuIcon-roundclosefill text-gray"></text>
				</view>

				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>性别</view>
					<switch name="sex" class='switch-sex' @change="switchSex" :class="form.sex==1?'checked':''" :checked="form.sex==1?true:false"></switch>
				</view>
				<view class="cu-form-group" @tap="showDatePicker('birthday')">
					<view class="title">出生日期</view>
					<view class="cuIcon-right-right">{{form.birthday}}</view>
				</view>
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>年龄</view>
					<input v-model="form.age" name="age" placeholder="请输入年龄" maxlength="3" type="number" />
					<text @tap="removeForm('age')" v-if="form.age" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">户籍地</view>
					<input v-model="form.permanentResidenceAddress" name="permanentResidenceAddress" placeholder="请输入户籍地" maxlength="18"
					 type="text" />
					<text @tap="removeForm('permanentResidenceAddress')" v-if="form.permanentResidenceAddress" class="cuIcon-roundclosefill text-gray"></text>
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
				<view class="cu-form-group">
					<view class="title">详细地址</view>
					<input v-model="form.address" name="address" placeholder="请输入详细地址" maxlength="30" type="text" />
					<text @tap="removeForm('address')" v-if="form.address" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">学籍编号</view>
					<input v-model="form.schoolRollNumber" name="schoolRollNumber" placeholder="请输入学籍编号" maxlength="30" type="text" />
					<text @tap="removeForm('schoolRollNumber')" v-if="form.schoolRollNumber" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('schoolRollStatus')">
					<view class="title">学籍状态</view>
					<text class="cuIcon-right-right">{{formatTypeName('schoolRollStatus')}}</text>
				</view>
				<view class="cu-form-group" @tap="showRadioModal('registerStatus')">
					<view class="title">是否本地户口</view>
					<text class="cuIcon-right-right">{{formatTypeName('registerStatus')}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">生源校</view>
					<input v-model="form.sutudentSource" name="sutudentSource" placeholder="请输入生源校" maxlength="30" type="text" />
					<text @tap="removeForm('sutudentSource')" v-if="form.sutudentSource" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">外籍人士身份证</view>
					<input v-model="form.nationalityIdentity" name="nationalityIdentity" placeholder="请输入身份证号" maxlength="30" type="text" />
					<text @tap="removeForm('nationalityIdentity')" v-if="form.nationalityIdentity" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="bg-white padding text-blue solid-top text-lg text-bold">监护人信息</view>
				<view class="cu-form-group">
					<view class="title">第一监护人</view>
					<input v-model="form.firstGuardian" name="firstGuardian" placeholder="请输入第一监护人" maxlength="30" type="text" />
					<text @tap="removeForm('firstGuardian')" v-if="form.firstGuardian" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">第一监护人手机号</view>
					<input v-model="form.firstGuardianPhone" name="firstGuardianPhone" placeholder="请输入第一监护人手机号" maxlength="30" type="text" />
					<text @tap="removeForm('firstGuardianPhone')" v-if="form.firstGuardianPhone" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">第一监护人身份证</view>
					<input v-model="form.firstGuardianIdentity" name="firstGuardianIdentity" placeholder="请输入第一监护人身份证" maxlength="30"
					 type="text" />
					<text @tap="removeForm('firstGuardianIdentity')" v-if="form.firstGuardianIdentity" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">第一监护人关系</view>
					<input v-model="form.firstGuardianRelation" name="firstGuardianRelation" placeholder="请输入第一监护人关系" maxlength="30"
					 type="text" />
					<text @tap="removeForm('firstGuardianRelation')" v-if="form.firstGuardianRelation" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">第二监护人</view>
					<input v-model="form.secondGuardian" name="secondGuardian" placeholder="请输入第二监护人" maxlength="30" type="text" />
					<text @tap="removeForm('secondGuardian')" v-if="form.secondGuardian" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">第二监护人手机</view>
					<input v-model="form.secondGuardianPhone" name="secondGuardianPhone" placeholder="请输入第二监护人" maxlength="30" type="text" />
					<text @tap="removeForm('secondGuardianPhone')" v-if="form.secondGuardianPhone" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">第二监护人身份证</view>
					<input v-model="form.secondGuardianIdentity" name="secondGuardianIdentity" placeholder="请输入第二监护人身份证" maxlength="30"
					 type="text" />
					<text @tap="removeForm('secondGuardianIdentity')" v-if="form.secondGuardianIdentity" class="cuIcon-roundclosefill text-gray"></text>
				</view>
				<view class="cu-form-group">
					<view class="title">第二监护人关系</view>
					<input v-model="form.seconndGuardianRelation" name="seconndGuardianRelation" placeholder="请输入第二监护人关系" maxlength="30"
					 type="text" />
					<text @tap="removeForm('seconndGuardianRelation')" v-if="form.seconndGuardianRelation" class="cuIcon-roundclosefill text-gray"></text>
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
	import {
		submit,
		gradeList,
		classList
	} from '@/api/apps/studentRecord.js'
	export default {
		components: {
			tuiDatetime
		},
		onLoad(options) {
			this.getDictData(options.form)
		},
		data() {
			return {
				setDateTime: "",
				RadioModal: false, //单选模态框
				pickerData: {
					gradeId: [],
					studentClassId: [],
					schoolRollStatus: [],
					registerStatus: [],
				},
				currPickData: [],
				radioIndex: null,
				currParam: "", //当前正在设置的日期参数
				form: {
					name: "",
					studentNumber: "",
					gradeId: "",
					studentClassId: "",
					identity: "",
					sex: 1,
					birthday: "",
					age: "",
					nationality: "",
					nativePlace: "",
					address: "",
					permanentResidenceAddress: "",
					schoolRollNumber: "",
					registerStatus: "",
					schoolRollStatus: "",
					sutudentSource: "",
					nationalityIdentity: "",
					firstGuardian: "",
					firstGuardianPhone: "",
					firstGuardianIdentity: "",
					firstGuardianRelation: "",
					secondGuardian: "",
					secondGuardianPhone: "",
					secondGuardianIdentity: "",
					seconndGuardianRelation: ""
				},

			}
		},
		computed: {
			formatTypeName() {
				return function(param) {
					
					if (this.form[param] != "" && this.form[param] != -1) {
						let a = this.pickerData[param].filter(item => {
							return item.dictKey == this.form[param]
						})
						if(a.length>0){
							return a[0].dictValue
						}else{
							return ""
						}
						
					} else {
						return ""
					}
				}
			},
			
		},
		methods: {
			//获取字典数据
			async getDictData(form) {
				uni.showLoading({
					title: "加载中..."
				})
				if (form) {
					this.form = JSON.parse(form)
				}
				let grade = await gradeList({
					current: 1,
					size: 500
				})
				if(this.form.gradeId!=''&&this.form.gradeId!=-1){
					let classes = await classList({
						current: 1,
						size: 500,
						parentGradeId:this.form.gradeId
					})
					let temp = []
					classes.data.data.records.forEach(item=>{
						temp.push({
							dictValue:item.deptName,
							dictKey:item.id
						})
					})
					this.pickerData.studentClassId = temp
				}
				let temp1 = []
				grade.data.data.records.forEach(item=>{
					temp1.push({
						dictValue:item.deptName,
						dictKey:item.id,
					})
				})
				
				let data1 = await getDict({
					code: "yes_no"
				})
				let data2 = await getDict({
					code: "student_status"
				})
				this.pickerData.gradeId = temp1
				this.pickerData.registerStatus = data1.data.data
				this.pickerData.schoolRollStatus = data2.data.data
				
				uni.hideLoading()
			},
			//删除某个表单值
			removeForm(param) {
				this.form[param] = ""
			},
			//清除
			removeAll() {
				for (let i in this.form) {
					this.form[i] = ""
				}
			},
			//隐藏单选模态框
			hideRadioModal() {
				this.RadioModal = false
			},
			//显示单选模态框
			async showRadioModal(param) {
				if(param=="studentClassId"&&this.form.gradeId==""){
					uni.showToast({
						title:"请先选择年级",
						icon:"none"
					})
					return
				}
				
				this.currParam = param
				this.pickerData[param].forEach(item => {
					item.dictKey = String(item.dictKey)
				})
				this.radioIndex = this.form[param]
				this.currPickData = this.pickerData[param]
				this.RadioModal = true
			},
			async RadioChange(e) {
				this.radioIndex = e.detail.value
				this.form[this.currParam] = e.detail.value
				//请求班级信息
				if(this.currParam=="gradeId"){
					let data = await classList({current:1,size:500,parentGradeId:this.form.gradeId})
					let temp = []
					data.data.data.records.forEach(item=>{
						temp.push({
							dictValue:item.deptName,
							dictKey:item.deptId
						})
					})
					this.pickerData.studentClassId = temp
				}
				
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
				},  {
					name: "identity",
					rule: ["required", "isIdCard"],
					msg: ["请输入身份证号码", "请输入正确的身份证号码"]
				}];
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					uni.showLoading({
						title: "提交中..."
					})
					this.form.sex = this.form.sex ? 1 : 2
					submit(this.form).then(res => {
						uni.showToast({
							title: "操作成功",
							icon: "success"
						});
						uni.hideLoading()
						let that = this
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
							if(that.id!=""){
								that.$fire.fire('studentRecord_edit',that.id);
							}else{
								that.$fire.fire('studentRecord_add');
							}
							
						}, 1000)
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
