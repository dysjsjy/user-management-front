<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import UserCardList from "../components/UserCardList.vue";
import {message} from "ant-design-vue";
import {userSearchTag} from "../api/user.ts";

const route = useRoute()
//标签
const {tags} = route.query;

//用户信息
const userList = ref([])
const loading = ref(true);

const lookTags = (tags: any) => {
  console.log("tags:", tags)
}


onMounted(async () => {
  message.loading({
    content: '数据加载中...',
    style: {marginTop: '20vh',},
  });

  const userListData = await userSearchTag({tagNameList: tags});

  if (userListData?.data) {
    userListData.data.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
        console.log(user.tags)
      }
    })
    userList.value = userListData.data;
    console.log(userList.value)
  }
  loading.value = false;
})

watch({tags}, () => {
  console.log(tags)
})
</script>

<template>
  <div id="SearchResultPage">
    <a-row>
      <a-button @click="lookTags(tags)">tags</a-button>
    </a-row>
    <a-row>
      <a-flex gap="middle" vertical>
        <UserCardList :user-list="userList" :loading="loading"/>
        <a-alert v-if="!userList || userList.length < 1" message="没有数据" type="warning"/>
      </a-flex>
    </a-row>
  </div>
</template>

<style scoped>

</style>