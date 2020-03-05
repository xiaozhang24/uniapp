import Request from '@/js_sdk/pocky-request/index';

export const records = (data) => {
	return Request().request({
		url: '/edu-attendance/comeinapply/list',
		method: 'GET',
		data,
	})
}

export const getStudentInfo = () => {
	return Request().request({
		url: '/edu-basic-archives/basicparent/getStudentInfoByParent',
		method: 'GET'
	})
}

export const parentEnterProcess = (data, params) => {
	return Request().request({
		url: '/edu-attendance/comeinapply/start-process',
		header: {
			contentType: 'application/json'
		},
		method: 'POST',
		data,
		params: params
	})
}
