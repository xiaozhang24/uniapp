import Request from '@/js_sdk/pocky-request/index';

export const getList = (params) => {
	return Request().request({
		url: '/edu-teaching/groupmember/group-list',
		method: 'POST',
		params:{
			...params,
		}
	})
}

export const paperDetail = (params) => {
	return Request().request({
		url: '/edu-teaching/groupmember/next-paper',
		method: 'POST',
		params:{
			...params,
		}
	})
}

export const paperSubmit = (data) => {
	return Request().request({
		url: '/edu-teaching/teachinguserscoredetail/submit',
		method: 'POST',
		header: {
			contentType: 'application/json'
		},
		data
	})
}