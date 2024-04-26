export interface LoginInput {
    email: string,
    password: string
}

export interface LoginState {
    id: number,
    name: string,
    email: string,
    role: string,
    access_token: string
}

export interface UserResponse {
    id: number,
    name: string,
    email: string,
    role: string,
    createdAt: string
}

export interface UserRequest {
    id: number,
    name: string,
    email: string,
    role: string,
    password: string,
    createdAt: string
}