const CONFIG = {
        //开发环境配置
        development: {
                assetsPath: "/static/img", // 静态资源路径
                baseUrl: "http://192.168.20.11:8888/api",
				// #ifdef APP-PLUS
					clientId:"client_app_Br1D9E", //客户端id
					clientSecret:"1qotjneqofQeCffvSRd7RHAjBEIBwjxd", //客户端密钥
				// #endif
				// #ifdef H5
					clientId:"tfcloud_h5", //客户端id
					clientSecret:"tfcloud_h5_123", //客户端密钥
				// #endif
				productCode:"001", //产品code
				tokenTime: 3000,
                testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
                forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
                touristMode: true, // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
				iconfontUrl:`//at.alicdn.com/t/font_$key.css`  ,//阿里云字体库地址
				iconfontVersion:['567566_pwc3oottzol', '1066523_6bvkeuqao36'] //字体库版本
        },

        //生产环境配置
        production: {
                assetsPath: "/static/img", // 静态资源路径
                baseUrl: "http://easy-mock.liuup.com/mock/5c7d3b167f1dcc6ba7975f4d/example",
                clientId:"client_app_Br1D9E", //客户端id
                clientSecret:"1qotjneqofQeCffvSRd7RHAjBEIBwjxd", //客户端密钥
                testOpenId: "oEjRxwy7jL9PgG0kWeb4VcDTZEas", // 小程序测试openId
                forcedLogin: false, // touristMode游客模式下APP是否强制用户登录 场景：当用户进入登录页面后无法后退。
                touristMode: true, // APP是否开启游客模式， 游客模式true开启：APP打开后可以进入首页和无权限的页面，游客模式false关闭：APP打开后首先需要登录才能进入， 此时forcedLogin配置项失效。
        }

}
export default CONFIG[process.env.NODE_ENV];