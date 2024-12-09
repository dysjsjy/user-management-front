<script setup lang="ts">
import {h, ref} from 'vue';
import {GlobalOutlined} from '@ant-design/icons-vue';
import {MenuProps} from 'ant-design-vue';
import {useRouter} from "vue-router";

const current = ref<string[]>(['mail']);
const items = ref<MenuProps['items']>([
  {
    title: 'Index',
    icon: () => h(GlobalOutlined),
    label: 'Index',
    key: '/',
  },
  {
    title: 'SearchPage',
    icon: () => h(GlobalOutlined),
    label: 'SearchPage',
    key: '/search',
  },
  {
    title: 'SearchResultPage',
    icon: () => h(GlobalOutlined),
    label: 'SearchResultPage',
    key: '/user/list',
  },
  {
    title: 'Team',
    icon: () => h(GlobalOutlined),
    label: 'Team',
    key: '/team',
  },
  {
    title: 'TeamAddPage',
    icon: () => h(GlobalOutlined),
    label: 'TeamAddPage',
    key: '/team/add',
  },
  {
    title: 'TeamUpdatePage',
    icon: () => h(GlobalOutlined),
    label: 'TeamUpdatePage',
    key: '/team/update',
  },
  {
    title: 'UserEditPage',
    icon: () => h(GlobalOutlined),
    label: 'UserEditPage',
    key: '/user/edit',
  },
  {
    title: 'UserInfoPage',
    icon: () => h(GlobalOutlined),
    label: 'UserInfoPage',
    key: '/user/info',
  },
  {
    title: 'UserLoginPage',
    icon: () => h(GlobalOutlined),
    label: 'UserLoginPage',
    key: '/user/login',
  },
  {
    title: 'UserRegisterPage',
    icon: () => h(GlobalOutlined),
    label: 'UserRegisterPage',
    key: '/user/register',
  },
  {
    title: 'UserPage',
    icon: () => h(GlobalOutlined),
    label: 'UserPage',
    key: '/user',
  },
  {
    title: 'UserTeamCreatePage',
    icon: () => h(GlobalOutlined),
    label: 'UserTeamCreatePage',
    key: '/user/team/create',
  },
  {
    title: 'UserTeamJoinPage',
    icon: () => h(GlobalOutlined),
    label: 'UserTeamJoinPage',
    key: '/user/team/join',
  },
  {
    title: 'UserUpdatePage',
    icon: () => h(GlobalOutlined),
    label: 'UserUpdatePage',
    key: '/user/update',
  },
]);

const router = useRouter();
const handleClick = ({key}: {key: string})  => {
  router.push(key);
};

</script>

<template>
  <div id="GlobalHeader">
    <a-menu v-model:selectedtitles="current" mode="horizontal" :items="items" @click="handleClick"/>
  </div>
</template>

<style scoped>
#GlobalHeader {
  width: 100%;
}
</style>