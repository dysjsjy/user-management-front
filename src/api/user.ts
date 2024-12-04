import myAxios from "../request.ts";
import qs from "qs";

export const userRecommend = async () => {
    return myAxios.request({
        url: "/user/recommend",
        method: "GET",
        params: {
            pageSize: 10,
            pageNum: 1
        },
    }).then(res => {
        return res?.data?.data?.records;
    })
}

export const userMatch = async () => {
    return myAxios.request({
        url: "/user/match",
        method: "GET",
        params: {
            num: 4
        },
    }).then(res => {
        return res?.data?.data?.records;
    })
}

export const userLogin = async (params: any) => {
    return myAxios.request({
        url: "/user/login",
        method: "POST",
        data: params,
    })
}

export const userRegister = async (params: any) => {
    return myAxios.request({
        url: "/user/register",
        method: "POST",
        data: params,
    })
}

export const userSearchTag = async (params: any) => {
    return myAxios.request({
        url: "/user/search/tags",
        method: "GET",
        params: params,
        paramsSerializer: params => {
            return qs.stringify(params, {indices: false});
        },
    }).then(function (response) {
        // 处理成功情况
        console.log('/user/search/tags success', response);
        return response?.data;
    }).catch(function (error) {
        // 处理错误情况
        console.log('/user/search/tags error', error);
    });
};

export const getCurrentUser = async () => {
    return myAxios.request({
        url: "/user/current",
        method: "GET",
    }).then(res => res?.data).catch(function (error) {
        console.log(error);
        return null;
    });
}


interface UpdateUserParams {
    id: number;
    editKey: string;
    currentValue: any;
    headers?: Record<string, string>;  // 可选的请求头
}

export const updateUser = async (
    {
        id,
        editKey,
        currentValue,
        headers = {},
    }: UpdateUserParams) => {
    try {
        const res = await myAxios.post('/user/update', {
            id,
            [editKey]: currentValue,
        }, {
            headers,  // 将请求头传递给 Axios
        });
        return res.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}