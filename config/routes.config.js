/* 
 * 路由表对象：
 * 该文件挂载在Vue原型中 $mRoutesConfig
 * 作用：调用$mRouter对象的方法 传入以下对应的路由对象，详细见common目录下的router.js
 * 示例：this.$mRouter.push({route:this.$mRoutesConfig.main,query:{a:1}})
 * 注意：所有在pages目录下新建的页面都必须在"路由表"中进行声明，并且在框架的pages.json注册。
 * 
 * 配置参数项说明： 
 * name:可选配置 （路由名称）
 * path:必填配置 （路由地址）
 * requiresAuth:可选配置 （是否权限路由）
 */

export default {
	userInfo: {
		name: "基本信息",
		path: "/pages/user/userInfo",
		requiresAuth: true
	},
	home: {
		name: "首页",
		path: "/pages/home/index",
		requiresAuth: true
	},
	user_set: {
		name: "设置",
		path: "/pages/user/set",
		requiresAuth: true
	},
	user_notice: {
		name: "通知",
		path: "/pages/user/notice",
		requiresAuth: true
	},
	calendar: {
		name: "账号绑定",
		path: "/pages/public/weixin_bind"
	},
	calendar: {
		name: "校历",
		path: "/pages/home/calendar"
	},
	search: {
		name: "搜索",
		path: "/pages/public/search"
	},
	news: {
		name: "新闻列表",
		path: "/pages/news/index"
	},
	news_cmt: {
		name: "发表评论",
		path: "/pages/news/news-cmt-box",
	},
	news_cmt_list: {
		name: "评论列表",
		path: "/pages/news/news-cmt-list",
	},
	news_cmt_reply: {
		name: "回复",
		path: "/pages/news/news-cmt-reply",
	},
	newsDetail: {
		name: "新闻详情",
		path: "/pages/news/newsDetail",
	},
	news_video: {
		name: "新闻详情",
		path: "/pages/news/news-video",
	},
	news_search: {
		name: "新闻搜索",
		path: "/pages/news/news-search",
	},
	login: {
		name: "登录",
		path: "/pages/login/login"
	},
	reg: {
		name: "注册",
		path: "/pages/login/register"
	},
	findPsd: {
		name: "找回密码",
		path: "/pages/login/findPassword"
	},
	appConfig: {
		name: "应用配置",
		path: "/pages/home/appConfig",
		requiresAuth: true
	},
	course: {
		name: "课程",
		path: "/pages/course/index",
	},
	course_classify: {
		name: "课程分类",
		path: "/pages/course/course_classify",
	},
}
