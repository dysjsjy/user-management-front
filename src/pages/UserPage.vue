<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../api/user.ts";
import {useRouter} from "vue-router";

const router = useRouter();
const user = ref();
const loading = ref(true);
const username = ref("");

onMounted(async () => {
  user.value = await getCurrentUser();
  console.log("user:", user.value);
  username.value = user.value.username;
  loading.value = false;
})

const newUsername = ref("");
const editing = ref(false);

const saveUsername = () => {
  console.log("newUsername:", newUsername.value);
  let editKey = 'username';
  let editName = '用户名';
  router.push({
    path: "/user/edit",
    query: {
      editKey: editKey,
      editName: editName,
      currentValue: newUsername.value,
    }
  });
}

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div id="UserPage">
    <a-spin v-if="loading" size="large" />
    <a-list v-else>
      <a-list-item>
        当前用户 {{username}}
        <a-checkable-tag v-if="!editing" @click="editing = true">
          修改名称
        </a-checkable-tag>
        <!-- 文本框输入框 -->
        <div v-else>
          <a-input
              v-model:value="newUsername"
              placeholder="输入新用户名"
              @pressEnter="saveUsername"
              style="width: 200px;"
          />
          <a-button type="primary" size="small" @click="saveUsername">
            确定
          </a-button>
          <a-button size="small" @click="editing = false">
            取消
          </a-button>
        </div>
      </a-list-item>
      <a-list-item @click="navigateTo('/user/update')">
        修改信息
      </a-list-item>
      <a-list-item @click="navigateTo('/user/team/create')">
        我创建的队伍
      </a-list-item>
      <a-list-item @click="navigateTo('/user/team/join')">
        我加入的队伍
      </a-list-item>
    </a-list>
  </div>
</template>

<style scoped>
  #UserPage {
    margin: 20px auto;
    width: 640px;
    height: 640px;
  }
</style>