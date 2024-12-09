<script setup lang="ts">
import {onMounted, ref} from "vue";
import TeamCardList from "../components/TeamCardList.vue";
import {getTeamMyJoin} from "../api/team.ts";
import {message} from "ant-design-vue";

const searchText = ref('');
const teamList = ref([]);


const onSearch = () => {
  console.log('onSearch触发');
  saveListTeam();
}

const saveListTeam = async () => {
  let rawDataSearchText = searchText.value == null ? '' : JSON.parse(JSON.stringify(searchText.value));
  const res = await getTeamMyJoin({
    searchText: rawDataSearchText,
    pageNum: 1,
  });
  if (res.data.code === 0) {
    teamList.value = res.data.data;
  } else {
    message.error("加载队伍失败，请重试。");
  }
}

onMounted(() => {
  saveListTeam();
})
</script>

<template>
  <div id="UserTeamJoinPage">
    <a-input-search
        v-model:value="searchText"
        placeholder="搜索队伍"
        enter-button
        @search="onSearch"
    />
    <team-card-list :teamList="teamList" />
    <a-alert v-if="!teamList || teamList.length < 1" message="没有数据" type="warning"/>
  </div>
</template>

<style scoped>
  #UserTeamJoinPage {
    width: 640px;
    height: 640px;
    margin: 20px auto;
  }
</style>