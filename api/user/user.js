// import http from '@/common/vmeitime-http/interface'
import Request from '@/js_sdk/pocky-request/index';

export const login = (data) => {
    return Request().request({
        url: '/blade-auth/oauth/token',
        method: 'POST',
		meta:{
			isSerialize:true
		},
        data,
    })
}