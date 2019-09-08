<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span 
            v-for="(item, index) in tabs" 
            :key="index"
            @click="handleSearchTab(index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <!-- 该表单没有model和rules -->
        <el-form class="search-form-content" ref="form" label-width="80px">

            <el-form-item label="出发城市">
                <!-- 文档地址：https://element.eleme.cn/#/zh-CN/component/input#yuan-cheng-sou-suo -->

                <!-- fetch-suggestions: 获取搜索建议，并且显示在输入框的下拉框中 -->
                <!-- select：在下拉框中选中时候时候触发的事件 -->
                <el-autocomplete
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                @blur="handleDepartBlur"
                class="el-autocomplete"
                v-model="form.departCity"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="到达城市">
                <!-- fetch-suggestions: 每次输入时候都会执行，获取搜索建议，并且显示在输入框的下拉框中 -->
                <!-- select：在下拉框中选中时候时候触发的事件 -->
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                @blur="handlDestBlur"
                class="el-autocomplete"
                v-model="form.destCity"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                
                <!-- change：选中日期时候触发 -->
                <el-date-picker 
                type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate"
                v-model="form.departDate">
                </el-date-picker>

            </el-form-item>

            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>

import moment from "moment";

export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,

            form: {
                departCity: "", // 出发城市
                departCode: "", // 出发城市代码
                destCity: "",
                destCode: "",
                departDate: ""
            },

            departData: [], // 存储后台返回的出发城市数组
            destData: []    // 存储后台返回的到达城市数组

        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(index){
            if(index === 1){
                this.$alert("目前暂时不支持往返", "提示");
            }
        },

        // 出发城市输入框失去焦点时候触发
        handleDepartBlur(){
            this.form.departCity = this.departData[0] ? this.departData[0].value : "";
            this.form.departCode = this.departData[0] ? this.departData[0].sort : "";
        },

        // 到达城市输入框失去焦点时候触发
        handlDestBlur(){
            this.form.destCity = this.destData[0] ? this.destData[0].value : "";
            this.form.destCode = this.destData[0] ? this.destData[0].sort : "";
        },

        // 出发城市的搜索建议的事件
        // value是输入框的值
        // cb是一个回调函数必须要调用，参数的值会显示在下拉框中。
        // cb调用时候必须要接受一个数组，数组中的元素必须是一个对象，对象中必须有value属性
        queryDepartSearch(value, cb){

            if(!value){
                // 传递空数组不会出现下拉框
                cb([]);
                return;
            }
            
            // 根据用户的输入请求建议城市
            this.$axios({
                url: "/airs/city",
                // get参数
                params: {
                    // 输入框的关键字
                    name: value
                }
            }).then(res => {
                // 数组
                const {data} = res.data;

                // 给数组中每个对象添加value属性
                const newData = [];
                data.forEach(v => {
                    // 添加value属性
                    v.value = v.name.replace("市", ""); 
                    // 把带有value属性的对象添加到新数组中
                    newData.push(v);
                });

                // 把转换后的数组赋值给data
                this.departData = newData;

                //显示到下拉列表中
                cb(newData);
            })
        },


        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDestSearch(value, cb){
            if(!value){
                // 传递空数组不会出现下拉框
                cb([]);
                return;
            }
            
            // 根据用户的输入请求建议城市
            this.$axios({
                url: "/airs/city",
                // get参数
                params: {
                    // 输入框的关键字
                    name: value
                }
            }).then(res => {
                // 数组
                const {data} = res.data;

                // 给数组中每个对象添加value属性
                const newData = [];
                data.forEach(v => {
                    // 添加value属性
                    v.value = v.name.replace("市", ""); 
                    // 把带有value属性的对象添加到新数组中
                    newData.push(v);
                });

                // 把转换后的数组赋值给data
                this.destData = newData;

                //显示到下拉列表中
                cb(newData);
            })
        },
       
        // 出发城市下拉选择时触发
        // 事件的文档地址：https://element.eleme.cn/#/zh-CN/component/input#autocomplete-events
        // item是当然选中的对象
        handleDepartSelect(item) {

            // 把选中的值设置给form
            this.form.departCity = item.value;
            this.form.departCode = item.sort;
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            // 把选中的值设置给form
            this.form.destCity = item.value;
            this.form.destCode = item.sort;
        },

        // 确认选择日期时触发
        // value会返回当然选中的日期
        handleDate(value){
            // 转换
            this.form.departDate = moment(value).format(`YYYY-MM-DD`);
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            
            const {departCity, departCode, destCity, destCode} = this.form;

            // 交叉赋值
            this.form.departCity = destCity;
            this.form.departCode = destCode;

            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

        // 提交表单是触发
        handleSubmit(){
             const {departCity, destCity, departDate} = this.form;

            // 判断输入框不能为空
            if(!departCity){
                this.$alert("出发城市不能为空", "提示");
                return;
            }

            if(!destCity){
                this.$alert("到达城市不能为空", "提示");
                return;
            }

            if(!departDate){
                this.$alert("出发日期不能为空", "提示");
                return;
            }

            // 把本地存储先拿出来
            const arr = JSON.parse(localStorage.getItem("airs")) || [];
            arr.push(this.form);

            // 把搜索的条件保存到本地
            localStorage.setItem("airs", JSON.stringify(arr));

            // 跳转到机票列表页 /air/flights
            this.$router.push({
                path: "/air/flights",
                // url携带的参数
                query: this.form
            })
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
