import type { Request } from "express"; // Import the Request type from Express for type annotations

// Interface representing user information
export interface UserInfo {
    userId?: string; // Optional user ID
    email: string; // User's email address
    password: string; // User's password
    accessToken?: string; // Optional access token for authentication
    refreshToken?: string; // Optional refresh token for authentication
    level: string; // User's access level or role
}

// Interface representing a service return structure
export interface ServiceReturn {
    status: number; // HTTP status code
    data: any; // Main data to be returned by the service
    extra?: any; // Optional additional data
}

// Interface representing a subgoal within a learning path
export interface SubGoal {
    description: string; // Description of the subgoal
    status: boolean; // Status indicating whether the subgoal is completed or not
}

// Interface representing a lesson in a learning path
// Uncomment the following code if using Lesson interface
// export interface Lesson {
//     topic: string; // Topic of the lesson
//     subGoals: { // Collection of subgoals for the lesson
//         [key: string]: SubGoal; // Each subgoal identified by a unique key
//     };
// }

// Generic type for a custom request object in Express
export type CustomRequest<Params = unknown, ReqBody = unknown> = Request<
    Params, // Type for request parameters
    unknown, // Type for response body (usually not used)
    ReqBody // Type for request body
>;

// Interface representing a login request
export interface LoginRequest {
    refreshKey?: string; // Optional refresh key for refreshing tokens
    email: string; // User's email address
    password: string; // User's password
}
