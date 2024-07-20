import type { Request } from "express";

export interface UserInfo {
    userId?: string;
    email: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;
    level: string;
}

export interface ServiceReturn {
    status: number;
    data: any;
    extra?: any;
}

export interface SubGoal {
    description: string;
    status: boolean;
}

// export interface Lesson {
//     topic: string;
//     subGoals: {
//         [key: string]: SubGoal;
//     };
// }

export type CustomRequest<Params = unknown, ReqBody = unknown> = Request<
    Params,
    unknown,
    ReqBody
>;

export interface LoginRequest {
    refreshKey?: string;
    email: string;
    password: string;
}
