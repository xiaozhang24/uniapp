import Request from '@/js_sdk/pocky-request/index';

export const getList = (params) => {
	return Request().request({
		url: '/edu-basic-archives/basicstudent/page',
		method: 'get',
		params: {
			...params,
		}
	})
}

export const detail = (params) => {
	return Request().request({
		url: '/edu-basic-archives/basicstudent/detail',
		method: 'get',
		params: {
			...params
		}
	})
}

export const submit = (row) => {
	return Request().request({
		url: '/edu-basic-archives/basicstudent/submit',
		method: 'post',
		header: {
			contentType: 'application/json'
		},
		data:row
	})
}

export const remove = ids => {
	return Request().request({
		url: '/edu-basic-archives/basicstudent/remove',
		method: 'post',
		params: {
			ids
		}
	})
}
export const gradeList = (params) => {
	return Request().request({
		url: '/edu-basic-archives/basicgrade/list',
		method: 'get',
		params: {
			...params
		}
	})
}

export const classList = (params) => {
	return Request().request({
		url: '/edu-basic-archives/basicclass/page',
		method: 'get',
		params: {
			...params
		}
	})
}