<script setup lang="ts">
import {TeamType} from "../models/team";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getCurrentUser} from "../api/user.ts";
import {joinTeam, TeamStatus} from "../api/team.ts";
import {message} from "ant-design-vue";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});
// const VanDialog = Dialog.Component;
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
const currentUser = ref();

const router = useRouter();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await joinTeam({
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res?.data.code === 0) {
    message.success("加入成功。");
    joinTeamId.value = 0;
    password.value = '';
  } else {
    message.error("加入失败。")
  }
  console.log("执行doJoinTeam");
}

const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  });
}

const doQuitTeam = async (id: number) => {
  console.log("执行退出队伍");
}


const doDeleteTeam = async (id: number) => {
  console.log("执行解散队伍");
}

const curUserAndTeamList = () => {
  console.log("curUser:", currentUser.value);
  console.log("teamList:", props.teamList);
}

</script>

<template>
  <div id="TeamCardList">
    <a-button
        @click="curUserAndTeamList"
    >看看当前用户和队伍列表</a-button>
    <a-card
        v-for="team in props.teamList"
        :title="team.name"
    >
      <template #tabBarExtraContent>
        {{ TeamStatus[team.status] }}
      </template>
      <a-card-meta>
        <template #description>
          <div>
            {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
          </div>
          <div v-if="team.expireTime">
            {{ '过期时间: ' + team.expireTime }}
          </div>
          <div>
            {{ '创建时间: ' + team.createTime }}
          </div>
        </template>
      </a-card-meta>
      <template #actions>
        <a-button type="primary" v-if="team.createUser?.id != currentUser.id" @click="preJoinTeam(team)">加入队伍</a-button>
        <a-button v-if="team.createUser?.id == currentUser.id" @click="doUpdateTeam(team.id)">编辑队伍</a-button>
        <a-button>退出队伍</a-button>
        <a-button>解散队伍</a-button>
      </template>
    </a-card>
  </div>
</template>

<style scoped>
#TeamCardList {
  width: 640px;
  height: 640px;
  margin: 0 auto;
}
</style>