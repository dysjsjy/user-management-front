<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../api/user.ts";
import {useRouter} from "vue-router";

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
});

const router = useRouter();

const toUserEditPage = (editKey: string, currentValue: any) => {
  router.push({
    path: "/user/edit",
    query: {
      id: user.value.id,
      editKey,
      currentValue,
    }
  });
}
</script>

<template>
  <div id="UserUpdatePage">
    <template v-if="user">
      <a-list size="default" bordered>
        <a-list-item-meta class="listItem" :description="`昵称: ${user.name}`" @click="toUserEditPage('name', user.name)" />
        <a-list-item-meta class="listItem" :description="`账号: ${user.userAccount}`" @click="toUserEditPage('userAccount', user.accountAccount)" />
        <a-list-item-meta class="listItem" :description="`性别: ${user.gender}`" @click="toUserEditPage('gender', user.gender)" />
        <a-list-item-meta class="listItem" :description="`邮件: ${user.email}`"/>
        <a-list-item-meta class="listItem" :description="`电话: ${user.phone}`"/>
        <template #header>
          <div class="user-avatar">
            <a-image
                round
                width="4rem"
                height="4rem"
                :src="user.avatarUrl"
                @click="toUserEditPage('avatarUrl', user.avatarUrl)"
            ></a-image>
            <p>{{ user.username }}</p>
          </div>
        </template>
      </a-list>
    </template>
  </div>
</template>

<style scoped>
#UserUpdatePage {
  width: 640px;
  height: 640px;
  margin: 20px auto;
}
</style>