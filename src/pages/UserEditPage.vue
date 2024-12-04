<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {getCurrentUser, updateUser} from "../api/user.ts";
import {message} from "ant-design-vue";

const route = useRoute()
const router = useRouter()

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    message.warning("用户未登录。");
    return;
  }

  console.log(currentUser);

  if (typeof editUser.value.editKey !== 'string') {
    // 处理 editKey 不是字符串的情况，或者提供默认值
    throw new Error('editKey must be a string');
  }

  const res = await updateUser({
    id: currentUser.id,
    editKey: editUser.value.editKey,
    currentValue: editUser.value.currentValue,
  })

  console.log(res, "更新请求");

  if (res.code === 0 && res.data > 0) {
    router.back();
  }

}
</script>

<template>
  <div id="UserEditPage">
    <a-form
        @submit="onSubmit"
        style="text-align: center;"
    >
      <div style="width: 300px; margin: 20px 0;">
        {{editUser.editName}}:
        <a-input
            v-model:value="editUser.currentValue"
            :placeholder="`请输入新的${editUser.editName}`"
            style="width: 200px"
        />
      </div>
      <a-form-item style="text-align: center;">
        <a-button type="primary" style="width: 200px;" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#UserEditPage {
  width: 300px;
  height: 640px;
  margin: 0 auto;
}
</style>