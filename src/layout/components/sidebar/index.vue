<template>
  <a-layout-sider
    :width="width"
    collapsible
    :trigger="trigger"
    :breakpoint="breakpoint"
    :collapsed="sidebar.collapsed"
    class="app-wrapper-sider"
  >
    <Logo />
    <BaseMenu :mode="mode" :theme="theme" />
  </a-layout-sider>
</template>

<script>
import Logo from "./Logo";
import BaseMenu from "./BaseMenu";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      mode: "inline",
      trigger: null,
      collapsed: false,
      width: 256,
      theme: "dark",
      breakpoint: "lg"
    };
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  components: {
    Logo,
    BaseMenu
  }
};
</script>
