import type { Request } from "express";

export interface UserInfo {
    userId?: string;
    email: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;
}

export interface ServiceReturn {
    status: number;
    data: any;
    extra?: any;
}

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
