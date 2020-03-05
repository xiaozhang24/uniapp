<template>
    <div>
		<cu-custom @edit="edit" bgColor="bg-gradual-red" :isBack="true"><block slot="backText">返回</block><block slot="content">搜索</block><block slot="right"><text>学年</text><text class="cuIcon-unfold"></text></block></cu-custom>
		<view class="cu-modal" :class="modelShow?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="yearChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in schoolYear" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.title}}</view>
								<radio class="round" :class="item.id==currentId?'checked':''" :checked="item.id==currentId?true:false"
								 :value="item.id"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
        <Calendar v-if="currentData" :startDate="currentData.firstStart" :endDate="currentData.secondEnd" :holiday="holiday" :preDisabled="false" :initMonthCount="12"  :themeColor="'#FF6600'"  @callback="getDate" />
		
    </div>
</template>
<script>
	import Calendar from '@/components/mobile-calendar-simple/Calendar.vue'
	
	import { basicCalendar } from '@/api/user/home.js'
	export default {
	    data(){
	        return {
	            disabledList:['2019-6-25','2019-6-26'],//不可操作的日期
	            priceList:[//价格日历列表
	                {date:'2019-6-24',price:'¥199'},
	                {date:'2019-6-25',price:'¥500'},
	                {date:'2019-6-26',price:'¥199'},
	                {date:'2019-6-27',price:'¥500'},
	                {date:'2019-6-28',price:'¥500'}
	            ],
				modelShow:false,
				currentId:"", //当前学年
				schoolYear:[], //学年数据
				holiday:null, //寒暑假期区间
				currentData:null,
	        }
	    },
		onLoad(){
			this.fetchCalendar()
		},
	    methods:{
			//获取学年信息
			fetchCalendar(){
				basicCalendar().then(res=>{
					let data = res.data.data;
					this.schoolYear = data.records
					this.currentId = this.schoolYear[0].id
					this.currentData = this.schoolYear[0]
					let holiday = {
						summer:{
							start:this.currentData.secondEnd,
							end:this.currentData.firstStart
						},
						winter:{
							start:this.currentData.firstEnd,
							end:this.currentData.secondStart
						}
					}
					let q = holiday.summer.start.split("-");
					holiday.summer.end = q[0] + 1 + "/" + q[1] + "/" + q[2];
					this.holiday = holiday
				})
			},
			//选择学年
			edit(){
				this.modelShow = true
			},
			//隐藏学年选择模态框
			hideModal(e) {
				this.modelShow = false
			},
			//改变学年
			yearChange(e){
				this.currentId = e.detail.value
				let currentData = this.schoolYear.filter(item=>{
					return item.id == this.currentId
				})[0]
				this.modelShow = false
				this.currentData = currentData
				let holiday = {
					summer:{
						start:currentData.secondEnd,
						end:currentData.firstStart
					},
					winter:{
						start:currentData.firstEnd,
						end:currentData.secondStart
					}
				}
				let q = holiday.summer.start.split("-");
				holiday.summer.end = q[0] + 1 + "/" + q[1] + "/" + q[2];
				this.holiday = holiday
			}
			
	    },
	    components:{
	        Calendar
	    }
	}
</script>