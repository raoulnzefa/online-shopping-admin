<template>
  <a-menu
    :mode="mode"
    :theme="theme"
    :selectedKeys="[selectedKeys]"
    :openKeys="openKeys"
    @openChange="handleOpenChange"
  >
    <template v-for="item in resolvePath">
      <a-menu-item v-if="!item.children" :key="item.path">
        <router-link :to="item.path">
          <a-icon :type="item.icon" />
          <span>{{ item.title }}</span>
        </router-link>
      </a-menu-item>
      <sub-menu v-else :menu-info="item" :key="item.path" />
    </template>
  </a-menu>
</template>

<script>
import SubMenu from "./SubMenu";
import menuList from "./MenuList";
import _path from "path";
export default {
  data() {
    return {
      selectedKeys: this.$route.path,
      openKeys: [],
      menuList: menuList
    };
  },
  props: {
    mode: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    SubMenu
  },
  mounted() {
    const urlList = this.$route.path.split("/").filter(i => i);
    for (let i = 0; i < urlList.length - 1; i++)
      this.openKeys.push(_path.resolve("/", urlList[i]));
  },
  watch: {
    $route() {
      this.selectedKeys = this.$route.path;
      const urlList = this.$route.path.split("/").filter(i => i);
      this.openKeys = [];
      for (let i = 0; i < urlList.length - 1; i++) {
        this.openKeys.push(_path.resolve("/", urlList[i]));
      }
    }
  },
  computed: {
    resolvePath() {
      return this.recursion(this.menuList);
    }
  },
  methods: {
    recursion(data, basePath = "/") {
      return data.map(item => {
        let path = _path.resolve(basePath, item.path);
        const result = {
          ...item,
          path
        };
        if (item.children) {
          result.children = this.recursion(
            item.children,
            `${basePath}${item.path}/`,
            item.authority
          );
        }
        return result;
      });
    },
    handleOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      const rootSubmenuKeys = this.menuList.map(item => {
        return _path.resolve("/", item.path);
      });
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  }
};
</script>
