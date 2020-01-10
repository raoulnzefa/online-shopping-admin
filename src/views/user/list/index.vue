<template>
  <a-card>
    <a-table :dataSource="userList" :columns="columns" rowKey="_id" bordered>
    </a-table>
  </a-card>
</template>

<script>
import { getUserList } from "@/api/user";
const columns = [
  {
    title: "用户名",
    dataIndex: "name"
  },
  {
    title: "邮箱",
    dataIndex: "email"
  },
  {
    title: "电话",
    dataIndex: "phone",
    scopedSlots: { customRender: "setting" }
  },
  {
    title: "角色",
    dataIndex: "role"
  }
];
export default {
  data() {
    return {
      userList: [],
      columns: columns
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      getUserList()
        .then(res => {
          this.userList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
