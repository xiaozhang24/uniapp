// import http from '@/common/vmeitime-http/interface'
import Request from '@/js_sdk/pocky-request/index';

export const records = (current,size,params) => {
	return Request().request({
		url: '/edu-attendance/studentleave/list',
		method: 'GET',
		params:{
			...params,
			current,
			size
		}
	})
}

export const detail = (data) => {
	return Request().request({
		url: '/edu-attendance/studentleave/detail',
		method: 'GET',
		data,
	})
}

export const remove = (data) => {
	return Request().request({
		url: '/edu-attendance/studentleave/remove',
		method: 'POST',
		meta:{
			isSerialize:true
		},
		data,
	})
}

export const getMyStudentInfo = () => {
  return Request().request({
    url: '/edu-basic-archives/basicstudent/getMyStudentInfo',
    method: 'GET'
  })
}


//学生请假流程
export const studentLeaveProcess = (data,params) => {
	return Request().request({
		url: '/edu-attendance/studentleave/start-process',
		method: 'POST',
		data:data,
		params:params
	})
}

export const flowList = (data) => {
	return Request().request({
		url: '/blade-flow/process/history-flow-list',
		method: 'GET',
		data,
	})
}