import { createApp } from 'vue'
import App from './App.vue'
import routes from "./router";
import Antd from "ant-design-vue";
import * as VueRouter from 'vue-router';


// 创建 Vue 应用实例，使用 App.vue 作为根组件
const app = createApp(App);
// 使用 Antd 库
app.use(Antd);
//定义路由
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
});
app.use(router);
// 将 Vue 应用挂载到 index.html 中的 #app 元素上
app.mount('#app');
