import Interceptor from './core/interceptor';
import Request from './index';
import {refreshToken} from '../../api/system/menu';
import $mConfig from "@/config/index.config.js"
const Base64 = require('@/static/js/base64.js').Base64;

export const globalInterceptor = {
    request: new Interceptor(),
    response: new Interceptor()
};

/**
 * 全局配置
 * 只能配置 静态数据
 * `content-type` 默认为 application/json
 * header 中`content-type`设置特殊参数 或 配置其他会导致触发 跨域 问题，出现跨域会直接进入响应拦截器的catch函数中
 */
export const config = {
    baseURL: $mConfig.baseUrl,
    // dataType: 'json',
    // responseType: 'text',
    header: {
        // uid: 'xxxx',
		"Authorization": "Basic " + Base64.encode($mConfig.clientId + ":" + $mConfig.clientSecret),
        contentType: 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
    }
};

/**
 * 全局 请求拦截器
 * 例如: 配置token
 *
 * `return config` 继续发送请求
 * `return false` 会停止发送请求，不会进入错误数据拦截，也不会进入请求对象中的catch函数中
 * `return Promise.reject('xxxxx')` 停止发送请求, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} config 发送请求的配置数据
 */
globalInterceptor.request.use(
    (config) => {
        // getToken() && (config.header.token = getToken());
		let token = uni.getStorageSync('token');
		config.header['Blade-Auth'] = "bearer " + token
		config.count = 0
        return config;
        // return false;
        // return Promise.reject('is error')
    },
    (err) => {
        return false;
    }
);

// 支持添加多个请求、响应拦截器
// globalInterceptor.request.use(config => {
//     console.log('is global request interceptor 2');
//     return config;
// }, err => {
//     console.error('global request: ', err);
//     return false;
// });

/**
 * 全局 响应拦截器
 * 例如: 根据状态码选择性拦截、过滤转换数据
 *
 * `return res` 继续返回数据
 * `return false` 停止返回数据，不会进入错误数据拦截，也不会进入catch函数中
 * `return Promise.reject('xxxxx')` 返回错误信息, 会错误数据拦截，也会进入catch函数中
 *
 * @param {Object} res 请求返回的数据
 * @param {Object} config 发送请求的配置数据
 * @return {Object|Boolean|Promise<reject>}
 */
globalInterceptor.response.use(
    (res, config) => {
        // 回传数据中没有携带 code
        if (!(res.data && res.data.code)) {
            return res;
        }

        // 用code模拟http状态码
        const code = parseInt(res.data.code);

        // 20x ~ 30x
        if (200 <= code && code < 400) {
            return res;
        } else if (code == 401&&config.count==0) {
            // token 验证失败, 并且这个实例是第一次重复请求
            config.url = config.instanceURL;
			let token = uni.getStorageSync("refreshToken")
            return getApiToken(token)
				.then(config.count++)
                .then(() => Request().request(config));
        } else {
            return Promise.reject(res, config);
        }

        // return false;
        // return Promise.reject('is error')
    },
    (err, config) => {
        const { errMsg, data } = err;

        return Promise.reject({ errMsg, data, config });
    }
);

// 重新请求更新获取 token
async function getApiToken(token) {
    const res = await refreshToken(token)
    let tokenD = res.data.access_token;
	saveToken(tokenD)
    return tokenD;
}

// 获取 localStorage 中的 token
function getToken() {
    return uni.getStorageSync('token');
}

// 保存 token 到 localStorage
function saveToken(token) {
    uni.setStorageSync('token', token);
}
