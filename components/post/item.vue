<template>
  <div class="digui-item">
      <div v-for="(item, index) in data" :key="index">
          {{item.title}}

          <item :data="item.children" v-if="item.children"/>
      </div>
  </div>
</template>

<script>
export default {
    // 可以属性是可选的属性，表示组件名, 是在组件内部可以根据该名字自己调用自己
    name: "item",

    props: ["data"]
}
</script>

<style>
.digui-item div{
    padding-left:50px;
}
</style>