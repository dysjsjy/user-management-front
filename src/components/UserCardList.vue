<script setup lang="ts">
import {UserType} from "../models/user";
import {useRouter} from "vue-router";

const router = useRouter();

interface UserCardListProps {
  loading: boolean;
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  // @ts-ignore
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],
});

const contactUser = (user: UserType) => {
  console.log(user.avatarUrl)
  router.push({
    path: '/user/info',
    query: {
      avatarUrl: user.avatarUrl,
      profile: user.profile,
      username: user.username,
      phone: user.phone,
      email: user.email
    }
  })
}

const propsClick = (props: any) => {
  console.log("显示props：", props);
}
</script>

<template>
  <div>
    <!-- 骨架屏，显示加载状态 -->
    <a-skeleton
        :loading="props.loading"
        avatar
        title
        :row="3"
        v-for="user in props.userList"
    >
      <!-- 卡片内容 -->
      <a-card
          :title="`${user.username}（${user.planetCode}）`"
          avatar
          :loading="props.loading"
      >
        <template #cover>
          <img alt="" :src=user.avatarUrl />
        </template>
        <!-- 用户简介 -->
        <p>{{ user.profile }}</p>

        <!-- 用户标签 -->
        <template #tags>
          <a-tag
              v-for="(tag, index) in user.tags"
              :key="index"
              color="red"
              style="margin-right: 8px; margin-top: 8px;"
          >
            {{ tag }}
          </a-tag>
        </template>

        <!-- 卡片的底部操作按钮 -->
        <template #actions>
          <a-button type="primary" size="small" @click="contactUser(user)">
            联系我
          </a-button>
        </template>
      </a-card>
    </a-skeleton>
    <a-button type="primary" size="small" @click="propsClick(props)">
      显示props
    </a-button>
  </div>
</template>


<style scoped>

</style>