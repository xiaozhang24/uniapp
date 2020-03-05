import Request from '@/js_sdk/pocky-request/index';

export const getMenu = productCode => {
  return Request().request({
    url: '/edu-appmanage/educationrolemenu/front-getAppMenu',
    method: 'get',
    params: {
      productCode
    }
  })
}

export const refreshToken = refresh_token => {
  return Request().request({
    url: '/blade-auth/oauth/token',
    method: 'post',
    params: {
      refresh_token:refresh_token,
	  grant_type: "refresh_token",
	  scope: "all"
    },
	 count: 0
  })
}