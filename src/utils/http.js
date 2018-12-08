import axios from 'axios'
import qs from 'qs'
/* import {
  Loading,
  ToastPlugin,
  Toast,
} from 'vux' */
import {
  REQUEST_CODE
} from './constant'

let loading = {};
/**
 * @description 构造axios请需要的配置
 * @param {Object} config 请求基本配置
 */
const buildConfigRequest = (config) => {
  const {
    // 是否为上传文件的方式，布尔类型
    uploadType,
    // 请求 url
    url,
    // 请求方式 'get', 'post', 'put', 'delete'
    method,
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params,
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    data,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout
  } = config
  // 判断是否为上传模式设置不同的 content-type
  const contentType = uploadType ? {} : { 'Content-Type': 'application/x-www-form-urlencoded' }
  const configRequest = {
    headers: {
      ...contentType
    },
    url: url || '/',
    method: method || 'post',
    params: params || '',
    timeout: timeout || 60000
  }
  // 判断是否为 get 请求
  if (!method || method.toLowerCase() !== 'get') {
    configRequest.data = data
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    configRequest.transformRequest = (data) => {
      let dataResolve = null

      // 判断是否为上传文件的请求，不是的话序列化请求参数，是的话使用formData上传文件
      if (!uploadType) {
        dataResolve = qs.stringify(data, { allowDots: true })
      } else {
        const formData = new FormData()

        for (let item in data) {
          formData.append(item, data[item])
        }
        dataResolve = formData
      }
      return dataResolve
    }
  } else if (!params) {
    // 没有 URL 参数，设置 data 为 URL 参数
    configRequest.params = configRequest.params || data || ''
  }
  /* loading = Loading.service({
    lock: true,
    text: '正在拼命加载中，请稍后',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.7)',
    fullscreen:true,
    customClass:'icon-fontsize'
  }); */
  return configRequest
}

/**
 * @description axios 请求封装
 * @param {Object} config 请求基本配置 
 * {
 *  // 是否为上传文件的方式，布尔类型
 *  uploadType,
 * 
 *  // 请求 url
 *  url,
 * 
 *  // 请求方式 'get', 'post', 'put', 'delete'
 *  method,
 *  
 *  // `params` 是即将与请求一起发送的 URL 参数
 *  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
 *  params,
 *  
 *  // `data` 是作为请求主体被发送的数据
 *  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
 *  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
 *  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
 *  // - 浏览器专属：FormData, File, Blob
 *  data,
 *  
 *  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
 *  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
 *  timeout
 *  
 *  // 成功回调
 *  sucFunc,
 *  
 *  // 失败回调
 *  failFunc,
 *  
 *  // 错误回调
 *  errFunc,
 *  
 *  // 请求结束回调，不管成功、失败或是错误都会调用
 *  completeFunc
 * }
 */
export default (config = {}) => {
  const {
    // 成功回调
    sucFunc,
    otherCallBack,
    // 失败回调
    failFunc,
    // 错误回调
    errFunc,
    // 请求结束回调，不管成功、失败或是错误都会调用
    completeFunc
  } = config
  const configRequest = buildConfigRequest(config)
  /* if (!store.state.userInfo.userId) {
    if (location.pathname !== '/login') {
      clearCookie()
      location.href = '/login'
      return
    }
  } */

  // 返回 Promise 对象，方便使用 Promise.all，Promise.race
  return axios.request(configRequest)
    .then(response => {
      const res = response.data
      // loading.close();
      completeFunc && completeFunc()

      if (res.code === REQUEST_CODE.success) {
        sucFunc && sucFunc(res)
      } else if (res.code === REQUEST_CODE.notLogin) {
        // 返回用户未登录
        /* ToastPlugin.show({
          text: `${res.msg}`,
          time: 3000,
          position: 'top',
        }) */
        
        alert('跳转登录页')
      } else if(res.code === REQUEST_CODE.reductionCode){
        otherCallBack && otherCallBack(res)
      }else {
        type: 'error',
        failFunc ? failFunc(res) :'' /* ToastPlugin.show({
          text: `${res.msg}`,
          time: 3000,
          position: 'top',
        }) */
      }

      return res
    })
    .catch((err) => {
      completeFunc && completeFunc()
      // loading.close();
      errFunc ? errFunc() : '' /* ToastPlugin.show({
        text: `服务器出错了，请稍后重试`,
        time: 3000,
        position: 'top',
      }) */
      throw err
    })
}