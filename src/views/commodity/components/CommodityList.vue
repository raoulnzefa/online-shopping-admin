<template>
  <a-card>
    <a-table :dataSource="data" :columns="columns">
      <span slot="operation">
        <a-button>查看商品详情</a-button>
      </span>
    </a-table>
  </a-card>
</template>

<script>
const columns = [
  {
    title: "商品标题",
    dataIndex: "title",
    key: "title",
    width: "15%"
  },
  {
    title: "图片",
    dataIndex: "image",
    key: "image",
    width: "8%"
  },
  {
    title: "视频",
    dataIndex: "video",
    key: "video",
    width: "8%"
  },
  {
    title: "所属商铺",
    dataIndex: "shop",
    key: "shop",
    width: "10%"
  },
  {
    title: "添加时间",
    dataIndex: "createTime",
    key: "createTime",
    width: "15%"
  },
  {
    title: "操作",
    scopedSlots: { customRender: "operation" },
    key: "operation"
  }
];
export default {
  data() {
    return {
      columns,
      data: [
        {
          key: "1",
          title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          image: "",
          video: "",
          shop: "自营商铺",
          createTime: "2019-08-09",
          operation: "aaaa"
        }
      ]
    };
  }
};
</script>
