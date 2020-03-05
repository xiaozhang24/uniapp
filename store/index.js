import Vue from 'vue'
import Vuex from 'vuex'
import $mConfig from '@/config/index.config.js'
import $mRoutesConfig from '@/config/routes.config.js'
import $mRouter from '@/common/router.js'
import {
	getMenu
} from '@/api/system/menu'
Vue.use(Vuex)

// uni.setStorageSync("token", "oVG1b1Bgrb");
// uni.setStorageSync("openId", "oVG1b1Bgrb-l6jNYCUr6sYpQ5F-U");

const TOKEN = uni.getStorageSync("token") || "";
const OPENID = uni.getStorageSync("openId") || "";
const USER_INFO = uni.getStorageSync("userInfo") || {};
const CUSTOMER_INFO = uni.getStorageSync("customerInfo") || {};

const store = new Vuex.Store({
	state: {
		// 是否強制登录
		forcedLogin: $mConfig.forcedLogin,
		// 前端token
		token: TOKEN,
		// 用户openid
		openId: OPENID,
		// 用户信息 头像 昵称
		userInfo: USER_INFO,
		// 用户的商户信息
		customerInfo: CUSTOMER_INFO,
		//应用的权限及功能信息
		permission: uni.getStorageSync("permission") || {},
	},
	getters: {
		// 用户是否登录
		hasLogin: state => {
			if (state.token) {
				return true;
			} else {
				return false
			}
		},
		permission: state => state.permission
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
			uni.setStorageSync("token", token);
		},
		SET_REFRESH_TOKEN: (state, refreshToken) => {
			state.refreshToken = refreshToken;
			uni.setStorageSync("refreshToken", state.refreshToken);
		},
		GET_OPENID(state, code) {
			uni.request({
				url: 'http://192.168.20.8/edu-wechat/wechat/user-info', //仅为示例，并非真实接口地址。
				data: {
					code: code
				},
				success: (res) => {
					alert(JSON.stringify(res.data));
				}
			});
		},
		SET_OPENID(state, openId) {
			state.openId = openId;
			uni.setStorageSync("openId", openId);
		},
		SET_USERINFO(state, userInfo) {
			state.userInfo = userInfo;
			uni.setStorageSync("userInfo", userInfo);
		},
		SET_CUSTOMERINFO(state, customerInfo) {
			state.customerInfo = customerInfo;
			uni.setStorageSync("customerInfo", customerInfo);
		},
		SET_PERMISSION: (state, permission) => {
			var result = []

			function getCode(list) {
				list.forEach(ele => {
					if (typeof ele === 'object') {
						const chiildren = ele.children
						if (chiildren.length) {
							chiildren.forEach(item => {
								result.push(item.code)
							})
						}
					}
				})
			}
			getCode(permission)
			state.permission = {}
			result.forEach(ele => {
				state.permission[ele] = true
			})
			uni.setStorageSync("permission", state.permission);
		},
		SET_LOGOUT(state) {
			state.token = "";
			state.userInfo = "";
			uni.removeStorage({
				key: 'token'
			})
			uni.removeStorage({
				key: 'userInfo'
			})
			uni.removeStorage({
				key: 'permission'
			})
		}
	},
	actions: {
		// 登录过期 重新登录
		reLogin({
			commit
		}, info) {
			commit("SET_TOKEN", "");
			$mRouter.redirectTo({
				route: $mRoutesConfig.login
			});
		},
		//获取应用及功能权限
		GetButtons({
			commit
		}) {
			return new Promise(resolve => {
				getMenu($mConfig.productCode).then(res => {
					const data = res.data.data
					commit('SET_PERMISSION', data.app)
					resolve()
				})
			})
		},
	}
})

export default store
