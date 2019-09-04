<template>
  <div>
    <!-- 渲染头部组件 -->
    <Header/>

    <!-- 页面的占位符,类似于router-view -->
    <nuxt />

    <!-- 渲染页脚组件 -->
    <Footer/>
  </div>
</template>

<script>

//导入header头部组件
import Header from "@/components/header";
// 导入footer页脚组件
import Footer from "@/components/footer";

export default {
  
  // 注册组件
  components: {
    Header,
    Footer
  },
}
</script>

<style >
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*{
  margin:0;
  padding:0;
}

ul,li,ol{
  list-style: none;
}

i,em{
  font-style: normal;
}

a{
  color:inherit; 
  text-decoration: none;
}

a:hover{
  color:inherit; 
}
</style>
