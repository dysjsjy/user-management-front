<script setup lang="ts">

import GlobalHeader from "../components/GlobalHeader.vue";
</script>

<template>
  <div id="basicLayout">
      <a-layout>
        <a-layout-header class="header">
          <GlobalHeader/>
        </a-layout-header>
        <a-layout-content class="content">
          <router-view/>
        </a-layout-content>
        <a-layout-footer class="footer">
          <a href="#">dysjsjy@2024</a>
        </a-layout-footer>
      </a-layout>
  </div>
</template>

<style scoped>
  #basicLayout .header {
    background: white;
    padding: 0;
  }
  #basicLayout .content {
    height: 100%;
    width: 100%;
  }
  #basicLayout .footer {
    position: fixed;
    padding: 24px;
    background: #efefef;
    text-align: center;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>