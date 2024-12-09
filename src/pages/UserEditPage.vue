<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref, watchEffect} from "vue";
import {getCurrentUser, updateUser} from "../api/user.ts";
import {message, TreeSelect, TreeSelectProps} from "ant-design-vue";

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

const route = useRoute()
const router = useRouter()

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    message.warning("用户未登录。");
    return;
  }

  console.log(currentUser);

  if (typeof editUser.value.editKey !== 'string') {
    // 处理 editKey 不是字符串的情况，或者提供默认值
    throw new Error('editKey must be a string');
  }

  if (editUser.value.editKey == "tags") {
    editUser.value.currentValue = JSON.stringify(activeIds.value);
  }

  const res = await updateUser({
    id: currentUser.id,
    editKey: editUser.value.editKey,
    currentValue: editUser.value.currentValue,
  })

  console.log(res, "更新请求");

  if (res.code === 0 && res.data > 0) {
    router.back();
  }
}

watchEffect(() => {
  console.log("activeIds.value: ", activeIds.value);
})
</script>

<template>
  <div id="UserEditPage">
    <a-form
        @submit="onSubmit"
        style="text-align: center;"
    >
      <div style="width: 300px; margin: 20px 0;">
        {{editUser.editName}}:
        <a-form-item v-if="editUser.editKey == 'tags'">
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
        </a-form-item>
        <a-input
            v-else
            v-model:value="editUser.currentValue"
            :placeholder="`请输入新的${editUser.editName}`"
            style="width: 200px"
        />
      </div>
      <a-form-item style="text-align: center;">
        <a-button type="primary" style="width: 200px;" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#UserEditPage {
  width: 300px;
  height: 640px;
  margin: 0 auto;
}
</style>