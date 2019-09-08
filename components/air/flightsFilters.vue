<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{ data.info.departCity }} - {{ data.info.destCity }} 
                / 
                {{ data.info.departDate }}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item, index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item, index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <!-- 先实现航空公司 -->
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                     v-for="(item, index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                     v-for="(item, index) in airSizeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小

            // 机型的大小的选项
            airSizeList: [
                {label: "大", value: "L"},
                {label: "中", value: "M"},
                {label: "小", value: "S"}
            ]
        }
    },

    props: {
        // data是flights组件获取的大的数据，包含filghts/[info/options]/total
        data: {
            type: Object,
            default: {}
        }
    },

    methods: {
        // 选择机场时候触发
        handleAirport(value){

            // 过滤数据，只保留选中的机场的航班
            const arr = this.data.flights.filter(v => {  // (this.data.flights) = (:data="cacheFlightsData")
                return v.org_airport_name === value;
            })

            this.$emit("setDataList", arr);
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            // 数组的解构赋值 const [from, to] = [6,12]
            const [from, to] = value.split(",");

            // 过滤数据，只保留选中的出发时间的航班
            const arr = this.data.flights.filter(v => {  // (this.data.flights) = (:data="cacheFlightsData")

                // 每趟航班出发时间的小时
                const current = v.dep_time.split(":")[0];

                // 需要满足在时间段内 比如 6 - 12;
                return +current >= +from && +current < +to;
                
            });

            this.$emit("setDataList", arr);
        },

         // 选择航空公司时候触发
        handleCompany(value){
            // 过滤数据，只保留选中的航空公司的航班
            const arr = this.data.flights.filter(v => {  // (this.data.flights) = (:data="cacheFlightsData")
                return v.airline_name === value;
            })

            this.$emit("setDataList", arr);
        },

         // 选择机型时候触发
        handleAirSize(value){
           // 过滤数据，只保留选中的机型大小的航班
            const arr = this.data.flights.filter(v => {  // (this.data.flights) = (:data="cacheFlightsData")
                return v.plane_size === value;
            })

            this.$emit("setDataList", arr);
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport = "";          // 机场
            this.flightTimes =  "";     // 出发时间
            this.company = "";          // 航空公司
            this.airSize = "";         // 机型大小
            this.pageIndex = 1;

            // 返回全部的数据
            this.$emit("setDataList", this.data.flights);
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>