import Request from '@/js_sdk/pocky-request/index';

export const getList = (params) => {
	return Request().request({
		url: '/edu-basic-archives/basicteacher/page',
		method: 'get',
		params:{
			...params,
		}
	})
}
export const detail = (params) => {
	return Request().request({
		url: '/edu-basic-archives/basicteacher/detail',
		method: 'get',
		params:{
			...params,
		}
	})
}

export const submit = (row) => {
	return Request().request({
		url: '/edu-basic-archives/basicteacher/submit',
		method: 'post',
		header: {
			contentType: 'application/json'
		},
		data:row
	})
}

export const remove = ids => {
  return Request().request({
    url: '/edu-basic-archives/basicteacher/remove',
    method: 'post',
    params: {
      ids
    }
  })
}
