<script setup lang="ts">
//加载
import {ref, watchEffect} from "vue";
import {userMatch, userRecommend} from "../api/user.ts";
import UserCardList from "../components/UserCardList.vue";

const loading = ref(true);
//用户信息
const userList = ref<any[]>([]);
//是否开启推荐用户模式
const isMatchMode = ref<boolean>(false);

const loadData = (async () => {
  let userListData;
  if (isMatchMode.value) {
    userListData = await userMatch();
  } else {
    userListData = await userRecommend();
  }
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
        console.log(user.tags);
      }
    });
    userList.value = userListData;
    console.log("userList是：",userList.value);
  } else {
    console.error('userListData is not an array:', userListData);
  }
  loading.value = false;
})


watchEffect(() => {
  loadData();
  console.log(isMatchMode.value);
})

</script>

<template>
  <div>
    <a-row>
      <a-flex gap="middle" vertical>
        <a-col class="switch">
          userMatch模式
          <a-switch v-model:checked="isMatchMode" />
        </a-col>
        <UserCardList :user-list="userList" :loading="loading"/>
          <a-alert v-if="!userList || userList.length < 1" message="没有数据" type="warning" />
      </a-flex>
    </a-row>
  </div>
</template>

<style scoped>

</style>