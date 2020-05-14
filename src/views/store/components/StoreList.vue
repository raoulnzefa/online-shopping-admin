<template>
  <a-card>
    <a-table :dataSource="storeList" :columns="columns" rowKey="_id" bordered>
      <template slot="type" slot-scope="text, record">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in typeList" :key="item._id">
            <span v-if="item._id === record.type[0]">
              {{ item.name }}
            </span>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="item in typeList" :key="item._id">
            <span v-if="item._id === record.type[1]">
              {{ item.name }}
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </template>
      <template slot="status" slot-scope="text">
        <a-tag v-if="text === '0'" color="green">正常</a-tag>
        <a-tag v-if="text === '1'" color="red">关闭</a-tag>
        <a-tag v-if="text === '2'" color="orange">暂停营业</a-tag>
      </template>
      <template slot="operation" slot-scope="text, record">
        <router-link :to="{ name: 'storeupdate', params: { id: record._id } }"
          ><a-button type="primary">修改</a-button></router-link
        >
        <a-button type="primary" style="margin-left:20px;">暂停营业</a-button>
        <a-button type="danger" style="margin-left:20px;">冻结</a-button>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { getStoreList, updateStoreStatus } from "@/api/store";
import Type from "@/components/mixin/Type";
const columns = [
  {
    title: "店铺名称",
    dataIndex: "name"
  },
  {
    title: "所属分类",
    dataIndex: "type",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "店铺状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "创建时间",
    dataIndex: "create_time"
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
      storeList: [],
      columns: columns
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    getStoreList() {
      getStoreList()
        .then(res => {
          this.storeList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateStatus(status) {
      updateStoreStatus(status).then(() => {
        this.$messae.success("修改成功");
      });
    }
  }
};
</script>
