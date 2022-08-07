import http from '../utils/http'
/**
 *  @parms url 请求地址
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
// get请求
function getListAPI(url,params){
    return http.get(`${url}`,params)
}
// post请求
function postFormAPI(url,params){
    return http.post(`${url}`,params)
}

// put 请求
function putSomeAPI(url,params){
    return http.put(`${url}`,params)
}
// delete 请求
function deleteListAPI(url,params){
    return http.delete(`${url}`,params)
}
// 导出整个api模块
export default {
    getListAPI,
    postFormAPI,
    putSomeAPI,
    deleteListAPI
}