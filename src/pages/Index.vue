<script setup lang="ts">
//加载
import {ref, watchEffect} from "vue";
import {userMatch, userRecommend} from "../api/user.ts";

const loading = ref(true);
//用户信息
const userList = ref([])
//是否开启推荐用户模式
const isMatchMode = ref(false);

const loadData = (async () => {
  let userListData;
  if (isMatchMode.value) {
    userListData = await userMatch();
  } else {
    userListData = await userRecommend();
  }
  if (userListData) {
    userListData.forEach((user: any) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
        console.log(user.tags)
      }
    })
    userList.value = userListData;
    console.log(userList.value)
  }
  loading.value = false;
})


watchEffect(() => {
  loadData();
})

</script>

<template>
  <div>index</div>
</template>

<style scoped>

</style>