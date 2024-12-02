<script setup lang="ts">
import {reactive} from 'vue';
import {userLogin} from "../api/user.ts";
import {message} from "ant-design-vue";
import {useRoute} from "vue-router";

interface FormState {
  userAccount: string;
  userPassword: string;
}

const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
});

const route = useRoute();

const onFinish = async (values: any) => {
  console.log('values:', values);
  const res: any = await userLogin(values);
  console.log('res:', res);
  if (res.data.code === 0 && res.data.data) {
    message.success("登录成功");
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    message.error("登录失败");
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div id="UserLoginPage">
    <a-form
        style="max-width: 480px; margin: 0 auto; padding-top: 40px;"
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          label="用户名"
          name="userAccount"
          :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.userAccount"/>
      </a-form-item>

      <a-form-item
          label="密码"
          name="userPassword"
          :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.userPassword"/>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
</style>