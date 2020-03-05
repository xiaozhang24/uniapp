// import http from '@/common/vmeitime-http/interface'
import Request from '@/js_sdk/pocky-request/index';

export const basicCalendar = (data) => {
	return Request().request({
		url: '/edu-basic-archives/basiccalendar/list',
		method: 'GET',
		data,
	})
}