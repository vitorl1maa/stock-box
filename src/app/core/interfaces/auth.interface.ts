export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    data: {
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            cpf: string;
            phone: string;
            createdAt: string;
            updatedAt: string;
        };
        token: string;
    };
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: any | null;
} 