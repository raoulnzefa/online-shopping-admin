<template>
  <a-card>
    <a-table :dataSource="typeList" :columns="columns" rowKey="_id" bordered>
      <template slot="status" slot-scope="status">
        <a-tag v-if="status === true" color="green">正常</a-tag>
        <a-tag v-else color="red">冻结</a-tag>
      </template>
      <template slot="setting">
        <a-button type="primary">查看下级</a-button>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" style="margin-right:20px;">修改</a-button>
        <a-button
          v-if="record.status === false"
          type="primary"
          @click="updateShopTypeStatus(record, true)"
          >启用</a-button
        >
        <a-button
          v-else
          type="danger"
          @click="updateShopTypeStatus(record, false)"
          >冻结</a-button
        >
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getAllShopTypeList, updateShopTypeStatus } from "@/api/shop_type";
const columns = [
  {
    title: "类型名称",
    dataIndex: "name"
  },
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "设置",
    dataIndex: "setting",
    scopedSlots: { customRender: "setting" }
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
      getAllShopTypeList()
        .then(res => {
          const typeList = res.data;
          typeList.forEach(index => {
            if (index.lastName == "-1") {
              this.typeList.push(index);
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateShopTypeStatus(record, value) {
      var obj = {
        id: record._id,
        status: value
      };
      updateShopTypeStatus(obj)
        .then(() => {
          record.status = value;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
