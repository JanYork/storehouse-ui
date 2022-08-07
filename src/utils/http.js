/****   http.js   ****/
// 导入封装好的axios实例
import request from './request'

const http ={
    /**
     * methods: 请求
     * @param url 请求地址 
     * @param params 请求参数
     */
    get(url,params){
        const config = {
            method: 'get',
            url:url
        }
        //如果非空，则添加参数，下文同理
        if(params) config.params = params
        //调用封装好的axios实例，下文同理
        return request(config)
    },
    post(url,params){
        const config = {
            method: 'post',
            url:url
        }
        if(params) {
            config.data = params
            console.log(config.data)
        }
        return request(config)
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    delete(url,params){
        const config = {
            method: 'delete',
            url:url
        }
        if(params) config.params = params
        return request(config)
    }
}
// 暴露
export default http
