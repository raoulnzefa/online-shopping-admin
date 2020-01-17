<template>
  <a-card>
    <a-table
      :dataSource="parameterList"
      :columns="columns"
      rowKey="_id"
      bordered
    >
      <template slot="enter" slot-scope="enter">
        <a-tag v-if="enter === '0'" color="green">手工录入</a-tag>
        <a-tag v-if="enter === '1'" color="green">选择录入</a-tag>
      </template>

      <template slot="status" slot-scope="status">
        <a-tag v-if="status === true" color="green">正常</a-tag>
        <a-tag v-else color="red">冻结</a-tag>
      </template>
      <template slot="operation" slot-scope="text, record">
        <router-link
          :to="{ name: 'parameterupdate', params: { id: record._id } }"
        >
          <a-button type="primary">修改</a-button>
        </router-link>
      </template>
    </a-table>
  </a-card>
</template>
<script>
import { getParameterList } from "@/api/parameter";
const columns = [
  {
    title: "参数名称",
    dataIndex: "name"
  },
  {
    title: "参数值列表",
    dataIndex: "parameter"
  },
  {
    title: "属性值录入方式",
    dataIndex: "enter",
    scopedSlots: { customRender: "enter" }
  },
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
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
      parameterList: [],
      columns: columns
    };
  },
  created() {
    this.getParameterList();
  },
  methods: {
    getParameterList() {
      getParameterList()
        .then(res => {
          this.parameterList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
