<template>
  <a-layout style="min-height:100vh">
    <Header />
    <Content />
  </a-layout>
</template>

<script>
import Header from "./header";
import Content from "./content";
export default {
  components: {
    Header,
    Content
  }
};
</script>
