<template>
  <a-card>
    <a-table :dataSource="typeList" :columns="columns" rowKey="_id" bordered>
      <template slot="operation" slot-scope="text, record">
        <router-link :to="{ name: 'parameterlist', params: { id: record._id } }"
          ><a-button type="primary" style="margin-right:20px;"
            >查看所有参数</a-button
          ></router-link
        >
        <router-link :to="{ name: 'parameteradd', params: { id: record._id } }"
          ><a-button type="primary" style="margin-right:20px;"
            >添加新参数</a-button
          ></router-link
        >
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getAllShopTypeList } from "@/api/shop_type";
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
  data() {
    return {
      typeList: [],
      columns: columns
    };
  },
  created() {
    this.getAllShopTypeList();
  },
  methods: {
    getAllShopTypeList() {
      getAllShopTypeList().then(res => {
        this.typeList = res.data;
      });
    }
  }
};
</script>
