import Request from '@/js_sdk/pocky-request/index';

//获取字典
export const getList = (params) => {
	return Request().request({
		url: '/edu-basic-archives/basicgrade/list',
		method: 'GET',
		params,
	})
}