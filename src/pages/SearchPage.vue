<script setup lang="ts">
import {ref, watch} from 'vue';
import {TreeSelect, TreeSelectProps} from "ant-design-vue";
import {useRouter} from "vue-router";

const router = useRouter()

const SHOW_ALL = TreeSelect.SHOW_ALL;
const activeIds = ref<string[]>([]);
const treeData = ref<TreeSelectProps['treeData']>([
  {
    label: '性别',
    value: '性别',
    color: 'blue',
    children: [
      {
        label: '男',
        value: '男',
        color: 'blue',
      },
      {
        label: '女',
        value: '女',
        color: 'blue',
      },
    ],
  },
  {
    label: '编程语言',
    value: '编程语言',
    color: 'blue',
    children: [
      {label: 'java', value: 'java', color: 'blue',},
      {label: 'python', value: 'python', color: 'blue',},
      {label: 'c++', value: 'c++', color: 'blue',},
      {label: 'c#', value: 'c#', color: 'blue',},
      {label: 'go', value: 'go', color: 'blue',},
      {label: 'php', value: 'php', color: 'blue',},
    ],
  },
]);

const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

watch(activeIds, () => {
  console.log('select', activeIds.value);
});
</script>

<template>
  <div id="SearchPage">
    <a-tree-select
        v-model:value="activeIds"
        show-search
        style="width: 100%; margin: 24px"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="Please select"
        allow-clear
        multiple
        :show-checked-strategy="SHOW_ALL"
        tree-default-expand-all
        :tree-data="treeData"
        tree-node-filter-prop="label"
    >
      <template #tagRender="{ label, closable, onClose, option }">
        <a-tag :closable="closable" :color="option.color" style="margin-right: 3px" @close="onClose">
          {{ label }}&nbsp;&nbsp;
        </a-tag>
      </template>
      <template #title="{ value: val, label }">
        <b v-if="val === 'parent 1-1'" style="color: #08c">{{ val }}</b>
        <template v-else>{{ label }}</template>
      </template>
    </a-tree-select>
    <div style="padding: 12px; text-align: center;">
      <a-button style="width: 300px;" block type="primary" @click="doSearchResult">搜索</a-button>
    </div>
  </div>
</template>

<style scoped>
#SearchPage {
  width: 640px;
  height: 640px;
  margin: 0 auto;
}
</style>