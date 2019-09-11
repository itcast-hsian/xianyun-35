<template>
  <div style="padding: 50px">
      高德地图
      <div id="container"></div> 
  </div>
</template>

<script>
export default {
    mounted(){
        
        // 等待下面url加载完毕之后再执行
        window.onLoad  = function(){
            // 创建地图， container是容器的id
            var map = new AMap.Map('container', {
                zoom:11,                        //级别
                center: [118.8718107, 31.32846821], //中心点坐标
            });
        }

        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=144e1bdc353db812fc79f782ebd35b1f&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}
</script>

<style scoped >
    #container {width:500px; height: 500px; }  
</style>