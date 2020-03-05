<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title"><text class="cuIcon-title text-red "></text>通知类型</view>
			<picker @change="noticeChange" :value="noticeIndex" range-key="dictValue" :data-index="noticeIndex" :range="noticeTypes">
				<view class="picker">
					{{noticeName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title"><text class="cuIcon-title text-red "></text>收件人类型</view>
			<picker @change="addressChange" :value="addressIndex" range-key="dictValue" :data-index="addressIndex" :range="addressType">
				<view class="picker">
					{{adressName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top" @tap="showPModel">
			<view class="title"><text class="cuIcon-title text-red "></text>收件人</view>
			<view class="text-lg text-gray">{{consignee}}<text class="cuIcon-right"></text></view>
		</view>
		<view class="cu-modal bottom-modal" :class="peopleModel?'show':''" @tap="hidePModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hidePModal">取消</view>
					<view class="action text-green" @tap="hidePModal">确定</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in peoples" class="padding-xs" :key="index">
						<button class="cu-btn orange block" :class="item.checked?'bg-blue':'line-blue'" @tap="choosePeople" :data-value="item.deptId">
							{{item.deptName}}
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title"><text class="cuIcon-title text-red "></text>标题</view>
			<input @input="titleInput" placeholder="请输入标题" name="input"></input>
		</view>
		<view class="cu-form-group align-start margin-top">
			<view class="title"><text class="cuIcon-title text-red "></text>通知内容</view>
			<textarea @input="contentInput" maxlength="-1"  placeholder="请输入通知内容"></textarea>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<button @tap="sendMail" class="cu-btn bg-blue lg margin" style="width:100%">发送</button>
		</view>
	</view>
</template>

<script>
	import {
		getDict
	} from '@/api/basic/system.js'
	import {
		getList
	} from '@/api/basic/class.js'
	import { submitMail } from '@/api/apps/homeSchoolLink.js'
	export default {
		data() {
			return {
				appId: "",
				addressType: [],
				addressIndex: 0,
				peopleModel: false,
				peoples: [], //收件人
				noticeTypes:[],
				noticeIndex:0,
				title:"",
				content:""
			}
		},
		computed: {
			adressName() {
				if (this.addressType.length) {
					return this.addressType[this.addressIndex].dictValue
				} else {
					return ""
				}
			},
			noticeName() {
				if (this.noticeTypes.length) {
					return this.noticeTypes[this.noticeIndex].dictValue
				} else {
					return ""
				}
			},
			consignee(){
				let strArr = []
				strArr = this.peoples.filter(item=>{
					return item.checked==true
				})
				strArr = strArr.map(data=>data.deptName)
				let a = strArr.toString()
				return a.length>10?a.slice(0,10)+"...":a
			}
		},
		onLoad(options) {
			this.appId = options.appId
			this.fetchType()
			this.fetchClass()
			this.fetchNoticeType()
		},
		methods: {
			//获取收件人类型
			fetchType() {
				getDict({
					code: "receive_type"
				}).then(res => {
					let data = res.data.data
					this.addressType = data
				})
			},
			//获取通知类型
			fetchNoticeType(){
				getDict({
					code: "notice"
				}).then(res => {
					let data = res.data.data
					this.noticeTypes = data
				})
			},
			noticeChange(){
				let index = e.detail.value;
				this.noticeIndex = index
			},
			addressChange(e) {
				let index = e.detail.value;
				this.addressIndex = index
			},
			hidePModal() {
				this.peopleModel = false
			},
			showPModel() {
				this.peopleModel = true
			},
			//获取班级
			fetchClass() {
				getList({
					current: 1,
					size: 500
				}).then(res => {
					let data = res.data.data.records
					data.forEach(item => {
						item.checked = false
					})
					this.peoples = data
				})
			},
			//多选收件人
			choosePeople(e) {
				let items = this.peoples;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].deptId == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			},
			//发送
			sendMail(){
				if(this.consignee==""){
					uni.showToast({
						title:"请选择收件人",
						icon:'none'
					})
					return
				}
				if(this.title==""){
					uni.showToast({
						title:"请输入标题",
						icon:'none'
					})
					return
				}
				if(this.content==""){
					uni.showToast({
						title:"请输入内容",
						icon:'none'
					})
					return
				}
				let receiver = []
				receiver = this.peoples.filter(item=>{return item.checked==true})			
				receiver = receiver.map(data=>data.deptId)
				let a = {}
				a[receiver.length+1] = receiver
				let params = {
					meesageType:this.noticeTypes[this.noticeIndex].dictKey+"",
					menuType:this.addressType[this.addressIndex].dictKey+1,
					messageContent:this.content,
					messageTitle:this.title,
					receiver:a
				}
				submitMail(params).then(res=>{
					
				})
				uni.showToast({
					title:"发送成功",
					icon:"success"
				})
				setTimeout(function(){
					uni.navigateTo({
						url:"/pages/apps/homeSchoolLink/inbox"
					})
				},1000)
			},
			//输入标题
			titleInput(e){
				this.title = e.detail.value
			},
			//输入内容
			contentInput(e){
				this.content = e.detail.value
			}
		}
	}
</script>

<style>
</style>
