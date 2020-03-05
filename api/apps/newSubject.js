import Request from '@/js_sdk/pocky-request/index';

export const getList = params => {
  return Request().request({
    url: '/edu-academic/combination/list',
    method: 'get',
    params: {
      ...params
    }
  })
}

export const evaluationList = type => {
  return Request().request({
    url: '/edu-evaluation/evaluation/evaluation-list',
    method: 'get',
    params: {
      type
    }
  })
}
export const testType = () => {
  return Request().request({
    url: '/blade-system/dict/dictionary?code=evaluation_type',
    method: 'get',
    params: {}
  })
}

export const getResultList = (params) => {
  return Request().request({
    url: '/edu-evaluation/evaluationuserresult/list',
    method: 'get',
    params: {
      ...params
    }
  })
}

export const evaluationSubmit = row => {
  return Request().request({
    url: '/edu-evaluation/evaluationuserresult/submit',
    method: 'post',
	header: {
		contentType: 'application/json'
	},
    data: row
  })
}

//获取学生的学科任务
export const getUserScheme = params => {
  return Request().request({
    url: '/edu-academic/selectionscheme/getOwnScheme',
    method: 'GET',
    params: {
      ...params
    }
  })
}
//获取学生已选择的选科组合信息
export const getUserSelection = params => {
  return Request().request({
    url: '/edu-academic/selectiondetail/getOwnSelectionDetail',
    method: 'GET',
    params: {
      ...params
    }
  })
}

//获取某个组合的选择人数
export const getDetail = params => {
  return Request().request({
    url: '/edu-academic/selectiondetail/getCombinationNumberById',
    method: 'GET',
    params: {
      ...params
    }
  })
}

//获取学生的基本信息
export const getStudentInfo = params => {
  return Request().request({
    url: '/edu-basic-archives/basicstudent/getMyStudentInfo',
    method: 'GET',
    params: {
      ...params
    }
  })
}

export const saveStudentSelectionList = row => {
  return Request().request({
    url: '/edu-academic/selectiondetail/saveStudentSelectionDetail',
    method: 'post',
	header: {
		contentType: 'application/json'
	},
    data: row
  })
}