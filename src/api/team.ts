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
    Private = 1,
    Encrypt = 2,
}

export const listTeam = async (params: ListTeamParams) => {
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


export interface TeamAddInfo {
    name: string,
    description: string,
    expireTime: Date | null,
    maxNum: number,
    status: number,
    password?: string,
}

export const teamAdd = async (data: TeamAddInfo) => {
    return myAxios.request({
        url: "/team/add",
        method: "POST",
        data: data,
    })
}

export interface joinTeamInfo {
    teamId: number;
    password?: string;
}

export const joinTeam = async (data: joinTeamInfo) => {
    return myAxios.request({
        url: "/team/join",
        method: "POST",
        data: data,
    })
}

export const quitTeam = async (data: {
    teamId: number;
}) => {
    return myAxios.request({
        url: "/team/quit",
        method: "POST",
        data: {
            teamId: data.teamId,
        }
    });
}

export const deleteTeam = async (id: number) => {
    return myAxios.request({
        url: "/team/delete",
        method: "POST",
        data: {
            id: id,
        },
    })
}