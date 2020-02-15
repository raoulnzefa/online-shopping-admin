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
          :to="{
            name: 'parameterupdate',
            params: { typeId: typeId, id: record._id }
          }"
        >
          <a-button type="primary" style="margin-right:20px;">修改</a-button>
        </router-link>
        <a-button type="primary" @click="removeParameter(record._id)"
          >删除</a-button
        >
      </template>
    </a-table>
  </a-card>
</template>
<script>
import { getParameterList, removeParameter } from "@/api/parameter";
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
      typeId: this.$route.params.id,
      parameterList: [],
      columns: columns
    };
  },
  created() {
    this.getParameterList();
  },
  methods: {
    getParameterList() {
      getParameterList(this.typeId)
        .then(res => {
          this.parameterList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeParameter(id) {
      removeParameter(id)
        .then(() => {
          const attributeList = [...this.attributeList];
          this.attributeList = attributeList.filter(item => item._id !== id);
          this.$message.success("删除成功");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
