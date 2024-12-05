import myAxios from "../request.ts";

export interface ListTeamParams {
    searchText?: string;
    pageNum?: number;
    statue?: number;
}

// interface ListTeamResponse {
//     data: any[];
//     total: number;
//     currentPage: number;
// }

// 使用枚举定义状态，替代魔法数字
export enum TeamStatus {
    Public = 0,
    Encrypt = 2,
}

export const listTeam = async (params: ListTeamParams = {}) => {
    const {
        searchText = "",
        pageNum = 1,
        statue = TeamStatus.Public,
    } = params;

    return myAxios.request({
        url: "/team/list",
        method: "GET",
        params: {
            searchText,
            pageNum,
            statue,
        },
    });
};