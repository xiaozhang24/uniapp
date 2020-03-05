<template>
	<view class="container">
		
		<view class="back-btn yticon cuIcon-back_android" @click="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<form @submit="bindLogin">
				<view class="input-content">
					<view class="input-item">
						<text class="tit">租户ID</text>
						<input type="number" name="tenantId" :value="tenantId" placeholder="请输入租户ID" maxlength="11" data-key="tenantId"
						 @input="inputChange" />
					</view>
					<view class="input-item">
						<text class="tit">账号</text>
						<input type="text" name="username" :value="username" placeholder="请输入账号" maxlength="11" data-key="username"
						 @input="inputChange" />
					</view>
					<view class="input-item">
						<text class="tit">密码</text>
						<input type="password" name="password" value="password" placeholder="8-18位不含特殊字符的数字、字母组合" placeholder-class="input-empty"
						 maxlength="20" password data-key="password" @input="inputChange" @confirm="toLogin" />
					</view>
				</view>
				<button class="confirm-btn" formType="submit" :disabled="logining">登录</button>
			</form>
			<view class="forget-section" @click="findPsd">
				忘记密码?
			</view>

			<view class="thirdLogin text-center">
				<tui-divider width="60%" :gradual="true">第三方登录</tui-divider>
				<view class="loginList">
					<view class="item" @tap="weixinLogin">
						<image src="../../static/img/login/weixin.png"></image>
					</view>
					<view class="item" @tap="qqLogin">
						<image src="../../static/img/login/QQ.png"></image>
					</view>
					<view class="item" @tap="weiboLogin">
						<image src="../../static/img/login/weibo.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/api/user/user.js'
	import tuiDivider from "@/components/thor-ui/divider/divider"
	import {
		mapMutations,mapActions
	} from 'vuex';
	const form = require("components/thor-ui/utils/formValidation.js")
	export default {
		components:{
			tuiDivider
		},
		data() {
			return {
				tenantId: "000000",
				username: 'admin',
				password: '123456',
				logining: false,
				redirectRoute: this.$mRoutesConfig.home,
				logining: false,
				aweixin:null	
			}
		},
		onLoad() {
			// this.getService()
		},
		methods: {
			...mapMutations(['login']),
			...mapActions(['GetButtons']),
			getService(){
				var aweixin = null
				plus.oauth.getServices(function(services){
					services.forEach(item=>{
						if(item.id=="weixin"){
							aweixin = item
						}
					})
					console.log(aweixin)
					aweixin.logout(function(e){
						plus.nativeUI.alert("注销登录认证成功!");
					}, function(e){
						plus.nativeUI.alert("注销登录认证失败: "+JSON.stringify(e));
					});
				}, function(e){
					plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(e));
				} );
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.reg
				})
			},
			findPsd() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.findPsd
				})
			},
			// 登录
			async bindLogin(e) {
				let rules = [{
					name: "tenantId",
					rule: ["required"],
					msg: ["请输入租户ID"]
				}, {
					name: "username",
					rule: ["required"],
					msg: ["请输入账号"]
				}, {
					name: "password",
					rule: ["required"],
					msg: ["请输入密码"]
				}, ]
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				let params = {
					tenantId: this.tenantId,
					username: this.username,
					password: this.password,
					grant_type: 'password',
					scope: 'all',
					type: "account"
				}
				if (!checkRes) {
					uni.showLoading({
					    title: '登陆中'
					});
					
					login(
						params
					).then((res) => {
						console.log(res)
						this.loading = false;
						let userInfo = res.data
						this.$store.commit("SET_USERINFO", userInfo || {});
						console.log(userInfo)
						this.$store.dispatch("GetButtons")
						// 前端自动登录
						this.$store.commit("SET_TOKEN", userInfo.access_token);
						this.$store.commit("SET_REFRESH_TOKEN", userInfo.refresh_token);
						uni.showToast({
							title: "登录成功,当前登录用户：" + userInfo.nick_name,
							icon: "none",
							duration: 1000,
						});
						let _this = this;
						setTimeout(function() {
							_this.$mRouter.switchTab({
								route: _this.redirectRoute,
								query: _this.routeQuery,
							});
						}, 1000)
						uni.hideLoading()	
					}).catch((err) => {
						uni.hideLoading()
						this.loading = false;
						console.log('request fail', err);
					})
					
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}

			},
			// 微信登录
			weixinLogin(){
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					  console.log(loginRes)
				    uni.getUserInfo({
				         provider: 'weixin',
				         success: function (infoRes) {
				           console.log('用户昵称为：' + infoRes.userInfo.nickName);
				         }
				       });
				  },
				  complete:function(res){
					  console.log(res)
				  }
				});
			},
			// qq登录
			qqLogin(){
				var _that = this
				uni.login({
				  provider: 'qq',
				  success: function (loginRes) {
					  uni.getUserInfo({
					    provider: 'qq',
					    success: function (infoRes) {
					  	console.log(infoRes)
							_that.loginImage = infoRes.userInfo.figureurl_qq_2
					    }
					  });
				  }
				});
			},
			// 微博登录
			weiboLogin(){
				uni.login({
					provider:"sinaweibo",
					success: function (loginRes) {
					  console.log(loginRes.authResult);
					}
				})
			}
		},
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		padding-top: 55px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}

	.thirdLogin {
		.text{
			
		}
		.loginList {
			width: 500upx;
			height: 95upx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.item {
				width: 95upx;
				height: 95upx;
				background: #fff;
				border-radius: 95upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
