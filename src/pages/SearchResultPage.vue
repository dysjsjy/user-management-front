<script setup lang="ts">

import {useRoute} from "vue-router";
import {watch} from "vue";

const route = useRoute()
//标签
const { tags } = route.query;

watch( {tags}, () => {
  console.log(tags)
})
</script>

<template>
  <div>searchresultpage</div>
</template>

<style scoped>

</style>