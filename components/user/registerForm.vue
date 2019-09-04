<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <!-- 文档地址：https://element.eleme.cn/#/zh-CN/component/input#fu-he-xing-shu-ru-kuang -->
                <el-input 
                v-model="form.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <!-- 内部实现了调用 this.$emit("click") 触发传递的方法-->
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                v-model="form.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                v-model="form.password"
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                v-model="form.checkPassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        // rule当前的规则，目前是空的
        // value输入框的值
        // callback是回调函数，必须要调用
        const checkPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                // 代表验证通过
                callback();
            }
        };

        return {
            // 表单数据
            form: {
                username: "", // 用户名
                nickname: "", // 昵称
                captcha: "", // 验证码
                password: "", // 密码
                checkPassword: "", // 确认密码
            },
            // 表单规则
            rules: {
                username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
                nickname: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
                captcha: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
                password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
                // 文档地址：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
                // validator 不能改，表示指向验证函数
                checkPassword: [{ validator: checkPassword, trigger: 'blur' }]
            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){

            // 判断如果手机号码是空，不请求
            if(!this.form.username){
                this.$message.error("请输入手机号码");
                return;
            }

            // 发送验证码
            this.$axios({
                url: "/captchas",
                method: "POST",
                data: {
                    tel: this.form.username // 手机号码
                }
            }).then(res => {
                // 解构出code属性
                const {code} = res.data;

                // 文档地址：https://element.eleme.cn/#/zh-CN/component/message-box#xiao-xi-ti-shi
                this.$alert(`模拟手机验证码是：${code}`, "提示");
                
                // 类似于
                // this.$message({
                //     type:"success",
                //     message: `模拟手机验证码是：${code}`
                // })
            })
        },

        // 注册
        handleRegSubmit(){

            this.$refs.form.validate( valid => {
                if(valid){
                    
                    // 可以使用...+变量名会指向剩余的属性
                    const {checkPassword, ...rest} = this.form;

                    // 调用注册接口
                    this.$axios({   
                        url:"/accounts/register",
                        method: "POST",
                        data: rest
                    }).then(res => {

                        // 注册成功后帮用户自动登录
                        // commit接受两个参数，第一个mutations参数是方法名，第二个参数数据
                        this.$store.commit("user/setUserInfo", res.data)
                    })
                }
            });
            
            
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>