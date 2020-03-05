// import http from '@/common/vmeitime-http/interface'
import Request from '@/js_sdk/pocky-request/index';

export const appList = (data) => {
	return Request().request({
		url: '/edu-appmanage/educationappcloudpanel/getPanel',
		method: 'GET',
		data,
	})
}

export const allApps = (data) => {
	return Request().request({
		url: '/edu-appmanage/educationappcloudpanel/getAllApp',
		method: 'GET',
		data,
		count:0
	})
}

export const saveApp = (data) => {
	return Request().request({
		url: '/edu-appmanage/educationappcloudpanel/batchSave',
		method: 'POST',
		header: {
			contentType: 'application/json'
		},
		data:data
	})
}

export const recApp = (data) => {
	return Request().request({
		url: '/edu-appmanage/educationrecommendpanel/getUserPanel',
		
		method: 'GET',
		data
	})
}

//获取所有事务
export const startList = (data) => {
	return Request().request({
		url: '/blade-flow/work/start-list',
		method: 'GET',
		data,
	})
}

//获取消息模板
export const fetchTemplate = (data) => {
	return Request().request({
		url: '/edu-message/system/templates',
		method: 'GET',
		data,
	})
}
