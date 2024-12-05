<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {listTeam, ListTeamParams, TeamStatus} from "../api/team.ts";
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";
import TeamCardList from "../components/TeamCardList.vue";

const checked = ref(true);
const router = useRouter();
const searchText = ref<string>("");
const teamList = ref([]);

const onSearch = (value: string): void => {
  console.log(value);
}

const onTabChange = () => {
  if (checked.value) {
    saveListTeam({
      searchText: searchText.value,
    });
  } else {
    saveListTeam({
      searchText: searchText.value,
      statue: TeamStatus.Encrypt,
    })
  }
}

const saveListTeam = async (params: ListTeamParams = {}) => {
  try {
    const res = await listTeam(params);
    if (res.data && res.data.code === 0) {
      teamList.value = res.data.data;
    } else {
      message.error("加载队伍失败，请刷新重试。");
    }
  } catch (error) {
    message.error("加载队伍失败，请检查网络连接或稍后重试。");
    console.error("加载队伍失败:", error);
  }
};

const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

onMounted(() => {
  listTeam();
})

watchEffect(() => {
  console.log("teamList:", teamList);
})
</script>

<template>
  <div id="TeamPage">
    <a-input-search
        v-model:value="searchText"
        placeholder="搜索队伍"
        enter-button
        @search="onSearch"
    />
    <div>
      查询状态
      <a-switch v-model:checked="checked" @change="onTabChange" checked-children="公开" un-checked-children="私密" />
    </div>
    <a-button type="primary" @click="toAddTeam">添加队伍</a-button>
    <team-card-list/>
    <a-alert v-if="!teamList || teamList.length < 1" message="没有数据" type="warning" />
  </div>
</template>

<style scoped>
  #TeamPage {
    width: 640px;
    height: 640px;
    margin: 20px auto;
  }
</style>