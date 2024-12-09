<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {getTeam, TeamInfo, updateTeam} from "../api/team.ts";
import dayjs, {Dayjs} from "dayjs";

const router = useRouter();
const route = useRoute();

const id: number = Number(route.query.id);

const addTeamData = ref({});

const onOkDate = (value: Dayjs) => {
  addTeamData.expireTime = value.toDate();
};

const disabledDate = (current: Dayjs) => {
  return current && current < dayjs().endOf('day');
};

onMounted(async () => {
  console.log("onMounted触发");
  if (id <= 0) {
    message.error("加载队伍失败。");
    return;
  }
  const res = await getTeam(id);
  if (res.data.code === 0) {
    addTeamData.value = res.data.data;
  } else {
    message.error("加载队伍失败。");
  }
});

const onSubmit = async () => {
  console.log("onSubmit触发");
  const rawData = JSON.parse(JSON.stringify(addTeamData.value));
  const res = await updateTeam(rawData);
  if (res.data.code === 0 && res.data) {
    message.success("更新成功。");
    router.push({
      path: "/team",
      replace: true,
    });
  } else {
    message.error("更新失败。");
  }
}
</script>

<template>
  <div id="TeamUpdatePage">
    <a-form
        name="teamUpdateForm"
        :model="addTeamData"
        @finish="onSubmit"
        :hide-required-mark="true"
    >
      <a-form-item
          label="队伍名："
      >
        <a-input
            v-model:value="addTeamData.name"
            aria-placeholder="请输入队伍名"
            :rules="[{
              required: true,
              message: '请输入队伍名'
            }]"
        />
      </a-form-item>

      <a-form-item
          label="队伍描述："
      >
        <a-input
            v-model:value="addTeamData.description"
            aria-placeholder="请输入队伍描述"
            :rules="[{
              required: true,
              message: '请输入队伍描述'
            }]"
        />
      </a-form-item>
      <a-form-item label="过期时间">
        <a-date-picker
            v-model="addTeamData.expireTime"
            show-time
            placeholder="Select Time"
            @ok="onOkDate"
            :disabled-date="disabledDate"
        />
      </a-form-item>
      <a-form-item label="队伍状态">
        <a-radio-group v-model:value="addTeamData.status">
          <a-radio :value="0">公开</a-radio>
          <a-radio :value="1">私有</a-radio>
          <a-radio :value="2">加密</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
          v-if="addTeamData.status === 2"
          label="密码"
      >
        <a-input
            v-model:value="addTeamData.password"
            type="password"
            placeholder="请输入队伍密码"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">添加</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
  #TeamUpdatePage {
    width: 640px;
    height: 640px;
    margin: 20px auto;
  }
</style>