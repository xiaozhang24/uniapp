export default {

	/* 
	 * obj 转 params字符串参数  
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = "";
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},

	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	},

	/* 
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},



	/**
	 * 乘法，解决js精度损失问题
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	accMul(arg1, arg2) {
		arg1 = arg1 || 0;
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	},
	/**
	 * 根据身份证号码计算年龄，性别 ，出生日期
	 * @param {*} certificateNo 
	 * */
	CertificateNoParse(certificateNo) {
		var pat =
			/^\d{6}(((19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}([0-9]|x|X))|(\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}))$/;
		if (!pat.test(certificateNo))
			return null;

		var parseInner = function(certificateNo, idxSexStart, birthYearSpan) {
			var res = {};
			var idxSex = 1 - certificateNo.substr(idxSexStart, 1) % 2;
			res.sex = idxSex == '1' ? '女' : '男';

			var year = (birthYearSpan == 2 ? '19' : '') +
				certificateNo.substr(6, birthYearSpan);
			var month = certificateNo.substr(6 + birthYearSpan, 2);
			var day = certificateNo.substr(8 + birthYearSpan, 2);
			res.birthday = year + '-' + month + '-' + day;

			var d = new Date(); //当然，在正式项目中，这里应该获取服务器的当前时间  
			var monthFloor = ((d.getMonth() + 1) < parseInt(month, 10) || (d.getMonth() + 1) == parseInt(month, 10) && d.getDate() <
				parseInt(day, 10)) ? 1 : 0;
			res.age = d.getFullYear() - parseInt(year, 10) - monthFloor;
			return res;
		};

		return parseInner(certificateNo, certificateNo.length == 15 ? 14 : 16, certificateNo.length == 15 ? 2 : 4);
	},

	/**
	 * 函数防抖
	 */
	debounce(fn, delay) {
		delay = delay || 600
		let timer
		return function() {
			let _ = this
			let args = arguments
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => {
				fn.call(_, args)
			}, delay)
		}
	},

	/**
	 * 函数节流
	 */
	throttle(fn, interval) {
		let last
		let timer
		interval = interval || 600
		return function() {
			let ctx = this
			let args = arguments
			let now = new Date()
			if (last && now - last < interval) {
				clearTimeout(timer)
				timer = setTimeout(function() {
					last = now
					fn.apply(ctx, args)
				}, interval)
			} else {
				last = now
				fn.apply(ctx, args)
			}
		}
	},
	/**
	 * 处理接口数据 -1 的问题
	 * */
	formatData(data) {
		for (let i in data) {
			if (data[i] == -1) data[i] = ''
		}
		return data
	},
	formatDataArr(data) {
		data.forEach(item => {
			for (let i in item) {
				if (item[i] == -1) item[i] = ''
			}
		})
		return data
	},
	calcDate(date1, date2) {
		let date3 = date2 - date1;

		let days = Math.floor(date3 / (24 * 3600 * 1000))

		let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
		let hours = Math.floor(leave1 / (3600 * 1000))

		let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
		let minutes = Math.floor(leave2 / (60 * 1000))

		let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
		let seconds = Math.round(date3 / 1000)
		return {
			leave1,
			leave2,
			leave3,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		}
	},
	/**
	 * 判断是否为空
	 */
	validatenull(val) {
	    if (typeof val == 'boolean') {
	        return false;
	    }
	    if (typeof val == 'number') {
	        return false;
	    }
	    if (val instanceof Array) {
	        if (val.length == 0) return true;
	    } else if (val instanceof Object) {
	        if (JSON.stringify(val) === '{}') return true;
	    } else {
	        if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
	        return false;
	    }
	    return false;
	}

}
