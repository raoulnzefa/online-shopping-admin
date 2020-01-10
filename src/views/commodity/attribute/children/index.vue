<template>
  <a-card>
    <a-table
      :dataSource="attributeList"
      :columns="columns"
      rowKey="_id"
      bordered
    >
      <template slot="status" slot-scope="status">
        <a-tag v-if="status === true" color="green">正常</a-tag>
        <a-tag v-else color="red">冻结</a-tag>
      </template>
      <template slot="multiple" slot-scope="multiple">
        <a-tag v-if="multiple === true" color="green">是</a-tag>
        <a-tag v-else color="red">否</a-tag>
      </template>
      <template slot="news" slot-scope="news">
        <a-tag v-if="news === true" color="green">是</a-tag>
        <a-tag v-else color="red">否</a-tag>
      </template>
      <template slot="operation" slot-scope="text, record">
        <router-link
          :to="{ name: 'attributeupdate', params: { id: record._id } }"
        >
          <a-button type="primary">修改</a-button>
        </router-link>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import { getAttributeList } from "@/api/attribute";
const columns = [
  {
    title: "属性名称",
    dataIndex: "name"
  },
  {
    title: "所属分类",
    dataIndex: "type",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "属性值列表",
    dataIndex: "attribute"
  },
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "是否支持多选",
    dataIndex: "multiple",
    scopedSlots: { customRender: "multiple" }
  },
  {
    title: "是否支持新增",
    dataIndex: "news",
    scopedSlots: { customRender: "news" }
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
      attributeList: [],
      columns: columns
    };
  },
  created() {
    this.getAttributeList();
  },
  methods: {
    getAttributeList() {
      getAttributeList()
        .then(res => {
          this.attributeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
