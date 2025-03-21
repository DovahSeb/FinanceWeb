export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserInfoResponse {
    email: string;
    isEmailConfirmed: boolean;
}