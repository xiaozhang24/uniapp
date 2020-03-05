<template>
	<view class="">
		<view class="table">
			<view class="thead" v-if="renderWeekArr.length > 0">
				<view class="th">时段</view>
				<view class="th" v-for="(item, index) in renderWeekArr" :style="{ backgroundColor: currentDay === index ? 'gray' : '' }" :key="index">{{ item }}</view>
			</view>
			<view class="tbody-wrapper">
				<view class="tbody">
					<view class="time-range">
						<view
							class="time-range-item"
							:style="{ height: item.rows * 40 + 'px', lineHeight: item.rows * 40 + 'px' }"
							v-for="(item, index) in tbodyTimeRangeData"
							:key="index"
						>
							{{ item.value }}
						</view>
					</view>
					<view class="content">
						<view class="tr" v-for="(rows, trIndex) in tbodyLessonData" :key="trIndex">
							<view class="td" v-for="(td, tdIndex) in rows" :style="{ backgroundColor: td.color ? '#' + td.color : '' }" :key="tdIndex">
								<view v-if="td.isLessonNum" class="num">{{ td.value }}</view>
								<block v-else class="cell-class">
									<view class="items" v-for="(item, index) in td.value" :key="index">{{ item }}</view>
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="typeModelShow ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog dialog" @tap.stop="">
				<view class="dialog-box">
					<view class="input-wrapper">
						<ui-icon class="search-icon" name="search" :size="20"></ui-icon>
						<input
							@input="search"
							placeholder-class="search-placeholder"
							confirm-type="search"
							class="private-input"
							placeholder="请输入班级名或者教师姓名"
							type="text"
							v-model="searchValue"
						/>
						<!-- <text @tap="search" class="serach-submit">搜索</text> -->
					</view>
					<view class="list-wrapper">
						<radio-group class="block radio-list" @change="typeChange">
							<view class="cu-list menu text-left">
								<view class="cu-item" v-for="(item, index) in currentList" :key="index">
									<label class="flex justify-between align-center flex-sub">
										<view class="flex-sub">{{ item.name }}</view>
										<view class="flex-sub">{{ item.secondName }}</view>
										<view v-if="item.thirdName" class="flex-sub">{{ item.thirdName }}</view>
										<radio
											class="round"
											:class="item.userId == currentParams.searchId ? 'checked' : ''"
											:checked="item.userId == currentParams.searchId ? true : false"
											:value="item.userId"
										></radio>
									</label>
								</view>
							</view>
						</radio-group>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view v-for="(item, index) in tabs" :key="index" :class="tabIndex == index ? 'text-green action' : 'text-gray action'" @click="navChange(index)">
				<view :class="item.icon"></view>
				{{ item.label }}
			</view>
		</view>
	</view>
</template>

<script>
import { getOwnTimeTable, getTeacherList, getClassList ,getNowTermOneTimeTable} from '@/api/apps/courseTable.js';
import uiIcon from '@/components/thor-ui/icon/icon.vue';
export default {
	data() {
		return {
			weekArr: ['课节数', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
			timeRangeRows: [
				{ value: '早读', lessonType: 1, rows: 0 },
				{ value: '上午', lessonType: 2, rows: 0 },
				{ value: '中午', lessonType: 3, rows: 0 },
				{ value: '下午', lessonType: 4, rows: 0 },
				{ value: '晚上', lessonType: 5, rows: 0 }
			],
			renderWeekArr: [],
			tbodyLessonData: [],
			tbodyTimeRangeData: [],
			currentDay: new Date().getDay(),
			tabIndex: 0,
			typeModelShow: false,
			tabs: [
				{
					label: '按教师',
					icon: 'cuIcon-form'
				},
				{
					label: '按班级',
					icon: 'cuIcon-form'
				}
			],
			classList: null,
			teacherList: null,
			currentList: [],
			copyCurrentList: [],
			// apliceNum用于删除对应的角色项
			currentParams: { type: 1, searchId: '',spliceNum : 1 },
			currentTitle: null,
			searchValue: ''
		};
	},
	created() {
		this.getTeacherList();
	},
	components: {
		uiIcon
	},
	methods: {
		search() {
			let searchValue = this.searchValue;
			if (!searchValue) {
				this.currentList = this.copyCurrentList;
				return;
			}
			this.currentList = this.copyCurrentList.filter(item => item.name.indexOf(searchValue) !== -1);
		},
		showTitle() {
			let name, type;
			let currentParams = this.currentParams;
			// 班级
			if (currentParams.type === 1) {
				name = this.classList.find(item => item.userId === currentParams.searchId).name;
				type = '班级';
			}
			// 教师
			if (currentParams.type === 2) {
				name = this.teacherList.find(item => item.userId === currentParams.searchId).name;
				type = '教师';
			}
			uni.setNavigationBarTitle({
				title: `${name}-${type}课程表`
			});
		},
		// 获取班级信息
		getClassList() {
			let _this = this;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			_this.typeModelShow = false;
			this.currentParams.type = 1;
			getClassList().then(res => {
				let data = res.data.data;
				let classList = [];
				Object.keys(data).forEach(grade => {
					data[grade].forEach(iclass => {
						classList.push({ name: iclass.name, secondName: grade, userId: iclass.id });
					});
				});
				_this.classList = classList
				_this.currentParams.type = 1;
				_this.currentList = _this.classList;
				_this.copyCurrentList = _this.classList;
				uni.hideLoading();
				_this.typeModelShow = true;
			}).catch(() => {
				uni.hideLoading()
			})
		},
		// 获取教师信息
		getTeacherList() {
			let _this = this;
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			_this.typeModelShow = false;
			getTeacherList().then(res => {
				let data = res.data.data;
				let teacherList = [];
				Object.keys(data).forEach(subject => {
					data[subject].forEach(lesson => {
						teacherList.push({ name: lesson.name, secondName: subject, thirdName : lesson.teacherNumber+ '(编号)',userId: lesson.id });
					});
				});
				_this.teacherList = teacherList
				_this.currentParams.type = 2;
				_this.currentList = _this.teacherList;
				_this.copyCurrentList = _this.teacherList;
				uni.hideLoading();
				_this.typeModelShow = true;
			}).catch(() => {
				uni.hideLoading()
			})
		},
		//隐藏类型model
		hideModal() {
			this.typeModelShow = false;
		},
		// change
		typeChange(e) {
			this.typeModelShow = false;
			this.currentParams.searchId = e.detail.value;
			console.log(this.currentParams);
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			this.createTable();
		},
		// 获取数据渲染变革
		createTable() {
			getNowTermOneTimeTable(this.currentParams).then(res => {
				let lessonData = res.data.data;
				this.renderThead(lessonData[0].data.length);
				this.renderTbody(lessonData);
				this.showTitle();
				uni.hideLoading();
			}).catch(() => {
				uni.hideLoading();
			})
		},
		navChange(index) {
			this.tabIndex = index;
			if (index === 0) {
				if (!this.teacherList) {
					this.getTeacherList();
				} else {
					this.currentList = this.teacherList;
					this.copyCurrentList = this.teacherList;
				}
				this.currentParams.type = 2;
				this.currentParams.spliceNum = 1;
			}
			if (index === 1) {
				if (!this.classList) {
					this.getClassList();
				} else {
					this.currentList = this.classList;
					this.copyCurrentList = this.classList;
				}
				this.currentParams.type = 1;
				this.currentParams.spliceNum = 2;
			}
			
			this.typeModelShow = true;
		},
		// 渲染thead
		renderThead(num) {
			this.renderWeekArr = this.weekArr.slice(0, num + 1);
		},
		// 渲染body
		renderTbody(data) {
			let colorList = {
				语文: 'eeb0b0',
				英语: 'ffe0b2',
				数学: 'd5e298',
				化学: '91da9c',
				物理: '9fe0e4',
				生物: '9cb9e4',
				地理: 'cab3db',
				体育: 'ffb2d6',
				历史: 'ffefef',
				政治: 'dfdfdf'
			};
			let classData = JSON.parse(JSON.stringify(data));
			this.tbodyTimeRangeData = [];
			let tbodyLessonData = [];
			this.timeRangeRows.forEach((timeRange, index) => {
				let rows = classData.filter(lesson => lesson.lessonType === timeRange.lessonType).length;
				timeRange.rows = rows;
				this.tbodyTimeRangeData.push(timeRange);
			});
			classData.forEach((item, index) => {
				tbodyLessonData[index] = [];
				tbodyLessonData[index].push({ value: item.lesson, isLessonNum: true });
				item.data.forEach(lessonInfo => {
					let temp = lessonInfo.name;
					let templist = lessonInfo.name.split(',')
					if(this.currentParams.spliceNum){
						templist.splice(this.currentParams.spliceNum,1)
					}
					tbodyLessonData[index].push({
						value: temp === '' ? '' : templist,
						color: colorList[temp.split(',')[0]]
					});
					temp = '';
				});
			});
			this.tbodyLessonData = tbodyLessonData;
		}
	}
};
</script>

<style>
.radio-list {
	top: 40px;
}
.input-wrapper {
	border: 1px solid #ddd;
	display: flex;
	justify-content: space-between;
	margin: 15px;
	align-items: center;
	border-radius: 5px;
}
.list-wrapper {
	overflow: auto;
}
.private-input {
	flex-grow: 1;
	height: 40px;
	line-height: 40px;
}
.serach-submit {
	padding: 10px;
	background-color: #4399fc;
	border-radius: 5px;
	color: white;
}
.search-icon {
	padding-left: 10px;
}
.search-placeholder {
	color: #ddd;
}
.dialog {
	height: 60%;
	overflow: auto;
}
.dialog-box {
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}
.table {
	position: absolute;
	left: 5px;
	top: 5px;
	bottom: 5px;
	right: 5px;
}
.thead {
	height: 40px;
	display: flex;
	line-height: 40px;
	background-color: #4dabeb;
}
.th {
	flex-grow: 1;
	text-align: center;
	border-bottom: solid gray 1px;
	border-top: solid gray 1px;
	border-right: solid gray 1px;
}
.tbody-wrapper {
	height: calc(100% - 95px);
	overflow: auto;
}
.tbody {
	display: flex;
	font-size: 10px;
}
.time-range {
	display: flex;
	flex-direction: column;
}
.thead > .th:nth-of-type(1) {
	width: 50px;
	flex-grow: 0;
	text-align: center;
	border-top: solid gray 1px;
	border-left: solid gray 1px;
	border-right: solid gray 1px;
}
.time-range-item {
	width: 50px;
	text-align: center;
	border: solid gray 1px;
	border-top: solid 0px;
}
.content {
	flex-grow: 1;
}
.content {
	display: flex;
	flex-direction: column;
}
.content .tr {
	display: flex;
	justify-content: space-around;
	height: 40px;
}
.tr .td {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	width: 0px;
	border-bottom: solid gray 1px;
	border-right: solid gray 1px;
	justify-content: center;
	align-items: center;
	
}
.cell-class {
	/* width: 100%; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.items {
	/* width: 100%; */
	text-align: center;
}
,
.num {
	text-align: center;
	line-height: 40px;
}
</style>
