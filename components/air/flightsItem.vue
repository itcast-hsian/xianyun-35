<template>
    <div class="flight-item">
        <div @click="isShow = !isShow">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{data.airline_name}}</span> {{data.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.dep_time}}</strong>
                            <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{rankTime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{data.arr_time}}</strong>
                            <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{data.base_price / 2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend" v-show="isShow">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <!-- 可能会有多个座位，需要循环显示 -->
                    <el-row 
                    type="flex" 
                    justify="space-between" 
                    align="middle" 
                    class="flight-sell"
                    v-for="(item, index) in data.seat_infos"
                    :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{ item.name }}</span> | {{ item.supplierName }}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{ item.org_settle_price }}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <!-- 座位id -->
                            <el-button 
                            type="warning" 
                            size="mini"
                            @click="handleChoose(item.seat_xid)">
                            选定
                            </el-button>
                            <p>剩余：{{ item.discount }}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return {
            // 控制列表的展开
            isShow: false
        }
    },

    // 不清楚data的类型，引用的错误
    // props: ["data"]

    props: {
        //data表示组件可以接收的属性
        data: {
            // type不能修改，用于声明属性的类型
            type: Object,
            // 如果调用组件不传值，采用default的默认值
            default: {}
        }
    },

    // computed和data一样都可以在模板中渲染，区别在computed的属性值是一个函数，
    // 最终的变量的值是由函数返回。
    computed: {
        // 相隔时间
        rankTime(){
            // 出发时间,返回值是数组
            const dep = this.data.dep_time.split(":");
            // 到达时间,返回值是数组
            const arr = this.data.arr_time.split(":");

            // 如果到达的小时小于出发的小时，说明到第二天，需要到达小时 +24
            if(arr[0] < dep[0]){
                arr[0] += 24;
            }

            // 到达时间的分钟
            const arrVal = arr[0] * 60 + +arr[1];
            // 出发时间啊的分钟
            const depVal = dep[0] * 60 + +dep[1];

            // 相隔的总分钟
            const dis = arrVal - depVal;

            // 向下取整获取小时
            const hours = Math.floor(dis / 60);
            // 分钟
            const min = dis % 60;

            return `${hours}时${min}分`;
        }
    },

    methods: {
        // 跳转到机票订单页
        handleChoose(seat_xid){
            this.$router.push({
                path:"/air/order",
                query: {
                    id: this.data.id,
                    seat_xid
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>