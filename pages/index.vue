<template>
  <div class="container">
    <!-- 轮播图组件:el-carousel -->
    <!-- arrow: 左右切换的箭头总是显示的 -->
    <el-carousel 
    arrow="always">
        <!-- el-carousel-item 是幻灯片的每一项 -->
        <el-carousel-item 
        v-for="(item, index) in banners" 
        :key="index">
            <!-- 轮播图的背景图片
             background-size：控制背景图片的大小，自适应宽高 -->
            <div class="banner-image" 
            :style="`
            background:url(${item}) center center no-repeat;
            background-size:contain contain;
            `">
            </div>
        </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {

  data(){
    return {
      // 轮播图数组
      banners: [
        "http://157.122.54.189:9095/assets/images/th01.jfif",
        "http://157.122.54.189:9095/assets/images/th02.jfif",
        "http://157.122.54.189:9095/assets/images/th03.jfif"
      ]
    }
  }
};
</script>


<style scoped lang="less">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    //  如果再scoped中要修改第三方的组件，组件的class不会加上scoped的字符串，需要在前面加个/deep/
    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>