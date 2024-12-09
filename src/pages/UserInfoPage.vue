<script setup lang="ts">
import {useRoute} from "vue-router";


const route = useRoute();

const user = {
  avatarUrl: route.query.avatarUrl,
  username: route.query.username,
  profile: route.query.profile,
  email: route.query.email,
  phone: route.query.phone,
};
console.log(user.avatarUrl)
</script>

<template>
  <div id="UserInfoPage">
    <a-list size="default" bordered>
      <a-list-item-meta class="listItem" :description="`介绍: ${user.profile}`" />
      <a-list-item-meta class="listItem" :description="`邮件: ${user.email}`" />
      <a-list-item-meta class="listItem" :description="`电话: ${user.phone}`" />
      <template #header>
        <div class="user-avatar">
          <a-image
              round
              width="4rem"
              height="4rem"
              :src="user.avatarUrl"
          ></a-image>
          <p>{{user.username}}</p>
        </div>
      </template>
    </a-list>
  </div>
</template>

<style scoped>
  #UserInfoPage {
    width: 640px;
    height: 640px;
    margin: 0 auto;
  }
  #UserInfoPage .user-avatar {
    padding-top: 30px;
    color: black;
    text-align: center;
    width: 100%;
    font-size: medium;
  }
  .listItem {
    padding: 6px;
    font-weight: normal;
    font-size: medium;
  }
</style>