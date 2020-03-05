<template>
	<view class="read">
		<!-- 状态栏 -->
		<!-- <view class="status" :style="{position:headerPosition}"></view> -->
		<!-- 标题栏 -->
		<view style="width: 100%;" class="header bg-nRed padding-xs text-lg solid-bottom" :style="{position:headerPosition}">
			<view class="flex-sub">
				<text class="cuIcon-back" @tap="back"></text>
				<text class="padding-left">{{questionList[questionIndex].label}}</text>
			</view>
			<view class="flex-sub text-right">
				<text @tap="showQuestion" class="padding-left">题干</text>
				<text @tap="standardArea" class="padding-left">参考答案</text>
				<text @tap="toggleQues" class="padding-left">选题</text>
				<text @tap="showStudentList" class="padding-left">回评</text>
				<text @tap="toggleBoard" class="padding-left">打分板<text class="cuIcon-order"></text></text>
			</view>
		</view>
		<!-- 标题栏和状态栏占位符 -->
		<view class="titleNview-placing"></view>
		<view class="padding-top-xs padding-bottom-xs padding-left-lg padding-right-lg text-sm solid-bottom">
			<text class="padding-left-lg">进度 {{readProgress}}/{{formatQuesList.length}}</text>
			<text class="padding-left-lg">满分：{{formatQuesList[questionIndex].score}}</text>
			<text class="padding-left-lg">总分：{{totalScore}}</text>
			<text class="padding-left-lg">得分：{{formatQuesList[questionIndex].currentScore!=null?formatQuesList[questionIndex].currentScore:'未评'}}</text>
		</view>
		<!-- 试卷展示区域 -->

		<view class="padding paperArea">
			<movable-area class="picture-area" :scale-area="true">  
			    <movable-view  
			        class="picture-view"  
			        style="width: 1000rpx;height:600rpx;" 
			        direction="all"  
			        :x="200"  
			        :y="50"  
			        :scale="true"  
			        :scale-min="1"  
			        :scale-max="2"
			        >  
			        <image class="margin-top" style="width: 100%;"  mode="aspectFit" v-for="item in questionList[questionIndex].answerArea"
			         :src="item.img"></image>
			    </movable-view>  
			</movable-area>
			
		</view>

		<view v-if="commentShow" class="commentArea-APP bg-gray padding-xs tui-flex-box animation-slide-top">
			<view class="tui-flex tui-align-between">
				<view class="tui-col-11 item item-input">
					{{currentScore}}
				</view>
				<view @tap="keyDel" class="tui-col-5 item" style="margin-right: 0;">
					<text class="cuIcon-backwardfill"></text>
				</view>
			</view>
			<view class="tui-flex tui-align-between">
				<view @tap="keyRemove" class="tui-col-4 item">清空</view>
				<view @tap="fullMark" class="tui-col-4 item">满分</view>
				<view @tap="zeroScore" class="tui-col-4 item">零分</view>
			</view>
			<view class="tui-flex tui-align-between">
				<view @tap="keyInput" class="tui-col-4 item" data-score="1">1</view>
				<view @tap="keyInput" class="tui-col-4 item" data-score="2">2</view>
				<view @tap="keyInput" class="tui-col-4 item" data-score="3">3</view>
			</view>
			<view class="tui-flex tui-align-between">
				<view @tap="keyInput" class="tui-col-4 item" data-score="4">4</view>
				<view @tap="keyInput" class="tui-col-4 item" data-score="5">5</view>
				<view @tap="keyInput" class="tui-col-4 item" data-score="6">6</view>
			</view>
			<view class="tui-flex tui-align-between">
				<view @tap="keyInput" class="tui-col-4 item" data-score="7">7</view>
				<view @tap="keyInput" class="tui-col-4 item" data-score="8">8</view>
				<view @tap="keyInput" class="tui-col-4 item" data-score="9">9</view>
			</view>
			<view class="tui-flex tui-align-between">
				<view @tap="keyInput" class="tui-col-4 item" data-score="0">0</view>
				<view @tap="keyInput" class="tui-col-4 item" data-score="0.5">.5</view>
				<view @tap="keySubmit" class="tui-col-4 item item-submit">提交</view>
			</view>
			<view @tap="hideComment" class="item-unfold item cuIcon-fold" style="margin-right: 0;margin-bottom: 0;"></view>
		</view>

		<tf-loading text="加载中.." mask="true" click="true" ref="loading"></tf-loading>
		<!-- 侧边抽屉全卷预览 -->
		<view class="cu-modal drawer-modal justify-start" :class="allViewModel?'show':''" @tap="hideAllView">
			<view style="overflow-y: scroll;" class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in questionList" :key="index">
						<view class="content">
							<view>{{index.student}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 参考答案model -->
		<view class="cu-modal" :class="standardAreaShow?'show':''">
			<view class="cu-dialog">
				<view class="bg-img">
					<view class="cu-bar justify-end text-white">
						<image class="margin-top" mode="widthFix" v-for="item in questionList[questionIndex].answer" :src="item.img"></image>
						<view class="action" @tap="hideStandardArea">
							<text class="cuIcon-close text-orange"></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideStandardArea">我知道了</view>
				</view>
			</view>
		</view>
		<!-- 题干model -->
		<view class="cu-modal" :class="questionShow?'show':''">
			<view class="cu-dialog">
				<view class="bg-img">
					<view class="cu-bar justify-end text-white">
						<image class="margin-top" mode="widthFix" v-for="item in questionList[questionIndex].questionArea" :src="item.img"></image>
						<view class="action" @tap="hideQuestionModel">
							<text class="cuIcon-close text-orange"></text>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideQuestion">我知道了</view>
				</view>
			</view>
		</view>
		<!-- 考生预览 -->
		<view class="cu-modal drawer-modal justify-start" :class="studentModel?'show':''" @tap="hideStudent">
			<view style="overflow-y: scroll;" class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<!-- <view style="padding-left: 100rpx;" class="cu-item arrow" v-for="(item,index) in studentList" :key="index">
						<view class="content">
							<view>{{index +1}}</view>
						</view>
					</view> -->
					<view class="padding-top padding-bottom" style="padding-left: 100rpx;">
						<text style="width: 300rpx;display: inline-block;">学生序号</text>
						<text style="width: 200rpx;display: inline-block;">已阅/全部</text>
						<text style="width: 200rpx;display: inline-block;">得分</text>
					</view>
					<view @tap="chooseStudent(item.student)" style="padding-left: 100rpx;" class="cu-item arrow" v-for="(item,index) in studentList"
					 :key="index">
						<view class="content">
							<text style="width: 300rpx;display: inline-block;">{{index+1}}</text>
							<text style="width: 200rpx;display: inline-block;">{{item.status.length}}/{{questionList.length}}</text>
							<text style="width: 200rpx;display: inline-block;">{{item.totalScore}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 试题预览 -->
		<view class="cu-modal drawer-modal justify-start" :class="questionModel?'show':''" @tap="hideQuestion">
			<view style="overflow-y: scroll;" class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="padding-top padding-bottom" style="padding-left: 100rpx;">
						<text style="width: 300rpx;display: inline-block;">题号</text>
						<text style="width: 200rpx;display: inline-block;">评分情况</text>
						<text style="width: 200rpx;display: inline-block;">得分</text>
					</view>
					<view @tap="chooseQues(index)" style="padding-left: 100rpx;" class="cu-item arrow" v-for="(item,index) in formatQuesList"
					 :key="index">
						<view class="content">
							<text style="width: 300rpx;display: inline-block;">{{item.label}}</text>
							<text style="width: 200rpx;display: inline-block;">{{item.currentScore!=null?'已评':'未评'}}</text>
							<text style="width: 200rpx;display: inline-block;">{{item.currentScore}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		paperDetail,
		getList,
		paperSubmit
	} from '@/api/apps/teacherRead'
	export default {
		data() {
			return {
				groupId: "",
				headerPosition: "fixed",
				paperList: [],
				questionList: [], //试题
				statusMap: [],
				paperLog: {}, //试卷位置等信息
				userPaper: null, //考生试卷信息
				questionIndex: 0,
				screenLandscape: false, //屏幕是否横向显示
				allViewModel: false,
				CustomBar: 40,
				currentScore: 0, //当前输入的分数
				commentShow: true,
				standardAreaShow: false,
				studentList: [], //该任务下的学生列表
				studentModel: false,
				questionShow:false,
				questionModel: false,
				statusMap: null,
			}
		},
		onReady() {
			this.$refs.loading.open()
			/*  #ifdef  APP-PLUS  */
			uni.showToast({
				title: "进入全屏阅卷模式",
				icon: "none"
			})
			plus.screen.lockOrientation("landscape-primary");
			plus.navigator.setFullscreen(true)
			/* #endif */
		},
		onLoad(options) {
			let groupId = options.groupId;
			this.groupId = groupId
			this.getDetail(groupId)
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		computed: {
			//试题列表
			formatQuesList() {
				let questionList = this.questionList
				questionList.forEach(item => {
					for (let i in this.statusMap) {
						if (item.id == i) {
							item.currentScore = this.statusMap[i].score
							item.is_right = this.statusMap[i].is_right
						}
					}
				})
				return questionList
			},
			//当前阅卷进度
			readProgress() {
				let i = 0
				this.formatQuesList.map(item => {
					if (item.currentScore != null) {
						i += 1
					}
				})
				return i
			},
			//当前总分
			totalScore() {
				let i = 0
				this.formatQuesList.map(item => {
					if (item.currentScore != null) {
						i += item.currentScore
					}
				})
				return i
			}
		},
		methods: {
			movableScale(e) {  
			    console.log(JSON.stringify(e));  
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
				/*  #ifdef  APP-PLUS  */
				plus.screen.lockOrientation("portrait-primary");
				/*  #endif  */
			},
			//设置屏幕方向
			setDirection() {
				if (!this.screenLandscape) {
					plus.screen.lockOrientation("landscape-primary");
				} else {
					plus.screen.lockOrientation("portrait-primary");
				}
				this.screenLandscape = !this.screenLandscape
			},
			//获取试题
			fetchPaper(groupId, userPaper) {
				getList().then(res => {
					let data = res.data.data
					if (data.length > 0) {
						data.forEach(item => {
							if (item.id == groupId) {

								let paperUrl = item.paperLog.paperUrl
								let answerUrl = item.paperLog.answerUrl
								let answerSheetUrl = item.paperLog.answerSheetUrl

								if (paperUrl != "") {
									paperUrl = JSON.parse(paperUrl)
								}
								if (answerUrl != "") {
									answerUrl = JSON.parse(answerUrl)
								}
								if (answerSheetUrl != "") {
									answerSheetUrl = JSON.parse(answerSheetUrl)
								}

								item.questionList.forEach(ques => {
									ques.label = "第" + ques.maxTopic + "题第" + ques.minTopic + "小题"
									ques.answerArea = ques.answerArea != "" ? JSON.parse(ques.answerArea) : ""
									ques.questionArea = ques.questionArea != "" ? JSON.parse(ques.questionArea) : ""
									ques.answer = ques.answer != "" ? JSON.parse(ques.answer) : ""
									if (ques.questionArea != "") {
										ques.questionArea.forEach((area, index) => {
											area.img = paperUrl[area.index].url + "?x-oss-process=image/crop,x_" + area.x + ",y_" + area.y +
												",w_" +
												area.w + ",h_" + area.h
										})
									}
									if (ques.answerArea != "") {
										ques.answerArea.forEach((area, index) => {
											area.img = paperUrl[area.index].url + "?x-oss-process=image/crop,x_" + area.x + ",y_" + area.y +
												",w_" +
												area.w + ",h_" + area.h
										})
									}
									if (ques.answer != "") {
										ques.answer.forEach((area, index) => {
											area.img = answerSheetUrl[area.index].url + "?x-oss-process=image/crop,x_" + area.x + ",y_" + area.y +
												",w_" +
												area.w + ",h_" + area.h
										})
									}

								})
								console.log(item.questionList)
								this.questionList = item.questionList
								this.paperLog = item.paperLog

							}
						})


						this.paperList = data;
						this.$refs.loading.close()
					}
				}).catch(err => {
					this.$refs.loading.close()
				})
			},
			getDetail(groupId, studentId) {
				let params = {
					groupId: groupId,
				}
				if (studentId) {
					params.studentId = studentId
				}
				paperDetail(params).then(res => {
					let data = res.data.data
					let userPaper = data.userPaper
					let studentList = data.overList
					let statusMap = data.statusMap
					let a = [];
					for (let i in statusMap) {
						a.push(statusMap[i])
					}
					studentList.forEach(item => {
						let temp = []
						let totalScore = 0
						for (let i in item.status) {
							temp.push({
								...item.status[i],
								questionId: i
							})
							totalScore += item.status[i].score
						}
						item.totalScore = totalScore
						item.status = temp
					})
					console.log(studentList)
					this.questionIndex = a.length;
					this.statusMap = statusMap
					this.userPaper = userPaper
					this.studentList = studentList
					this.fetchPaper(groupId, userPaper);
				}).catch(err => {
					uni.showToast({
						title: err.data.msg,
						icon: "none"
					})
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				})
			},
			//改变试题
			questionChange(e) {
				this.questionIndex = e.detail.value
			},

			//点击图片预览
			previewImg(e) {
				let img = this.questionList[this.questionIndex].answerArea[0].img
				uni.previewImage({
					urls: [img],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//全卷评分预览
			allView() {
				this.allViewModel = true
			},
			hideAllView() {
				this.allViewModel = false
			},
			//底部键盘输入事件
			keyInput(e) {
				let score = e.currentTarget.dataset.score

				if (this.currentScore.toString().indexOf(".") != -1) {
					if (this.currentScore.toString().split(".")[1].length >= 1) {
						return
					}
				}
				let tempScore = this.currentScore
				tempScore = Number(tempScore) + Number(score);
				if (tempScore > this.questionList[this.questionIndex].score) {
					uni.showToast({
						title: "得分不能超过该题满分",
						icon: "none"
					})
					return
				}
				if (this.currentScore == "0") {
					this.currentScore = ""
				}
				if (score == "0.5") {
					this.currentScore = Number(this.currentScore) + 0.5
				} else {
					this.currentScore += score;
				}

			},
			//底部键盘删除事件
			keyDel() {
				if (this.currentScore == "0") {
					return
				}
				this.currentScore = this.currentScore.toString().slice(0, this.currentScore.length - 1)
			},
			//满分
			fullMark() {
				this.currentScore = this.questionList[this.questionIndex].score
			},
			//零分
			zeroScore() {
				this.currentScore = 0
			},
			//清空
			keyRemove() {
				this.currentScore = 0
			},
			//提交分数
			keySubmit() {
				let currentQues = this.questionList[this.questionIndex]
				let questionUrl = []
				this.questionList[this.questionIndex].questionArea.map(item => {
					questionUrl.push(item.img)
				})
				let sourceUrl = []
				this.questionList[this.questionIndex].answer.map(item => {
					sourceUrl.push(item.img)
				})
				let userAnswer = []
				this.questionList[this.questionIndex].answerArea.map(item => {
					userAnswer.push(item.img)
				})
				let is_right = 0
				if (this.currentScore > 0 && this.currentScore < this.questionList[this.questionIndex].score) {
					is_right = 1
				}
				if (this.currentScore == this.questionList[this.questionIndex].score) {
					is_right = 2
				}
				let params = {
					groupId: this.groupId,
					maxTopic: currentQues.maxTopic,
					minTopic: currentQues.minTopic,
					questionId: currentQues.id,
					studentId: this.userPaper.userId,
					questionUrl: JSON.stringify(questionUrl),
					sourceUrl: JSON.stringify(sourceUrl),
					userAnswer: JSON.stringify(userAnswer),
					typeTopic: currentQues.typeTopic,
					userPaperId: this.userPaper.id,
					score: this.currentScore,
					is_right: is_right
				}
				paperSubmit(params).then(res => {
					uni.showToast({
						title: "打分成功",
						icon: "success"
					})
					this.currentScore = 0
					this.getDetail(this.groupId)
				})
			},
			//显隐试题
			toggleQues() {
				this.questionModel = !this.questionModel
			},
			hideQuestion() {
				this.questionModel = false
			},
			//显隐打分板
			toggleBoard() {
				this.commentShow = !this.commentShow
			},
			//隐藏打分板
			hideComment() {
				this.commentShow = false
			},
			//显示参考答案
			standardArea() {
				this.standardAreaShow = !this.standardAreaShow
			},
			//隐藏参考答案
			hideStandardArea() {
				this.standardAreaShow = false
			},
			//显示题干
			showQuestion(){
				this.questionShow = !this.questionShow
			},
			hideQuestionModel(){
				this.questionShow = false
			},
			//考生列表
			showStudentList() {
				this.studentModel = true;
			},
			hideStudent() {
				this.studentModel = false;
			},
			//试题列表快捷选题
			chooseQues(index) {
				this.questionIndex = index
				this.questionModel = false
			},
			//学生列表快捷选择
			chooseStudent(studentId) {
				this.getDetail(this.groupId, studentId)
				this.studentModel = false
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import "../../../../colorui/animation.css";

	.status {
		width: 100%;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);
		/*  #endif  */
		background-color: $uni-bg-pink;
		position: fixed;
		top: 0;
		z-index: 99999;
	}

	.header {
		width: 100%;
		height: 80upx;
		background-color: $uni-bg-pink;
		display: flex;
		position: fixed;
		top: 0;
		padding: 20upx 30upx;
		z-index: 99999;
	}

	.titleNview-placing {
		height: var(--status-bar-height);
		/*  #ifndef  APP-PLUS  */
		padding-top: 80upx;
		/*  #endif  */
		/*  #ifdef  APP-PLUS  */
		padding-top: 24upx;
		/*  #endif  */
		box-sizing: content-box;
	}

	.paperArea {
		padding: 40upx 100upx;
		width: 65%;
	}

	.commentArea {
		position: fixed;
		bottom: 0;
		z-index: 99;
		width: 100%;
		.row {
			display: flex;
			.item {
				padding: 20rpx 0;
				flex: 1;
				border-left: 1px solid #f2f2f2;
				&.item-lg {
					flex: 1.5;
				}
			}
		}
	}

	.commentArea-APP {
		background-color: #ddd;
		position: fixed;
		top: 80upx;
		right: 0;
		width: 30%;

		.item {
			background-color: #666;
			color: #fff;
			text-align: center;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
			padding: 20rpx 0;

			&:nth-child(3n) {
				margin-right: 0;
			}

			&.item-input {
				background-color: #ccc;
				color: #333;
				text-align: left;
				text-indent: 10rpx;
				font-size: 32rpx;
			}

			&.item-unfold {
				background-color: #ccc;
			}

			&.item-submit {
				background-color: #f0804e;
			}
		}
	}
</style>
