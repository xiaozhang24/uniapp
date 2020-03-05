<template>
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
</template>
<script>
import { getOwnTimeTable, getRoleList } from '@/api/apps/courseTable.js';
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
			params : null
		};
	},
	created() {},
	methods: {
		onLoad: function(option) {
			const params = JSON.parse(decodeURIComponent(option.params));
			let title;
			if (params.role === 'teacher') {
				title = '教师课程表';
				params.spliceNum = 1
			} else if (params.role === 'student') {
				title = '学生课程表';
				params.spliceNum = 2
			}
			uni.setNavigationBarTitle({
				title: title
			});
			this.params = params
			this.renderTable(params);
		},
		dealRoleData(roleData) {
			let params = [];
			let data = roleData.data.data;
			let roleList = [];
			data.forEach(item => {
				if (item.children && item.children.length > 0) {
					roleList.push(...item.children);
				} else {
					roleList.push(item);
				}
			});
			let stuRoleId = roleList.find(role => role.roleAlias === 'student').id;
			let teacherRoleId = roleList.find(role => role.roleAlias === 'teacher').id;
			let userRoleList = this.userInfo['role_id'].split(',');
			// 该用户是学生
			if (userRoleList.includes(stuRoleId)) {
				params.push({ type: 3, searchId: this.userInfo['user_id'] });
			}
			// 该用户是教师
			if (userRoleList.includes(teacherRoleId)) {
				params.push({ type: 2, searchId: this.userInfo['user_id'] });
			}
			return params;
		},
		// 获取课程信息
		renderTable(params) {
			let _this = this;
			uni.showLoading({
				mask : true,
				title: '加载中'
			});
			getOwnTimeTable(params).then(res => {
				let lessonData = res.data.data;
				this.renderThead(lessonData[0].data.length);
				this.renderTbody(lessonData);
				uni.hideLoading();
			}).catch(() => {
				uni.hideLoading();
			})
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
					if(this.params.spliceNum){
						templist.splice(this.params.spliceNum,1)
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
	height: calc(100% - 40px);
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

.num {
	text-align: center;
	line-height: 40px;
}
</style>
