// 是用于处理axios的请求拦截插件
import {Message} from "element-ui";

export default ( { $axios, redirect } ) => {

    // 错误拦截, onError用于错误拦截    
    $axios.onError(res => {
        // 返回的res是一个错误的对象，Error对象下都有一个response的属性可以访问错误的信息
        // console.log(res.response, 123)

        // 解构出错误信息，和代码
        const {message, statusCode} = res.response.data;

        if(statusCode === 400){
            // Message = this.$message
            Message.error(message)
        }

        if(statusCode === 401 || statusCode === 403){
            Message.error("请登录！");
            // 跳转到登录页
            redirect("/user/login");
        }
    })
}