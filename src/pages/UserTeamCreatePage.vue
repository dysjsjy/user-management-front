<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {listTeam} from "../api/team.ts";
import {message} from "ant-design-vue";
import TeamCardList from "../components/TeamCardList.vue";
import {getCurrentUser} from "../api/user.ts";

const router = useRouter();
const searchText = ref('');
const teamList = ref([]);

const onSearch = () => {
  console.log("onSearch触发");
  saveListTeam();
}



const saveListTeam = async () => {
  const currentUser = await getCurrentUser();
  let id = currentUser.id;
  const rawSearchText = searchText.value;
  const res = await listTeam({
    userId: id,
    searchText: rawSearchText,
  });
  if (res.data.code === 0) {
    teamList.value = res.data.data;
  } else {
    message.error("加载队伍失败，请重试。");
  }
}

const addTeam = () => {
  router.push({
    path: "/team/add",
  });
}

onMounted(() => {
  saveListTeam();
})

</script>

<template>
  <div id="UserTeamCreatePage">
    <a-input-search
        v-model:value="searchText"
        placeholder="搜索队伍"
        enter-button
        @search="onSearch"
    />
    <a-button
        type="primary"
        @click="addTeam"
    >创建队伍</a-button>
    <team-card-list :teamList="teamList" />
    <a-alert v-if="!teamList || teamList.length < 1" message="没有数据" type="warning"/>
  </div>
</template>

<style scoped>
  #UserTeamCreatePage {
    width: 640px;
    height: 640px;
    margin: 0 auto;
  }
</style>