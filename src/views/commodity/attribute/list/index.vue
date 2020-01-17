<template>
  <a-card>
    <a-table :dataSource="typeList" :columns="columns" rowKey="_id" bordered>
      <template slot="operation" slot-scope="text, record">
        <router-link :to="{ name: 'attributelist', params: { id: record._id } }"
          ><a-button type="primary" style="margin-right:20px;"
            >查看所有属性</a-button
          ></router-link
        >
        <router-link :to="{ name: 'attributeadd', params: { id: record._id } }"
          ><a-button type="primary" style="margin-right:20px;"
            >添加新属性</a-button
          ></router-link
        >
      </template>
    </a-table>
  </a-card>
</template>

<script>
import Type from "@/components/mixin/Type";
const columns = [
  {
    title: "类型名称",
    dataIndex: "name"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  mixins: [Type],
  data() {
    return {
      columns: columns
    };
  }
};
</script>
