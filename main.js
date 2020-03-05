import Vue from 'vue'
import store from './store'
import App from './App'
import Json from './json' //测试用数据
// import { iconfontUrl, iconfontVersion } from '@/config/env' 
import $AppEntryController from './AppEntryController.js'

import $mRouter from './common/router.js'
import $mUtils from './common/utils.js'
import $mConfig from "./config/index.config.js"
import $mAssetsPath from './config/assets.config.js'
import $mRoutesConfig from './config/routes.config.js'
import cuCustom from './colorui/components/cu-custom.vue'
import tfLoading from "./components/tf-loading/tf-loading.vue";
import onfire from 'onfire.js'

Vue.component('tf-loading',tfLoading)
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

Vue.prototype.$fire = new onfire()

Vue.prototype.$store = store;

Vue.prototype.$AppEntryController = $AppEntryController;

Vue.prototype.$mRouter = $mRouter;

Vue.prototype.$mUtils = $mUtils;

Vue.prototype.$mConfig = $mConfig;

Vue.prototype.$mAssetsPath = $mAssetsPath;

Vue.prototype.$mRoutesConfig = $mRoutesConfig;

$mRouter.beforeEach((navType, to) => {
	console.log(to)
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	if (to.route.path === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.redirectTo({
			url: $mUtils.objParseUrlAndParam($mRoutesConfig.main.path, to.query)
		})
		return;
	}

	// 过滤需要权限的页面
	
	if (to.route.requiresAuth) {

		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				uni.redirectTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			} else {
				uni.navigateTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
			}
		}
	} else {
		uni[navType]({
			url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
