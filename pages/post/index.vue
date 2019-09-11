<template>
  <div style="padding:50px;">
    <h2>组件递归</h2>

    <Item :data="list"/>

  </div>
</template>

<script>
import Item from "@/components/post/item";
export default {
  data(){
    return {
      list: [
        {
          title: "衣服",
          children: [
            {
              title: "男装",
              children: [
                {title: "秋裤"},
                {title: "西装", children: [
                  {title: "领带"},
                  {title: "皮带"},
                ]}
              ]
            },
            {
              title: "女装",
              children: [
                {title: "裙子"},
                {title: "比基尼"}
              ]
            }
          ]
        },

        {
          title: "电器",
          children: [
            {title: "冰箱"},
            {title: "空调"},
            {title: "游戏机"}
          ]
        }
      ]
    }
  },

  components: {
    Item
  }
}
</script>

<style>

</style>