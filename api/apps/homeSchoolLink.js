import Request from '@/js_sdk/pocky-request/index';

//收件箱
export const getNotice = params => {
  return Request().request({
    url: '/edu-inmail/inmail-content/page',
    method: 'get',
    params: {
      ...params
    }
  })
}

//发件箱
export const getMail = params => {
  return Request().request({
    url: '/edu-inmail/inmail/user-list',
    method: 'post',
    params: {
      ...params
    }
  })
}
//获取通知模板
export const getTemplate = params => {
  return Request().request({
    url: '/edu-message/system/templates',
    method: 'get',
    params: {
      ...params
    }
  })
}

//提交发送
export const submitMail = row => {
  return Request().request({
    url: '/edu-message/jxt/check',
    method: 'post',
	header: {
		contentType: 'application/json'
	},
    data:row
  })
}

//获取消息详情
export const msgDetail = params => {
  return Request().request({
    url: '/edu-inmail/inmail/list',
    method: 'get',
    params: {
      ...params
    }
  })
}

