import Request from '@/js_sdk/pocky-request/index';

//获取字典
export const getDict = (params) => {
	return Request().request({
		url: '/blade-system/dict/dictionary',
		method: 'GET',
		params,
	})
}

//刷新TOKEN
export const refreshToken = refresh_token => {
	return Request().request({
		url: '/blade-auth/oauth/token',
		method: 'post',
		params: {
			refresh_token,
			grant_type: 'refresh_token',
			scope: 'all'
		}
	})
}
