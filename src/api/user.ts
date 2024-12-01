import myAxios from "../request.ts";


export const userRecommend = async () => {
    return myAxios.request({
        url: "/user/recommend",
        method: "GET",
        params: {
            pageSize: 10,
            pageNum: 1
        },
    }).then(res => {
        return res?.data;
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
        return res?.data;
    })
}

