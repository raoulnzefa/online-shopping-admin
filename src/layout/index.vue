<template>
  <a-layout class="app-wrapper">
    <Sidebar />
    <AppMain />
  </a-layout>
</template>

<script>
import { Sidebar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Sidebar,
    AppMain
  }
};
</script>
