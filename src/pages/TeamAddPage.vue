<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive} from "vue";
import dayjs, {Dayjs} from 'dayjs';
import {teamAdd, TeamAddInfo} from "../api/team.ts";
import {message} from "ant-design-vue";

const router = useRouter();

const teamInfo = reactive<TeamAddInfo>({
  name: '',
  description: '',
  expireTime: null,
  maxNum: 3,
  status: 0,
  password: ''
});

const onSubmit = async () => {
  console.log(teamInfo);
  if (teamInfo.name == '' || teamInfo.description == '' || teamInfo.expireTime == null) {
    message.error("请输入完整队伍信息。");
  } else {
    const res = await teamAdd(teamInfo);
    if (res.data.code === 0 && res.data) {
      message.success("添加成功。");
      router.push({
        path: "/team",
        replace: true,
      });
    } else {
      message.error("添加失败。")
    }
  }
}

const onOkDate = (value: Dayjs) => {
  teamInfo.expireTime = value.toDate();
};

const disabledDate = (current: Dayjs) => {
  return current && current < dayjs().endOf('day');
};
</script>
<template>
  <div id="TeamAddPage">
    <a-form
        name="teamAddForm"
        :model="teamInfo"
        @finish="onSubmit"
        :hide-required-mark="true"
    >
      <a-form-item
          label="队伍名称"
      >
        <a-input
            v-model:value="teamInfo.name"
            placeholder="请输入队伍名"
        />
      </a-form-item>
      <a-form-item
          label="队伍描述"
      >
        <a-textarea
            v-model:value="teamInfo.description"
            placeholder="请输入队伍描述"
            :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item label="过期时间">
        <a-date-picker
            v-model="teamInfo.expireTime"
            show-time
            placeholder="Select Time"
            @ok="onOkDate"
            :disabled-date="disabledDate"
        />
      </a-form-item>
      <a-form-item label="最大人数">
        <a-input-number id="inputNumber" v-model:value="teamInfo.maxNum" :min="3" :max="10"/>
        当前值：{{ teamInfo.maxNum }}
      </a-form-item>
      <a-form-item label="队伍状态">
        <a-radio-group v-model:value="teamInfo.status">
          <a-radio :value="0">公开</a-radio>
          <a-radio :value="1">私有</a-radio>
          <a-radio :value="2">加密</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
          v-if="teamInfo.status === 2"
          label="密码"
      >
        <a-input
            v-model:value="teamInfo.password"
            type="password"
            placeholder="请输入队伍密码"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#TeamAddPage {
  width: 640px;
  height: 640px;
  margin: 20px auto;
}
</style>