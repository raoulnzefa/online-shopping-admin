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
          :to="{
            name: 'attributeupdate',
            params: { id: record._id, typeId: typeId }
          }"
        >
          <a-button type="primary" style="margin-right:20px;">修改</a-button>
        </router-link>
        <a-button type="primary" @click="removeAttribute(record)"
          >删除</a-button
        >
      </template>
    </a-table>
  </a-card>
</template>
<script>
import { getTypeAttributeList, removeAttribute } from "@/api/attribute";
const columns = [
  {
    title: "属性名称",
    dataIndex: "name"
  },
  {
    title: "属性值列表",
    dataIndex: "attribute",
    scopedSlots: { customRender: "attribute" }
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
      typeId: this.$route.params.id,
      attributeList: [],
      columns: columns
    };
  },
  created() {
    this.getTypeAttributeList();
  },
  methods: {
    getTypeAttributeList() {
      getTypeAttributeList(this.typeId)
        .then(res => {
          this.attributeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeAttribute(data) {
      removeAttribute(data)
        .then(() => {
          const attributeList = [...this.attributeList];
          this.attributeList = attributeList.filter(
            item => item._id !== data._id
          );
          this.$message.success("删除成功");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
