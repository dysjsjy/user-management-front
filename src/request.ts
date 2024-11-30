import axios from "axios";

const myAxios = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    withCredentials: true,
});

// Add a request interceptor
myAxios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        console.log("发送请求了。")
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
myAxios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log("收到响应了。")
        console.log(response);

        const { data } = response;
        console.log(data);
        // 未登录
        if (data.code === 40100) {
            const redirectUrl = window.location.href;
            window.location.href = `/user/login?redirect=${redirectUrl}`;
        }
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default myAxios;