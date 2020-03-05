import Request from '@/js_sdk/pocky-request/index';

// 参数  type 1:班级 2:教师    searchId:(type为1是传设备code type为2时传userId)
// url: 'http:192.168.20.8/edu-academic/timetable/getOwnTimeTable',
export const getOwnTimeTable = (params) => {
	return Request().request({
		url: '/edu-academic/timetable/getOwnTimeTable',
		method: 'GET',
		params,
	})
}

// 参数 type 1:按班级查询 2:按教师查询      searchId:查询ID（按班级查则传班级ID，按教师查则传教师ID）
export const getNowTermOneTimeTable = (params) => {
	return Request().request({
		url: '/edu-academic/timetable/getNowTermOneTimeTable',
		method: 'GET',
		params,
	})
}

export const getRoleList = () => {
	return Request().request({
		url: '/blade-system/role/list',
		method: 'get',
	})
}
// 教师列表
// type 1：查班级 2：查教师
export const getTeacherList = () => {
	return Request().request({
		url: '/edu-academic/timetable/getNowTermTimeTableClassOrTeacher',
		method: 'get',
		params : {type : 2 }
	})
}
// 班级列表
export const getClassList = () => {
	return Request().request({
		url: '/edu-academic/timetable/getNowTermTimeTableClassOrTeacher',
		method: 'get',
		params : {type : 1 }
	})
}
