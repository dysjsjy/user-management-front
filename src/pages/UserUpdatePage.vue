<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../api/user.ts";
import {useRouter} from "vue-router";

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
});

const router = useRouter();

const toUserEditPage = (editKey: string, currentValue: any, editName: string) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      currentValue,
      editName,
    }
  });
}
</script>

<template>
  <div id="UserUpdatePage">
    <template v-if="user">
      <a-list size="default" bordered>
        <a-list-item-meta class="listItem" :description="`昵称: ${user.name}`"
                          @click="toUserEditPage('name', user.name, '昵称')"/>
        <a-list-item-meta class="listItem" :description="`账号: ${user.userAccount}`"
                          @click="toUserEditPage('userAccount', user.accountAccount, '账号')"/>
        <a-list-item-meta class="listItem" :description="`性别: ${user.gender}`"
                          @click="toUserEditPage('gender', user.gender, '性别')"/>
        <a-list-item-meta class="listItem" :description="`邮件: ${user.email}`"
                          @click="toUserEditPage('email', user.email, '邮箱')"/>
        <a-list-item-meta class="listItem" :description="`电话: ${user.phone}`"
                          @click="toUserEditPage('phone', user.phone, '电话')"/>
        <a-list-item-meta class="listItem" :description="`Tag: ${user.tags}`"
                          @click="toUserEditPage('tags', user.tags, 'tags')"/>
        <a-list-item-meta class="listItem" :description="`编号${user.planetCode}`"/>
        <a-list-item-meta class="listItem" :description="`注册时间${user.createTime}`"/>
        <template #header>
          <div class="user-avatar">
            <a-image
                round
                width="4rem"
                height="4rem"
                :src="user.avatarUrl"
                @click="toUserEditPage('avatarUrl', user.avatarUrl, '头像')"
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