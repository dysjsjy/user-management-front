<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {Dayjs} from 'dayjs';

const router = useRouter();
const minDate = new Date(2020, 0, 1);
const showPicker = ref(false);
const teamInfo = {
  name: '',
  description: '',
  expireTime: null,
  maxNum: 3,
  status: 0,
  password: ''
}

const postInfo = ref({...teamInfo});

const onSubmit = async () => {
  console.log(postInfo.value);
}

const onChangeDate = (value: Dayjs, dateString: string) => {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
};

const onOkDate = (value: Dayjs) => {
  console.log('onOk: ', value);
};
</script>

<template>
  <div id="TeamAddPage">
    <a-form
        @submit="onSubmit"
        :hide-required-mark="true"
    >
      <a-form-item
          label="队伍名称"
          :prop="'teamInfo.name'"
          :rules="[{ required: true, message: '请填写队伍名', trigger: 'blur' }]"
      >
        <a-input
            v-model="teamInfo.name"
            placeholder="请输入队伍名"
        />
      </a-form-item>
      <a-form-item
          label="队伍描述"
          :prop="'teamInfo.description'"
          :rules="[{ required: true, message: '请输入队伍描述', trigger: 'blur' }]"

      >
        <a-textarea
            v-model:value="teamInfo.description"
            placeholder="请输入队伍描述"
            :maxLength="50"
            :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>
      <a-form-item label="过期时间">
        <a-date-picker
            v-model="postInfo.expireTime"
            show-time
            placeholder="Select Time"
            @change="onChangeDate"
            @ok="onOkDate"
        />
      </a-form-item>
      <a-form-item label="最大人数">
        <a-input-number id="inputNumber" v-model:value="postInfo.maxNum" :min="3" :max="10"/>
        当前值：{{ postInfo.maxNum }}
      </a-form-item>
      <a-form-item label="队伍状态">
        <a-radio-group v-model:value="postInfo.status">
          <a-radio :value="0">公开</a-radio>
          <a-radio :value="1">私有</a-radio>
          <a-radio :value="2">加密</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
          v-if="postInfo.status === 2"
          label="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      >
        <a-input
            v-model="postInfo.password"
            type="password"
            placeholder="请输入队伍密码"
        />
      </a-form-item>
      <a-form-item
          style="text-align: center"
      >
        <a-button
            type="primary"
            htmlType="submit"
            @click="onSubmit"
        >
          提交
        </a-button>
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