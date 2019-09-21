<template>
  <a-layout-header>
    <a-icon
      class="trigger"
      :type="sidebar.collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggleCollapsed"
    />
  </a-layout-header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("toggleSideBar");
    }
  }
};
</script>
