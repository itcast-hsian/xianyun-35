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

            // 创建一个 Marker 实例：
            var marker1 = new AMap.Marker({
                // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                position: new AMap.LngLat(118.8718107, 31.32846821),   
                title: 'xx酒店',
                content: `<div style="width:20px; height:20px; border-radius: 50%; background:red; color:#fff; line-height:20px; text-align:center;">1</div>`,
            });

            var marker2 = new AMap.Marker({
                // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                position: new AMap.LngLat(118.92251, 31.75561),   
                title: 'xx酒店'
            });

            // 将创建的点标记添加到已有的地图实例：
            map.add([marker1, marker2]);
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